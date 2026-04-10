import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const XP_PER_CORRECT = 10
const XP_PER_PERFECT = 50 // bonus for 100%

function xpForLevel(level) {
  // Level 1: 0 XP, Level 2: 100, Level 3: 250, Level 4: 450... curved
  return Math.floor(100 * level * (1 + level * 0.25))
}

function computeLevel(totalXp) {
  let level = 1
  while (totalXp >= xpForLevel(level)) level++
  return level - 1
}

function xpInCurrentLevel(totalXp) {
  const level = computeLevel(totalXp)
  const base = xpForLevel(level)
  const next = xpForLevel(level + 1)
  return { earned: totalXp - base, needed: next - base, pct: Math.round(((totalXp - base) / (next - base)) * 100) }
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export const useStatsStore = create(
  persist(
    (set, get) => ({
      totalXp: 0,
      soundEnabled: true,
      theme: 'neon',
      username: '',
      history: [], // [{ date, quizId, score, total, xpEarned }]
      lastPlayedDate: null,
      streak: 0,
      wrongBank: [], // [{ key, quizId, quizTitle, question, wrongCount, lastWrong }]
      flaggedBank: [], // [{ key, quizId, quizTitle, question, flaggedDate }]

      recordResult: (quizId, score, total) => {
        const state = get()
        const xpEarned = score * XP_PER_CORRECT + (score === total ? XP_PER_PERFECT : 0)
        const today = todayStr()

        // Streak logic
        let newStreak = state.streak
        if (state.lastPlayedDate === today) {
          // already played today, streak unchanged
        } else {
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayStr = yesterday.toISOString().slice(0, 10)
          newStreak = state.lastPlayedDate === yesterdayStr ? state.streak + 1 : 1
        }

        set({
          totalXp: state.totalXp + xpEarned,
          lastPlayedDate: today,
          streak: newStreak,
          history: [{ date: today, quizId, score, total, xpEarned }, ...state.history].slice(0, 100),
        })

        return xpEarned
      },

      resetStats: () => set({
        totalXp: 0,
        history: [],
        lastPlayedDate: null,
        streak: 0,
        soundEnabled: true,
        theme: 'neon',
      }),

      addWrongAnswers: (quizId, quizTitle, wrongQuestions) => {
        set((state) => {
          const bank = [...state.wrongBank]
          const today = todayStr()
          wrongQuestions.forEach((question) => {
            const key = `${quizId}-${question.id ?? question.question.slice(0, 30)}`
            const idx = bank.findIndex((e) => e.key === key)
            if (idx >= 0) {
              bank[idx] = { ...bank[idx], wrongCount: bank[idx].wrongCount + 1, lastWrong: today }
            } else {
              bank.push({ key, quizId, quizTitle, question, wrongCount: 1, lastWrong: today })
            }
          })
          return { wrongBank: bank.slice(0, 200) }
        })
      },

      removeFromBank: (keys) => set((state) => ({
        wrongBank: state.wrongBank.filter((e) => !keys.includes(e.key)),
      })),

      clearWrongBank: () => set({ wrongBank: [] }),

      flagQuestion: (quizId, quizTitle, question) => {
        set((state) => {
          const key = `${quizId}-${question.id ?? question.question.slice(0, 30)}`
          if (state.flaggedBank.some((e) => e.key === key)) return {} // already flagged
          return {
            flaggedBank: [
              ...state.flaggedBank,
              { key, quizId, quizTitle, question, flaggedDate: todayStr() },
            ].slice(0, 200),
          }
        })
      },

      unflagQuestion: (key) => set((state) => ({
        flaggedBank: state.flaggedBank.filter((e) => e.key !== key),
      })),

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      setTheme: (theme) => set({ theme }),
      setUsername: (username) => set({ username }),
    }),
    {
      name: 'nihongo-stats-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        totalXp: state.totalXp,
        soundEnabled: state.soundEnabled,
        theme: state.theme,
        username: state.username,
        history: state.history,
        lastPlayedDate: state.lastPlayedDate,
        streak: state.streak,
        wrongBank: state.wrongBank,
        flaggedBank: state.flaggedBank,
      }),
    }
  )
)

// Expose helpers for components
export { computeLevel, xpInCurrentLevel, xpForLevel }
