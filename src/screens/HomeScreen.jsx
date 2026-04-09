import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuizStore } from '../store/quizStore'
import ImportModal from '../components/ImportModal'

export default function HomeScreen({ onStart, onReview }) {
  const quizzes = useQuizStore((s) => s.quizzes)
  const removeQuiz = useQuizStore((s) => s.removeQuiz)
  const [showImport, setShowImport] = useState(false)

  return (
    <>
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 960, margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(60px, 10vw, 110px)',
            lineHeight: 1,
            letterSpacing: '2px',
            color: 'var(--text)',
          }}>
            <span style={{ color: 'var(--pink)' }}>日本語</span>
            {' '}QUIZ
          </div>
          <div style={{
            fontSize: 12,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginTop: 10,
          }}>
            Genki Vocabulary · Interactive Study
          </div>
        </motion.div>

        {/* Quiz list or empty state */}
        {quizzes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '64px 0', color: 'var(--muted)' }}
          >
            <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 64, marginBottom: 16 }}>日</div>
            <p style={{ fontSize: 16, lineHeight: 1.7 }}>No quizzes yet.<br />Import one below to get started.</p>
          </motion.div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
            marginBottom: 32,
          }}>
            <AnimatePresence>
              {quizzes.map((quiz, i) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  index={i}
                  onPlay={(shuffle) => onStart(quiz, shuffle)}
                  onReview={() => onReview(quiz.id)}
                  onDelete={() => removeQuiz(quiz.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Import button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 12 }}
        >
          <button className="btn btn-secondary" onClick={() => setShowImport(true)}>
            + Import New Quiz
          </button>
        </motion.div>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
          Ask Claude: "Create 10 questions about [topic]" · Get JSON · Import below
        </div>
      </div>

      <AnimatePresence>
        {showImport && <ImportModal onClose={() => setShowImport(false)} />}
      </AnimatePresence>
    </>
  )
}

function QuizCard({ quiz, index, onPlay, onReview, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const hasBest = quiz.bestScore !== null && quiz.bestScore !== undefined
  const isNew = !quiz.playCount

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
      whileHover={{ borderColor: 'var(--border-bright)', y: -2 }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, var(--pink), var(--yellow))',
      }} />

      {/* Badge */}
      {isNew && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'var(--pink)', color: '#fff',
          fontSize: 10, fontWeight: 700, letterSpacing: '1.5px',
          padding: '3px 8px', borderRadius: 4,
        }}>NEW</div>
      )}
      {hasBest && !isNew && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'var(--yellow-dim)', color: 'var(--yellow)',
          border: '1px solid rgba(255,229,0,0.25)',
          fontSize: 11, fontWeight: 700,
          padding: '3px 10px', borderRadius: 4,
        }}>★ {quiz.bestScore}/{quiz.questions.length}</div>
      )}

      <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--pink)', marginBottom: 8 }}>
        {quiz.topic}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, paddingRight: hasBest || isNew ? 60 : 0 }}>
        {quiz.title}
      </div>
      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--muted)', marginBottom: 20 }}>
        <span>📝 {quiz.questions.length} questions</span>
        {quiz.playCount > 0 && <span>🎮 {quiz.playCount}×</span>}
        <span>📅 {quiz.created}</span>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button className="btn btn-primary btn-sm" onClick={() => onPlay(false)}>Play →</button>
        <button className="btn btn-secondary btn-sm" onClick={() => onPlay(true)}>Shuffle</button>
        <button className="btn btn-ghost btn-sm" onClick={onReview}>Review</button>
        {confirmDelete ? (
          <>
            <button className="btn btn-danger btn-sm" onClick={onDelete}>Confirm?</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDelete(false)}>Cancel</button>
          </>
        ) : (
          <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDelete(true)}>🗑</button>
        )}
      </div>
    </motion.div>
  )
}
