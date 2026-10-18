import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { todayStr, addDays, daysBetween } from '../utils/dates'

const XP_PER_CORRECT = 10
const XP_PER_PERFECT = 50 // bonus for 100%
const MAX_FREEZES = 2
const FREEZE_EVERY = 7 // earn a streak freeze every 7 streak days
const HISTORY_CAP = 2000

// ── Spaced repetition (Leitner) ──────────────────────────────────────────────
// New mistakes enter box 1 (due today). Each correct review moves the item up a
// box; the next review is scheduled INTERVALS[box] days out. Correct in the top
// box = mastered (removed). A wrong answer drops it back to box 1.
export const SRS_INTERVALS = { 2: 1, 3: 3, 4: 7, 5: 14 }
export const SRS_MAX_BOX = 5

export function isDue(entry, today = todayStr()) {
  return (entry.due ?? today) <= today
}

export function getDueEntries(bank, today = todayStr()) {
  return bank.filter((e) => isDue(e, today))
}

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

function bankKeyFor(quizId, question) {
  return question._bankKey ?? `${quizId}-${question.id ?? question.question.slice(0, 30)}`
}

export const useStatsStore = create(
  persist(
    (set, get) => ({
      totalXp: 0,
      soundEnabled: true,
      autoSpeak: true,
      speedMode: false,
      dailyGoal: 50,
      theme: 'system', // 'system' | 'light' | 'dark'
      showRomaji: false, // one global toggle, used everywhere Japanese is shown
      learnTrack: 'vocab', // Learn tab: 'vocab' (単語) | 'grammar' (文法)
      // Push reminders (see utils/push.js)
      remindersOn: false,
      pushEndpoint: null,
      reminderEvening: true,
      reminderEveningHour: 20,
      reminderMorning: true,
      reminderMorningHour: 8,
      username: '',
      history: [], // [{ date, quizId, score, total, xpEarned }]
      lastPlayedDate: null,
      lastGoalDate: null, // last day the daily XP goal was met
      streak: 0,
      bestStreak: 0,
      streakFreezes: 0,
      bestCombo: 0,
      reviewCount: 0, // SRS reviews completed (due items answered)
      bankCleared: false, // ever emptied the wrong-answer bank
      wrongBank: [], // [{ key, quizId, quizTitle, question, wrongCount, lastWrong, box, due }]
      flaggedBank: [], // [{ key, quizId, quizTitle, question, flaggedDate }]
      learnedBank: [], // [{ wordId: 'ch12-n01', chapterNum: 12, date: 'YYYY-MM-DD' }]
      wordProgress: {}, // { 'ch12-n01': consecutiveCorrect }
      // Lesson videos (授業). Key = '<lesson>-<type>', e.g. '15-stream'. sec = seconds actually played per point
      // (index into the video's points), done = date the point counted as watched (≥ 90% played).
      videoProgress: {}, // { '15-stream': { pos, sec: { 1: 412 }, done: { 1: 'YYYY-MM-DD' } } }
      lastVideo: null, // { key, lesson, type } — drives the Continue card
      // Hosted lesson videos (Cloudflare Worker in front of R2). Kept on this device only, never in the bundle.
      mediaServer: { url: '', key: '' },

      recordResult: (quizId, score, total, bonusXp = 0) => {
        const state = get()
        const xpEarned = score * XP_PER_CORRECT + (total > 0 && score === total ? XP_PER_PERFECT : 0) + bonusXp
        const today = todayStr()
        const history = [{ date: today, quizId, score, total, xpEarned }, ...state.history].slice(0, HISTORY_CAP)

        const updates = { totalXp: state.totalXp + xpEarned, lastPlayedDate: today, history }

        // Streak advances the first time today's XP reaches the daily goal
        const goalMet = xpOnDate(history, today) >= state.dailyGoal
        if (goalMet && state.lastGoalDate !== today) {
          let streak = 1
          let freezes = state.streakFreezes || 0
          if (state.lastGoalDate) {
            const missed = daysBetween(state.lastGoalDate, today) - 1
            if (missed <= 0) streak = state.streak + 1
            else if (missed <= freezes) { freezes -= missed; streak = state.streak + 1 }
          }
          if (streak % FREEZE_EVERY === 0) freezes = Math.min(MAX_FREEZES, freezes + 1)
          Object.assign(updates, {
            streak,
            streakFreezes: freezes,
            lastGoalDate: today,
            bestStreak: Math.max(state.bestStreak || 0, streak),
          })
        }

        set(updates)
        return xpEarned
      },

      resetStats: () => set({
        totalXp: 0,
        history: [],
        lastPlayedDate: null,
        lastGoalDate: null,
        streak: 0,
        bestStreak: 0,
        streakFreezes: 0,
        bestCombo: 0,
        reviewCount: 0,
        bankCleared: false,
        wrongBank: [],
        flaggedBank: [],
        learnedBank: [],
        wordProgress: {},
        videoProgress: {},
        lastVideo: null,
        soundEnabled: true,
      }),

      /**
       * Apply quiz answers to the SRS bank.
       * results: [{ quizId, quizTitle, question, correct }]
       */
      applyAnswersToBank: (results) => {
        set((state) => {
          const today = todayStr()
          const bank = [...state.wrongBank]
          const hadItems = bank.length > 0
          let reviewCount = state.reviewCount || 0
          const removeKeys = new Set()

          results.forEach(({ quizId, quizTitle, question, correct }) => {
            const key = bankKeyFor(quizId, question)
            const idx = bank.findIndex((e) => e.key === key)
            if (correct) {
              if (idx < 0 || !isDue(bank[idx], today)) return // not due → no change
              reviewCount++
              const box = (bank[idx].box ?? 1) + 1
              if (box > SRS_MAX_BOX) removeKeys.add(key) // mastered
              else bank[idx] = { ...bank[idx], box, due: addDays(today, SRS_INTERVALS[box]) }
            } else if (idx >= 0) {
              if (isDue(bank[idx], today)) reviewCount++
              bank[idx] = { ...bank[idx], wrongCount: bank[idx].wrongCount + 1, lastWrong: today, box: 1, due: today }
            } else {
              // Strip any per-run metadata before banking
              const { _bankKey, _sourceQuizId, _sourceQuizTitle, ...clean } = question
              bank.push({ key, quizId, quizTitle, question: { ...clean, _bankKey: key }, wrongCount: 1, lastWrong: today, box: 1, due: today })
            }
          })

          const wrongBank = bank.filter((e) => !removeKeys.has(e.key)).slice(-300)
          return {
            wrongBank,
            reviewCount,
            bankCleared: state.bankCleared || (hadItems && wrongBank.length === 0),
          }
        })
      },

      removeFromBank: (keys) => set((state) => ({
        wrongBank: state.wrongBank.filter((e) => !keys.includes(e.key)),
      })),

      clearWrongBank: () => set({ wrongBank: [] }),

      // Flagging puts a question straight into the review schedule (box 1, due today).
      // flaggedBank only remembers which questions show a filled flag.
      flagQuestion: (quizId, quizTitle, question) => {
        set((state) => {
          const key = bankKeyFor(quizId, question)
          if (state.flaggedBank.some((e) => e.key === key)) return {}
          const today = todayStr()
          const { _bankKey, _sourceQuizId, _sourceQuizTitle, ...clean } = question
          const inBank = state.wrongBank.some((e) => e.key === key)
          return {
            flaggedBank: [...state.flaggedBank, { key, quizId, quizTitle, question, flaggedDate: today }].slice(-300),
            wrongBank: inBank
              ? state.wrongBank.map((e) => (e.key === key ? { ...e, box: 1, due: today, flagged: true } : e))
              : [...state.wrongBank, { key, quizId, quizTitle, question: { ...clean, _bankKey: key }, wrongCount: 0, lastWrong: null, box: 1, due: today, flagged: true }].slice(-300),
          }
        })
      },

      unflagQuestion: (key) => set((state) => ({
        flaggedBank: state.flaggedBank.filter((e) => e.key !== key),
        // Drop it from reviews only if it was there because of the flag (never answered wrong)
        wrongBank: state.wrongBank
          .filter((e) => !(e.key === key && e.flagged && !e.wrongCount))
          .map((e) => (e.key === key ? { ...e, flagged: false } : e)),
      })),

      /** A word counts as learned after 2 correct quiz answers in a row */
      recordVocabAnswer: (wordId, chapterNum, correct) => {
        set((state) => {
          if (state.learnedBank.some((e) => e.wordId === wordId)) return {}
          const count = correct ? (state.wordProgress[wordId] || 0) + 1 : 0
          const wordProgress = { ...state.wordProgress, [wordId]: count }
          if (count >= 2) {
            return {
              wordProgress,
              learnedBank: [...state.learnedBank, { wordId, chapterNum, date: todayStr() }],
            }
          }
          return { wordProgress }
        })
      },

      /** Resume position + watched seconds for a lesson video (called every few seconds while playing). */
      saveVideoProgress: (key, lesson, type, pos, sec) => set((state) => {
        const vp = state.videoProgress[key] || {}
        return {
          videoProgress: { ...state.videoProgress, [key]: { ...vp, pos, sec: { ...vp.sec, ...sec } } },
          lastVideo: { key, lesson, type },
        }
      }),

      /** A point (chapter) of a lesson video was watched. Awards its XP once; returns the XP earned. */
      completeVideoPoint: (key, index, xp) => {
        const state = get()
        const vp = state.videoProgress[key] || {}
        if (vp.done?.[index]) return 0
        set({ videoProgress: { ...state.videoProgress, [key]: { ...vp, done: { ...vp.done, [index]: todayStr() } } } })
        // History entries for videos use a 'video:' id with no questions, so accuracy stats ignore them
        return xp ? get().recordResult(`video:${key}:${index}`, 0, 0, xp) : 0
      },

      setMediaServer: (mediaServer) => set({ mediaServer: { url: mediaServer.url.trim().replace(/\/+$/, ''), key: mediaServer.key.trim() } }),

      recordCombo: (combo) => set((state) => (combo > (state.bestCombo || 0) ? { bestCombo: combo } : {})),

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleAutoSpeak: () => set((state) => ({ autoSpeak: !state.autoSpeak })),
      toggleSpeedMode: () => set((state) => ({ speedMode: !state.speedMode })),
      setDailyGoal: (dailyGoal) => set({ dailyGoal }),
      setTheme: (theme) => set({ theme }),
      toggleRomaji: () => set((state) => ({ showRomaji: !state.showRomaji })),
      setLearnTrack: (learnTrack) => set({ learnTrack }),
      setReminders: (patch) => set(patch),
      setUsername: (username) => set({ username }),
    }),
    {
      name: 'nihongo-stats-store',
      version: 3,
      storage: createJSONStorage(() => localStorage),
      migrate: (persisted, version) => {
        if (version < 1 && persisted) {
          const today = todayStr()
          persisted.lastGoalDate = persisted.lastPlayedDate ?? null
          persisted.bestStreak = persisted.streak ?? 0
          persisted.wrongBank = (persisted.wrongBank ?? []).map((e) => ({ box: 1, due: today, ...e }))
        }
        if (version < 2 && persisted) {
          // The neon theme was retired; follow the system light/dark setting instead
          if (!['system', 'light', 'dark'].includes(persisted.theme)) persisted.theme = 'system'
        }
        if (version < 3 && persisted) {
          // Flagged questions now live in the review schedule
          const today = todayStr()
          const bank = persisted.wrongBank ?? []
          const keys = new Set(bank.map((e) => e.key))
          for (const f of persisted.flaggedBank ?? []) {
            if (keys.has(f.key)) continue
            bank.push({ key: f.key, quizId: f.quizId, quizTitle: f.quizTitle, question: { ...f.question, _bankKey: f.key }, wrongCount: 0, lastWrong: null, box: 1, due: today, flagged: true })
          }
          persisted.wrongBank = bank.slice(-300)
        }
        return persisted
      },
      partialize: (state) => ({
        totalXp: state.totalXp,
        soundEnabled: state.soundEnabled,
        autoSpeak: state.autoSpeak,
        speedMode: state.speedMode,
        dailyGoal: state.dailyGoal,
        theme: state.theme,
        showRomaji: state.showRomaji,
        learnTrack: state.learnTrack,
        remindersOn: state.remindersOn,
        pushEndpoint: state.pushEndpoint,
        reminderEvening: state.reminderEvening,
        reminderEveningHour: state.reminderEveningHour,
        reminderMorning: state.reminderMorning,
        reminderMorningHour: state.reminderMorningHour,
        username: state.username,
        history: state.history,
        lastPlayedDate: state.lastPlayedDate,
        lastGoalDate: state.lastGoalDate,
        streak: state.streak,
        bestStreak: state.bestStreak,
        streakFreezes: state.streakFreezes,
        bestCombo: state.bestCombo,
        reviewCount: state.reviewCount,
        bankCleared: state.bankCleared,
        wrongBank: state.wrongBank,
        flaggedBank: state.flaggedBank,
        learnedBank: state.learnedBank,
        wordProgress: state.wordProgress,
        videoProgress: state.videoProgress,
        lastVideo: state.lastVideo,
        mediaServer: state.mediaServer,
      }),
    }
  )
)

// Expose helpers for components
export { computeLevel, xpInCurrentLevel, xpForLevel }
