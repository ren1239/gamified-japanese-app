import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useStatsStore, xpOnDate } from '../store/statsStore'
import { useQuizStore } from '../store/quizStore'
import { useVideoSource, resolveMedia, canPickFolder, pickVideoFolder, reconnectVideoFolder } from '../utils/videoSource'
import { VIDEO_TYPES, WATCHED_PCT, getVideo, videoKey, lessonInfo, pointAt, fmtTime, stageShort, stageSpeed } from '../utils/lessons'
import { todayStr } from '../utils/dates'
import LessonThumb from '../components/LessonThumb'
import Mascot from '../components/Mascot'
import Icon from '../components/Icon'
import Jp from '../components/Jp'
import RomajiToggle from '../components/RomajiToggle'

// Lesson video player. One file per video; its YouTube chapters are "points" that play like separate clips:
// the scrubber zooms to the current point, a point can loop or pause at its end, and a point with a quiz
// (grammar) or a flashcard deck (vocab) offers it as soon as it's watched. Shadowing videos get a stage stepper.
// Desktop: video left, points right; keyboard: space/k play, ←/→ 10 s, p/n previous/next point, f full screen.

const SPEEDS = [0.75, 1, 1.25, 1.5]
const STAGE_HINT = {
  Listen: 'Just listen first. No reading yet.',
  Read: 'Read the Japanese on screen while it plays.',
  Translation: 'Check what each line means.',
  Slow: 'Slow speed: catch every sound.',
  'Read aloud': 'Read out loud together with the audio.',
  Shadow: "Speak along half a beat behind. Copy Yuki's voice: the course recommends modelling the native speaker.",
}

function NoSource({ video, lesson, mascot, status, folderName }) {
  const yt = `https://www.youtube.com/watch?v=${video.youtube}`
  return (
    <div className="player-nosource">
      <LessonThumb lesson={lesson} mascot={mascot} className="player-nosource-art" />
      <div className="player-nosource-card">
        <b>{video.duration ? 'This video isn’t on this device' : 'This lesson isn’t downloaded yet'}</b>
        <small>
          {status === 'reconnect' ? `Reconnect “${folderName}” to play it from your computer.`
            : canPickFolder ? 'Choose the folder that holds your lesson videos.'
              : 'Choose your video folder in Settings → Lesson videos (desktop).'}
        </small>
        <div className="player-nosource-actions">
          {status === 'reconnect' && <button type="button" className="btn btn-primary btn-sm" onClick={() => reconnectVideoFolder().catch(() => {})}><Icon name="folder" size={16} />Reconnect</button>}
          {status !== 'reconnect' && canPickFolder && <button type="button" className="btn btn-primary btn-sm" onClick={() => pickVideoFolder().catch(() => {})}><Icon name="folder" size={16} />Choose folder</button>}
          <a className="btn btn-ghost btn-sm" href={yt} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        </div>
      </div>
    </div>
  )
}

export default function PlayerScreen({ lesson, type, startPoint, onBack, onStartQuiz, onFlashcard }) {
  const video = getVideo(lesson, type)
  const meta = VIDEO_TYPES[type]
  const key = videoKey(lesson, type)
  const info = lessonInfo(lesson)
  const points = useMemo(() => video?.points ?? [], [video])
  const isShadow = type === 'shadowing'

  const { files, status, folderName } = useVideoSource()
  const done = useStatsStore((s) => s.videoProgress[key]?.done)
  const saveVideoProgress = useStatsStore((s) => s.saveVideoProgress)
  const completeVideoPoint = useStatsStore((s) => s.completeVideoPoint)
  const history = useStatsStore((s) => s.history)
  const mediaServer = useStatsStore((s) => s.mediaServer)
  const dailyGoal = useStatsStore((s) => s.dailyGoal)
  const quizzes = useQuizStore((s) => s.quizzes)
  const quizMap = useMemo(() => Object.fromEntries(quizzes.map((q) => [q.id, q])), [quizzes])

  // Where to start: the point you tapped, else where you left off (unless that was the very end)
  const [{ saved, startAt }] = useState(() => {
    const sv = useStatsStore.getState().videoProgress[key]
    const at = startPoint != null && points[startPoint] ? points[startPoint].start
      : sv?.pos && sv.pos < (video?.duration ?? Infinity) - 5 ? sv.pos : 0
    return { saved: sv, startAt: at }
  })

  const vRef = useRef(null)
  const stageRef = useRef(null)
  const [src, setSrc] = useState(undefined) // undefined = looking, null = no source
  const [poster, setPoster] = useState(null)
  const [time, setTime] = useState(startAt)
  const [duration, setDuration] = useState(video?.duration ?? 0)
  const [playing, setPlaying] = useState(false)
  const [rate, setRate] = useState(1)
  const [loop, setLoop] = useState(false)
  const [pauseAtEnd, setPauseAtEnd] = useState(!isShadow)
  const [sheet, setSheet] = useState(null) // { index } — checkpoint after a point
  const [flash, setFlash] = useState(null) // { xp, label } — small "+10 XP" toast
  const [earned, setEarned] = useState({}) // points completed in this session → XP shown on the sheet

  const sec = useRef({ ...(saved?.sec || {}) }) // seconds actually played per point
  const doneRef = useRef({ ...(saved?.done || {}) })
  const lastT = useRef(null)
  const posRef = useRef(startAt)
  const dirty = useRef(false)

  // Find the file (folder → host → dev server); re-runs when a folder gets connected
  useEffect(() => {
    let alive = true
    resolveMedia(video).then((u) => alive && setSrc(u)).catch(() => alive && setSrc(null))
    resolveMedia(video, '.jpg').then((u) => alive && setPoster(u)).catch(() => {})
    return () => { alive = false }
  }, [video, files, mediaServer])

  // Save position + watched seconds every few seconds, and when leaving
  const flush = useCallback(() => {
    if (!video) return
    saveVideoProgress(key, lesson, type, posRef.current, sec.current)
    dirty.current = false
  }, [video, key, lesson, type, saveVideoProgress])
  useEffect(() => {
    const id = setInterval(() => { if (dirty.current) flush() }, 5000)
    return () => { clearInterval(id); flush() }
  }, [flush])

  const ci = pointAt(points, time)
  const cp = points[ci]

  const seek = useCallback((s) => {
    const v = vRef.current
    if (!v) return
    const end = (v.duration || duration || 0) - 0.1
    v.currentTime = Math.max(0, end > 0 ? Math.min(s, end) : s)
    lastT.current = v.currentTime
    posRef.current = v.currentTime
    setTime(v.currentTime)
    dirty.current = true
  }, [duration])

  const playPoint = useCallback((i) => {
    setSheet(null)
    if (!points[i]) return
    seek(points[i].start + 0.01)
    vRef.current?.play().catch(() => {})
  }, [points, seek])

  const toggle = useCallback(() => {
    const v = vRef.current
    if (!v) return
    if (v.paused) { setSheet(null); v.play().catch(() => {}) } else v.pause()
  }, [])

  const fullscreen = useCallback(() => {
    const v = vRef.current
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    else if (stageRef.current?.requestFullscreen) stageRef.current.requestFullscreen().catch(() => {})
    else v?.webkitEnterFullscreen?.() // iPhone Safari
  }, [])

  const markWatched = (i) => {
    const p = points[i]
    if (!p || p.kind === 'intro' || doneRef.current[i]) return
    doneRef.current[i] = true
    const xp = completeVideoPoint(key, i, p.xp ?? 10)
    if (xp) {
      setEarned((e) => ({ ...e, [i]: xp }))
      setFlash({ xp, label: p.label, id: Date.now() })
    }
  }

  const onTime = () => {
    const v = vRef.current
    const now = v.currentTime
    const prev = lastT.current
    lastT.current = now
    posRef.current = now
    if (prev != null && !v.paused && !v.seeking) {
      const d = now - prev
      if (d > 0 && d < 1.5 * Math.max(1, v.playbackRate)) { // normal playback, not a jump
        const i0 = pointAt(points, prev)
        const p0 = points[i0]
        sec.current[i0] = (sec.current[i0] || 0) + d
        dirty.current = true
        if (p0 && sec.current[i0] >= WATCHED_PCT * (p0.end - p0.start)) markWatched(i0)
        // Played past the end of a point: loop it, or stop and offer its practice
        if (p0 && prev < p0.end - 0.05 && now >= p0.end - 0.05 && i0 < points.length - 1) {
          if (loop) { seek(p0.start + 0.01); return }
          // Pause once per topic: not between a point and its BONUS part, or between verb groups sharing one deck
          const nx = points[i0 + 1]
          const sameTopic = nx && ((p0.quiz && nx.quiz === p0.quiz) || (!p0.quiz && p0.flash && nx.flash === p0.flash))
          if (pauseAtEnd && p0.kind !== 'intro' && (p0.quiz || p0.flash) && !sameTopic) { v.pause(); setSheet({ index: i0 }) }
        }
      }
    }
    setTime(now)
  }

  const onEnded = () => {
    const last = points.length - 1
    if (last >= 0 && sec.current[last] >= WATCHED_PCT * (points[last].end - points[last].start)) markWatched(last)
    if (loop && last >= 0) { playPoint(last); return }
    if (last >= 0 && points[last].kind !== 'intro' && (points[last].quiz || points[last].flash)) setSheet({ index: last })
    flush()
  }

  const onLoaded = () => {
    const v = vRef.current
    setDuration(v.duration)
    v.playbackRate = rate
    if (startAt > 0) v.currentTime = startAt
    lastT.current = v.currentTime
  }

  // Desktop keyboard shortcuts (ignored while typing)
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, select, [contenteditable="true"]') || e.metaKey || e.ctrlKey || e.altKey) return
      const v = vRef.current
      if (!v) return
      const k = e.key.toLowerCase()
      if (k === ' ' || k === 'k') { e.preventDefault(); toggle() }
      else if (k === 'arrowleft' || k === 'j') { e.preventDefault(); seek(v.currentTime - 10) }
      else if (k === 'arrowright' || k === 'l') { e.preventDefault(); seek(v.currentTime + 10) }
      else if (k === 'n') playPoint(Math.min(points.length - 1, pointAt(points, v.currentTime) + 1))
      else if (k === 'p') playPoint(Math.max(0, pointAt(points, v.currentTime) - 1))
      else if (k === 'f') fullscreen()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle, seek, playPoint, fullscreen, points])

  useEffect(() => {
    if (!flash) return
    const id = setTimeout(() => setFlash(null), 2200)
    return () => clearTimeout(id)
  }, [flash])

  if (!video) return null

  const counted = points.filter((p) => p.kind !== 'intro')
  const cycleRate = () => {
    const r = SPEEDS[(SPEEDS.indexOf(rate) + 1) % SPEEDS.length]
    setRate(r)
    if (vRef.current) vRef.current.playbackRate = r
  }
  const hasPractice = points.some((p) => p.quiz || p.flash)
  const total = duration || video.duration || 0
  const range = cp ? { start: cp.start, end: cp.end } : { start: 0, end: total }
  const practiseFor = (p) => (p.quiz && quizMap[p.quiz] ? { label: 'Quiz', run: () => onStartQuiz(quizMap[p.quiz]), quiz: quizMap[p.quiz] }
    : p.flash ? { label: 'Cards', run: () => onFlashcard({ chapter: info.chapter, category: p.flash, direction: 'jp-en' }) } : null)

  // Shadowing: dialogues × stages
  const dialogues = isShadow ? [...new Set(points.map((p) => p.dialogue).filter(Boolean))] : []
  const curDialogue = cp?.dialogue ?? dialogues[0]
  const stages = points.map((p, i) => ({ ...p, index: i })).filter((p) => p.dialogue && p.dialogue === curDialogue)

  const sheetPoint = sheet ? points[sheet.index] : null
  const sheetPractice = sheetPoint ? practiseFor(sheetPoint) : null
  const nextPoint = sheet ? points[sheet.index + 1] : null
  const todayXp = xpOnDate(history, todayStr())

  return (
    <div className={`player-page tone-${meta.tone}`}>
      <div className="player-layout">
        <div className="player-main">
          <div className="player-head">
          <header className="player-top">
            <button type="button" className="icon-btn" onClick={onBack} aria-label="Back to lesson"><Icon name="back" size={22} /></button>
            <div className="player-top-text">
              <small>LESSON {lesson} · <span className="jp">{meta.kanji}</span></small>
              <b>{meta.label}</b>
            </div>
            <RomajiToggle />
          </header>

          <div ref={stageRef} className="player-stage">
            {src === null ? (
              <NoSource video={video} lesson={lesson} mascot={meta.art === 'poster' ? 'nori' : meta.art} status={status} folderName={folderName} />
            ) : (
              <>
                <video
                  ref={vRef}
                  src={src || undefined}
                  poster={poster || undefined}
                  playsInline
                  preload="metadata"
                  onClick={toggle}
                  onLoadedMetadata={onLoaded}
                  onTimeUpdate={onTime}
                  onPlay={() => setPlaying(true)}
                  onPause={() => { setPlaying(false); flush() }}
                  onEnded={onEnded}
                />
                {cp && cp.kind !== 'intro' && <span className="player-chip jp">{counted.indexOf(cp) + 1}/{counted.length} · {cp.label}</span>}
                {!playing && src && (
                  <button type="button" className="player-bigplay" onClick={toggle} aria-label="Play"><Icon name="play" size={30} /></button>
                )}
                <button type="button" className="player-fs" onClick={fullscreen} aria-label="Full screen"><Icon name="expand" size={18} /></button>
              </>
            )}
          </div>
          </div>

          {/* Whole video, one segment per point */}
          {points.length > 1 && (
            <div className="player-strip" role="group" aria-label="Parts of this video">
              {points.map((p, i) => {
                const w = ((p.end - p.start) / (total || 1)) * 100
                const isCur = i === ci
                const fill = isCur ? Math.min(100, ((time - p.start) / (p.end - p.start)) * 100) : 0
                return (
                  <button
                    key={i}
                    type="button"
                    className={`strip-seg${done?.[i] ? ' done' : ''}${isCur ? ' current' : ''}`}
                    style={{ width: `${w}%`, '--fill': `${fill}%` }}
                    onClick={() => playPoint(i)}
                    aria-label={`${p.label}, ${fmtTime(p.start)}`}
                    title={`${p.label} · ${fmtTime(p.start)}`}
                  />
                )
              })}
            </div>
          )}

          {/* Zoomed scrubber: just this point */}
          <div className="player-scrub">
            <span>{fmtTime(time - range.start)}</span>
            <input
              type="range"
              min={range.start}
              max={range.end || 1}
              step="0.1"
              value={Math.min(Math.max(time, range.start), range.end || 1)}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Position in this part"
              disabled={!src}
              style={{ '--pct': `${((time - range.start) / ((range.end - range.start) || 1)) * 100}%` }}
            />
            <span>{fmtTime(range.end - range.start)}</span>
          </div>
          <p className="player-scrub-note">{cp && points.length > 1 ? 'This part · ' : ''}{fmtTime(time)} of {fmtTime(total)} in the full video</p>

          <div className="player-controls">
            <button type="button" className="ctl" onClick={() => seek(time - 10)} aria-label="Back 10 seconds" disabled={!src}>−10</button>
            <button type="button" className="ctl" onClick={() => playPoint(Math.max(0, ci - 1))} aria-label="Previous part" disabled={!src}><Icon name="prevPoint" size={20} /></button>
            <button type="button" className="ctl-main" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'} disabled={!src}><Icon name={playing ? 'pause' : 'play'} size={28} /></button>
            <button type="button" className="ctl" onClick={() => playPoint(Math.min(points.length - 1, ci + 1))} aria-label="Next part" disabled={!src}><Icon name="nextPoint" size={20} /></button>
            <button type="button" className="ctl" onClick={() => seek(time + 10)} aria-label="Forward 10 seconds" disabled={!src}>+10</button>
          </div>
          <div className="player-pills">
            <button type="button" className="pill-btn" onClick={cycleRate} aria-label={`Speed ${rate}×`}>{rate}×</button>
            <button type="button" className={`pill-btn${loop ? ' on' : ''}`} aria-pressed={loop} onClick={() => setLoop((x) => !x)}><Icon name="loop" size={16} />{isShadow ? 'Repeat stage' : 'Loop part'}</button>
            {hasPractice && (
              <button type="button" className={`pill-btn${pauseAtEnd ? ' on' : ''}`} aria-pressed={pauseAtEnd} onClick={() => setPauseAtEnd((x) => !x)}>Pause after each part</button>
            )}
          </div>
          <p className="player-keys">Keys: space play · ← → 10 s · P / N previous / next part · F full screen</p>
        </div>

        <aside className="player-side">
          <AnimatePresence>
            {flash && (
              <motion.div key={flash.id} className="xp-flash" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Icon name="bolt" size={18} />+{flash.xp} XP · <span className="jp">{flash.label}</span> watched
              </motion.div>
            )}
          </AnimatePresence>

          {isShadow ? (
            <div className="shadow-panel">
              <h2 className="side-h">DIALOGUES</h2>
              <div className="shadow-dialogues">
                {dialogues.map((d) => {
                  const ds = points.map((p, i) => ({ ...p, index: i })).filter((p) => p.dialogue === d)
                  const all = ds.every((p) => done?.[p.index])
                  return (
                    <button key={d} type="button" className={`chip-btn tone-listen${d === curDialogue ? ' active' : ''}${all ? ' done' : ''}`} onClick={() => playPoint(ds[0].index)}>
                      {all && <Icon name="check" size={14} />}{d.replace(/Dialogue\s*/i, '')}
                    </button>
                  )
                })}
              </div>

              <ol className="shadow-stages">
                {stages.map((p) => {
                  const state = done?.[p.index] ? 'done' : p.index === ci ? 'current' : ''
                  return (
                    <li key={p.index}>
                      <button type="button" className={`stage ${state}`} onClick={() => playPoint(p.index)} aria-label={`Stage ${p.stage}: ${p.label}`}>
                        <span className="stage-dot">{state === 'done' ? <Icon name="check" size={14} /> : p.stage}</span>
                        <span className="stage-label">{stageShort(p.label)}</span>
                        {stageSpeed(p.label) && <span className="stage-speed">{stageSpeed(p.label)}</span>}
                      </button>
                    </li>
                  )
                })}
              </ol>

              {cp?.dialogue && (
                <div className="stage-card">
                  <span className="stage-card-kicker">STAGE {cp.stage} OF {stages.length} · {fmtTime(cp.end - cp.start)}</span>
                  <b>{cp.label}</b>
                  <p>{STAGE_HINT[stageShort(cp.label)] ?? ''}</p>
                  <div className="stage-card-actions">
                    <button type="button" className={`pill-btn${loop ? ' on' : ''}`} aria-pressed={loop} onClick={() => setLoop((x) => !x)}><Icon name="loop" size={16} />Repeat stage</button>
                    <button type="button" className="btn btn-sm stage-next" onClick={() => playPoint(Math.min(points.length - 1, ci + 1))}>Next stage<Icon name="next" size={16} /></button>
                  </div>
                </div>
              )}
              {!cp?.dialogue && <p className="side-note">Start with the intro, or pick a dialogue above.</p>}
            </div>
          ) : (
            <div className="points-panel">
              <h2 className="side-h">{type === 'vocab' ? 'WORD GROUPS' : 'GRAMMAR POINTS'}</h2>
              {points.length === 0 && <p className="side-note">No chapter list for this video yet.</p>}
              {points.map((p, i) => {
                const isCur = i === ci
                const isDone = Boolean(done?.[i])
                const pr = practiseFor(p)
                const n = counted.indexOf(p) + 1
                return (
                  <div key={i} className={`point-row${isCur ? ' current' : ''}${p.kind === 'intro' ? ' intro' : ''}`}>
                    <button type="button" className="point-main" onClick={() => playPoint(i)}>
                      <span className={`point-dot${isDone ? ' done' : ''}${isCur ? ' current' : ''}`}>
                        {isDone ? <Icon name="check" size={14} /> : isCur && playing ? <Icon name="play" size={12} /> : p.kind === 'intro' ? '·' : n}
                      </span>
                      <span className="point-text">
                        <Jp className="point-label">{p.label}</Jp>
                        <small>{fmtTime(p.start)} · {fmtTime(p.end - p.start)} long{p.sub && p.kind !== 'intro' ? ` · ${p.sub}` : ''}</small>
                        {isCur && <span className="point-progress"><i style={{ width: `${Math.min(100, ((time - p.start) / (p.end - p.start)) * 100)}%` }} /></span>}
                      </span>
                    </button>
                    {pr && (
                      <button type="button" className={`quiz-pill${pr.quiz?.bestScore != null && pr.quiz.bestScore / pr.quiz.questions.length >= 0.8 ? ' gold' : ''}`} onClick={pr.run}>
                        {pr.quiz?.bestScore != null ? `${pr.quiz.bestScore}/${pr.quiz.questions.length}` : pr.label}
                      </button>
                    )}
                  </div>
                )
              })}
              {hasPractice && (
                <div className="side-tip">
                  <Mascot who={meta.mascot} mood="think" size={48} />
                  <p>{type === 'vocab' ? 'Finish a word group and Nori opens its flashcards.' : 'Finish a point and Mentai quizzes you on exactly that point.'}</p>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>

      {createPortal(
        <AnimatePresence>
          {sheet && sheetPoint && (
            <motion.div key="cp" className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheet(null)}>
              <motion.div
                className="checkpoint-sheet"
                role="dialog"
                aria-label="Part watched"
                initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Mascot who={sheetPoint.quiz ? 'mentai' : 'nori'} mood="cheer" size={104} className="checkpoint-mascot" />
                <span className={`checkpoint-kicker tone-${meta.tone}`}>PART {counted.indexOf(sheetPoint) + 1} OF {counted.length} {done?.[sheet.index] ? 'WATCHED' : 'DONE'}</span>
                <Jp className="checkpoint-title">{sheetPoint.label}</Jp>
                {earned[sheet.index] ? (
                  <span className="xp-pill"><Icon name="bolt" size={18} />+{earned[sheet.index]} XP</span>
                ) : !done?.[sheet.index] ? (
                  <small className="checkpoint-note">Skipped ahead? Watch {Math.round(WATCHED_PCT * 100)}% of a part to earn its XP.</small>
                ) : null}
                <div className="checkpoint-goal">
                  <span><b>Daily goal</b><b>{Math.min(todayXp, dailyGoal)} / {dailyGoal} XP</b></span>
                  <span className="bar"><i style={{ width: `${Math.min(100, (todayXp / dailyGoal) * 100)}%` }} /></span>
                </div>
                {sheetPractice && <p className="checkpoint-text">{sheetPoint.quiz ? 'Lock it in while it’s fresh: a quiz on exactly this point.' : 'Lock these words in with flashcards.'}</p>}
                {sheetPractice && <button type="button" className="btn btn-lg btn-accent" onClick={() => { setSheet(null); flush(); sheetPractice.run() }}>{sheetPoint.quiz ? 'Practise it now' : 'Open flashcards'}</button>}
                {nextPoint ? (
                  <button type="button" className="btn btn-lg btn-ghost" onClick={() => { setSheet(null); vRef.current?.play().catch(() => {}) }}>Keep watching · <span className="jp">{nextPoint.label}</span></button>
                ) : (
                  <button type="button" className="btn btn-lg btn-ghost" onClick={onBack}>Back to lesson</button>
                )}
                <button type="button" className="link-btn" onClick={() => playPoint(sheet.index)}>Rewatch this part</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}
