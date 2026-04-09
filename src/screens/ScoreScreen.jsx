import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/quizStore'
import { useStatsStore } from '../store/statsStore'
import { playPerfectChime, playVictoryChime } from '../utils/audio'

function getResult(pct) {
  if (pct === 100) return { jp: '完璧！', en: 'PERFECT!', stars: '★★★★★', msg: "Flawless! You nailed every single one!" }
  if (pct >= 80) return { jp: '素晴らしい！', en: 'EXCELLENT!', stars: '★★★★☆', msg: "Outstanding! Almost flawless!" }
  if (pct >= 60) return { jp: 'よくできました！', en: 'GOOD JOB!', stars: '★★★☆☆', msg: "Solid effort! Keep it up!" }
  if (pct >= 40) return { jp: 'がんばれ！', en: 'KEEP GOING!', stars: '★★☆☆☆', msg: "You're learning! Review and retry." }
  return { jp: 'もう一回！', en: 'TRY AGAIN!', stars: '★☆☆☆☆', msg: "Don't give up! Study and come back." }
}

export default function ScoreScreen({ onReview, onPlayAgain, onDashboard, perfectBurst, burst }) {
  const { score, questions } = useGameStore()
  const soundEnabled = useStatsStore((s) => s.soundEnabled)
  const total = questions.length
  const pct = Math.round((score / total) * 100)
  const result = getResult(pct)

  useEffect(() => {
    if (soundEnabled) {
      if (pct === 100) playPerfectChime()
      else if (pct >= 60) playVictoryChime()
      // (<60 doesn't play a sound to keep it motivating)
    }

    if (pct === 100) {
      setTimeout(perfectBurst, 300)
    } else if (pct >= 60) {
      setTimeout(() => burst(window.innerWidth / 2, window.innerHeight * 0.35, 'correct', 60), 300)
    }
  }, []) // eslint-disable-line

  // Conic gradient ring
  const ringStyle = {
    background: `conic-gradient(var(--primary) ${pct}%, var(--bg-2) 0)`,
  }

  return (
    <div style={{
      position: 'relative', zIndex: 1,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100dvh', padding: '48px 24px',
      textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* JP phrase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(40px, 8vw, 72px)',
            color: 'var(--pink)',
            marginBottom: -4,
          }}
        >
          {result.jp}
        </motion.div>

        {/* EN title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(28px, 5vw, 48px)',
            letterSpacing: '2px',
            color: 'var(--text)',
            marginBottom: 36,
          }}
        >
          {result.en}
        </motion.div>

        {/* Score ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 180 }}
          style={{
            width: 180, height: 180, borderRadius: '50%',
            ...ringStyle,
            padding: 4, margin: '0 auto 24px',
          }}
        >
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            background: 'var(--surface)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 60, lineHeight: 1, color: 'var(--text)',
            }}>
              {score}
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>out of {total}</div>
          </div>
        </motion.div>

        {/* Stars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: 32, marginBottom: 8, letterSpacing: 4 }}
        >
          {result.stars}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 40 }}
        >
          {result.msg}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 320, margin: '0 auto' }}
        >
          <button className="btn btn-primary btn-lg" onClick={onPlayAgain}>Play Again ↺</button>
          <button className="btn btn-secondary btn-lg" onClick={onReview}>Review Answers</button>
          <button className="btn btn-ghost btn-lg" onClick={onDashboard}>Home</button>
        </motion.div>
      </motion.div>
    </div>
  )
}
