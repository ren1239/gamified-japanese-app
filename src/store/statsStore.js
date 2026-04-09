import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
      history: [], // [{ date, quizId, score, total, xpEarned }]
      lastPlayedDate: null,
      streak: 0,

      // Derived (computed on read)
      get level() { return computeLevel(get().totalXp) },
      get xpProgress() { return xpInCurrentLevel(get().totalXp) },
      get accuracy() {
        const h = get().history
        if (!h.length) return 0
        const total = h.reduce((a, b) => a + b.total, 0)
        const correct = h.reduce((a, b) => a + b.score, 0)
        return total ? Math.round((correct / total) * 100) : 0
      },

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
      }),

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
    }),
    {
      name: 'nihongo-stats-store',
    }
  )
)

// Expose helpers for components
export { computeLevel, xpInCurrentLevel, xpForLevel }
