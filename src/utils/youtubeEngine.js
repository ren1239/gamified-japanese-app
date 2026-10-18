// YouTube fallback for the lesson player: when a video isn't in the folder or on the video server, it plays
// from YouTube *inside* the app (IFrame Player API on youtube-nocookie.com).
//
// createYouTubeEngine() returns an object shaped like the <video> element the player already drives —
// currentTime (get/set), duration, paused, playbackRate, play(), pause() — and reports the same events, so
// grammar-point clips, pause-at-end, looping, speed and XP all work unchanged. YouTube has no timeupdate
// event, so the position is polled 4× a second while playing.

let apiPromise = null

function loadApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  apiPromise ??= new Promise((resolve, reject) => {
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(window.YT) }
    const s = document.createElement('script')
    s.src = 'https://www.youtube.com/iframe_api'
    s.async = true
    s.onerror = () => { apiPromise = null; reject(new Error('YouTube API failed to load')) }
    document.head.appendChild(s)
  })
  return apiPromise
}

/**
 * host: element the iframe replaces. on: { loaded, time, play, pause, ended, waiting, playing, error } —
 * read through a getter so the player can swap handlers every render.
 */
export function createYouTubeEngine(host, videoId, startSeconds, getHandlers) {
  let player = null
  let ready = false
  let state = -1 // YT.PlayerState: -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering, 5 cued
  let rate = 1
  let poll = null
  let destroyed = false
  const call = (name, ...args) => getHandlers()[name]?.(...args)

  const engine = {
    kind: 'youtube',
    get currentTime() { return player?.getCurrentTime?.() ?? startSeconds },
    set currentTime(t) { player?.seekTo?.(t, true); call('time') },
    get duration() { return player?.getDuration?.() ?? 0 },
    get paused() { return state !== 1 && state !== 3 },
    get seeking() { return false },
    get readyState() { return ready ? 4 : 0 },
    get playbackRate() { return rate },
    set playbackRate(r) { rate = r; player?.setPlaybackRate?.(r) },
    play() { player?.playVideo?.(); return Promise.resolve() },
    pause() { player?.pauseVideo?.() },
    destroy() {
      destroyed = true
      clearInterval(poll)
      try { player?.destroy?.() } catch { /* iframe already gone */ }
    },
  }

  loadApi().then((YT) => {
    if (destroyed) return
    player = new YT.Player(host, {
      videoId,
      host: 'https://www.youtube-nocookie.com',
      playerVars: {
        start: Math.floor(startSeconds || 0),
        playsinline: 1, // iPhone: play in the page, not full screen
        controls: 0, // our own controls drive it
        disablekb: 1, // our own keyboard shortcuts
        fs: 0,
        rel: 0,
        iv_load_policy: 3,
        modestbranding: 1,
      },
      events: {
        onReady: () => {
          ready = true
          if (rate !== 1) player.setPlaybackRate(rate)
          call('loaded')
        },
        onStateChange: (e) => {
          state = e.data
          clearInterval(poll)
          if (state === 1) {
            poll = setInterval(() => call('time'), 250)
            call('play'); call('playing')
          } else if (state === 2) call('pause')
          else if (state === 3) call('waiting')
          else if (state === 0) { call('pause'); call('ended') }
        },
        onError: () => call('error'),
      },
    })
  }).catch(() => call('error'))

  return engine
}
