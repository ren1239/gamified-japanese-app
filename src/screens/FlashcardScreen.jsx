import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, Layers } from 'lucide-react'
import { getWordsForChapterAndCategory } from '../utils/vocabQuizGen'
import { useStatsStore } from '../store/statsStore'
import { toRomajiSafe } from '../utils/romaji'

const CAT_LABEL = { all: 'All', noun: 'Nouns', verb: 'Verbs', other: 'Other' }
const DIR_LABEL = { 'jp-en': 'JP→EN', 'en-jp': 'EN→JP', mix: 'Mix' }

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildDeck(words, direction) {
  return shuffle(words).map((word) => ({
    ...word,
    frontJp: direction === 'jp-en' || (direction === 'mix' && Math.random() > 0.5),
  }))
}

// ── Summary screen ─────────────────────────────────────────────────────────
function SummaryView({ newLearnedCount, totalLearned, chapter, onRestart, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, type: 'spring', stiffness: 260, damping: 26 }}
      style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
    >
      <div style={{ fontSize: 52 }}>🎴</div>
      <div style={{ fontFamily: "'Bebas Neue'", fontSize: 36, color: 'var(--text)', letterSpacing: '2px', lineHeight: 1 }}>
        DECK COMPLETE
      </div>
      <div className="glass-card" style={{ width: '100%', padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        <div style={{ textAlign: 'center', borderRight: '1px solid var(--border-md)', paddingRight: 12 }}>
          <div style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 40, color: '#3B82F6', lineHeight: 1 }}>
            {newLearnedCount}
          </div>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', marginTop: 5, fontFamily: "'Nunito'", letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            New Today
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingLeft: 12 }}>
          <div style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 40, color: '#10B981', lineHeight: 1 }}>
            {totalLearned}
          </div>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', marginTop: 5, fontFamily: "'Nunito'", letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Ch.{chapter.number} Total
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="btn btn-primary"
          style={{ padding: '14px 0', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          <RotateCcw size={15} strokeWidth={2.5} /> Go Again
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          className="btn btn-ghost"
          style={{ padding: '14px 0', fontSize: 15 }}
        >
          Back to Chapter
        </motion.button>
      </div>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function FlashcardScreen({ chapter, category, direction, onBack }) {
  const words = getWordsForChapterAndCategory(chapter.number, category)
  const [deck] = useState(() => buildDeck(words, direction))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const flippedThisSession = useRef(new Set())
  const newLearnedCount = useRef(0)

  const recordLearned = useStatsStore((s) => s.recordLearned)
  const learnedBank = useStatsStore((s) => s.learnedBank)

  const card = deck[currentIndex]
  const wordId = card ? `ch${chapter.number}-${card.id}` : null
  const isAlreadyLearned = wordId ? learnedBank.some((e) => e.wordId === wordId) : false
  const totalLearned = learnedBank.filter((e) => e.chapterNum === chapter.number).length

  const handleFlip = useCallback(() => {
    if (!isFlipped && card) {
      const wid = `ch${chapter.number}-${card.id}`
      if (!flippedThisSession.current.has(card.id)) {
        flippedThisSession.current.add(card.id)
        const alreadyInBank = learnedBank.some((e) => e.wordId === wid)
        if (!alreadyInBank) {
          newLearnedCount.current += 1
          recordLearned(wid, chapter.number)
        }
      }
    }
    setIsFlipped((f) => !f)
  }, [isFlipped, card, chapter.number, learnedBank, recordLearned])

  const handleNext = useCallback(() => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((i) => i + 1)
      setIsFlipped(false)
    } else {
      setShowSummary(true)
    }
  }, [currentIndex, deck.length])

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
      setIsFlipped(false)
    }
  }, [currentIndex])

  const handleRestart = useCallback(() => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setShowSummary(false)
    flippedThisSession.current = new Set()
    newLearnedCount.current = 0
  }, [])

  if (!card) {
    return (
      <div className="page" style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh' }}>
        <div style={{ fontFamily: "'Nunito'", fontWeight: 700, color: 'var(--text-muted)', fontSize: 14 }}>No words in this category.</div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={onBack} className="btn btn-ghost" style={{ marginTop: 16 }}>Go Back</motion.button>
      </div>
    )
  }

  const jpText = card.kanji ? `${card.kana}（${card.kanji}）` : card.kana
  const romaji = toRomajiSafe(card.kana)

  return (
    <div className="page" style={{ paddingTop: 16, paddingBottom: 32, display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <motion.button
          onClick={onBack}
          whileTap={{ scale: 0.93 }}
          style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontFamily: "'Nunito'", fontWeight: 800, fontSize: 14, padding: '4px 0' }}
        >
          <ChevronLeft size={18} strokeWidth={2.5} /> Back
        </motion.button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 13, color: 'var(--text)' }}>Flashcards</div>
          <div style={{ fontFamily: "'Nunito'", fontWeight: 700, fontSize: 11, color: 'var(--text-muted)' }}>
            Ch.{chapter.number} · {CAT_LABEL[category] ?? category} · {DIR_LABEL[direction] ?? direction}
          </div>
        </div>

        <div style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 13, color: 'var(--text-muted)', minWidth: 48, textAlign: 'right' }}>
          {showSummary ? '✓' : `${currentIndex + 1} / ${deck.length}`}
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, marginBottom: 24, overflow: 'hidden' }}>
        <motion.div
          animate={{ width: `${((currentIndex + (showSummary ? 1 : 0)) / deck.length) * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--primary-light))', borderRadius: 2 }}
        />
      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        {showSummary ? (
          <SummaryView
            newLearnedCount={newLearnedCount.current}
            totalLearned={totalLearned}
            chapter={chapter}
            onRestart={handleRestart}
            onBack={onBack}
          />
        ) : (
          <>
            {/* Learned badge */}
            <div style={{ height: 24, marginBottom: 8, display: 'flex', alignItems: 'center' }}>
              <AnimatePresence>
                {isAlreadyLearned && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#10B981', fontFamily: "'Nunito'", fontWeight: 800, fontSize: 12 }}
                  >
                    <CheckCircle2 size={13} strokeWidth={2.5} /> Already learned
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── 3D Card ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.2 }}
                style={{ width: '100%', maxWidth: 380 }}
              >
                <div
                  style={{ perspective: 1200, width: '100%' }}
                  onClick={handleFlip}
                >
                  <motion.div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 260,
                      transformStyle: 'preserve-3d',
                      cursor: 'pointer',
                    }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.52, type: 'spring', stiffness: 270, damping: 30 }}
                  >
                    {/* ── Front face ── */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      backfaceVisibility: 'hidden',
                      borderRadius: 24,
                      background: card.frontJp
                        ? 'linear-gradient(145deg, var(--primary-dark) 0%, var(--primary) 55%, var(--primary-light) 100%)'
                        : 'linear-gradient(145deg, #1a1040 0%, #2a1860 55%, #3a2275 100%)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      padding: '28px 24px',
                      boxShadow: '0 20px 56px rgba(124,58,237,0.3), 0 4px 20px rgba(0,0,0,0.35)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: "'Nunito'", marginBottom: 22 }}>
                        {card.frontJp ? 'Japanese' : 'English'}
                      </div>

                      {card.frontJp ? (
                        <>
                          <div style={{ fontFamily: "'Noto Sans JP'", fontWeight: 900, fontSize: 'clamp(26px,7vw,40px)', color: '#fff', textAlign: 'center', lineHeight: 1.35, marginBottom: 10 }}>
                            {jpText}
                          </div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: "'Nunito'", fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                            {card.category}
                          </div>
                        </>
                      ) : (
                        <div style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 'clamp(22px,6vw,34px)', color: '#fff', textAlign: 'center', lineHeight: 1.35 }}>
                          {card.english}
                        </div>
                      )}

                      <div style={{ position: 'absolute', bottom: 18, display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.28)', fontFamily: "'Nunito'", fontWeight: 700, fontSize: 11 }}>
                        <RotateCcw size={10} strokeWidth={2.5} /> tap to flip
                      </div>
                    </div>

                    {/* ── Back face ── */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      borderRadius: 24,
                      background: card.frontJp
                        ? 'linear-gradient(145deg, #0a2218 0%, #123a28 55%, #1a5236 100%)'
                        : 'linear-gradient(145deg, var(--primary-dark) 0%, var(--primary) 55%, var(--primary-light) 100%)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      padding: '28px 24px',
                      boxShadow: card.frontJp
                        ? '0 20px 56px rgba(16,185,129,0.2), 0 4px 20px rgba(0,0,0,0.35)'
                        : '0 20px 56px rgba(124,58,237,0.3), 0 4px 20px rgba(0,0,0,0.35)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: "'Nunito'", marginBottom: 22 }}>
                        {card.frontJp ? 'English' : 'Japanese'}
                      </div>

                      {card.frontJp ? (
                        <>
                          <div style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 'clamp(22px,6vw,34px)', color: '#fff', textAlign: 'center', lineHeight: 1.35, marginBottom: 12 }}>
                            {card.english}
                          </div>
                          {romaji && (
                            <div style={{ fontFamily: "'Nunito'", fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', letterSpacing: '0.5px' }}>
                              {romaji}
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div style={{ fontFamily: "'Noto Sans JP'", fontWeight: 900, fontSize: 'clamp(26px,7vw,40px)', color: '#fff', textAlign: 'center', lineHeight: 1.35, marginBottom: 10 }}>
                            {jpText}
                          </div>
                          {romaji && (
                            <div style={{ fontFamily: "'Nunito'", fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', letterSpacing: '0.5px' }}>
                              {romaji}
                            </div>
                          )}
                        </>
                      )}

                      <div style={{ position: 'absolute', bottom: 18, display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.28)', fontFamily: "'Nunito'", fontWeight: 700, fontSize: 11 }}>
                        <RotateCcw size={10} strokeWidth={2.5} /> tap to flip back
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Navigation ── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 380, marginTop: 20, gap: 12 }}>
              <motion.button
                onClick={handlePrev}
                whileTap={{ scale: 0.9 }}
                disabled={currentIndex === 0}
                style={{
                  width: 50, height: 50, borderRadius: '50%',
                  border: '2px solid var(--border-md)',
                  background: currentIndex === 0 ? 'transparent' : 'var(--surface)',
                  color: currentIndex === 0 ? 'var(--border-md)' : 'var(--text)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: currentIndex === 0 ? 'default' : 'pointer',
                  flexShrink: 0,
                }}
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </motion.button>

              <div style={{ fontFamily: "'Nunito'", fontWeight: 700, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
                {isFlipped ? 'tap card to hide' : 'tap card to reveal'}
              </div>

              <motion.button
                onClick={handleNext}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 50, height: 50, borderRadius: '50%',
                  border: 'none',
                  background: currentIndex === deck.length - 1
                    ? 'linear-gradient(135deg, #10B981, #059669)'
                    : 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                  color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: currentIndex === deck.length - 1
                    ? '0 4px 16px rgba(16,185,129,0.4)'
                    : '0 4px 16px var(--primary-glow)',
                  flexShrink: 0,
                }}
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </motion.button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
