import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useParticles } from './hooks/useParticles'
import { useGameStore, useQuizStore } from './store/quizStore'
import { useStatsStore, computeLevel } from './store/statsStore'
import { getVocabForChapter } from './utils/vocabQuizGen'
import DashboardScreen from './screens/DashboardScreen'
import PathScreen from './screens/PathScreen'
import ChapterDetailScreen from './screens/ChapterDetailScreen'
import HomeScreen from './screens/HomeScreen'
import QuizScreen from './screens/QuizScreen'
import FlashcardScreen from './screens/FlashcardScreen'
import ScoreScreen from './screens/ScoreScreen'
import ReviewScreen from './screens/ReviewScreen'
import SettingsScreen from './screens/SettingsScreen'
import BottomNav from './components/BottomNav'
import LevelUpModal from './components/LevelUpModal'
import QuitModal from './components/QuitModal'
import './index.css'

const SCREENS = {
  learn: 'learn',
  dashboard: 'dashboard',
  chapterDetail: 'chapterDetail',
  custom: 'custom',
  quiz: 'quiz',
  score: 'score',
  review: 'review',
  settings: 'settings',
  flashcard: 'flashcard',
}

const NAV_SCREENS = new Set(['learn', 'dashboard', 'chapterDetail', 'custom', 'settings'])

// Readable kana for learned word ids like 'ch12-n01'
function wordLabel(wordId) {
  const m = wordId.match(/^ch(\d+)-(.+)$/)
  if (!m) return wordId
  const w = getVocabForChapter(Number(m[1])).find((x) => x.id === m[2])
  return w ? (w.kanji || w.kana).replace(/〜/g, '') : wordId
}

export default function App() {
  // Navigation state
  const [screen, setScreen] = useState(SCREENS.learn)
  const [activeTab, setActiveTab] = useState('learn')
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [scoreBackTo, setScoreBackTo] = useState('learn') // where score → back goes
  const [reviewQuizId, setReviewQuizId] = useState(null)
  const [reviewBack, setReviewBack] = useState('score')
  const [flashcardConfig, setFlashcardConfig] = useState(null) // { chapter, category, direction }
  const [flashcardBack, setFlashcardBack] = useState('learn')

  // Gamification state
  const [lastResult, setLastResult] = useState(null) // { xp, learnedWords, newMistakes, goalJustMet }
  const [quitModal, setQuitModal] = useState(false)
  const [levelUp, setLevelUp] = useState({ show: false, from: 0, to: 0 })

  const { canvasRef, burst, perfectBurst } = useParticles()
  const theme = useStatsStore((s) => s.theme)

  // 'system' follows prefers-color-scheme; 'light'/'dark' pin the palette (see index.css tokens)
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light' || theme === 'dark') root.dataset.theme = theme
    else delete root.dataset.theme
  }, [theme])

  const startGame = useGameStore((s) => s.startGame)
  const updateStats = useQuizStore((s) => s.updateStats)
  const { quizId, score, shuffled } = useGameStore()
  const totalXp = useStatsStore((s) => s.totalXp)

  // Start a quiz from anywhere
  const handleStart = useCallback((quiz, shuffle, backTo) => {
    startGame(quiz, shuffle)
    setScoreBackTo(backTo || activeTab)
    setScreen(SCREENS.quiz)
  }, [startGame, activeTab])

  // Finish quiz → record XP/streak, collect what changed for the lesson-complete screen
  const handleFinish = useCallback(() => {
    const before = useStatsStore.getState()
    const prevLevel = computeLevel(totalXp)
    const prevLearned = new Set(before.learnedBank.map((e) => e.wordId))
    const prevBankKeys = new Set(before.wrongBank.map((e) => e.key))
    const xpEarned = updateStats(quizId, score)
    const after = useStatsStore.getState()
    const newLevel = computeLevel(after.totalXp)

    setLastResult({
      xp: xpEarned,
      learnedWords: after.learnedBank.filter((e) => !prevLearned.has(e.wordId)).map((e) => wordLabel(e.wordId)),
      newMistakes: after.wrongBank.filter((e) => !prevBankKeys.has(e.key)).length,
      goalJustMet: after.lastGoalDate !== before.lastGoalDate,
    })
    if (newLevel > prevLevel) {
      setTimeout(() => setLevelUp({ show: true, from: prevLevel, to: newLevel }), 1800)
    }
    setScreen(SCREENS.score)
  }, [quizId, score, totalXp, updateStats])

  const handleQuit = useCallback(() => {
    setQuitModal(true)
  }, [])

  const confirmQuit = useCallback(() => {
    setQuitModal(false)
    if (NAV_SCREENS.has(scoreBackTo)) {
      setActiveTab(scoreBackTo)
    }
    setScreen(scoreBackTo)
  }, [scoreBackTo])

  const handleSubmitEarly = useCallback(() => {
    setQuitModal(false)
    handleFinish()
  }, [handleFinish])

  const handlePlayAgain = useCallback(() => {
    const quiz = useGameStore.getState().activeQuiz
    if (quiz) handleStart(quiz, shuffled, scoreBackTo)
  }, [shuffled, handleStart, scoreBackTo])

  const handleFlashcard = useCallback(({ chapter, category, direction }, back = 'learn') => {
    setFlashcardConfig({ chapter, category, direction })
    setFlashcardBack(back)
    setScreen(SCREENS.flashcard)
  }, [])

  const handleOpenReview = useCallback((id, back) => {
    setReviewQuizId(id)
    setReviewBack(back || 'score')
    setScreen(SCREENS.review)
  }, [])

  // Tab switching
  const handleTabChange = useCallback((tab) => {
    const t = tab === 'chapters' ? 'learn' : tab
    setActiveTab(t)
    setScreen(t)
  }, [])

  // Chapter selection
  const handleSelectChapter = useCallback((chapter) => {
    setSelectedChapter(chapter)
    setScreen(SCREENS.chapterDetail)
  }, [])

  const handleBackFromChapter = useCallback(() => {
    setScreen(SCREENS.learn)
    setActiveTab('learn')
  }, [])

  // Score back navigation
  const handleScoreBack = useCallback(() => {
    if (scoreBackTo === 'chapterDetail' && selectedChapter) {
      setScreen(SCREENS.chapterDetail)
    } else {
      const tab = NAV_SCREENS.has(scoreBackTo) ? scoreBackTo : 'learn'
      setActiveTab(tab)
      setScreen(tab)
    }
  }, [scoreBackTo, selectedChapter])

  const showNav = NAV_SCREENS.has(screen)

  return (
    <div style={{ minHeight: '100dvh', position: 'relative', overflow: 'clip' }}>
      <canvas ref={canvasRef} id="particle-canvas" />

      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>

        {screen === SCREENS.dashboard && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <DashboardScreen onNavigate={handleTabChange} onStart={(quiz, shuffle) => handleStart(quiz, shuffle, 'dashboard')} />
          </motion.div>
        )}

        {screen === SCREENS.learn && (
          <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <PathScreen
              onStartQuiz={(quiz, shuffle) => handleStart(quiz, shuffle, 'learn')}
              onFlashcard={(cfg) => handleFlashcard(cfg, 'learn')}
              onOpenChapter={handleSelectChapter}
              onNavigate={handleTabChange}
            />
          </motion.div>
        )}

        {screen === SCREENS.chapterDetail && selectedChapter && (
          <motion.div key="chapterDetail" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
            <ChapterDetailScreen
              chapter={selectedChapter}
              onStart={(quiz, shuffle) => handleStart(quiz, shuffle, 'chapterDetail')}
              onBack={handleBackFromChapter}
              onFlashcard={(cfg) => handleFlashcard(cfg, 'chapterDetail')}
            />
          </motion.div>
        )}

        {screen === SCREENS.custom && (
          <motion.div key="custom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <HomeScreen
              onStart={(quiz, shuffle) => handleStart(quiz, shuffle, 'custom')}
              onReview={(id) => handleOpenReview(id, 'score')}
            />
          </motion.div>
        )}

        {screen === SCREENS.quiz && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <QuizScreen onFinish={handleFinish} onQuit={handleQuit} burst={burst} />
          </motion.div>
        )}

        {screen === SCREENS.score && (
          <motion.div key="score" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <ScoreScreen
              onReview={() => handleOpenReview(quizId, 'score')}
              onPlayAgain={handlePlayAgain}
              result={lastResult}
              onContinue={handleScoreBack}
              burst={burst}
              perfectBurst={perfectBurst}
            />
          </motion.div>
        )}

        {screen === SCREENS.review && (
          <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <ReviewScreen
              quizId={reviewQuizId}
              onBack={() => setScreen(reviewBack === 'score' ? SCREENS.score : SCREENS.dashboard)}
            />
          </motion.div>
        )}

        {screen === SCREENS.settings && (
          <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <SettingsScreen />
          </motion.div>
        )}

        {screen === SCREENS.flashcard && flashcardConfig && (
          <motion.div key="flashcard" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
            <FlashcardScreen
              chapter={flashcardConfig.chapter}
              category={flashcardConfig.category}
              direction={flashcardConfig.direction}
              onBack={() => { if (flashcardBack === 'chapterDetail' && selectedChapter) setScreen(SCREENS.chapterDetail); else handleTabChange('learn') }}
            />
          </motion.div>
        )}

      </AnimatePresence>

      {showNav && <BottomNav active={activeTab} onChange={handleTabChange} />}

      <LevelUpModal fromLevel={levelUp.from} toLevel={levelUp.to} show={levelUp.show} onClose={() => setLevelUp({ show: false, from: 0, to: 0 })} />

      <QuitModal show={quitModal} onCancel={() => setQuitModal(false)} onQuit={confirmQuit} onSubmit={handleSubmitEarly} />
    </div>
  )
}
