import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useStatsStore, getDueEntries, isDue, SRS_INTERVALS } from '../store/statsStore'
import { daysBetween, todayStr } from '../utils/dates'
import { buildPracticeQuiz } from '../utils/practiceQuiz'
import Icon from '../components/Icon'
import Mascot from '../components/Mascot'
import Jp from '../components/Jp'

const BOX_LABELS = ['New', '1 day', '3 days', '7 days', '14 days']
const HAS_JP = /[぀-ヿ一-鿿]/
const BATCH = 20

// Review tab: the app builds reviews from what you got wrong (and what you flagged).
// Each item climbs boxes 1→5 (back after 1, 3, 7, 14 days); a miss sends it back to box 1.
export default function HomeScreen({ onStart }) {
  const wrongBank = useStatsStore((s) => s.wrongBank)

  const due = getDueEntries(wrongBank)
  const boxCounts = [1, 2, 3, 4, 5].map((box) => wrongBank.filter((e) => (e.box ?? 1) === box).length)
  const nextDue = wrongBank.filter((e) => !isDue(e)).map((e) => e.due).sort()[0]
  const daysUntilNext = nextDue ? daysBetween(todayStr(), nextDue) : null
  const flaggedCount = wrongBank.filter((e) => e.flagged).length

  const toughest = useMemo(
    () => [...wrongBank]
      .filter((e) => (e.wrongCount ?? 0) > 0 || e.flagged)
      .sort((a, b) => (b.wrongCount ?? 0) - (a.wrongCount ?? 0) || (a.box ?? 1) - (b.box ?? 1))
      .slice(0, 5),
    [wrongBank]
  )

  const startDue = () => {
    const batch = [...due].sort((a, b) => (a.box ?? 1) - (b.box ?? 1) || (b.wrongCount ?? 0) - (a.wrongCount ?? 0)).slice(0, BATCH)
    onStart(buildPracticeQuiz(batch, 'Daily Review'), false)
  }
  // Extra practice doesn't move items that aren't due yet; misses still reset them.
  const startExtra = () => {
    const pool = [...wrongBank].sort((a, b) => (b.wrongCount ?? 0) - (a.wrongCount ?? 0)).slice(0, 10)
    onStart(buildPracticeQuiz(pool, 'Extra Practice'), true)
  }

  const empty = wrongBank.length === 0
  const n = Math.min(BATCH, due.length)

  return (
    <div className="page review-page">
      <header>
        <h1 className="tab-title">Review</h1>
        <p className="tab-sub">Built from your mistakes. Come back daily and they stick.</p>
      </header>

      {/* ── Due today ── */}
      <motion.section className={`review-hero ${due.length ? '' : 'clear'}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="review-hero-top">
          <Mascot who={due.length ? 'mentai' : 'nori'} mood={due.length ? 'happy' : empty ? 'sleep' : 'cheer'} size={72} className="mascot-idle" />
          <div style={{ minWidth: 0 }}>
            <div className="review-hero-title">
              {due.length ? `${due.length} review${due.length > 1 ? 's' : ''} due` : empty ? 'Nothing to review yet' : 'All caught up'}
            </div>
            <div className="review-hero-sub">
              {due.length
                ? (due.length > BATCH ? `Clear them ${BATCH} at a time.` : 'Get each one right to push it further out.')
                : empty
                  ? 'Anything you miss in a quiz or flashcards, or flag, shows up here.'
                  : daysUntilNext === 1 ? 'Next reviews come back tomorrow.' : `Next reviews come back in ${daysUntilNext} days.`}
            </div>
          </div>
        </div>
        {!empty && (
          <div className="srs-ladder" aria-label="Items per review box">
            {BOX_LABELS.map((label, i) => (
              <div key={label} className={`srs-box b${i + 1}`}>
                <b>{boxCounts[i]}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
        )}
        {due.length > 0 && (
          <button type="button" className="btn btn-lg btn-accent" onClick={startDue}>Start {n} review{n > 1 ? 's' : ''}</button>
        )}
      </motion.section>

      {/* ── Extra practice ── */}
      {!empty && (
        <section className="stats-card review-row">
          <span className="icon-chip"><Icon name="dumbbell" size={22} /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <b>Extra practice</b>
            <small>Your {Math.min(10, wrongBank.length)} most-missed items, any time.{flaggedCount ? ` Includes ${flaggedCount} flagged.` : ''}</small>
          </div>
          <button type="button" className="btn btn-sm btn-primary" onClick={startExtra}>Go</button>
        </section>
      )}

      {/* ── Toughest items ── */}
      {toughest.length > 0 && (
        <>
          <h2 className="stats-h">Most missed</h2>
          <section className="stats-card tough-list">
            {toughest.map((e) => {
              const q = e.question
              const answer = q.choices?.[q.correct] ?? ''
              const prompt = q.jp ?? q.question
              return (
                <div key={e.key} className="tough-row">
                  <div style={{ minWidth: 0, flex: 1 }}>
                    {HAS_JP.test(prompt) ? <Jp className="tough-prompt">{prompt}</Jp> : <div className="tough-prompt">{prompt}</div>}
                    <div className="tough-answer">→ {HAS_JP.test(answer) ? <span className="jp">{answer}</span> : answer}</div>
                  </div>
                  <span className="tough-count" title={e.wrongCount ? `Missed ${e.wrongCount} times` : 'Flagged'}>
                    {e.flagged && <Icon name="flag" size={14} color="var(--error)" />}
                    {e.wrongCount > 0 && <>×{e.wrongCount}</>}
                  </span>
                </div>
              )
            })}
          </section>
        </>
      )}

      {/* ── How it works ── */}
      <h2 className="stats-h">How reviews work</h2>
      <section className="stats-card how-it-works">
        <ol>
          <li><b>Miss it or flag it</b> in any quiz or flashcard and it joins your reviews, due today.</li>
          <li><b>Get it right</b> and it comes back later: after {SRS_INTERVALS[2]} day, then {SRS_INTERVALS[3]}, {SRS_INTERVALS[4]} and {SRS_INTERVALS[5]} days.</li>
          <li><b>Five right in a row</b> on schedule and it graduates, about 25 days at the soonest.</li>
          <li><b>Miss it again</b> and it starts over today.</li>
        </ol>
      </section>
    </div>
  )
}
