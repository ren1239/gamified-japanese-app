import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Flag, ArrowLeft } from 'lucide-react'
import { useQuizStore, useGameStore } from '../store/quizStore'
import { useStatsStore } from '../store/statsStore'

const LABELS = ['A', 'B', 'C', 'D']
const BADGE_COLORS = [
  { bg: '#F97316' }, // A — orange
  { bg: '#7C3AED' }, // B — purple
  { bg: '#3B82F6' }, // C — blue
  { bg: '#10B981' }, // D — teal
]

export default function ReviewScreen({ quizId, onBack }) {
  const getQuiz = useQuizStore((s) => s.getQuiz)
  const activeQuiz = useGameStore((s) => s.activeQuiz)
  const gameQuestions = useGameStore((s) => s.questions)
  const answers = useGameStore((s) => s.answers)
  const quiz = activeQuiz || getQuiz(quizId)

  // Use the shuffled question order from gameStore so questionIdx lines up correctly
  const questionsToShow = gameQuestions?.length > 0 ? gameQuestions : quiz?.questions ?? []

  const score = useMemo(() => {
    if (!questionsToShow.length || !answers.length) return null
    return answers.filter((a) => a.chosen === questionsToShow[a.questionIdx]?.correct).length
  }, [questionsToShow, answers])

  if (!quiz) return null

  const total = quiz.questions.length
  const hasAnswers = answers.length > 0
  const pct = hasAnswers && score !== null ? Math.round((score / total) * 100) : null

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100dvh', display: 'flex', flexDirection: 'column', maxWidth: 448, margin: '0 auto' }}>

      {/* ── Hero Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background: 'linear-gradient(160deg, var(--primary-dark) 0%, var(--primary) 60%, var(--primary-light) 100%)',
          borderRadius: '0 0 32px 32px',
          padding: '52px 20px 28px',
          marginBottom: 20,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,200,255,0.12)', filter: 'blur(30px)', pointerEvents: 'none' }} />

        {/* Back button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          style={{
            position: 'absolute', top: 52, left: 20, zIndex: 2,
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <ArrowLeft size={18} color="#fff" strokeWidth={2.5} />
        </motion.button>

        <div style={{ position: 'relative', zIndex: 1, paddingTop: 4 }}>
          {quiz.topic && (
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 999, padding: '3px 12px', marginBottom: 10, marginLeft: 50,
            }}>
              <span style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 11, color: 'rgba(255,255,255,0.9)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {quiz.topic}
              </span>
            </div>
          )}

          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(26px, 6.5vw, 36px)', color: '#fff', letterSpacing: '1px', lineHeight: 1.1, marginBottom: 18 }}>
            {quiz.title}
          </div>

          {hasAnswers && score !== null ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 700, marginBottom: 6 }}>
                <span>{score} / {total} correct</span>
                <span>{pct}%</span>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
                  style={{
                    height: '100%', borderRadius: 4,
                    background: pct === 100
                      ? 'linear-gradient(90deg, #10B981, #34D399)'
                      : 'linear-gradient(90deg, #F97316, #FCD34D)',
                  }}
                />
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              {total} question{total !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Question list ── */}
      <div style={{ flex: 1, padding: '0 16px 80px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {questionsToShow.map((q, qi) => {
          const answerDetail = answers.find((a) => a.questionIdx === qi) || null
          return (
            <ReviewQuestion
              key={q.id ?? qi}
              q={q} qi={qi}
              answer={answerDetail}
              quizId={quiz.id}
              quizTitle={quiz.title}
            />
          )
        })}
      </div>
    </div>
  )
}

function ReviewQuestion({ q, qi, answer, quizId, quizTitle }) {
  const flaggedBank = useStatsStore((s) => s.flaggedBank)
  const flagQuestion = useStatsStore((s) => s.flagQuestion)
  const unflagQuestion = useStatsStore((s) => s.unflagQuestion)

  const flagKey = q._bankKey ?? `${quizId}-${q.id ?? q.question.slice(0, 30)}`
  const isFlagged = flaggedBank.some((e) => e.key === flagKey)

  const toggleFlag = () => {
    if (isFlagged) unflagQuestion(flagKey)
    else flagQuestion(quizId, quizTitle ?? 'Quiz', q)
  }

  const gotItRight = answer && answer.chosen === q.correct
  const gotItWrong = answer && answer.chosen !== q.correct

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: qi * 0.045, duration: 0.25 }}
      className="glass-card"
      style={{
        padding: '18px 18px 16px',
        position: 'relative',
        overflow: 'hidden',
        borderColor: isFlagged
          ? 'rgba(239,68,68,0.45)'
          : gotItRight ? 'rgba(16,185,129,0.3)'
          : gotItWrong ? 'rgba(239,68,68,0.2)'
          : undefined,
        transition: 'border-color 0.2s',
      }}
    >
      {/* Status stripe */}
      {answer && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: gotItRight ? 'var(--success)' : 'var(--error)',
          opacity: 0.75,
        }} />
      )}

      {/* Header row: number badge + question text + flag */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: q.jp ? 8 : 14 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0, marginTop: 1,
          background: answer
            ? gotItRight ? 'var(--success-dim)' : 'var(--error-dim)'
            : 'var(--border-md)',
          color: answer
            ? gotItRight ? 'var(--success)' : 'var(--error)'
            : 'var(--text-muted)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Nunito'", fontWeight: 900, fontSize: 13,
        }}>
          {answer
            ? (gotItRight ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />)
            : qi + 1}
        </div>

        <div style={{ fontFamily: "'Nunito'", fontWeight: 700, fontSize: 14, color: 'var(--text)', lineHeight: 1.45, flex: 1, paddingRight: 4 }}>
          {q.question}
        </div>

        <motion.button
          whileTap={{ scale: 0.82 }}
          onClick={toggleFlag}
          style={{
            width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
            background: isFlagged ? 'rgba(239,68,68,0.12)' : 'var(--border)',
            border: isFlagged ? '1.5px solid rgba(239,68,68,0.4)' : '1.5px solid var(--border-md)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          <Flag size={13} color={isFlagged ? '#EF4444' : 'var(--text-muted)'} fill={isFlagged ? '#EF4444' : 'none'} strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Japanese prompt */}
      {q.jp && (
        <div style={{
          fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 900,
          fontSize: 'clamp(20px, 5vw, 26px)', color: 'var(--primary)',
          lineHeight: 1.3, marginBottom: 14, paddingLeft: 38,
        }}>
          {q.jp}
        </div>
      )}

      {/* Choices */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {q.choices.map((c, ci) => {
          const isCorrect = ci === q.correct
          const isChosen = answer && answer.chosen === ci
          const isWrong = isChosen && !isCorrect

          let cardBg = 'transparent'
          let cardBorder = 'var(--border)'
          let textColor = 'var(--text-muted)'
          let badgeBg = BADGE_COLORS[ci]?.bg ?? '#666'
          let badgeContent = LABELS[ci]

          if (isCorrect) {
            cardBg = 'var(--success-dim)'
            cardBorder = 'var(--success)'
            textColor = 'var(--success)'
            badgeBg = 'var(--success)'
            badgeContent = <Check size={13} strokeWidth={3} />
          } else if (isWrong) {
            cardBg = 'var(--error-dim)'
            cardBorder = 'var(--error)'
            textColor = 'var(--error)'
            badgeBg = 'var(--error)'
            badgeContent = <X size={13} strokeWidth={3} />
          }

          return (
            <div
              key={ci}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px',
                borderRadius: 14,
                border: `1.5px solid ${cardBorder}`,
                background: cardBg,
                transition: 'all 0.15s',
              }}
            >
              <div style={{
                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                background: badgeBg,
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Nunito'", fontWeight: 900, fontSize: 13,
                boxShadow: `0 2px 8px ${badgeBg}44`,
                transition: 'background 0.15s',
              }}>
                {badgeContent}
              </div>
              <span style={{
                fontFamily: c.match(/[\u3040-\u30FF\u4E00-\u9FAF]/) ? "'Noto Sans JP', sans-serif" : "'Nunito', sans-serif",
                fontWeight: isCorrect || isWrong ? 700 : 600,
                fontSize: 14,
                color: textColor,
                lineHeight: 1.35,
                flex: 1,
                transition: 'color 0.15s',
              }}>
                {c}
              </span>
              {isChosen && !isCorrect && (
                <span style={{ fontSize: 9, color: 'var(--error)', fontWeight: 900, letterSpacing: '0.8px', textTransform: 'uppercase', flexShrink: 0 }}>
                  your pick
                </span>
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
