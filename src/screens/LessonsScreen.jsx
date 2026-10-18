import { useMemo, useState } from 'react'
import { useStatsStore, getStreakInfo, getDueEntries } from '../store/statsStore'
import { useVideoSource, hasVideo, canPickFolder, pickVideoFolder, reconnectVideoFolder } from '../utils/videoSource'
import { LESSON_NUMBERS, VIDEO_TYPES, lessonInfo, lessonStatus, lessonWatchTime, getVideo, pointAt, fmtTime, fmtDuration } from '../utils/lessons'
import VideoPoster from '../components/VideoPoster'
import Icon from '../components/Icon'
import Jp from '../components/Jp'

// 授業 Lessons tab: Continue card + every Genki lesson with its videos as coloured dots.

function ConnectBanner({ source, onNavigate }) {
  if (source.status === 'reconnect') {
    return (
      <div className="lessons-banner">
        <span className="icon-chip"><Icon name="folder" size={22} /></span>
        <span className="lessons-banner-text"><b>Reconnect your video folder</b><small>The browser needs one click to open “{source.folderName}” again.</small></span>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => reconnectVideoFolder().catch(() => {})}>Reconnect</button>
      </div>
    )
  }
  const pick = () => (canPickFolder ? pickVideoFolder().catch(() => {}) : onNavigate('settings'))
  return (
    <div className="lessons-banner">
      <span className="icon-chip"><Icon name="folder" size={22} /></span>
      <span className="lessons-banner-text"><b>Connect your video folder</b><small>Videos play from your computer. Point the app at the folder once.</small></span>
      <button type="button" className="btn btn-primary btn-sm" onClick={pick}>Choose</button>
    </div>
  )
}

// [16,17,18,20] → "16–18, 20"
function rangeLabel(nums) {
  const out = []
  for (let i = 0; i < nums.length; i++) {
    let j = i
    while (j + 1 < nums.length && nums[j + 1] === nums[j] + 1) j++
    out.push(j > i ? `${nums[i]}–${nums[j]}` : `${nums[i]}`)
    i = j
  }
  return out.join(', ')
}

export default function LessonsScreen({ onOpenLesson, onPlay, onNavigate }) {
  const stats = useStatsStore()
  const { videoProgress, lastVideo, totalXp, wrongBank } = stats
  const source = useVideoSource()
  const streak = getStreakInfo(stats).current
  const due = getDueEntries(wrongBank).length
  const [book, setBook] = useState(() => ((lastVideo?.lesson ?? 15) <= 12 ? 1 : 2))
  const lessons = LESSON_NUMBERS.filter((n) => (book === 1 ? n <= 12 : n > 12))

  const anyPlayable = useMemo(
    () => LESSON_NUMBERS.some((n) => hasVideo(getVideo(n, 'stream'), source.files)),
    [source.files],
  )
  // Lessons in this book whose videos aren't on this device: said once, not on every row
  const missing = lessons.filter((n) => !lessonStatus(n, videoProgress).videos.some((s) => hasVideo(s.video, source.files)))

  // Continue card: the last video you watched, at the point you stopped
  const cont = useMemo(() => {
    if (!lastVideo) return null
    const video = getVideo(lastVideo.lesson, lastVideo.type)
    if (!video?.points?.length) return null
    const pos = videoProgress[lastVideo.key]?.pos ?? 0
    const i = pointAt(video.points, pos)
    const p = video.points[i]
    const counted = video.points.filter((x) => x.kind !== 'intro')
    return {
      ...lastVideo, video, pos, point: p,
      nth: counted.indexOf(p) + 1, of: counted.length,
      left: Math.max(0, p.end - pos),
      pct: video.duration ? pos / video.duration : 0,
    }
  }, [lastVideo, videoProgress])

  return (
    <div className="lessons-screen">
      <header className="path-status lessons-status">
        <span className="path-stat streak" title="Day streak"><Icon name="flame" size={24} />{streak}</span>
        <span className="path-stat xp" title="Total XP"><Icon name="bolt" size={24} />{totalXp.toLocaleString()}</span>
        <button type="button" className="path-stat due" title="Reviews due" onClick={() => onNavigate('custom')}><Icon name="bell" size={24} />{due}</button>
      </header>

      <div className="lessons-head">
        <div>
          <h1 className="jp lessons-title">授業</h1>
          <p className="lessons-sub">Watch · practise · shadow</p>
        </div>
        <div className="seg" role="tablist" aria-label="Book">
          {[1, 2].map((b) => (
            <button key={b} type="button" role="tab" aria-selected={book === b} className={book === b ? 'on' : ''} onClick={() => setBook(b)}>
              Genki {b === 1 ? 'I' : 'II'}
            </button>
          ))}
        </div>
      </div>

      {!anyPlayable && <ConnectBanner source={source} onNavigate={onNavigate} />}

      {cont && (
        <button type="button" className="continue-card" onClick={() => onPlay({ lesson: cont.lesson, type: cont.type })}>
          <span className="continue-thumb">
            <VideoPoster video={cont.video} lesson={cont.lesson} />
            <span className="continue-time">{fmtTime(cont.pos)} / {fmtTime(cont.video.duration)}</span>
            <span className="continue-bar"><i style={{ width: `${Math.round(cont.pct * 100)}%` }} /></span>
          </span>
          <span className="continue-body">
            <span className="continue-text">
              <span className={`continue-kicker tone-${VIDEO_TYPES[cont.type].tone}`}>CONTINUE · {VIDEO_TYPES[cont.type].label.toUpperCase()}</span>
              <Jp className="continue-title">{cont.point.label}</Jp>
              <span className="continue-meta">
                {cont.point.kind === 'intro' ? 'Intro' : `Part ${cont.nth} of ${cont.of}`} · {Math.max(1, Math.round(cont.left / 60))} min left in this part
              </span>
            </span>
            <span className="continue-play" aria-hidden="true"><Icon name="play" size={26} /></span>
          </span>
        </button>
      )}

      <h2 className="lessons-h">{book === 1 ? 'GENKI I' : 'GENKI II'} · {lessons.length} LESSONS</h2>
      {anyPlayable && missing.length > 0 && (
        <p className="lessons-note">Not in your video folder yet: Lesson {rangeLabel(missing)}</p>
      )}
      <div className="lessons-grid">
        {lessons.map((n) => {
          const info = lessonInfo(n)
          const st = lessonStatus(n, videoProgress)
          const time = lessonWatchTime(n, videoProgress)
          const current = cont?.lesson === n
          const done = st.total > 0 && st.complete === st.total
          const meta = done ? 'All videos watched'
            : time.watched > 30 ? `${fmtDuration(time.watched)} of ${fmtDuration(time.total)}`
              : time.total ? `${st.total} videos · ${fmtDuration(time.total)}` : `${st.total} videos`
          return (
            <button key={n} type="button" className={`lesson-row${current ? ' current' : ''}${done ? ' complete' : ''}${missing.includes(n) ? ' away' : ''}`} onClick={() => onOpenLesson(n)}>
              <span className="lesson-badge">{done ? <Icon name="crown" size={22} /> : n}</span>
              <span className="lesson-row-body">
                <Jp className="lesson-row-title">{info.subtitle}</Jp>
                <span className="lesson-dots" aria-label={`${st.complete} of ${st.total} videos watched`}>
                  {st.videos.map((s) => (
                    <i key={s.video.type} className={`tone-${VIDEO_TYPES[s.video.type].tone}${s.complete ? ' done' : s.started ? ' started' : ''}`} />
                  ))}
                  <small>{meta}</small>
                </span>
              </span>
              <Icon name="next" size={18} color="var(--text-muted)" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
