import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useParticles } from './hooks/useParticles'
import { useGameStore, useQuizStore } from './store/quizStore'
import { useStatsStore, computeLevel } from './store/statsStore'
import { getVocabForChapter } from './utils/vocabQuizGen'
import { syncReminders } from './utils/push'
import { restoreVideoFolder } from './utils/videoSource'
import DashboardScreen from './screens/DashboardScreen'
import PathScreen from './screens/PathScreen'
import ChapterDetailScreen from './screens/ChapterDetailScreen'
import HomeScreen from './screens/HomeScreen'
import QuizScreen from './screens/QuizScreen'
import FlashcardScreen from './screens/FlashcardScreen'
import ScoreScreen from './screens/ScoreScreen'
import ReviewScreen from './screens/ReviewScreen'
import SettingsScreen from './screens/SettingsScreen'
import LessonsScreen from './screens/LessonsScreen'
import LessonScreen from './screens/LessonScreen'
import PlayerScreen from './screens/PlayerScreen'
import BottomNav from './components/BottomNav'
import LevelUpModal from './components/LevelUpModal'
import QuitModal from './components/QuitModal'
import WelcomeSplash from './components/WelcomeSplash'
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
  lessons: 'lessons', // 授業 tab: lesson videos
  lesson: 'lesson',
  player: 'player',
}

const NAV_SCREENS = new Set(['learn', 'lessons', 'lesson', 'dashboard', 'chapterDetail', 'custom', 'settings'])

// Readable kana for learned word ids like 'ch12-n01'
function wordLabel(wordId) {
  const m = wordId.match(/^ch(\d+)-(.+)$/)
  if (!m) return wordId
  const w = getVocabForChapter(Number(m[1])).find((x) => x.id === m[2])
  return w ? (w.kanji || w.kana).replace(/〜/g, '') : wordId
}

export default function App() {
  // Navigation state
  // A reminder notification can deep-link to a tab (/?tab=review)
  const initialTab = (() => {
    const t = new URLSearchParams(window.location.search).get('tab')
    return t === 'review' ? 'custom' : 'lessons' // Lessons (videos) is home; Practice is free play
  })()
  // Welcome-back hero on launch (skipped when a notification deep-links straight to a tab)
  const [showWelcome, setShowWelcome] = useState(initialTab === 'lessons')
  const dismissWelcome = useCallback(() => setShowWelcome(false), [])
  const [screen, setScreen] = useState(initialTab)
  const [activeTab, setActiveTab] = useState(initialTab)
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [scoreBackTo, setScoreBackTo] = useState('learn') // where score → back goes
  const [reviewQuizId, setReviewQuizId] = useState(null)
  const [reviewBack, setReviewBack] = useState('score')
  const [flashcardConfig, setFlashcardConfig] = useState(null) // { chapter, category, direction }
  const [flashcardBack, setFlashcardBack] = useState('learn')
  const [lessonNum, setLessonNum] = useState(null) // Lessons: open lesson
  const [player, setPlayer] = useState(null) // { lesson, type, point }

  // Gamification state
  const [lastResult, setLastResult] = useState(null) // { xp, learnedWords, newMistakes, goalJustMet }
  const [quitModal, setQuitModal] = useState(false)
  const [levelUp, setLevelUp] = useState({ show: false, from: 0, to: 0 })

  const { canvasRef, burst, perfectBurst } = useParticles()
  const theme = useStatsStore((s) => s.theme)

  // Keep the reminder server's progress snapshot fresh: on open and whenever the app is backgrounded
  useEffect(() => {
    if (window.location.search) window.history.replaceState(null, '', window.location.pathname)
    // Video-server setup link from another device (Settings → Copy setup link): read it once, then drop it from the URL
    const hash = new URLSearchParams(window.location.hash.slice(1))
    if (hash.get('media') && hash.get('k')) {
      useStatsStore.getState().setMediaServer({ url: hash.get('media'), key: hash.get('k') })
      window.history.replaceState(null, '', window.location.pathname)
    }
    syncReminders()
    restoreVideoFolder().catch(() => {}) // reopen the lesson-video folder picked in Settings, if still allowed
    const onHide = () => { if (document.visibilityState === 'hidden') syncReminders() }
    document.addEventListener('visibilitychange', onHide)
    return () => document.removeEventListener('visibilitychange', onHide)
  }, [])

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
    syncReminders()
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

  // Lessons (videos)
  const handleOpenLesson = useCallback((n) => {
    setLessonNum(n)
    setActiveTab('lessons')
    setScreen(SCREENS.lesson)
  }, [])

  const handlePlay = useCallback(({ lesson, type, point = null }) => {
    setLessonNum(lesson)
    setPlayer({ lesson, type, point })
    setScreen(SCREENS.player)
  }, [])

  // Leaving the player for a quiz or flashcards: come back to where you were, not the tapped point
  const leavePlayerFor = useCallback(() => setPlayer((p) => (p ? { ...p, point: null } : p)), [])

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
    } else if ((scoreBackTo === 'lesson' && lessonNum) || (scoreBackTo === 'player' && player)) {
      setActiveTab('lessons')
      setScreen(scoreBackTo)
    } else {
      const tab = NAV_SCREENS.has(scoreBackTo) ? scoreBackTo : 'learn'
      setActiveTab(tab)
      setScreen(tab)
    }
  }, [scoreBackTo, selectedChapter, lessonNum, player])

  const showNav = NAV_SCREENS.has(screen)

  return (
    <div className={showNav ? 'has-nav' : undefined} style={{ minHeight: '100dvh', position: 'relative', overflow: 'clip' }}>
      <canvas ref={canvasRef} id="particle-canvas" />

      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>

        {screen === SCREENS.dashboard && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <DashboardScreen onNavigate={handleTabChange} />
          </motion.div>
        )}

        {screen === SCREENS.learn && (
          <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <PathScreen
              onStartQuiz={(quiz, shuffle) => handleStart(quiz, shuffle, 'learn')}
              onFlashcard={(cfg) => handleFlashcard(cfg, 'learn')}
              onOpenChapter={handleSelectChapter}
              onOpenLesson={handleOpenLesson}
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

        {screen === SCREENS.lessons && (
          <motion.div key="lessons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <LessonsScreen onOpenLesson={handleOpenLesson} onPlay={handlePlay} onNavigate={handleTabChange} />
          </motion.div>
        )}

        {screen === SCREENS.lesson && lessonNum && (
          <motion.div key="lesson" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
            <LessonScreen
              lesson={lessonNum}
              onBack={() => handleTabChange('lessons')}
              onPlay={handlePlay}
              onStartQuiz={(quiz) => handleStart(quiz, false, 'lesson')}
              onFlashcard={(cfg) => handleFlashcard(cfg, 'lesson')}
            />
          </motion.div>
        )}

        {screen === SCREENS.player && player && (
          <motion.div key="player" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <PlayerScreen
              lesson={player.lesson}
              type={player.type}
              startPoint={player.point}
              onBack={() => { setActiveTab('lessons'); setScreen(SCREENS.lesson) }}
              onStartQuiz={(quiz) => { leavePlayerFor(); handleStart(quiz, false, 'player') }}
              onFlashcard={(cfg) => { leavePlayerFor(); handleFlashcard(cfg, 'player') }}
            />
          </motion.div>
        )}

        {screen === SCREENS.flashcard && flashcardConfig && (
          <motion.div key="flashcard" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
            <FlashcardScreen
              chapter={flashcardConfig.chapter}
              category={flashcardConfig.category}
              direction={flashcardConfig.direction}
              onBack={() => {
                if (flashcardBack === 'chapterDetail' && selectedChapter) setScreen(SCREENS.chapterDetail)
                else if (flashcardBack === 'lesson' || flashcardBack === 'player') setScreen(flashcardBack)
                else handleTabChange('learn')
              }}
            />
          </motion.div>
        )}

      </AnimatePresence>

      {showNav && <BottomNav active={activeTab} onChange={handleTabChange} />}

      <LevelUpModal fromLevel={levelUp.from} toLevel={levelUp.to} show={levelUp.show} onClose={() => setLevelUp({ show: false, from: 0, to: 0 })} />

      <AnimatePresence>
        {showWelcome && <WelcomeSplash key="welcome" onDone={dismissWelcome} />}
      </AnimatePresence>

      <QuitModal show={quitModal} onCancel={() => setQuitModal(false)} onQuit={confirmQuit} onSubmit={handleSubmitEarly} />
    </div>
  )
}
