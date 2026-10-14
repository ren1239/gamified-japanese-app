import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, BookText, PenLine, ChevronRight, Star, Lock, RefreshCw, Layers } from 'lucide-react'
import { useQuizStore } from '../store/quizStore'
import { useStatsStore } from '../store/statsStore'
import { generateVocabQuiz, getVocabForChapter, getWordsForChapterAndCategory, DYNAMIC_VOCAB_CHAPTERS } from '../utils/vocabQuizGen'
import { toTypedQuiz } from '../utils/answerMatch'
import { getChapterMastery } from '../utils/mastery'
import ChipGroup from '../components/ChipGroup'
import Jp from '../components/Jp'
import RomajiToggle from '../components/RomajiToggle'

// ── Vocab categories & directions ────────────────────────────────────────────
const DIRECTIONS = [
  { id: 'jp-en', label: 'JP → EN' },
  { id: 'en-jp', label: 'EN → JP' },
  { id: 'mix',   label: 'Mix' },
]

const ANSWER_MODES = [
  { id: 'choice', label: 'Choose' },
  { id: 'type',   label: 'Type (kana)' },
]

// ── Vocab Section ─────────────────────────────────────────────────────────────
function VocabSection({ chapter, onStart, onFlashcard }) {
  const hasDynamic = DYNAMIC_VOCAB_CHAPTERS.includes(chapter.number)
  const getQuiz = useQuizStore(s => s.getQuiz)
  const staticQuiz = chapter.vocab?.quizId ? getQuiz(chapter.vocab.quizId) : null

  const chapterVocab = getVocabForChapter(chapter.number)
  const displayCategories = [
    { id: 'all',   label: 'All',   count: chapterVocab.length },
    { id: 'noun',  label: 'Nouns', count: chapterVocab.filter(w => w.category === 'noun').length },
    { id: 'verb',  label: 'Verbs', count: chapterVocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category)).length },
    { id: 'other', label: 'Other', count: chapterVocab.filter(w => w.category === 'other').length },
  ].filter(c => c.count > 0)

  const [cat,  setCat]  = useState('all')
  const [dir,  setDir]  = useState('jp-en')
  const [err,  setErr]  = useState(null)
  const [answerMode, setAnswerMode] = useState('choice')
  const learnedBank = useStatsStore(s => s.learnedBank)
  const learnedCount = learnedBank.filter(e => e.chapterNum === chapter.number).length

  const wordCount = hasDynamic ? getWordsForChapterAndCategory(chapter.number, cat).length : (staticQuiz?.questions?.length ?? 0)

  const handleQuick = () => {
    if (hasDynamic) {
      try {
        const quiz = generateVocabQuiz(cat, dir, chapter.number, 10, answerMode)
        onStart(quiz, true)
      } catch (e) {
        setErr(e.message)
      }
    } else if (staticQuiz) {
      onStart(staticQuiz, true)
    }
  }

  const handleAll = () => {
    if (hasDynamic) {
      try {
        const quiz = generateVocabQuiz(cat, dir, chapter.number, wordCount, answerMode)
        onStart(quiz, true)
      } catch (e) {
        setErr(e.message)
      }
    } else if (staticQuiz) {
      onStart(staticQuiz, true)
    }
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <BookText size={15} color="var(--primary)" strokeWidth={2.5} />
        <div className="section-label" style={{ margin: 0 }}>Vocabulary</div>
      </div>

      <div className="glass-card" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--primary), var(--primary-light))' }} />

        {/* Header */}
        <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 16, color: 'var(--text)', marginBottom: 2 }}>
          Chapter {chapter.number} Vocabulary
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, marginBottom: hasDynamic ? 16 : 0 }}>
          {wordCount} words · {hasDynamic ? `${learnedCount}/${chapterVocab.length} learned` : 'English ↔ Japanese'}
        </div>

        {/* Dynamic pickers — only for chapters with structured data */}
        {hasDynamic && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7 }}>Category</div>
              <ChipGroup options={displayCategories} value={cat} onChange={c => { setCat(c); setErr(null) }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7 }}>Direction</div>
              <ChipGroup options={DIRECTIONS} value={dir} onChange={d => setDir(d)} />
            </div>
            {dir !== 'jp-en' && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7 }}>Answer (EN → JP)</div>
                <ChipGroup options={ANSWER_MODES} value={answerMode} onChange={setAnswerMode} />
              </div>
            )}
          </div>
        )}

        {err && (
          <div style={{ fontSize: 12, color: '#EF4444', fontWeight: 700, marginBottom: 12 }}>⚠ {err}</div>
        )}

        {(hasDynamic || staticQuiz) ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={handleQuick}
                style={{ flex: 1, padding: '11px 0', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                {hasDynamic && <RefreshCw size={14} strokeWidth={2.5} />}
                {hasDynamic ? 'Quick (10)' : 'Play'}
              </motion.button>
              <motion.button
                className="btn btn-accent"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={handleAll}
                style={{ flex: 1, padding: '11px 0', fontSize: 14 }}
              >
                {hasDynamic ? `All (${wordCount})` : 'Shuffle'}
              </motion.button>
            </div>
            {hasDynamic && (
              <motion.button
                className="btn btn-ghost"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => onFlashcard({ chapter, category: cat, direction: dir })}
                style={{ padding: '11px 0', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}
              >
                <Layers size={14} strokeWidth={2.5} />
                Flashcards ({wordCount})
              </motion.button>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 13 }}>
            <Lock size={13} /> Coming soon
          </div>
        )}
      </div>
    </div>
  )
}

// ── Score badge / progress bar helpers ───────────────────────────────────────
function ScoreBadge({ quiz }) {
  if (!quiz || quiz.playCount === 0) return null
  const pct = Math.round((quiz.bestScore / quiz.questions.length) * 100)
  const color = pct === 100 ? '#F59E0B' : pct >= 70 ? 'var(--success)' : 'var(--primary)'
  const bg    = pct === 100 ? 'rgba(245,158,11,0.12)' : pct >= 70 ? 'var(--success-dim)' : 'var(--primary-glow)'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: bg, padding: '3px 10px', borderRadius: 8 }}>
      <Star size={11} fill={color} color={color} />
      <span style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 12, color }}>{pct}%</span>
    </div>
  )
}

function ProgressBar({ quiz }) {
  if (!quiz || quiz.playCount === 0) return null
  const pct = Math.round((quiz.bestScore / quiz.questions.length) * 100)
  return (
    <div className="progress-track" style={{ marginTop: 12 }}>
      <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }} />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ChapterDetailScreen({ chapter, onStart, onBack, onFlashcard }) {
  const getQuiz = useQuizStore(s => s.getQuiz)
  const quizzes = useQuizStore(s => s.quizzes)
  const learnedBank = useStatsStore(s => s.learnedBank)
  const mastery = getChapterMastery(chapter, quizzes, learnedBank)

  return (
    <div className="page" style={{ paddingTop: 16, paddingBottom: 100 }}>

      {/* Back */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <motion.button initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} onClick={onBack}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontFamily: "'Nunito'", fontWeight: 800, fontSize: 14, padding: '4px 0' }}>
          <ChevronLeft size={18} strokeWidth={2.5} /> Learn
        </motion.button>
        <RomajiToggle />
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 28 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', color: '#fff', fontFamily: "'Nunito'", fontWeight: 800, fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', padding: '4px 14px', borderRadius: 999, marginBottom: 10 }}>
          Chapter {chapter.number}
        </div>
        <div style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 'clamp(24px,6vw,34px)', color: 'var(--text)', lineHeight: 1.2, marginBottom: 4 }}>{chapter.title}</div>
        <Jp style={{ fontSize: 16, color: 'var(--text-muted)', fontWeight: 700 }}>{chapter.subtitle}</Jp>
        {mastery && (
          <div style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 800, color: 'var(--text-muted)', marginBottom: 6 }}>
              <span>Mastery</span>
              <span style={{ color: mastery.pct === 100 ? 'var(--gold)' : 'var(--primary)' }}>{mastery.pct}%</span>
            </div>
            <div className="progress-track">
              <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${mastery.pct}%` }} transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }} />
            </div>
          </div>
        )}
      </motion.div>

      {/* Vocab */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <VocabSection chapter={chapter} onStart={onStart} onFlashcard={onFlashcard} />
      </motion.div>

      {/* Grammar Drills */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <PenLine size={15} color="var(--accent)" strokeWidth={2.5} />
          <div className="section-label" style={{ margin: 0 }}>Grammar Drills</div>
        </div>

        {chapter.grammar.length === 0 ? (
          <div className="glass-card" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Lock size={20} style={{ marginBottom: 8, opacity: 0.4 }} />
            <div style={{ fontSize: 13, fontWeight: 700 }}>Grammar drills coming soon</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {chapter.grammar.map((gp, i) => {
              const quiz = getQuiz(gp.quizId)
              const played = quiz?.playCount > 0
              const pct = played ? Math.round((quiz.bestScore / quiz.questions.length) * 100) : null

              return (
                <motion.div key={gp.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06 }} className="glass-card" style={{ padding: '18px 20px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: played ? 'linear-gradient(90deg, var(--accent), var(--primary))' : 'var(--border)' }} />

                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <Jp style={{ fontWeight: 800, fontSize: 17, color: 'var(--text)', marginBottom: 2 }}>{gp.label}</Jp>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                        {gp.desc}{played && <span style={{ marginLeft: 8, color: 'var(--primary)' }}>· {quiz.playCount} play{quiz.playCount > 1 ? 's' : ''}</span>}
                      </div>
                    </div>
                    {pct !== null && <ScoreBadge quiz={quiz} />}
                  </div>

                  {pct !== null && <ProgressBar quiz={quiz} />}

                  {gp.available && quiz ? (
                    <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                      <motion.button className="btn btn-accent" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => onStart(quiz, false)} style={{ flex: 1, padding: '10px 0', fontSize: 14 }}>Drill</motion.button>
                      <motion.button className="btn btn-ghost" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => onStart(quiz, true)} style={{ padding: '10px 16px', fontSize: 14 }}>Shuffle</motion.button>
                      {chapter.number === 0 && (
                        <motion.button className="btn btn-ghost" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => onStart(toTypedQuiz(quiz), true)} style={{ padding: '10px 16px', fontSize: 14 }}>Type</motion.button>
                      )}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, color: 'var(--text-muted)', fontSize: 12, fontWeight: 700 }}>
                      <Lock size={12} /> Coming soon
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>
    </div>
  )
}
