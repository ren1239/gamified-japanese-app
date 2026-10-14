import { useState, useCallback, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import { getWordsForChapterAndCategory, buildWordQuestion } from '../utils/vocabQuizGen'
import { useStatsStore } from '../store/statsStore'
import { toRomajiSafe } from '../utils/romaji'
import { canSpeak, speakJapanese } from '../utils/speech'
import Icon from '../components/Icon'
import Mascot from '../components/Mascot'
import RomajiToggle from '../components/RomajiToggle'
import ChipGroup from '../components/ChipGroup'

const CAT_LABEL = { all: 'All words', noun: 'Nouns', verb: 'Verbs', other: 'Adjectives & expressions' }
const MODES = [
  { id: 'jp-en', label: 'JP → EN' },
  { id: 'en-jp', label: 'EN → JP' },
  { id: 'kanji', label: 'Kanji' },
]
const SWIPE = 110

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const clean = (kana) => kana.replace(/〜/g, '')

// Flashcards with self-grading. "I knew it" counts as a correct answer toward "learned"
// (2 in a row); "Still learning" counts as a miss and puts the word into the review schedule.
export default function FlashcardScreen({ chapter, category, direction, onBack }) {
  const allWords = useMemo(() => getWordsForChapterAndCategory(chapter.number, category), [chapter.number, category])
  const kanjiWords = useMemo(() => allWords.filter((w) => w.kanji), [allWords])
  const [mode, setMode] = useState(direction === 'en-jp' ? 'en-jp' : 'jp-en')
  const [shuffled, setShuffled] = useState(true)
  const [deck, setDeck] = useState(() => shuffle(allWords))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [results, setResults] = useState({}) // word.id -> 'knew' | 'learning'
  const [done, setDone] = useState(false)

  const autoSpeak = useStatsStore((s) => s.autoSpeak)
  const showRomaji = useStatsStore((s) => s.showRomaji)
  const learnedBank = useStatsStore((s) => s.learnedBank)
  const recordVocabAnswer = useStatsStore((s) => s.recordVocabAnswer)
  const applyAnswersToBank = useStatsStore((s) => s.applyAnswersToBank)

  const card = deck[index]
  const learnedSet = useMemo(() => new Set(learnedBank.map((e) => e.wordId)), [learnedBank])
  const totalLearned = allWords.filter((w) => learnedSet.has(`ch${chapter.number}-${w.id}`)).length
  const wordsForMode = (m) => (m === 'kanji' && kanjiWords.length ? kanjiWords : allWords)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const knewOpacity = useTransform(x, [20, SWIPE], [0, 1])
  const learningOpacity = useTransform(x, [-SWIPE, -20], [1, 0])

  const startDeck = (words, doShuffle = shuffled) => {
    setDeck(doShuffle ? shuffle(words) : words)
    setIndex(0)
    setFlipped(false)
    setResults({})
    setDone(false)
    x.set(0)
  }
  const changeMode = (m) => {
    if (m === 'kanji' && !kanjiWords.length) return
    setMode(m)
    startDeck(wordsForMode(m))
  }
  const toggleShuffle = () => {
    const next = !shuffled
    setShuffled(next)
    startDeck(wordsForMode(mode), next)
  }

  // What each face shows for the current mode
  const faces = useMemo(() => {
    if (!card) return null
    const jp = card.kanji ? `${card.kana}（${card.kanji}）` : card.kana
    if (mode === 'en-jp') return { front: { kind: 'en', text: card.english }, back: { kind: 'jp', text: jp, reading: card.kana } }
    if (mode === 'kanji') return { front: { kind: 'jp', text: card.kanji || card.kana, reading: card.kana, hideRomaji: true }, back: { kind: 'reading', text: card.kana, sub: card.english, reading: card.kana } }
    return { front: { kind: 'jp', text: jp, reading: card.kana }, back: { kind: 'en', text: card.english, reading: card.kana } }
  }, [card, mode])

  // Read the word aloud when its Japanese side is showing
  useEffect(() => {
    if (!autoSpeak || !card || done) return
    const jpShowing = mode === 'jp-en' ? !flipped : flipped
    if (jpShowing) speakJapanese(clean(card.kana))
  }, [card, flipped, mode, autoSpeak, done])

  const flip = useCallback(() => setFlipped((f) => !f), [])

  const grade = useCallback((knew) => {
    if (!card) return
    recordVocabAnswer(`ch${chapter.number}-${card.id}`, chapter.number, knew)
    const question = buildWordQuestion(card, chapter.number, mode === 'en-jp' ? 'en-jp' : 'jp-en')
    applyAnswersToBank([{ quizId: question._sourceQuizId, quizTitle: question._sourceQuizTitle, question, correct: knew }])
    setResults((r) => ({ ...r, [card.id]: knew ? 'knew' : 'learning' }))
    animate(x, knew ? 420 : -420, { duration: 0.2 }).then(() => {
      x.set(0)
      setFlipped(false)
      if (index < deck.length - 1) setIndex((i) => i + 1)
      else setDone(true)
    })
  }, [card, chapter.number, mode, index, deck.length, recordVocabAnswer, applyAnswersToBank, x])

  const back = useCallback(() => {
    if (index === 0) return
    setIndex((i) => i - 1)
    setFlipped(false)
  }, [index])

  // Keys: Space/Enter flip · → knew · ← still learning · Backspace previous
  useEffect(() => {
    const onKey = (e) => {
      if (done) return
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip() }
      else if (e.key === 'ArrowRight') grade(true)
      else if (e.key === 'ArrowLeft') grade(false)
      else if (e.key === 'Backspace') back()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flip, grade, back, done])

  const knewCount = Object.values(results).filter((r) => r === 'knew').length
  const learningIds = Object.entries(results).filter(([, r]) => r === 'learning').map(([id]) => id)

  if (!allWords.length) {
    return (
      <div className="page flash-page" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Mascot who="nori" mood="think" size={90} />
        <p className="tab-sub">No words in this group.</p>
        <button type="button" className="btn btn-ghost" onClick={onBack}>Go back</button>
      </div>
    )
  }

  const renderFace = (f, side) => {
    const romaji = f.reading ? toRomajiSafe(f.reading) : null
    const showR = romaji && (side === 'back' ? f.kind !== 'en' || showRomaji : showRomaji && !f.hideRomaji && f.kind !== 'en')
    return (
      <div className={`flash-face ${side} ${f.kind}`}>
        <span className="flash-face-label">{f.kind === 'en' ? 'English' : f.kind === 'reading' ? 'Reading' : 'Japanese'}</span>
        {f.kind === 'en' ? <span className="flash-en">{f.text}</span> : <span className="flash-jp jp">{f.text}</span>}
        {f.kind === 'reading' && <span className="flash-sub">{f.sub}</span>}
        {f.kind === 'en' && side === 'back' && <span className="flash-romaji jp">{f.reading}</span>}
        {showR && <span className="flash-romaji">{romaji}</span>}
        {side === 'front' && <span className="flash-hint">Tap to flip · swipe to grade</span>}
      </div>
    )
  }

  return (
    <div className="page flash-page">
      <header className="flash-top">
        <button type="button" className="lesson-icon-btn" onClick={onBack} aria-label="Back"><Icon name="back" size={22} /></button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="answer-review-title">Flashcards · Ch.{chapter.number}</div>
          <div className="answer-review-sub">{CAT_LABEL[category] ?? category} · {totalLearned}/{allWords.length} learned</div>
        </div>
        <RomajiToggle />
      </header>

      <div className="flash-controls">
        <ChipGroup options={MODES.map((m) => (m.id === 'kanji' && !kanjiWords.length ? { ...m, label: 'Kanji (none here)' } : m))} value={mode} onChange={changeMode} />
        <button type="button" className={`flash-shuffle ${shuffled ? 'on' : ''}`} onClick={toggleShuffle} aria-pressed={shuffled} title={shuffled ? 'Shuffled' : 'Textbook order'}>
          <Icon name="shuffle" size={18} />
        </button>
      </div>

      {!done && card ? (
        <>
          <div className="flash-meta">
            <div className="lesson-bar"><i style={{ width: `${Math.max((index / deck.length) * 100, 3)}%` }} /></div>
            <span>{index + 1} / {deck.length}</span>
          </div>

          <div className="flash-stage">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={`${mode}-${card.id}-${index}`}
                className="flash-card-wrap"
                style={{ x, rotate }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.9}
                onDragEnd={(_, info) => {
                  if (info.offset.x > SWIPE) grade(true)
                  else if (info.offset.x < -SWIPE) grade(false)
                }}
                initial={{ scale: 0.92, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              >
                <motion.span className="flash-stamp knew" style={{ opacity: knewOpacity }}>I knew it</motion.span>
                <motion.span className="flash-stamp learning" style={{ opacity: learningOpacity }}>Still learning</motion.span>
                <button type="button" className="flash-card" onClick={flip} aria-label={flipped ? 'Show front' : 'Show answer'}>
                  <motion.div className="flash-inner" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ type: 'spring', stiffness: 260, damping: 26 }}>
                    {renderFace(faces.front, 'front')}
                    {renderFace(faces.back, 'back')}
                  </motion.div>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flash-tools">
            <button type="button" className="lesson-icon-btn" onClick={back} disabled={index === 0} aria-label="Previous card"><Icon name="back" size={20} /></button>
            {canSpeak && <button type="button" className="flash-listen" onClick={() => speakJapanese(clean(card.kana))}><Icon name="speaker" size={18} /> Listen</button>}
            {learnedSet.has(`ch${chapter.number}-${card.id}`) && <span className="flash-learned"><Icon name="check" size={16} color="var(--success)" /> Learned</span>}
          </div>

          <div className="flash-grade">
            {flipped ? (
              <>
                <button type="button" className="btn btn-lg btn-danger" onClick={() => grade(false)}>Still learning</button>
                <button type="button" className="btn btn-lg btn-success" onClick={() => grade(true)}>I knew it</button>
              </>
            ) : (
              <button type="button" className="btn btn-lg btn-primary" style={{ gridColumn: '1 / -1' }} onClick={flip}>Show answer</button>
            )}
          </div>
          <p className="lesson-hint-line">Swipe right if you knew it, left if not · keys: space, ← →</p>
        </>
      ) : (
        <div className="celebrate-main" style={{ paddingBlock: 20 }}>
          <Mascot who="nori" mood={learningIds.length === 0 ? 'cheer' : 'happy'} size={120} className="mascot-bounce" />
          <div>
            <div className="celebrate-title">Deck complete!</div>
            <div className="celebrate-sub">{totalLearned}/{allWords.length} words learned in this group</div>
          </div>
          <div className="stat-trio" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            <div className="stat-tile" style={{ '--k': 'var(--success)' }}><small>Knew it</small><span>{knewCount}</span></div>
            <div className="stat-tile" style={{ '--k': 'var(--error)' }}><small>Still learning</small><span>{learningIds.length}</span></div>
          </div>
          {learningIds.length > 0 && <p className="celebrate-sub">The ones you&apos;re still learning were added to your reviews.</p>}
          <div className="celebrate-actions" style={{ width: '100%' }}>
            {learningIds.length > 0 && (
              <button type="button" className="btn btn-lg btn-accent" onClick={() => startDeck(allWords.filter((w) => learningIds.includes(w.id)))}>
                Go again with {learningIds.length} missed
              </button>
            )}
            <button type="button" className="btn btn-lg btn-primary" onClick={() => startDeck(wordsForMode(mode))}>Restart deck</button>
            <button type="button" className="btn btn-lg btn-ghost" onClick={onBack}>Done</button>
          </div>
        </div>
      )}
    </div>
  )
}
