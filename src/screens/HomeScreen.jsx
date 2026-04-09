import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Shuffle, Trash2, Download, Plus, ChevronRight, AlertCircle } from 'lucide-react'
import { useStatsStore } from '../store/statsStore'
import { useQuizStore } from '../store/quizStore'
import ImportModal from '../components/ImportModal'

const COUNT_OPTIONS = [5, 10, 15, 20]

export default function HomeScreen({ onStart, onReview }) {
  const wrongBank = useStatsStore((s) => s.wrongBank)
  const clearWrongBank = useStatsStore((s) => s.clearWrongBank)
  const quizzes = useQuizStore((s) => s.quizzes)
  const removeQuiz = useQuizStore((s) => s.removeQuiz)

  const [count, setCount] = useState(10)
  const [mode, setMode] = useState('missed') // 'missed' | 'random'
  const [showImport, setShowImport] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)

  // Only user-imported quizzes (not builtins)
  const customQuizzes = useMemo(
    () => quizzes.filter((q) => q.id.startsWith('quiz_')),
    [quizzes]
  )

  const bankSize = wrongBank.length
  const actualCount = Math.min(count, bankSize)

  const handleGenerate = () => {
    if (bankSize === 0) return
    const sorted = mode === 'missed'
      ? [...wrongBank].sort((a, b) => b.wrongCount - a.wrongCount)
      : [...wrongBank].sort(() => Math.random() - 0.5)

    const selected = sorted.slice(0, actualCount)
    const practiceQuiz = {
      id: `practice_${Date.now()}`,
      title: 'Mistakes Practice',
      topic: 'Wrong Answers',
      created: new Date().toISOString().slice(0, 10),
      playCount: 0,
      bestScore: null,
      questions: selected.map((entry) => entry.question),
    }
    onStart(practiceQuiz, false)
  }

  // Breakdown by quiz source
  const breakdown = useMemo(() => {
    const map = {}
    wrongBank.forEach((e) => {
      if (!map[e.quizTitle]) map[e.quizTitle] = 0
      map[e.quizTitle]++
    })
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 4)
  }, [wrongBank])

  return (
    <>
      <div className="page" style={{ paddingTop: 24, paddingBottom: 100 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 28 }}
        >
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 8vw, 46px)', color: 'var(--text)', letterSpacing: '1px', lineHeight: 1 }}>
            PRACTICE
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, marginTop: 4 }}>
            Drill your weak spots, turn mistakes into mastery
          </div>
        </motion.div>

        {/* Wrong Answer Bank Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="glass-card"
          style={{ padding: '20px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}
        >
          {/* Ambient glow top bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: bankSize > 0
              ? 'linear-gradient(90deg, var(--primary), var(--accent))'
              : 'var(--border)',
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: bankSize > 0 ? 18 : 0 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, flexShrink: 0,
              background: bankSize > 0 ? 'var(--primary-glow)' : 'var(--border)',
              color: bankSize > 0 ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Target size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 16, color: 'var(--text)', marginBottom: 2 }}>
                Wrong Answers Bank
              </div>
              {bankSize === 0 ? (
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, lineHeight: 1.5 }}>
                  Complete quizzes to start banking<br />your wrong answers here.
                </div>
              ) : (
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: 15 }}>{bankSize}</span>
                  {' '}question{bankSize !== 1 ? 's' : ''} ready to practice
                </div>
              )}
            </div>
            {bankSize > 0 && (
              <button
                onClick={() => confirmClear ? (clearWrongBank(), setConfirmClear(false)) : setConfirmClear(true)}
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: confirmClear ? 'var(--error)' : 'var(--text-muted)',
                  fontSize: confirmClear ? 11 : 13,
                  fontFamily: "'Nunito'", fontWeight: 700,
                  padding: '4px 0',
                  transition: 'color 0.2s',
                }}
                onBlur={() => setTimeout(() => setConfirmClear(false), 200)}
              >
                {confirmClear ? 'Confirm clear?' : <Trash2 size={16} />}
              </button>
            )}
          </div>

          {bankSize > 0 && (
            <>
              {/* Breakdown pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                {breakdown.map(([title, cnt]) => (
                  <div key={title} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    background: 'var(--primary-glow)', borderRadius: 20,
                    padding: '3px 10px', fontSize: 11, fontWeight: 700,
                    color: 'var(--primary)',
                  }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{title.length > 22 ? title.slice(0, 22) + '…' : title}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 900 }}>{cnt}</span>
                  </div>
                ))}
              </div>

              {/* Count selector */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>
                  Questions per session
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {COUNT_OPTIONS.map((n) => {
                    const disabled = n > bankSize
                    const active = count === n && !disabled
                    return (
                      <button
                        key={n}
                        onClick={() => !disabled && setCount(n)}
                        style={{
                          flex: 1, padding: '8px 0',
                          borderRadius: 10,
                          border: active ? '1.5px solid var(--primary)' : '1.5px solid var(--border-md)',
                          background: active ? 'var(--primary-glow)' : 'transparent',
                          color: disabled ? 'var(--border-md)' : active ? 'var(--primary)' : 'var(--text-muted)',
                          fontFamily: "'Bebas Neue'", fontSize: 20,
                          cursor: disabled ? 'not-allowed' : 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >
                        {n}
                      </button>
                    )
                  })}
                  <button
                    onClick={() => setCount(bankSize)}
                    style={{
                      flex: 1.2, padding: '8px 0',
                      borderRadius: 10,
                      border: count === bankSize && !COUNT_OPTIONS.includes(bankSize) ? '1.5px solid var(--primary)' : '1.5px solid var(--border-md)',
                      background: count === bankSize && !COUNT_OPTIONS.includes(bankSize) ? 'var(--primary-glow)' : 'transparent',
                      color: count === bankSize && !COUNT_OPTIONS.includes(bankSize) ? 'var(--primary)' : 'var(--text-muted)',
                      fontFamily: "'Nunito'", fontWeight: 900, fontSize: 12,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    All
                  </button>
                </div>
              </div>

              {/* Mode selector */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>
                  Order
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { key: 'missed', label: 'Most Missed First' },
                    { key: 'random', label: 'Shuffle' },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setMode(key)}
                      style={{
                        flex: 1, padding: '9px 12px',
                        borderRadius: 10,
                        border: mode === key ? '1.5px solid var(--primary)' : '1.5px solid var(--border-md)',
                        background: mode === key ? 'var(--primary-glow)' : 'transparent',
                        color: mode === key ? 'var(--primary)' : 'var(--text-muted)',
                        fontFamily: "'Nunito'", fontWeight: 800, fontSize: 12,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                      }}
                    >
                      {key === 'random' && <Shuffle size={12} />}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGenerate}
                className="btn btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 15 }}
              >
                <Target size={16} />
                Start Practice · {actualCount} questions
                <ChevronRight size={16} />
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Empty state hint */}
        {bankSize === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              background: 'var(--border)', borderRadius: 12, padding: '12px 14px',
              marginBottom: 24,
            }}
          >
            <AlertCircle size={15} color="var(--text-muted)" style={{ marginTop: 1, flexShrink: 0 }} />
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, lineHeight: 1.5 }}>
              Complete chapter or grammar quizzes and any questions you get wrong will appear here automatically.
            </div>
          </motion.div>
        )}

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 16, marginTop: bankSize === 0 ? 0 : 8,
        }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Custom Quizzes
          </div>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {/* Import button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          onClick={() => setShowImport(true)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px', borderRadius: 12, marginBottom: 16,
            border: '1.5px dashed var(--border-md)', background: 'transparent',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontFamily: "'Nunito'", fontWeight: 700, fontSize: 13,
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-md)'; e.currentTarget.style.color = 'var(--text-muted)' }}
        >
          <Plus size={16} />
          Import JSON Quiz
        </motion.button>

        {/* Custom quiz list */}
        {customQuizzes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '16px 0 32px', color: 'var(--text-muted)', fontSize: 12, fontWeight: 600 }}>
            No imported quizzes yet.<br />
            <span style={{ opacity: 0.6 }}>Ask Claude to generate a quiz and import above.</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <AnimatePresence>
              {customQuizzes.map((quiz, i) => (
                <CustomQuizRow
                  key={quiz.id}
                  quiz={quiz}
                  index={i}
                  onPlay={() => onStart(quiz, false)}
                  onReview={() => onReview(quiz.id)}
                  onDelete={() => removeQuiz(quiz.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showImport && <ImportModal onClose={() => setShowImport(false)} />}
      </AnimatePresence>
    </>
  )
}

function CustomQuizRow({ quiz, index, onPlay, onReview, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const hasBest = quiz.bestScore !== null && quiz.bestScore !== undefined

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04 }}
      className="glass-card"
      style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {quiz.title}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
          {quiz.questions.length}q
          {quiz.playCount > 0 && ` · ${quiz.playCount}× played`}
          {hasBest && ` · Best ${quiz.bestScore}/${quiz.questions.length}`}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <button className="btn btn-primary btn-sm" onClick={onPlay} style={{ padding: '6px 12px', fontSize: 12 }}>Play</button>
        <button className="btn btn-ghost btn-sm" onClick={onReview} style={{ padding: '6px 10px', fontSize: 12 }}>Review</button>
        {confirmDelete ? (
          <>
            <button className="btn btn-danger btn-sm" onClick={onDelete} style={{ padding: '6px 10px', fontSize: 12 }}>✓</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDelete(false)} style={{ padding: '6px 10px', fontSize: 12 }}>✕</button>
          </>
        ) : (
          <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDelete(true)} style={{ padding: '6px 10px', fontSize: 12, color: 'var(--text-muted)' }}>
            <Trash2 size={13} />
          </button>
        )}
      </div>
    </motion.div>
  )
}
