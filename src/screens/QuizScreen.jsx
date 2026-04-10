import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Lightbulb, ArrowRight, ChevronRight, Check, X, Flag } from 'lucide-react'
import { useGameStore, useQuizStore } from '../store/quizStore'
import { useStatsStore } from '../store/statsStore'
import { playSuccessChime, playErrorBuzzer } from '../utils/audio'
import { toRomajiSafe } from '../utils/romaji'

const LABELS = ['A', 'B', 'C', 'D']
const BADGE_COLORS = [
  { bg: '#F97316', text: '#fff' }, // A — orange
  { bg: '#7C3AED', text: '#fff' }, // B — purple
  { bg: '#3B82F6', text: '#fff' }, // C — blue
  { bg: '#10B981', text: '#fff' }, // D — teal
]

export default function QuizScreen({ onFinish, onQuit, burst }) {
  const { questions, currentIndex, score, phase, quizId, submitAnswer, nextQuestion } = useGameStore()
  const getQuiz = useQuizStore((s) => s.getQuiz)
  const soundEnabled = useStatsStore((s) => s.soundEnabled)
  const flaggedBank = useStatsStore((s) => s.flaggedBank)
  const flagQuestion = useStatsStore((s) => s.flagQuestion)
  const unflagQuestion = useStatsStore((s) => s.unflagQuestion)

  const [lastCorrect, setLastCorrect] = useState(null)
  const [chosenIdx, setChosenIdx] = useState(null)
  const [hintOpen, setHintOpen] = useState(false)
  const [showRomaji, setShowRomaji] = useState(false)

  const q = questions[currentIndex]
  const total = questions.length
  const answered = phase === 'answered'

  // Get grammar metadata for hint (only exists on grammar drills)
  const quizMeta = quizId ? getQuiz(quizId) : null
  const hasHint = !!(quizMeta?.grammarPoint || quizMeta?.description)

  // Flag state for current question
  const flagKey = q ? (q._bankKey ?? `${quizId}-${q.id ?? q.question.slice(0, 30)}`) : null
  const isFlagged = flagKey ? flaggedBank.some((e) => e.key === flagKey) : false

  const handleToggleFlag = () => {
    if (!flagKey || !q) return
    if (isFlagged) {
      unflagQuestion(flagKey)
    } else {
      flagQuestion(quizId, quizMeta?.title ?? 'Quiz', q)
    }
  }

  const advance = useCallback(() => {
    nextQuestion()
    setChosenIdx(null)
    setLastCorrect(null)
  }, [nextQuestion])

  const handleAnswer = useCallback(
    (idx) => {
      if (phase !== 'playing') return
      setChosenIdx(idx)
      const correct = submitAnswer(idx)
      setLastCorrect(correct)

      if (correct) {
        if (soundEnabled) playSuccessChime()
        burst(window.innerWidth / 2, window.innerHeight * 0.5, 'correct', 55)
        // Auto-advance only on correct — satisfying flow
        setTimeout(advance, 1000)
      } else {
        if (soundEnabled) playErrorBuzzer()
      }
      // On wrong: user must tap "Got it →" to advance (no auto-skip)
    },
    [phase, submitAnswer, burst, advance, soundEnabled]
  )

  // Keyboard shortcuts A/B/C or 1/2/3
  useEffect(() => {
    const handler = (e) => {
      // Space or Enter to advance when wrong
      if ((e.key === ' ' || e.key === 'Enter') && answered && !lastCorrect) {
        advance()
        return
      }
      
      if (phase !== 'playing') return
      const map = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 }
      const idx = map[e.key.toLowerCase()]
      if (idx !== undefined && idx < q?.choices?.length) handleAnswer(idx)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, q, handleAnswer, answered, lastCorrect, advance])

  useEffect(() => {
    if (phase === 'finished') onFinish()
  }, [phase, onFinish])

  if (!q) return null

  return (
    <div style={{
      position: 'relative', zIndex: 1,
      minHeight: '100dvh',
      display: 'flex', flexDirection: 'column',
      maxWidth: 448, margin: '0 auto',
    }}>

      {/* ── Purple Header Card ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background: 'linear-gradient(160deg, var(--primary-dark) 0%, var(--primary) 60%, var(--primary-light) 100%)',
          borderRadius: '0 0 32px 32px',
          padding: '52px 20px 24px',
          marginBottom: 20,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,200,255,0.12)', filter: 'blur(30px)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, position: 'relative', zIndex: 1 }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onQuit}
            style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
          >
            <ArrowLeft size={18} color="#fff" strokeWidth={2.5} />
          </motion.button>

          <div style={{
            background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.3)',
            borderRadius: 14, padding: '8px 20px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Score</div>
            <motion.div
              key={score}
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, lineHeight: 1, color: '#fff' }}
            >
              {score}
            </motion.div>
          </div>

          <div style={{ width: 38 }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 700, marginBottom: 8 }}>
            <span>Question {currentIndex + 1} / {total}</span>
            <span>{Math.round(((currentIndex + 1) / total) * 100)}%</span>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${((currentIndex + 1) / total) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, #F97316, #FCD34D)' }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Question + Choices ── */}
      <div style={{ flex: 1, padding: '0 16px 120px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {/* Question card */}
            <div style={{
              background: 'var(--surface-solid)', borderRadius: 20,
              padding: '22px 20px 20px', marginBottom: 14,
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-md)',
            }}>
              {q.topic && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  background: 'var(--border-md)', color: 'var(--primary)',
                  fontFamily: "'Nunito'", fontWeight: 800, fontSize: 11, letterSpacing: '1px',
                  padding: '4px 12px', borderRadius: 999, marginBottom: 12,
                }}>
                  {q.topic}
                </div>
              )}
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 'clamp(16px, 3.5vw, 19px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.5, marginBottom: q.jp ? 10 : 0 }}>
                {q.question}
              </div>
              {q.jp && (
                <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 'clamp(22px, 5vw, 30px)', fontWeight: 900, color: 'var(--primary)', lineHeight: 1.3 }}>
                  {q.jp}
                </div>
              )}
            </div>

            {/* Answer options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {q.choices.map((choice, idx) => {
                const isChosen = chosenIdx === idx
                const isCorrect = idx === q.correct
                const isWrong = isChosen && !isCorrect

                let cardBg = 'var(--surface-solid)'
                let cardBorder = 'var(--border-md)'
                let cardShadow = 'var(--shadow-sm)'
                let badgeBg = BADGE_COLORS[idx].bg
                let badgeText = BADGE_COLORS[idx].text
                let textColor = 'var(--text)'
                let showIcon = null

                if (answered && isCorrect) {
                  cardBg = 'var(--success-dim)'; cardBorder = 'var(--success)'
                  cardShadow = '0 4px 20px rgba(16,185,129,0.25)'
                  badgeBg = 'var(--success)'; textColor = 'var(--success)'; showIcon = <Check size={20} strokeWidth={3.5} />
                } else if (answered && isWrong) {
                  cardBg = 'var(--error-dim)'; cardBorder = 'var(--error)'
                  cardShadow = '0 4px 20px rgba(239,68,68,0.2)'
                  badgeBg = 'var(--error)'; textColor = 'var(--error)'; showIcon = <X size={20} strokeWidth={3.5} />
                } else if (answered) {
                  cardBorder = 'var(--border)'; cardShadow = 'none'
                  badgeBg = 'var(--border-md)'; badgeText = 'var(--text-muted)'; textColor = 'var(--text-muted)'
                }

                return (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 14 }}
                    animate={answered && isWrong ? { x: [0, -8, 8, -5, 5, 0], opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={answered && isWrong ? { duration: 0.4 } : { delay: idx * 0.055, duration: 0.25 }}
                    onClick={() => handleAnswer(idx)}
                    disabled={answered}
                    whileHover={!answered ? { y: -2, boxShadow: '0 6px 28px rgba(124,58,237,0.18)' } : {}}
                    whileTap={!answered ? { scale: 0.97 } : {}}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      background: cardBg, border: `2px solid ${cardBorder}`,
                      borderRadius: 16, padding: '16px 18px',
                      cursor: answered ? 'default' : 'pointer',
                      textAlign: 'left', width: '100%',
                      boxShadow: cardShadow, minHeight: 60,
                      transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
                    }}
                  >
                    <motion.div
                      animate={{ scale: answered && (isCorrect || isWrong) ? [1, 1.3, 1] : 1 }}
                      transition={{ duration: 0.35 }}
                      style={{
                        width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                        background: badgeBg, color: badgeText,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'Nunito'", fontWeight: 900, fontSize: showIcon ? 18 : 15,
                        boxShadow: `0 2px 8px ${badgeBg}55`, transition: 'background 0.2s',
                      }}
                    >
                      {showIcon ?? LABELS[idx]}
                    </motion.div>
                    <span style={{ flex: 1 }}>
                      <span style={{
                        fontFamily: choice.match(/[\u3040-\u30FF\u4E00-\u9FAF]/) ? "'Noto Sans JP', sans-serif" : "'Nunito', sans-serif",
                        fontWeight: 700, fontSize: 15, color: textColor, lineHeight: 1.35,
                        display: 'block', transition: 'color 0.2s',
                      }}>
                        {choice}
                      </span>
                      {showRomaji && toRomajiSafe(choice) && (
                        <span style={{
                          fontFamily: "'Nunito', sans-serif",
                          fontWeight: 600, fontSize: 11,
                          color: textColor, opacity: 0.55,
                          display: 'block', marginTop: 2, lineHeight: 1.2,
                        }}>
                          {toRomajiSafe(choice)}
                        </span>
                      )}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: 14, fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px' }}>
              Press A · B · C or 1 · 2 · 3
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Floating Action Buttons (romaji left, hint center) ── */}
      <div style={{
        position: 'fixed', bottom: 28, left: 0, right: 0,
        zIndex: 150, pointerEvents: 'none',
      }}>
        <div style={{ maxWidth: 448, margin: '0 auto', position: 'relative', height: 46, paddingLeft: 20, paddingRight: 20 }}>

          {/* Romaji toggle — left */}
          <AnimatePresence>
            <motion.button
              key="romaji-btn"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowRomaji((v) => !v)}
              style={{
                position: 'absolute', left: 20, top: 0,
                width: 46, height: 46, borderRadius: '50%',
                background: showRomaji
                  ? 'linear-gradient(135deg, var(--accent), #f97316)'
                  : 'var(--surface-solid)',
                border: showRomaji ? 'none' : '2px solid var(--border-md)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: showRomaji ? '0 4px 16px rgba(249,115,22,0.4)' : 'var(--shadow-md)',
                pointerEvents: 'all',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
            >
              <span style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900, fontSize: 16,
                color: showRomaji ? '#fff' : 'var(--text-muted)',
                lineHeight: 1,
                userSelect: 'none',
              }}>A</span>
            </motion.button>
          </AnimatePresence>

          {/* Grammar hint — center */}
          <AnimatePresence>
            {hasHint && !answered && (
              <motion.button
                key="hint-btn"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.4 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setHintOpen(true)}
                style={{
                  position: 'absolute', left: '50%', top: 0,
                  transform: 'translateX(-50%)',
                  width: 46, height: 46, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 16px var(--primary-glow)',
                  pointerEvents: 'all',
                }}
              >
                <Lightbulb size={20} color="#fff" strokeWidth={2.5} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Flag button — right */}
          <motion.button
            key="flag-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.35 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleFlag}
            style={{
              position: 'absolute', right: 20, top: 0,
              width: 46, height: 46, borderRadius: '50%',
              background: isFlagged
                ? 'linear-gradient(135deg, #DC2626, #EF4444)'
                : 'var(--surface-solid)',
              border: isFlagged ? 'none' : '2px solid var(--border-md)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isFlagged ? '0 4px 16px rgba(239,68,68,0.4)' : 'var(--shadow-md)',
              pointerEvents: 'all',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
          >
            <Flag size={18} color={isFlagged ? '#fff' : 'var(--text-muted)'} strokeWidth={2.5} fill={isFlagged ? '#fff' : 'none'} />
          </motion.button>

        </div>
      </div>

      {/* ── Wrong Answer Feedback + "Got it" button ── */}
      <AnimatePresence>
        {answered && lastCorrect !== null && (
          <motion.div
            key="feedback-bar"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0, margin: '0 auto',
              width: '100%', maxWidth: 448,
              padding: '24px 20px 32px',
              background: lastCorrect ? 'linear-gradient(135deg, #059669, #10B981)' : 'linear-gradient(135deg, #DC2626, #EF4444)',
              zIndex: 200, borderRadius: '24px 24px 0 0',
              boxShadow: lastCorrect ? '0 -8px 32px rgba(16,185,129,0.35)' : '0 -8px 32px rgba(239,68,68,0.35)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Text Area */}
              <div>
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 16, delay: 0.05 }}
                  style={{ fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 900, fontSize: 'clamp(20px, 6vw, 26px)', color: '#fff', lineHeight: 1, marginBottom: 6 }}
                >
                  {lastCorrect ? '正解！ 🎉' : '不正解 😤'}
                </motion.div>
                <div style={{ fontFamily: "'Nunito'", fontWeight: 700, fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.4 }}>
                  {lastCorrect ? 'Great job! Keep it up!' : `Correct answer: ${q.choices[q.correct]}`}
                </div>
              </div>

              {/* Only show Got it button on WRONG — correct auto-advances */}
              {!lastCorrect && (
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={advance}
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    background: 'rgba(255,255,255,0.25)',
                    border: '2px solid rgba(255,255,255,0.5)',
                    borderRadius: 14, padding: '14px 0',
                    fontFamily: "'Nunito'", fontWeight: 900, fontSize: 16,
                    color: '#fff', cursor: 'pointer',
                  }}
                >
                  Got it <ChevronRight size={18} strokeWidth={3} />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Grammar Hint Modal ── */}
      <AnimatePresence>
        {hintOpen && (
          <>
            <motion.div
              key="hint-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHintOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(15,10,40,0.5)', backdropFilter: 'blur(5px)' }}
            />
            <motion.div
              key="hint-sheet"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              style={{
                position: 'fixed', bottom: 0, left: 0, right: 0, margin: '0 auto',
                width: '100%', maxWidth: 448, zIndex: 401,
                background: 'linear-gradient(160deg, var(--primary-dark), var(--primary))',
                borderRadius: '24px 24px 0 0',
                padding: '24px 24px 44px',
              }}
            >
              <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.3)', margin: '0 auto 20px' }} />

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lightbulb size={20} color="#FCD34D" strokeWidth={2.5} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 11, color: 'rgba(255,255,255,0.65)', letterSpacing: '2px', textTransform: 'uppercase' }}>Grammar Hint</div>
                  <div style={{ fontFamily: "'Noto Sans JP'", fontWeight: 900, fontSize: 20, color: '#fff', lineHeight: 1.2 }}>
                    {quizMeta?.grammarPoint ?? quizMeta?.title}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: '16px 18px', marginBottom: 16, border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontFamily: "'Nunito'", fontWeight: 700, fontSize: 15, color: '#fff', lineHeight: 1.6 }}>
                  {quizMeta?.description ?? 'No description available.'}
                </div>
              </div>

              {/* Topic tag */}
              {quizMeta?.topic && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 999, padding: '5px 14px' }}>
                  <div style={{ fontFamily: "'Nunito'", fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
                    📚 {quizMeta.topic}
                  </div>
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setHintOpen(false)}
                style={{
                  width: '100%', marginTop: 20, padding: '13px 0',
                  background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: 14, fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15,
                  color: '#fff', cursor: 'pointer',
                }}
              >
                Got it, let's go!
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
