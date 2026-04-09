import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useQuizStore, useGameStore } from '../store/quizStore'

const LABELS = ['A', 'B', 'C', 'D']

export default function ReviewScreen({ quizId, onBack }) {
  const getQuiz = useQuizStore((s) => s.getQuiz)
  const activeQuiz = useGameStore((s) => s.activeQuiz)
  const answers = useGameStore((s) => s.answers)
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
          {quiz.questions.map((q, qi) => {
            const answerDetail = answers.find(a => a.questionIdx === qi) || null
            return <ReviewQuestion key={q.id || qi} q={q} qi={qi} answer={answerDetail} />
          })}
        </div>
      </motion.div>
    </div>
  )
}

function ReviewQuestion({ q, qi, answer }) {
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
        {q.choices.map((c, ci) => {
          const isCorrectAnswer = ci === q.correct;
          const isChosenByUser = answer && answer.chosen === ci;
          const isWrongChoice = isChosenByUser && !isCorrectAnswer;

          let borderColor = 'var(--border)';
          let bgColor = 'transparent';
          let textColor = 'var(--muted)';
          let icon = LABELS[ci];

          if (isCorrectAnswer) {
            borderColor = 'var(--success)';
            bgColor = 'var(--success-dim)';
            textColor = 'var(--success)';
            icon = <Check size={18} strokeWidth={3} />;
          } else if (isWrongChoice) {
            borderColor = 'var(--error)';
            bgColor = 'var(--error-dim)';
            textColor = 'var(--error)';
            icon = <X size={18} strokeWidth={3} />;
          }

          return (
            <div
              key={ci}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 14px',
                borderRadius: 8,
                border: `1px solid ${borderColor}`,
                background: bgColor,
                fontSize: 14,
                color: textColor,
              }}
            >
              <span style={{ fontWeight: 700, minWidth: 20, display: 'flex', alignItems: 'center' }}>
                {icon}
              </span>
              <span style={{
                fontFamily: q.jp ? "'Noto Sans JP', sans-serif" : 'inherit',
                fontWeight: q.jp ? 700 : 400,
              }}>
                {c}
              </span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
