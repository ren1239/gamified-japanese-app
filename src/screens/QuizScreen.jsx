import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { bind as bindWanakana, unbind as unbindWanakana } from 'wanakana'
import { useGameStore, useQuizStore, comboBonus } from '../store/quizStore'
import { useStatsStore } from '../store/statsStore'
import { playSuccessChime, playErrorBuzzer } from '../utils/audio'
import { isTypedCorrect } from '../utils/answerMatch'
import { canSpeak, speakJapanese, speechTextFor } from '../utils/speech'
import Icon from '../components/Icon'
import Mascot from '../components/Mascot'
import { mascotForQuiz } from '../utils/mascot'
import Jp from '../components/Jp'
import RomajiToggle from '../components/RomajiToggle'

const HAS_JP = /[぀-ヿ一-鿿]/
const AUTO_ADVANCE_MS = 1500

// Lesson flow: pick an answer (or type it) → Check → the bottom bar turns green/red and shows
// the correction + rule → Continue. Correct answers also auto-advance after a moment.
export default function QuizScreen({ onFinish, onQuit, burst }) {
  const { questions, currentIndex, combo, phase, quizId, activeQuiz, submitAnswer, nextQuestion } = useGameStore()
  const getQuiz = useQuizStore((s) => s.getQuiz)
  const soundEnabled = useStatsStore((s) => s.soundEnabled)
  const autoSpeak = useStatsStore((s) => s.autoSpeak)
  const speedMode = useStatsStore((s) => s.speedMode)
  const flaggedBank = useStatsStore((s) => s.flaggedBank)
  const flagQuestion = useStatsStore((s) => s.flagQuestion)
  const unflagQuestion = useStatsStore((s) => s.unflagQuestion)

  const [selected, setSelected] = useState(null) // choice picked but not checked yet
  const [chosenIdx, setChosenIdx] = useState(null) // choice that was checked
  const [lastCorrect, setLastCorrect] = useState(null)
  const [hintOpen, setHintOpen] = useState(false)
  const [typedAnswer, setTypedAnswer] = useState('')
  const [typedDraft, setTypedDraft] = useState('')
  const inputRef = useRef(null)
  const answeredRef = useRef(false)
  const advancedFor = useRef(-1)

  const q = questions[currentIndex]
  const TIMER_DURATION = q?.inputMode ? 12 : 6
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION)

  const total = questions.length
  const answered = phase === 'answered'
  const quizMeta = (q?._sourceQuizId && getQuiz(q._sourceQuizId)) || (quizId ? getQuiz(quizId) : null)
  const hasHint = !!(quizMeta?.grammarPoint || quizMeta?.description)
  const who = mascotForQuiz(activeQuiz, q)

  const flagKey = q ? (q._bankKey ?? `${quizId}-${q.id ?? q.question.slice(0, 30)}`) : null
  const isFlagged = flagKey ? flaggedBank.some((e) => e.key === flagKey) : false
  const toggleFlag = () => {
    if (!flagKey || !q) return
    if (isFlagged) unflagQuestion(flagKey)
    else flagQuestion(q._sourceQuizId ?? quizId, q._sourceQuizTitle ?? quizMeta?.title ?? activeQuiz?.title ?? 'Quiz', q)
  }

  const advance = useCallback(() => {
    if (advancedFor.current === currentIndex) return
    advancedFor.current = currentIndex
    nextQuestion()
    setSelected(null)
    setChosenIdx(null)
    setLastCorrect(null)
    setTypedDraft('')
  }, [nextQuestion, currentIndex])

  const grade = useCallback((idx, opts = {}) => {
    if (phase !== 'playing') return
    setChosenIdx(idx)
    const fast = speedMode && idx >= 0 && timeLeft > 0
    const correct = submitAnswer(idx, { ...opts, fast })
    setLastCorrect(correct)
    if (autoSpeak && q?._speak) speakJapanese(q._speak)
    if (correct) {
      if (soundEnabled) playSuccessChime()
      burst(window.innerWidth / 2, window.innerHeight * 0.75, 'correct', 45)
      const idxAtGrade = currentIndex
      setTimeout(() => { if (useGameStore.getState().currentIndex === idxAtGrade) advance() }, AUTO_ADVANCE_MS)
    } else if (soundEnabled) {
      playErrorBuzzer()
    }
  }, [phase, speedMode, timeLeft, submitAnswer, autoSpeak, q, soundEnabled, burst, currentIndex, advance])

  const check = useCallback(() => {
    if (phase !== 'playing' || !q) return
    if (q.inputMode) {
      const typed = (inputRef.current?.value ?? typedDraft).trim()
      if (!typed) return
      const correct = isTypedCorrect(typed, q.accept ?? [q.choices[q.correct]])
      setTypedAnswer(typed)
      grade(correct ? q.correct : -1, { correct, typed })
    } else if (selected != null) {
      grade(selected)
    }
  }, [phase, q, typedDraft, selected, grade])

  // Romaji → kana while typing (callback ref: the card animates out before the next input mounts)
  const inputCallbackRef = useCallback((el) => {
    inputRef.current = el
    if (!el) return
    bindWanakana(el, { IMEMode: true })
    el.focus()
    requestAnimationFrame(() => { if (el.isConnected && !el.disabled) el.focus() })
    return () => { try { unbindWanakana(el) } catch { /* already unbound */ } }
  }, [])

  useEffect(() => {
    if (speedMode && timeLeft === 0 && phase === 'playing') grade(-1)
  }, [speedMode, timeLeft, phase, grade])

  // Keys: 1–4 / A–D pick, Enter checks, Enter/Space continues
  useEffect(() => {
    const handler = (e) => {
      if (hintOpen) return
      if (answered && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); advance(); return }
      if (phase !== 'playing' || !q) return
      if (q.inputMode) return // input handles its own Enter
      if (e.key === 'Enter') { check(); return }
      const map = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 }
      const idx = map[e.key.toLowerCase()]
      if (idx !== undefined && idx < q.choices.length) setSelected(idx)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, q, answered, advance, check, hintOpen])

  useEffect(() => { if (phase === 'finished') onFinish() }, [phase, onFinish])
  useEffect(() => { answeredRef.current = phase === 'answered' }, [phase])

  useEffect(() => {
    answeredRef.current = false
    setTypedAnswer('')
    setTimeLeft(TIMER_DURATION)
    if (!speedMode) return
    const interval = setInterval(() => {
      if (answeredRef.current) { clearInterval(interval); return }
      setTimeLeft((prev) => (prev <= 0.05 ? (clearInterval(interval), 0) : Math.max(0, +(prev - 0.1).toFixed(2))))
    }, 100)
    return () => clearInterval(interval)
  }, [currentIndex, speedMode]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!q) return null

  const speech = speechTextFor(q, answered)
  const nextBonus = comboBonus(combo + 1)
  const progress = ((currentIndex + (answered ? 1 : 0)) / total) * 100
  const canCheck = q.inputMode ? typedDraft.trim().length > 0 : selected != null
  const mood = !answered ? 'think' : lastCorrect ? 'cheer' : 'oops'
  const correctText = q.choices[q.correct]

  return (
    <div className="lesson">
      {/* ── Top bar ── */}
      <header className="lesson-top">
        <button type="button" className="lesson-icon-btn" onClick={onQuit} aria-label="Quit lesson"><Icon name="x" size={22} /></button>
        <div className="lesson-bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <i style={{ width: `${Math.max(progress, 3)}%` }} />
        </div>
        {speedMode && !answered && (
          <span className="lesson-timer" style={{ '--t': `${(timeLeft / TIMER_DURATION) * 360}deg` }}><span>{Math.ceil(timeLeft)}</span></span>
        )}
        <AnimatePresence mode="popLayout">
          {combo >= 2 && (
            <motion.span key={combo} className="lesson-combo" initial={{ scale: 1.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 420, damping: 16 }}>
              <Icon name="flame" size={20} />{combo}
            </motion.span>
          )}
        </AnimatePresence>
        <RomajiToggle />
      </header>

      {/* ── Question ── */}
      <main className="lesson-body">
        <AnimatePresence mode="wait">
          <motion.div key={currentIndex} className="lesson-card" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
            <div className="lesson-meta">
              {(q.topic || activeQuiz?.topic) && <span className={`lesson-topic ${who === 'mentai' ? 'accent' : ''}`}>{q.topic ?? activeQuiz?.topic}</span>}
              <div className="lesson-tools">
                {canSpeak && speech && <button type="button" className="lesson-icon-btn" onClick={() => speakJapanese(speech)} aria-label="Play audio"><Icon name="speaker" size={20} color="var(--primary)" /></button>}
                {hasHint && !answered && <button type="button" className="lesson-icon-btn" onClick={() => setHintOpen(true)} aria-label="Grammar hint"><Icon name="bulb" size={20} color="var(--gold-deep)" /></button>}
                <button type="button" className={`lesson-icon-btn ${isFlagged ? 'flagged' : ''}`} onClick={toggleFlag} aria-label={isFlagged ? 'Unflag question' : 'Flag for re-test'}><Icon name="flag" size={18} /></button>
              </div>
            </div>

            <div className="lesson-prompt">
              <Mascot who={who} mood={mood} size={74} />
              <div className="lesson-bubble">
                <p className="lesson-question">{q.question}</p>
                {q.jp && <Jp className="lesson-jp" reading={q.jpRomaji}>{q.jp}</Jp>}
              </div>
            </div>

            {q.inputMode ? (
              <div className="lesson-typed">
                <input
                  ref={inputCallbackRef}
                  type="text" lang="ja" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
                  disabled={answered}
                  placeholder="Type in romaji → かな"
                  onInput={(e) => setTypedDraft(e.currentTarget.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); if (answered) advance(); else check() } }}
                  className={answered ? (lastCorrect ? 'ok' : 'bad') : ''}
                />
                <p className="lesson-hint-line">Type romaji: it turns into kana as you go. Enter to check.</p>
              </div>
            ) : (
              <div className="lesson-choices">
                {q.choices.map((choice, idx) => {
                  const isCorrect = idx === q.correct
                  const state = !answered
                    ? (selected === idx ? 'selected' : '')
                    : isCorrect ? 'correct' : chosenIdx === idx ? 'wrong' : 'dim'
                  return (
                    <motion.button
                      key={idx}
                      type="button"
                      className={`lesson-choice ${state}`}
                      onClick={() => !answered && setSelected(idx)}
                      disabled={answered}
                      animate={state === 'wrong' ? { x: [0, -7, 7, -4, 4, 0] } : {}}
                      transition={{ duration: 0.35 }}
                    >
                      <span className="lesson-choice-key">{idx + 1}</span>
                      {HAS_JP.test(choice) ? <Jp className="lesson-choice-text">{choice}</Jp> : <span className="lesson-choice-text">{choice}</span>}
                    </motion.button>
                  )
                })}
              </div>
            )}
            {!answered && nextBonus > 0 && <p className="lesson-hint-line accent">Next correct answer: +{nextBonus} XP combo bonus</p>}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Check bar ── */}
      <footer className={`lesson-check ${answered ? (lastCorrect ? 'ok' : 'bad') : ''}`}>
        {answered && (
            <motion.div className="lesson-verdict" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 380, damping: 26 }}>
              <strong><Icon name={lastCorrect ? 'check' : 'cross'} size={28} />{lastCorrect ? (combo >= 3 ? `正解！ ${combo} in a row` : '正解！') : chosenIdx === -1 && !typedAnswer ? "Time's up" : 'Not quite'}</strong>
              {lastCorrect
                ? combo >= 3 && <p>+{comboBonus(combo)} XP combo bonus</p>
                : (
                  <>
                    {typedAnswer && <p>You typed: <span className="jp">{typedAnswer}</span></p>}
                    <div className="lesson-answer">Correct answer: {HAS_JP.test(correctText) ? <Jp block={false} className="lesson-answer-jp">{correctText}</Jp> : <b>{correctText}</b>}</div>
                    {(q.explanation || quizMeta?.description) && (
                      <p className="lesson-rule"><b>{q.explanation ? 'Why: ' : `Rule · ${quizMeta?.grammarPoint ?? ''}: `}</b>{q.explanation ?? quizMeta.description}</p>
                    )}
                  </>
                )}
            </motion.div>
        )}
        {answered ? (
          <button type="button" className={`btn btn-lg ${lastCorrect ? 'btn-success' : 'btn-danger'}`} onClick={advance}>{lastCorrect ? 'Continue' : 'Got it'}</button>
        ) : (
          <button type="button" className="btn btn-lg btn-success" onClick={check} disabled={!canCheck}>Check</button>
        )}
      </footer>

      {/* ── Grammar hint sheet ── */}
      <AnimatePresence>
        {hintOpen && (
          <>
            <motion.div key="hint-bg" className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setHintOpen(false)} />
            <motion.div key="hint" className="sheet" role="dialog" aria-label="Grammar hint" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} transition={{ type: 'spring', stiffness: 360, damping: 28 }}>
              <div className="sheet-head">
                <Mascot who="mentai" mood="happy" size={56} />
                <div>
                  <span className="eyebrow">Grammar hint</span>
                  <Jp className="sheet-title">{quizMeta?.grammarPoint ?? quizMeta?.title ?? ''}</Jp>
                </div>
              </div>
              <p className="sheet-body">{quizMeta?.description ?? 'No description available.'}</p>
              <button type="button" className="btn btn-lg btn-accent" onClick={() => setHintOpen(false)}>Got it</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
