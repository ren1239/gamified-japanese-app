import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { genkiQuizzes } from '../data/genkiQuizzes'
import { ch11TeformQuiz, ch11GivingQuiz, ch11TaiQuiz, ch11TariQuiz, ch11KotoQuiz, ch11YaQuiz } from '../data/ch11Grammar'
import { useStatsStore } from './statsStore'

const builtinQuizzes = [...genkiQuizzes, ch11TeformQuiz, ch11GivingQuiz, ch11TaiQuiz, ch11TariQuiz, ch11KotoQuiz, ch11YaQuiz]



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

      updateStats: (id, score) => {
        const quiz = get().quizzes.find((q) => q.id === id)
        const total = quiz?.questions?.length || 0
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
      // Merge persisted quizzes with sample quizzes (add samples if not present)
      merge: (persisted, current) => {
        const persistedIds = new Set(persisted.quizzes?.map((q) => q.id) || [])
        const newSamples = builtinQuizzes.filter((s) => !persistedIds.has(s.id))
        return {
          ...current,
          ...persisted,
          quizzes: [...(persisted.quizzes || []), ...newSamples],
        }
      },
    }
  )
)

// Game state (not persisted)
export const useGameStore = create((set) => ({
  quizId: null,
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

  resetGame: () => set({ quizId: null, questions: [], currentIndex: 0, score: 0, answers: [], phase: 'idle' }),
}))
