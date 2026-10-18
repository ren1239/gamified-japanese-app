import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/quizStore'
import { useStatsStore, xpOnDate } from '../store/statsStore'
import { playPerfectChime, playVictoryChime } from '../utils/audio'
import { addDays, todayStr } from '../utils/dates'
import Icon from '../components/Icon'
import Mascot from '../components/Mascot'
import { mascotForQuiz } from '../utils/mascot'

const DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function headline(pct) {
  if (pct === 100) return { jp: '完璧！', en: 'Perfect lesson!' }
  if (pct >= 80) return { jp: 'すごい！', en: 'Quiz complete!' }
  if (pct >= 60) return { jp: 'よくできました', en: 'Quiz complete!' }
  return { jp: 'がんばろう！', en: 'Quiz done. Keep at it!' }
}

function StreakView({ onDone }) {
  const { history, dailyGoal, streak, streakFreezes } = useStatsStore()
  const today = todayStr()
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(today, i - 6)
    const met = xpOnDate(history, date) >= dailyGoal
    const inStreak = i >= 7 - streak
    const [y, m, d] = date.split('-').map(Number)
    return { date, met, frozen: !met && inStreak, dow: DOW[new Date(y, m - 1, d).getDay()], isToday: i === 6 }
  })
  const frozenCount = days.filter((d) => d.frozen).length
  return (
    <div className="celebrate">
      <div className="celebrate-main">
        <motion.div initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}>
          <Icon name="flame" size={120} color="var(--accent)" />
        </motion.div>
        <div>
          <div className="streak-number">{streak}</div>
          <div className="streak-label">day streak</div>
        </div>
        <div className="week-dots">
          <div className="week-row">
            {days.map((d) => (
              <div key={d.date} className={d.isToday ? 'today-col' : ''}>
                {d.dow}
                <div className={`week-dot ${d.met ? 'on' : d.frozen ? 'frz' : ''}`} title={d.frozen ? 'Covered by a streak freeze' : undefined}>
                  {d.met
                    ? <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="m6 12.5 4 4L18 8" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    : d.frozen ? <Icon name="snow" size={16} /> : null}
                </div>
              </div>
            ))}
          </div>
          <p>
            {frozenCount > 0 ? `${frozenCount} day${frozenCount > 1 ? 's' : ''} covered by a streak freeze. ` : 'Daily goal met. '}
            {streakFreezes > 0 ? `${streakFreezes} freeze${streakFreezes > 1 ? 's' : ''} saved.` : 'Earn a freeze every 7 days.'}
          </p>
        </div>
        <div className="mascot-pair">
          <Mascot who="nori" mood="cheer" size={70} className="mascot-bounce" />
          <Mascot who="mentai" mood="cheer" size={62} className="mascot-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
      <div className="celebrate-actions">
        <button type="button" className="btn btn-lg btn-accent" onClick={onDone}>Keep going</button>
      </div>
    </div>
  )
}

export default function ScoreScreen({ result, onReview, onPlayAgain, onContinue, perfectBurst, burst }) {
  const { score, questions, maxCombo, activeQuiz } = useGameStore()
  const soundEnabled = useStatsStore((s) => s.soundEnabled)
  const [view, setView] = useState('complete')
  const total = questions.length
  const pct = total ? Math.round((score / total) * 100) : 0
  const head = headline(pct)
  const who = pct >= 60 ? mascotForQuiz(activeQuiz, questions[0]) : 'mentai'

  useEffect(() => {
    if (soundEnabled) {
      if (pct === 100) playPerfectChime()
      else if (pct >= 60) playVictoryChime()
    }
    if (pct === 100) setTimeout(perfectBurst, 300)
    else if (pct >= 60) setTimeout(() => burst(window.innerWidth / 2, window.innerHeight * 0.3, 'correct', 60), 300)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (view === 'streak') return <StreakView onDone={onContinue} />

  const learned = result?.learnedWords ?? []
  const finish = () => (result?.goalJustMet ? setView('streak') : onContinue())

  return (
    <div className="celebrate">
      <div className="celebrate-main">
        <Mascot who={who} mood={pct >= 60 ? 'cheer' : 'think'} size={130} className={pct >= 60 ? 'mascot-bounce' : ''} />
        <div>
          <div className="celebrate-title" style={{ color: pct >= 60 ? 'var(--gold-deep)' : 'var(--text)' }}>{head.en}</div>
          <div className="celebrate-sub jp">{head.jp}</div>
        </div>
        <div className="stat-trio">
          <motion.div className="stat-tile" style={{ '--k': 'var(--gold)' }} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <small>Total XP</small><span><Icon name="bolt" size={20} />{result?.xp ?? 0}</span>
          </motion.div>
          <motion.div className="stat-tile" style={{ '--k': 'var(--success)' }} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <small>Accuracy</small><span><Icon name="target" size={20} />{pct}%</span>
          </motion.div>
          <motion.div className="stat-tile" style={{ '--k': 'var(--accent)' }} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <small>Best combo</small><span><Icon name="flame" size={20} />{maxCombo}</span>
          </motion.div>
        </div>
        {(learned.length > 0 || (result?.newMistakes ?? 0) > 0) && (
          <div className="celebrate-note">
            {learned.length > 0 && <span><b>{learned.length} word{learned.length > 1 ? 's' : ''} learned</b> · <span className="jp">{learned.slice(0, 6).join('、')}{learned.length > 6 ? '…' : ''}</span></span>}
            {(result?.newMistakes ?? 0) > 0 && <span>{result.newMistakes} mistake{result.newMistakes > 1 ? 's' : ''} added to your reviews</span>}
          </div>
        )}
      </div>
      <div className="celebrate-actions">
        <button type="button" className="btn btn-lg btn-primary" onClick={finish}>Continue</button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <button type="button" className="btn btn-ghost" onClick={onReview}>Review answers</button>
          <button type="button" className="btn btn-ghost" onClick={onPlayAgain}>Play again</button>
        </div>
      </div>
    </div>
  )
}
