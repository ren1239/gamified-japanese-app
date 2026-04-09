import { motion } from 'framer-motion'
import { useQuizStore, useGameStore } from '../store/quizStore'

const LABELS = ['A', 'B', 'C', 'D']

export default function ReviewScreen({ quizId, onBack }) {
  const getQuiz = useQuizStore((s) => s.getQuiz)
  const activeQuiz = useGameStore((s) => s.activeQuiz)
  const quiz = activeQuiz || getQuiz(quizId)

  if (!quiz) return null

  return (
    <div style={{
      position: 'relative', zIndex: 1,
      width: '100%', maxWidth: 720, margin: '0 auto',
      padding: '48px 24px 80px',
    }}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ marginBottom: 24 }}>
          ← Back
        </button>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--pink)', marginBottom: 6 }}>
            {quiz.topic}
          </div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 36, letterSpacing: 1, color: 'var(--text)', marginBottom: 4,
          }}>
            {quiz.title}
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            {quiz.questions.length} questions · Tap a question to expand
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {quiz.questions.map((q, qi) => (
            <ReviewQuestion key={q.id || qi} q={q} qi={qi} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function ReviewQuestion({ q, qi }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: qi * 0.04 }}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: 20,
      }}
    >
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: q.jp ? 4 : 14, color: 'var(--text)' }}>
        <span style={{ color: 'var(--muted)', marginRight: 8 }}>{qi + 1}.</span>
        {q.question}
      </div>
      {q.jp && (
        <div style={{
          fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 900,
          fontSize: 28, color: 'var(--yellow)', marginBottom: 14,
        }}>
          {q.jp}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {q.choices.map((c, ci) => (
          <div
            key={ci}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 14px',
              borderRadius: 8,
              border: `1px solid ${ci === q.correct ? 'var(--green)' : 'var(--border)'}`,
              background: ci === q.correct ? 'var(--green-dim)' : 'transparent',
              fontSize: 14,
              color: ci === q.correct ? 'var(--green)' : 'var(--muted)',
            }}
          >
            <span style={{ fontWeight: 700, minWidth: 20 }}>
              {ci === q.correct ? '✓' : LABELS[ci]}
            </span>
            <span style={{
              fontFamily: q.jp ? "'Noto Sans JP', sans-serif" : 'inherit',
              fontWeight: q.jp ? 700 : 400,
            }}>
              {c}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
