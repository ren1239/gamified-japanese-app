import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { genkiQuizzes } from '../data/genkiQuizzes'
import { ch00MasuQuiz, ch00TeformQuiz, ch00ShortPastQuiz, ch00ShortNegQuiz, ch00ShortPastNegQuiz } from '../data/ch00Grammar'
import { ch1DesuQuiz, ch1KaQuiz, ch1NoQuiz } from '../data/ch1Grammar'
import { ch11TaiQuiz, ch11TariQuiz, ch11KotoQuiz, ch11YaQuiz } from '../data/ch11Grammar'
import { ch12NdesuQuiz, ch12SugiruQuiz, ch12HougaiiQuiz, ch12NodeQuiz } from '../data/ch12Grammar'
import { ch13PotentialQuiz, ch13ShiQuiz, ch13SoudesuQuiz, ch13TemiruQuiz, ch13NaraQuiz, ch13FrequencyQuiz, ch13ReviewQuiz } from '../data/ch13Grammar'
import { ch14HoshiiQuiz, ch14KamoshirenaiQuiz, ch14GivingQuiz, ch14TaradoudesuQuiz, ch14NumberMoShikaQuiz, ch14ReviewQuiz } from '../data/ch14Grammar'
import { ch15VolitionalQuiz, ch15VolitionalOmouQuiz, ch15TeokuQuiz, ch15RelativeQuiz, ch15ReviewQuiz } from '../data/ch15Grammar'
import { ch16TeageruQuiz, ch16RequestQuiz, ch16ToiiQuiz, ch16TokiQuiz, ch16SumimasenQuiz, ch16ReviewQuiz } from '../data/ch16Grammar'
import { ch17HearsayQuiz, ch17TteQuiz, ch17TaraQuiz, ch17NakutemoiiQuiz, ch17MitaiQuiz, ch17MaeniKaraQuiz, ch17ReviewQuiz } from '../data/ch17Grammar'
import { ch18TransitivityQuiz, ch18TeiruQuiz, ch18TeshimauQuiz, ch18ToQuiz, ch18NagaraQuiz, ch18BayokattaQuiz, ch18ReviewQuiz } from '../data/ch18Grammar'
import { ch19HonorificQuiz, ch19AdviceQuiz, ch19TekuretearigatouQuiz, ch19TeyokattaQuiz, ch19HazuQuiz, ch19ReviewQuiz } from '../data/ch19Grammar'
import { ch20ExtraModestQuiz, ch20HumbleQuiz, ch20NaideQuiz, ch20EmbeddedQuiz, ch20ToiuQuiz, ch20YasuiNikuiQuiz, ch20ReviewQuiz } from '../data/ch20Grammar'
import { ch21PassiveQuiz, ch21TearuQuiz, ch21AidaniQuiz, ch21AdjSuruQuiz, ch21TehoshiiQuiz, ch21ReviewQuiz } from '../data/ch21Grammar'
import { ch22CausativeQuiz, ch22CausativeGivingQuiz, ch22NasaiQuiz, ch22BaQuiz, ch22NoniQuiz, ch22NoyouniQuiz, ch22ReviewQuiz } from '../data/ch22Grammar'
import { ch23CausativePassiveQuiz, ch23TemoQuiz, ch23KotonisuruQuiz, ch23KotonishiteiruQuiz, ch23MadeQuiz, ch23KataQuiz, ch23ReviewQuiz } from '../data/ch23Grammar'
import { useStatsStore } from './statsStore'
import { todayStr } from '../utils/dates'

const builtinQuizzes = [
  ...genkiQuizzes,
  // Ch.0 (Bonus — Conjugation Drills)
  ch00MasuQuiz, ch00TeformQuiz, ch00ShortPastQuiz, ch00ShortNegQuiz, ch00ShortPastNegQuiz,
  // Ch.1
  ch1DesuQuiz, ch1KaQuiz, ch1NoQuiz,
  // Ch.11
  ch11TaiQuiz, ch11TariQuiz, ch11KotoQuiz, ch11YaQuiz,
  // Ch.12
  ch12NdesuQuiz, ch12SugiruQuiz, ch12HougaiiQuiz, ch12NodeQuiz,
  // Ch.13
  ch13PotentialQuiz, ch13ShiQuiz, ch13SoudesuQuiz, ch13TemiruQuiz, ch13NaraQuiz, ch13FrequencyQuiz, ch13ReviewQuiz,
  // Ch.14
  ch14HoshiiQuiz, ch14KamoshirenaiQuiz, ch14GivingQuiz, ch14TaradoudesuQuiz, ch14NumberMoShikaQuiz, ch14ReviewQuiz,
  // Ch.15
  ch15VolitionalQuiz, ch15VolitionalOmouQuiz, ch15TeokuQuiz, ch15RelativeQuiz, ch15ReviewQuiz,
  // Ch.16
  ch16TeageruQuiz, ch16RequestQuiz, ch16ToiiQuiz, ch16TokiQuiz, ch16SumimasenQuiz, ch16ReviewQuiz,
  // Ch.17
  ch17HearsayQuiz, ch17TteQuiz, ch17TaraQuiz, ch17NakutemoiiQuiz, ch17MitaiQuiz, ch17MaeniKaraQuiz, ch17ReviewQuiz,
  // Ch.18
  ch18TransitivityQuiz, ch18TeiruQuiz, ch18TeshimauQuiz, ch18ToQuiz, ch18NagaraQuiz, ch18BayokattaQuiz, ch18ReviewQuiz,
  // Ch.19
  ch19HonorificQuiz, ch19AdviceQuiz, ch19TekuretearigatouQuiz, ch19TeyokattaQuiz, ch19HazuQuiz, ch19ReviewQuiz,
  // Ch.20
  ch20ExtraModestQuiz, ch20HumbleQuiz, ch20NaideQuiz, ch20EmbeddedQuiz, ch20ToiuQuiz, ch20YasuiNikuiQuiz, ch20ReviewQuiz,
  // Ch.21
  ch21PassiveQuiz, ch21TearuQuiz, ch21AidaniQuiz, ch21AdjSuruQuiz, ch21TehoshiiQuiz, ch21ReviewQuiz,
  // Ch.22
  ch22CausativeQuiz, ch22CausativeGivingQuiz, ch22NasaiQuiz, ch22BaQuiz, ch22NoniQuiz, ch22NoyouniQuiz, ch22ReviewQuiz,
  // Ch.23
  ch23CausativePassiveQuiz, ch23TemoQuiz, ch23KotonisuruQuiz, ch23KotonishiteiruQuiz, ch23MadeQuiz, ch23KataQuiz, ch23ReviewQuiz,
]



export const useQuizStore = create(
  persist(
    (set, get) => ({
      quizzes: builtinQuizzes,

      addQuiz: (quiz) => {
        const newQuiz = {
          ...quiz,
          id: `quiz_${Date.now()}`,
          created: todayStr(),
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
        const stats = useStatsStore.getState()

        // Every answered question feeds the spaced-repetition bank and vocab progress
        const results = gameState.answers
          .map((a) => {
            const question = gameState.questions[a.questionIdx]
            if (!question) return null
            if (question._wordId) stats.recordVocabAnswer(question._wordId, question._chapterNum, a.correct)
            return {
              quizId: question._sourceQuizId ?? id,
              quizTitle: question._sourceQuizTitle ?? quiz?.title ?? 'Quiz',
              question,
              correct: a.correct,
            }
          })
          .filter(Boolean)
        stats.applyAnswersToBank(results)
        stats.recordCombo(gameState.maxCombo)

        // Fire XP / streak via statsStore
        const xpEarned = stats.recordResult(id, score, total, gameState.bonusXp)
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

// Combo: 3+ in a row = +5 XP per answer (1.5×), 5+ in a row = +10 XP (2×)
export function comboBonus(combo) {
  if (combo >= 5) return 10
  if (combo >= 3) return 5
  return 0
}
const SPEED_BONUS = 3

// Game state (not persisted)
export const useGameStore = create((set) => ({
  quizId: null,
  activeQuiz: null,
  questions: [],
  currentIndex: 0,
  score: 0,
  answers: [],
  combo: 0,
  maxCombo: 0,
  bonusXp: 0, // combo + speed bonuses earned this run
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
      combo: 0,
      maxCombo: 0,
      bonusXp: 0,
      shuffled: shuffle,
      phase: 'playing',
    })
  },

  // choiceIdx: index into choices, or -1 for a timeout / wrong typed answer.
  // opts.correct overrides the check (typed answers); opts.fast adds a speed bonus.
  submitAnswer: (choiceIdx, opts = {}) => {
    const state = useGameStore.getState()
    const q = state.questions[state.currentIndex]
    const correct = opts.correct ?? choiceIdx === q.correct
    const combo = correct ? state.combo + 1 : 0
    const bonus = correct ? comboBonus(combo) + (opts.fast ? SPEED_BONUS : 0) : 0
    set((s) => ({
      score: correct ? s.score + 1 : s.score,
      answers: [...s.answers, { questionIdx: s.currentIndex, chosen: correct ? q.correct : choiceIdx, typed: opts.typed, correct }],
      combo,
      maxCombo: Math.max(s.maxCombo, combo),
      bonusXp: s.bonusXp + bonus,
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

  resetGame: () => set({ quizId: null, activeQuiz: null, questions: [], currentIndex: 0, score: 0, answers: [], combo: 0, maxCombo: 0, bonusXp: 0, phase: 'idle' }),
}))
