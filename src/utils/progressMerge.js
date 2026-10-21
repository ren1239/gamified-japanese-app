// Merging two copies of a learner's progress (this device + the cloud copy from utils/progressSync.js).
// Pure functions, so Node can test them. Rules, field by field:
//   history        union (entries carry `t`; older ones match by content), newest first, capped
//   totalXp        XP in the merged history + the larger amount either side had beyond its own history
//   streak         the side with the longer streak as of today, then today's merged XP may extend it
//   wrongBank,     newest change per key (`u`), minus keys removed later on either device (bankGone /
//   flaggedBank    flagGone tombstones)
//   learnedBank    union, earliest date        wordProgress  max
//   videoProgress  watched seconds: max · watched parts: union · resume position: most recent device
//   prefs          name, daily goal, romaji: whichever side changed them last (prefsAt)
//   quizStats      per quiz: most plays, best score
import { todayStr } from './dates.js'
import { xpOnDate, getStreakInfo, advanceStreak } from './streak.js'

export const HISTORY_CAP = 2000
const GONE_CAP = 500

/** Synced statsStore fields. Device-only: theme, sound, voice, reminders, the video server key. */
export const SYNCED_STATS = [
  'totalXp', 'history', 'lastPlayedDate', 'lastGoalDate', 'streak', 'bestStreak', 'streakFreezes', 'bestCombo',
  'reviewCount', 'bankCleared', 'wrongBank', 'bankGone', 'flaggedBank', 'flagGone', 'learnedBank', 'wordProgress',
  'videoProgress', 'lastVideo', 'dailyGoal', 'username', 'showRomaji', 'prefsAt',
]

const num = (x) => (typeof x === 'number' && Number.isFinite(x) ? x : 0)
const maxStr = (a, b) => (!a ? b ?? null : !b ? a : a > b ? a : b)

/** Record removals (tombstones), keeping the newest GONE_CAP. */
export function bury(gone = {}, keys, at) {
  const next = { ...gone }
  for (const k of keys) next[k] = at
  const entries = Object.entries(next)
  return entries.length <= GONE_CAP ? next : Object.fromEntries(entries.sort((a, b) => b[1] - a[1]).slice(0, GONE_CAP))
}

export function statsSnapshot(state) {
  return Object.fromEntries(SYNCED_STATS.map((k) => [k, state[k]]))
}

/** { quizId: [playCount, bestScore] } for quizzes that were played */
export function quizSnapshot(quizzes) {
  const out = {}
  for (const q of quizzes) if (q.playCount || q.bestScore != null) out[q.id] = [q.playCount || 0, q.bestScore ?? null]
  return out
}

const histSig = (e) => (e.t ? `t:${e.t}:${e.quizId}` : `${e.date}|${e.quizId}|${e.score}|${e.total}|${e.xpEarned}`)

function mergeHistory(a = [], b = []) {
  const have = new Map()
  for (const e of a) have.set(histSig(e), (have.get(histSig(e)) || 0) + 1)
  const seen = new Map()
  const out = [...a]
  for (const e of b) {
    const k = histSig(e)
    const n = (seen.get(k) || 0) + 1
    seen.set(k, n)
    if (n > (have.get(k) || 0)) out.push(e)
  }
  return out
    .map((e, i) => [e, i])
    .sort(([x, i], [y, j]) => (y.date || '').localeCompare(x.date || '') || num(y.t) - num(x.t) || i - j)
    .map(([e]) => e)
}

const sumXp = (history) => history.reduce((s, e) => s + num(e.xpEarned), 0)

function mergeGone(a = {}, b = {}) {
  const g = { ...a }
  for (const [k, t] of Object.entries(b)) g[k] = Math.max(num(g[k]), num(t))
  return bury(g, [], 0) // just caps the size
}

function mergeKeyed(a = [], b = [], gone = {}, keyOf, cap) {
  const pick = new Map()
  const order = []
  for (const e of [...a, ...b]) {
    const k = keyOf(e)
    const cur = pick.get(k)
    if (!cur) { pick.set(k, e); order.push(k) } else if (num(e.u) > num(cur.u)) pick.set(k, e)
  }
  const list = order.map((k) => pick.get(k)).filter((e) => !(gone[keyOf(e)] != null && gone[keyOf(e)] >= num(e.u)))
  return cap ? list.slice(-cap) : list
}

function mergeVideo(a = {}, b = {}) {
  const out = {}
  for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
    const x = a[key] || {}
    const y = b[key] || {}
    const newer = num(y.t) > num(x.t) ? y : x
    const sec = { ...x.sec }
    for (const [i, s] of Object.entries(y.sec || {})) sec[i] = Math.max(num(sec[i]), num(s))
    const done = { ...x.done }
    for (const [i, d] of Object.entries(y.done || {})) if (!done[i] || d < done[i]) done[i] = d
    const t = Math.max(num(x.t), num(y.t))
    out[key] = { ...newer, pos: newer.pos ?? x.pos ?? y.pos ?? 0, sec, done, ...(t ? { t } : {}) }
  }
  return out
}

function mergeStats(a, b, today) {
  const prefs = num(b.prefsAt) > num(a.prefsAt) ? b : a

  const fullHistory = mergeHistory(a.history, b.history)
  const extra = Math.max(num(a.totalXp) - sumXp(a.history || []), num(b.totalXp) - sumXp(b.history || []), 0)
  const history = fullHistory.slice(0, HISTORY_CAP)

  // Streak: whichever side's streak is longer today, then today's combined XP may complete the goal
  const sa = getStreakInfo(a, today).current
  const sb = getStreakInfo(b, today).current
  const lead = sb > sa || (sb === sa && (b.lastGoalDate || '') > (a.lastGoalDate || '')) ? b : a
  let streak = {
    lastGoalDate: lead.lastGoalDate ?? null,
    streak: num(lead.streak),
    streakFreezes: num(lead.streakFreezes),
    bestStreak: Math.max(num(a.bestStreak), num(b.bestStreak)),
  }
  const dailyGoal = prefs.dailyGoal ?? a.dailyGoal ?? b.dailyGoal ?? 50
  streak = { ...streak, ...advanceStreak(streak, xpOnDate(history, today) >= dailyGoal, today) }

  const bankGone = mergeGone(a.bankGone, b.bankGone)
  const flagGone = mergeGone(a.flagGone, b.flagGone)

  const learned = new Map()
  for (const e of [...(a.learnedBank || []), ...(b.learnedBank || [])]) {
    const cur = learned.get(e.wordId)
    if (!cur || (e.date && (!cur.date || e.date < cur.date))) learned.set(e.wordId, e)
  }
  const wordProgress = { ...a.wordProgress }
  for (const [k, n] of Object.entries(b.wordProgress || {})) wordProgress[k] = Math.max(num(wordProgress[k]), num(n))

  const lastVideo = num(b.lastVideo?.t) > num(a.lastVideo?.t) ? b.lastVideo : a.lastVideo ?? b.lastVideo ?? null

  return {
    username: prefs.username ?? '',
    dailyGoal,
    showRomaji: Boolean(prefs.showRomaji),
    prefsAt: Math.max(num(a.prefsAt), num(b.prefsAt)),
    totalXp: sumXp(fullHistory) + extra,
    history,
    lastPlayedDate: maxStr(a.lastPlayedDate, b.lastPlayedDate),
    ...streak,
    bestCombo: Math.max(num(a.bestCombo), num(b.bestCombo)),
    reviewCount: Math.max(num(a.reviewCount), num(b.reviewCount)),
    bankCleared: Boolean(a.bankCleared || b.bankCleared),
    wrongBank: mergeKeyed(a.wrongBank, b.wrongBank, bankGone, (e) => e.key, 300),
    bankGone,
    flaggedBank: mergeKeyed(a.flaggedBank, b.flaggedBank, flagGone, (e) => e.key, 300),
    flagGone,
    learnedBank: [...learned.values()],
    wordProgress,
    videoProgress: mergeVideo(a.videoProgress, b.videoProgress),
    lastVideo,
  }
}

function mergeQuizStats(a = {}, b = {}) {
  const out = { ...a }
  for (const [id, [plays, best]] of Object.entries(b)) {
    const [p0, b0] = out[id] || [0, null]
    out[id] = [Math.max(num(p0), num(plays)), b0 == null ? best ?? null : best == null ? b0 : Math.max(b0, best)]
  }
  return out
}

/** Merge this device's progress with the cloud copy. Both: { v: 1, stats, quizStats }. */
export function mergeProgress(local, remote, today = todayStr()) {
  if (!remote?.stats) return local
  return {
    v: 1,
    stats: mergeStats(local.stats, remote.stats, today),
    quizStats: mergeQuizStats(local.quizStats, remote.quizStats),
  }
}

/** JSON with sorted keys, so two copies compare equal whatever order the database returned. */
export function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null'
  if (Array.isArray(value)) return `[${value.map((v) => (v === undefined ? 'null' : stableStringify(v))).join(',')}]`
  return `{${Object.keys(value).sort().filter((k) => value[k] !== undefined).map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`).join(',')}}`
}
