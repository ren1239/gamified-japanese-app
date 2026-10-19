import { useStatsStore, getStreakInfo, getDueEntries, xpOnDate } from '../store/statsStore'
import { todayStr } from '../utils/dates'
import { lessonVideos, lessonWatchTime, fmtDuration } from '../utils/lessons'
import LessonThumb from './LessonThumb'
import Icon from './Icon'
import Jp from './Jp'

// Desktop-only side columns of the Practice tab (hidden on phones by CSS).
//   PracticeIndex — every chapter of the current track with its progress; click to jump, the one in view is highlighted.
//   PracticePanel — what to do next: the recommended node, today's goal, reviews due, and this chapter's lesson videos.

function bookOf(n) {
  return n === 0 ? 'Basics' : n <= 12 ? 'Genki I' : 'Genki II'
}

export function PracticeIndex({ units, activeCh, isGrammar, isDone, onJump }) {
  const groups = []
  for (const u of units) {
    const book = bookOf(u.chapter.number)
    if (groups.at(-1)?.book !== book) groups.push({ book, units: [] })
    groups.at(-1).units.push(u)
  }
  return (
    <nav className={`practice-index${isGrammar ? ' accent' : ''}`} aria-label="Chapters">
      {groups.map((g) => (
        <div key={g.book} className="practice-index-group">
          <h2 className="side-h">{g.book.toUpperCase()}</h2>
          {g.units.map((u) => {
            const n = u.chapter.number
            const done = u.nodes.filter(isDone).length
            const all = done === u.nodes.length
            return (
              <button key={n} type="button" className={`practice-index-row${activeCh === n ? ' active' : ''}${all ? ' complete' : ''}`} onClick={() => onJump(n)} aria-current={activeCh === n ? 'true' : undefined}>
                <span className="practice-index-num">{all ? <Icon name="crown" size={16} /> : n === 0 ? '★' : n}</span>
                <span className="practice-index-text">
                  <Jp className="practice-index-title">{u.chapter.subtitle.replace(/^★\s*/, '')}</Jp>
                  <span className="practice-index-bar"><i style={{ width: `${(done / u.nodes.length) * 100}%` }} /></span>
                </span>
                <small>{done}/{u.nodes.length}</small>
              </button>
            )
          })}
        </div>
      ))}
    </nav>
  )
}

export function PracticePanel({ upNext, upNextTitle, activeCh, isGrammar, onGoUpNext, onNavigate, onOpenLesson }) {
  const stats = useStatsStore()
  const { history, dailyGoal, wrongBank, streakFreezes, videoProgress } = stats
  const streak = getStreakInfo(stats)
  const todayXp = xpOnDate(history, todayStr())
  const goalPct = Math.min(100, Math.round((todayXp / dailyGoal) * 100))
  const due = getDueEntries(wrongBank).length
  const hasVideos = activeCh > 0 && lessonVideos(activeCh).some((v) => v.youtube)
  const watch = hasVideos ? lessonWatchTime(activeCh, videoProgress) : null

  return (
    <aside className="practice-panel" aria-label="Your practice">
      {upNext && (
        <section className={`practice-card upnext${isGrammar ? ' accent' : ''}`}>
          <span className="practice-card-kicker">UP NEXT</span>
          <Jp className="practice-upnext-title">{upNextTitle}</Jp>
          <button type="button" className={`btn btn-lg ${isGrammar ? 'btn-accent' : 'btn-primary'}`} onClick={onGoUpNext}>Practise</button>
        </section>
      )}

      <section className="practice-card today">
        <div className="goal-ring" style={{ '--p': `${goalPct * 3.6}deg`, '--c': goalPct >= 100 ? 'var(--success)' : 'var(--accent)' }}>
          <span>{goalPct >= 100 ? <Icon name="check" size={22} color="var(--success)" /> : `${goalPct}%`}</span>
        </div>
        <div className="practice-today-text">
          <b>Today · {todayXp} / {dailyGoal} XP</b>
          <span className="practice-today-streak"><Icon name="flame" size={18} color="var(--accent)" />{streak.current}-day streak</span>
          <small>{[0, 1].map((i) => <Icon key={i} name="snow" size={12} color="var(--freeze)" style={{ opacity: i < (streakFreezes || 0) ? 1 : 0.25, display: 'inline-block' }} />)} {streakFreezes || 0}/2 freezes</small>
        </div>
      </section>

      <button type="button" className="practice-card reviews" onClick={() => onNavigate('custom')}>
        <span className="icon-chip error"><Icon name="dumbbell" size={22} /></span>
        <span className="practice-card-text">
          <b>{due ? `${due} review${due === 1 ? '' : 's'} due` : 'No reviews due'}</b>
          <small>{due ? 'Clear them first: they fade fastest.' : 'Mistakes come back here to stick.'}</small>
        </span>
        <Icon name="next" size={18} color="var(--text-muted)" />
      </button>

      {hasVideos && (
        <button type="button" className="practice-card lesson" onClick={() => onOpenLesson(activeCh)}>
          <LessonThumb lesson={activeCh} mascot="stream" className="practice-lesson-thumb" />
          <span className="practice-card-text">
            <span className="practice-card-kicker">LESSON {activeCh} VIDEOS</span>
            <b>Watch the lesson</b>
            <small>{watch?.watched > 30 ? `${fmtDuration(watch.watched)} of ${fmtDuration(watch.total)} watched` : `${fmtDuration(watch?.total) || 'Videos'} · explained, practised, shadowed`}</small>
          </span>
        </button>
      )}
    </aside>
  )
}
