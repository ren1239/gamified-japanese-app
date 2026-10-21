// Streak + daily-XP rules, shared by statsStore and the cross-device merge (utils/progressMerge.js).
// Pure functions (no store), with .js imports so Node scripts can load them too.
import { todayStr, daysBetween } from './dates.js'

export const MAX_FREEZES = 2
export const FREEZE_EVERY = 7 // earn a streak freeze every 7 streak days

export function xpOnDate(history, date) {
  return history.reduce((sum, e) => (e.date === date ? sum + (e.xpEarned || 0) : sum), 0)
}

/**
 * Streak as it stands right now. A streak survives missed days while there are
 * enough freezes to cover them; freezes are only spent when the goal is next met.
 */
export function getStreakInfo({ streak, lastGoalDate, streakFreezes }, today = todayStr()) {
  if (!lastGoalDate) return { current: 0, doneToday: false, atRisk: false, freezesNeeded: 0 }
  const gap = daysBetween(lastGoalDate, today)
  if (gap <= 0) return { current: streak, doneToday: true, atRisk: false, freezesNeeded: 0 }
  const missed = gap - 1
  if (missed <= (streakFreezes || 0)) {
    return { current: streak, doneToday: false, atRisk: true, freezesNeeded: missed }
  }
  return { current: 0, doneToday: false, atRisk: false, freezesNeeded: 0 }
}

/** The streak fields after today's goal is met, or null when it isn't (or was already counted today). */
export function advanceStreak({ streak, streakFreezes, lastGoalDate, bestStreak }, goalMet, today = todayStr()) {
  if (!goalMet || lastGoalDate === today) return null
  let next = 1
  let freezes = streakFreezes || 0
  if (lastGoalDate) {
    const missed = daysBetween(lastGoalDate, today) - 1
    if (missed <= 0) next = (streak || 0) + 1
    else if (missed <= freezes) { freezes -= missed; next = (streak || 0) + 1 }
  }
  if (next % FREEZE_EVERY === 0) freezes = Math.min(MAX_FREEZES, freezes + 1)
  return { streak: next, streakFreezes: freezes, lastGoalDate: today, bestStreak: Math.max(bestStreak || 0, next) }
}
