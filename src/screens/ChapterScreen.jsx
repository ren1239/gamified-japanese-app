import { motion } from 'framer-motion'
import { useQuizStore } from '../store/quizStore'

export default function ChapterScreen({ chapter, onStart, onBack }) {
  const getQuiz = useQuizStore((s) => s.getQuiz)

  return (
    <div className="page">
      {/* Back button */}
      <motion.button
        className="btn-ghost"
        onClick={onBack}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 14, fontWeight: 700, color: 'var(--primary)',
          marginBottom: 24, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
        }}
      >
        ← Back
      </motion.button>

      {/* Chapter header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: 32 }}
      >
        <div style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
          color: '#fff',
          fontWeight: 800, fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase',
          padding: '4px 14px', borderRadius: 999, marginBottom: 12,
        }}>
          Chapter {chapter.number}
        </div>
        <div style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: 'clamp(26px, 6vw, 38px)',
          fontWeight: 900,
          color: 'var(--text)',
          lineHeight: 1.2,
          marginBottom: 6,
        }}>
          {chapter.title}
        </div>
        <div style={{ fontSize: 15, color: 'var(--text-2)', fontWeight: 600 }}>
          {chapter.subtitle}
        </div>
      </motion.div>

      {/* Category cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {chapter.categories.map((cat, i) => {
          const quiz = cat.quizId ? getQuiz(cat.quizId) : null
          const played = quiz?.playCount > 0
          const bestScore = quiz?.bestScore
          const total = quiz?.questions?.length ?? 10
          const pct = bestScore !== null && bestScore !== undefined ? Math.round((bestScore / total) * 100) : null

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35, type: 'spring', stiffness: 300 }}
              className="glass-card"
              style={{ padding: '22px 24px', position: 'relative', overflow: 'hidden' }}
            >
              {/* Accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: cat.available
                  ? 'linear-gradient(90deg, var(--primary), var(--accent))'
                  : 'var(--border)',
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {/* Icon */}
                <div style={{
                  width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                  background: cat.available
                    ? 'linear-gradient(135deg, var(--primary), var(--primary-light))'
                    : 'var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                  boxShadow: cat.available ? 'var(--shadow-md)' : 'none',
                }}>
                  {cat.icon}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--text)', marginBottom: 3 }}>
                    {cat.label}
                  </div>
                  {cat.available ? (
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>
                      {played
                        ? `Best: ${bestScore}/${total} · ${quiz.playCount} play${quiz.playCount > 1 ? 's' : ''}`
                        : `${total} questions · Not played yet`}
                    </div>
                  ) : (
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>
                      Coming soon
                    </div>
                  )}
                </div>

                {/* Score badge or Coming soon */}
                {cat.available && pct !== null && (
                  <div style={{
                    flexShrink: 0, minWidth: 52, textAlign: 'center',
                    background: pct === 100 ? 'linear-gradient(135deg, #F59E0B, #F97316)'
                      : pct >= 70 ? 'var(--success-dim)'
                      : 'var(--primary-glow)',
                    borderRadius: 12, padding: '6px 12px',
                  }}>
                    <div style={{
                      fontWeight: 900, fontSize: 18,
                      color: pct === 100 ? '#fff'
                        : pct >= 70 ? 'var(--success)'
                        : 'var(--primary)',
                    }}>
                      {pct}%
                    </div>
                  </div>
                )}

                {!cat.available && (
                  <div style={{
                    flexShrink: 0,
                    background: 'rgba(156,163,175,0.15)',
                    borderRadius: 12, padding: '6px 14px',
                    fontSize: 12, fontWeight: 700, color: 'var(--text-muted)',
                  }}>
                    Soon
                  </div>
                )}
              </div>

              {/* Progress bar (if played) */}
              {pct !== null && (
                <div style={{ marginTop: 16 }}>
                  <div className="xp-bar-track" style={{ height: 6 }}>
                    <div
                      className="xp-bar-fill"
                      style={{ width: `${pct}%`, animationDuration: '1.2s' }}
                    />
                  </div>
                </div>
              )}

              {/* Buttons */}
              {cat.available && quiz && (
                <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                  <motion.button
                    className="btn-primary"
                    onClick={() => onStart(quiz, false)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ flex: 1, padding: '12px 0', fontSize: 15 }}
                  >
                    Play
                  </motion.button>
                  <motion.button
                    className="btn-accent"
                    onClick={() => onStart(quiz, true)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ flex: 1, padding: '12px 0', fontSize: 15 }}
                  >
                    Shuffle
                  </motion.button>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
