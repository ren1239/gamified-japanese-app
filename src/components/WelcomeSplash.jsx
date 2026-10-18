import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStatsStore, getStreakInfo, getDueEntries, xpOnDate } from '../store/statsStore'
import { todayStr } from '../utils/dates'
import { getVideo, pointAt } from '../utils/lessons'
import Mascot from './Mascot'

const AUTO_DISMISS_MS = 4500

function greeting(hour) {
  if (hour >= 5 && hour < 11) return { jp: 'おはよう', en: 'Good morning' }
  if (hour >= 11 && hour < 17) return { jp: 'こんにちは', en: 'Hello' }
  return { jp: 'こんばんは', en: 'Good evening' }
}

// Hand-drawn doodles around the mascot (drawn on with pathLength)
const DOODLES = [
  { d: 'M10 30c10-18 22 14 34-4s20 10 30-6', style: { top: '33%', left: '6%', width: 96 } },
  { d: 'M6 8c14 4 20 14 18 26', style: { top: '40%', right: '10%', width: 44 } },
  { d: 'M20 6c-12 2-16 18-4 22s20-12 6-18c-8-3-14 6-8 12', style: { top: '22%', right: '14%', width: 54 } },
  { d: 'M4 20c8-14 18-14 26 0s18 14 26 0', style: { top: '52%', left: '8%', width: 70 } },
]

// Welcome-back hero: greets you on launch, then swipes up into the app.
export default function WelcomeSplash({ onDone }) {
  const stats = useStatsStore()
  const { username, history, wrongBank, dailyGoal, lastVideo, videoProgress } = stats
  const returning = history.length > 0
  const due = getDueEntries(wrongBank).length
  const streak = getStreakInfo(stats)
  const todayXp = xpOnDate(history, todayStr())
  const who = due > 0 ? 'mentai' : 'nori'
  const g = greeting(new Date().getHours())
  const name = username?.trim()

  const line = !returning
    ? "Let's start your first lesson."
    : due > 0
      ? `${due} review${due > 1 ? 's' : ''} waiting${streak.current ? ` · ${streak.current}-day streak` : ''}`
      : streak.doneToday
        ? `Goal met today · ${streak.current}-day streak 🔥`
        : streak.current
          ? `${Math.max(0, dailyGoal - todayXp)} XP to keep your ${streak.current}-day streak`
          : `Earn ${dailyGoal} XP today to start a streak`

  // Lessons lead: name the lesson part you stopped in
  const lastPart = (() => {
    const v = lastVideo && getVideo(lastVideo.lesson, lastVideo.type)
    if (!v?.points?.length) return null
    const p = v.points[pointAt(v.points, videoProgress[lastVideo.key]?.pos ?? 0)]
    return `Lesson ${lastVideo.lesson} · ${p.kind === 'intro' ? v.points.find((x) => x.kind !== 'intro')?.label ?? 'Intro' : p.label}`
  })()

  useEffect(() => {
    const t = setTimeout(onDone, AUTO_DISMISS_MS)
    const onKey = (e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') onDone() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onDone])

  return (
    <motion.div
      className={`welcome ${who}`}
      role="dialog"
      aria-label="Welcome back"
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.6, bottom: 0.05 }}
      onDragEnd={(_, info) => { if (info.offset.y < -70 || info.velocity.y < -500) onDone() }}
      onClick={onDone}
    >
      <div className="welcome-copy">
        <motion.div className="welcome-jp jp" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          {returning ? 'おかえり！' : 'はじめまして！'}
        </motion.div>
        <motion.h1 className="welcome-title" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          {returning ? `${g.en}${name ? `, ${name}` : ''}!` : `Welcome${name ? `, ${name}` : ''}!`}
        </motion.h1>
        <motion.p className="welcome-sub" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <span className="jp">{g.jp}</span> · {line}
        </motion.p>
        {lastPart && (
          <motion.p className="welcome-next" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            Up next: <b className="jp">{lastPart}</b>
          </motion.p>
        )}
      </div>

      {DOODLES.map((doodle, i) => (
        <svg key={i} className="welcome-doodle" viewBox="0 0 80 40" style={doodle.style} aria-hidden="true">
          <motion.path d={doodle.d} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 + i * 0.12, duration: 0.6 }} />
        </svg>
      ))}

      <motion.div className="welcome-mascot" initial={{ y: '45%' }} animate={{ y: '0%' }} transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.1 }}>
        <div className="welcome-breathe">
          <Mascot who={who} mood="sparkle" size={560} />
        </div>
      </motion.div>

      <div className="welcome-actions">
        <button type="button" className="btn btn-lg btn-primary" onClick={(e) => { e.stopPropagation(); onDone() }}>
          {returning ? 'Continue' : "Let's go"}
        </button>
        <span className="welcome-hint">Swipe up to start</span>
      </div>
    </motion.div>
  )
}
