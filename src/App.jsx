import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useParticles } from './hooks/useParticles'
import { useGameStore, useQuizStore } from './store/quizStore'
import { useStatsStore, computeLevel } from './store/statsStore'
import DashboardScreen from './screens/DashboardScreen'
import ChapterListScreen from './screens/ChapterListScreen'
import ChapterDetailScreen from './screens/ChapterDetailScreen'
import HomeScreen from './screens/HomeScreen'
import QuizScreen from './screens/QuizScreen'
import ScoreScreen from './screens/ScoreScreen'
import ReviewScreen from './screens/ReviewScreen'
import SettingsScreen from './screens/SettingsScreen'
import BottomNav from './components/BottomNav'
import XPToast from './components/XPToast'
import LevelUpModal from './components/LevelUpModal'
import './index.css'

const SCREENS = {
  dashboard: 'dashboard',
  chapters: 'chapters',
  chapterDetail: 'chapterDetail',
  custom: 'custom',
  quiz: 'quiz',
  score: 'score',
  review: 'review',
  settings: 'settings',
}

const NAV_SCREENS = new Set(['dashboard', 'chapters', 'chapterDetail', 'custom', 'settings'])

export default function App() {
  // Navigation state
  const [screen, setScreen] = useState(SCREENS.dashboard)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [scoreBackTo, setScoreBackTo] = useState('dashboard') // where score → back goes
  const [reviewQuizId, setReviewQuizId] = useState(null)
  const [reviewBack, setReviewBack] = useState('score')

  // Gamification state
  const [xpToast, setXpToast] = useState({ show: false, xp: 0 })
  const [quitModal, setQuitModal] = useState(false)
  const [levelUp, setLevelUp] = useState({ show: false, from: 0, to: 0 })

  const { canvasRef, burst, perfectBurst } = useParticles()
  const theme = useStatsStore((s) => s.theme)

  useEffect(() => {
    document.body.className = theme === 'neon' ? 'theme-neon' : ''
  }, [theme])

  const startGame = useGameStore((s) => s.startGame)
  const updateStats = useQuizStore((s) => s.updateStats)
  const { quizId, score, shuffled } = useGameStore()
  const getQuiz = useQuizStore((s) => s.getQuiz)
  const totalXp = useStatsStore((s) => s.totalXp)

  // Start a quiz from anywhere
  const handleStart = useCallback((quiz, shuffle, backTo) => {
    startGame(quiz, shuffle)
    setScoreBackTo(backTo || activeTab)
    setScreen(SCREENS.quiz)
  }, [startGame, activeTab])

  // Finish quiz → record XP, show toast/levelup
  const handleFinish = useCallback(() => {
    const prevLevel = computeLevel(totalXp)
    const xpEarned = updateStats(quizId, score)
    const newLevel = computeLevel(useStatsStore.getState().totalXp)

    if (xpEarned > 0) setXpToast({ show: true, xp: xpEarned })
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

  const handlePlayAgain = useCallback(() => {
    const quiz = useGameStore.getState().activeQuiz
    if (quiz) handleStart(quiz, shuffled, scoreBackTo)
  }, [shuffled, handleStart, scoreBackTo])

  const handleOpenReview = useCallback((id, back) => {
    setReviewQuizId(id)
    setReviewBack(back || 'score')
    setScreen(SCREENS.review)
  }, [])

  // Tab switching
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab)
    setScreen(tab)
  }, [])

  // Chapter selection
  const handleSelectChapter = useCallback((chapter) => {
    setSelectedChapter(chapter)
    setScreen(SCREENS.chapterDetail)
  }, [])

  const handleBackFromChapter = useCallback(() => {
    setScreen(SCREENS.chapters)
    setActiveTab('chapters')
  }, [])

  // Score back navigation
  const handleScoreBack = useCallback(() => {
    if (scoreBackTo === 'chapterDetail' && selectedChapter) {
      setScreen(SCREENS.chapterDetail)
    } else {
      const tab = NAV_SCREENS.has(scoreBackTo) ? scoreBackTo : 'dashboard'
      setActiveTab(tab)
      setScreen(tab)
    }
  }, [scoreBackTo, selectedChapter])

  const showNav = NAV_SCREENS.has(screen)

  return (
    <div style={{ minHeight: '100dvh', position: 'relative', overflow: 'hidden' }}>
      <div className="grid-bg" />
      <div className="orb" style={{ width: 500, height: 500, background: '#7C3AED', top: -150, right: -150, opacity: 0.15 }} />
      <div className="orb" style={{ width: 350, height: 350, background: '#C4B5FD', bottom: -80, left: -80, opacity: 0.12 }} />
      <canvas ref={canvasRef} id="particle-canvas" />

      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>

        {screen === SCREENS.dashboard && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <DashboardScreen onNavigate={handleTabChange} />
          </motion.div>
        )}

        {screen === SCREENS.chapters && (
          <motion.div key="chapters" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <ChapterListScreen onSelect={handleSelectChapter} />
          </motion.div>
        )}

        {screen === SCREENS.chapterDetail && selectedChapter && (
          <motion.div key="chapterDetail" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
            <ChapterDetailScreen
              chapter={selectedChapter}
              onStart={(quiz, shuffle) => handleStart(quiz, shuffle, 'chapterDetail')}
              onBack={handleBackFromChapter}
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
              onHome={handleScoreBack}
              onDashboard={() => { setActiveTab('dashboard'); setScreen(SCREENS.dashboard) }}
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

      </AnimatePresence>

      {showNav && <BottomNav active={activeTab} onChange={handleTabChange} />}

      <XPToast xp={xpToast.xp} show={xpToast.show} onDone={() => setXpToast({ show: false, xp: 0 })} />
      <LevelUpModal fromLevel={levelUp.from} toLevel={levelUp.to} show={levelUp.show} onClose={() => setLevelUp({ show: false, from: 0, to: 0 })} />

      {/* ── Quit Confirmation Modal ── */}
      <AnimatePresence>
        {quitModal && (
          <>
            <motion.div
              key="quit-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setQuitModal(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 400,
                background: 'rgba(15,10,40,0.55)',
                backdropFilter: 'blur(6px)',
              }}
            />
            <motion.div
              key="quit-modal"
              initial={{ scale: 0.9, y: '-50%', x: '-50%', opacity: 0 }}
              animate={{ scale: 1, y: '-50%', x: '-50%', opacity: 1 }}
              exit={{ scale: 0.9, y: '-50%', x: '-50%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              style={{
                position: 'fixed', top: '50%', left: '50%',
                width: 'calc(100% - 48px)', maxWidth: 340, zIndex: 401,
                background: '#fff',
                borderRadius: '24px',
                padding: '32px 24px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>🚪</div>
              <div style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>
                Quit Quiz?
              </div>
              <div style={{ fontFamily: "'Nunito'", fontSize: 14, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 28, lineHeight: 1.5 }}>
                Your progress on this quiz will be lost.<br />XP won't be saved.
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setQuitModal(false)}
                  style={{
                    flex: 1, padding: '14px 0',
                    background: 'rgba(124,58,237,0.08)',
                    border: '2px solid var(--border-md)',
                    borderRadius: 14,
                    fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15,
                    color: 'var(--primary)', cursor: 'pointer',
                  }}
                >
                  Keep Going
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={confirmQuit}
                  style={{
                    flex: 1, padding: '14px 0',
                    background: 'linear-gradient(135deg, #DC2626, #EF4444)',
                    border: 'none',
                    borderRadius: 14,
                    fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15,
                    color: '#fff', cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(239,68,68,0.35)',
                  }}
                >
                  Quit
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
