import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { genkiQuizzes } from '../data/genkiQuizzes'
import { ch1DesuQuiz, ch1KaQuiz, ch1NoQuiz } from '../data/ch1Grammar'
import { ch11TaiQuiz, ch11TariQuiz, ch11KotoQuiz, ch11YaQuiz } from '../data/ch11Grammar'
import { useStatsStore } from './statsStore'

const builtinQuizzes = [
  ...genkiQuizzes,
  // Ch.1
  ch1DesuQuiz, ch1KaQuiz, ch1NoQuiz,
  // Ch.11
  ch11TaiQuiz, ch11TariQuiz, ch11KotoQuiz, ch11YaQuiz,
]



export const useQuizStore = create(
  persist(
    (set, get) => ({
      quizzes: builtinQuizzes,

      addQuiz: (quiz) => {
        const newQuiz = {
          ...quiz,
          id: `quiz_${Date.now()}`,
          created: new Date().toISOString().slice(0, 10),
          playCount: 0,
          bestScore: null,
        }
        set((state) => ({ quizzes: [newQuiz, ...state.quizzes] }))
        return newQuiz.id
      },

      removeQuiz: (id) => {
        set((state) => ({ quizzes: state.quizzes.filter((q) => q.id !== id) }))
      },

      resetQuizzesProgress: () => {
        set((state) => ({
          quizzes: state.quizzes.map((q) => ({ ...q, playCount: 0, bestScore: null })),
        }))
      },

      updateStats: (id, score) => {
        const gameState = useGameStore.getState()
        const activeQuiz = gameState.activeQuiz
        const quiz = get().quizzes.find((q) => q.id === id) || activeQuiz
        const total = quiz?.questions?.length || 0

        const isPractice = id.startsWith('practice_')

        // Correctly answered questions → remove from bank (mastered)
        const correctQuestions = gameState.answers
          .filter((a) => a.correct)
          .map((a) => gameState.questions[a.questionIdx])
          .filter(Boolean)
        if (correctQuestions.length > 0) {
          const correctKeys = correctQuestions.map((q) =>
            q._bankKey ?? `${id}-${q.id ?? q.question.slice(0, 30)}`
          )
          useStatsStore.getState().removeFromBank(correctKeys)
        }

        // Wrong answers → add to bank, but NOT for practice quizzes (already in bank)
        if (!isPractice) {
          const wrongQuestions = gameState.answers
            .filter((a) => !a.correct)
            .map((a) => gameState.questions[a.questionIdx])
            .filter(Boolean)
          if (wrongQuestions.length > 0) {
            useStatsStore.getState().addWrongAnswers(id, quiz?.title || 'Quiz', wrongQuestions)
          }
        }

        // Fire XP / streak via statsStore
        const xpEarned = useStatsStore.getState().recordResult(id, score, total)
        set((state) => ({
          quizzes: state.quizzes.map((q) =>
            q.id === id
              ? {
                  ...q,
                  playCount: (q.playCount || 0) + 1,
                  bestScore:
                    q.bestScore === null || score > q.bestScore
                      ? score
                      : q.bestScore,
                }
              : q
          ),
        }))
        return xpEarned
      },

      getQuiz: (id) => get().quizzes.find((q) => q.id === id),
    }),
    {
      name: 'nihongo-quiz-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ quizzes: state.quizzes }),
      merge: (persisted, current) => {
        const builtinMap = new Map(builtinQuizzes.map((q) => [q.id, q]))
        // For builtin quizzes: always use latest questions/metadata, but keep user's playCount + bestScore
        const merged = (persisted.quizzes || []).map((q) => {
          const builtin = builtinMap.get(q.id)
          if (builtin) return { ...builtin, playCount: q.playCount, bestScore: q.bestScore }
          return q // user-imported quiz — keep as-is
        })
        // Add any brand-new builtins not yet in persisted
        const persistedIds = new Set(persisted.quizzes?.map((q) => q.id) || [])
        const newBuiltins = builtinQuizzes.filter((q) => !persistedIds.has(q.id))
        return { ...current, ...persisted, quizzes: [...merged, ...newBuiltins] }
      },
    }
  )
)

// Game state (not persisted)
export const useGameStore = create((set) => ({
  quizId: null,
  activeQuiz: null,
  questions: [],
  currentIndex: 0,
  score: 0,
  answers: [],
  shuffled: false,
  phase: 'idle', // idle | playing | answered | finished

  startGame: (quiz, shuffle) => {
    let questions = [...quiz.questions]
    if (shuffle) {
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[questions[i], questions[j]] = [questions[j], questions[i]]
      }
    }
    set({
      quizId: quiz.id,
      activeQuiz: quiz,
      questions,
      currentIndex: 0,
      score: 0,
      answers: [],
      shuffled: shuffle,
      phase: 'playing',
    })
  },

  submitAnswer: (choiceIdx) => {
    const state = useGameStore.getState()
    const q = state.questions[state.currentIndex]
    const correct = choiceIdx === q.correct
    set((s) => ({
      score: correct ? s.score + 1 : s.score,
      answers: [...s.answers, { questionIdx: s.currentIndex, chosen: choiceIdx, correct }],
      phase: 'answered',
    }))
    return correct
  },

  nextQuestion: () => {
    const state = useGameStore.getState()
    const next = state.currentIndex + 1
    if (next >= state.questions.length) {
      set({ phase: 'finished' })
    } else {
      set({ currentIndex: next, phase: 'playing' })
    }
  },

  resetGame: () => set({ quizId: null, activeQuiz: null, questions: [], currentIndex: 0, score: 0, answers: [], phase: 'idle' }),
}))
