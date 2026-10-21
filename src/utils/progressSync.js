// Optional sign-in + progress sync across devices.
// Backend: the shared MacroMonster Supabase project (same one as the push reminders), table
// public.nihongo_progress — one row per user: { state, rev }, owner-only by RLS, real accounts only.
// Sign-in: Google or email + password, same accounts as MacroMonster. Nothing loads until someone signs in:
// supabase-js is imported on demand, and only when this device has a session or is coming back from Google.
//
// A sync pulls the cloud copy, merges it with this device (utils/progressMerge.js), applies the result here and
// writes it back only if it changed. Writes carry the row's `rev`, so two devices saving at once can't overwrite
// each other: the loser re-reads and merges again.
import { create } from 'zustand'
import { useStatsStore } from '../store/statsStore'
import { useQuizStore } from '../store/quizStore'
import { SYNCED_STATS, statsSnapshot, quizSnapshot, mergeProgress, stableStringify } from './progressMerge'

const SUPABASE_URL = 'https://fvbirnlqolsviykthacc.supabase.co'
const PUBLISHABLE_KEY = 'sb_publishable_TA0fmyVmHL_bXjnIMtCjzg_Ll6SirEg' // public by design; RLS protects the rows
const AUTH_STORAGE_KEY = 'nihongo-auth'
const TABLE = 'nihongo_progress'
const IDLE_DELAY = 15000 // after a change, sync once things have been quiet this long

/** status: 'off' (signed out) | 'idle' | 'syncing' | 'ok' | 'error' */
export const useSync = create(() => ({ ready: false, user: null, status: 'off', lastSync: null, error: null }))

let clientPromise = null
function client() {
  clientPromise ??= import('@supabase/supabase-js').then(({ createClient }) => createClient(SUPABASE_URL, PUBLISHABLE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: AUTH_STORAGE_KEY },
  }))
  return clientPromise
}

const hasStoredSession = () => { try { return Boolean(localStorage.getItem(AUTH_STORAGE_KEY)) } catch { return false } }

function readUrlAuth() {
  const params = new URLSearchParams(`${window.location.search.slice(1)}&${window.location.hash.slice(1)}`)
  const error = params.get('error_description')
  return { returning: params.has('access_token') || Boolean(error), error: error && error.replace(/\+/g, ' ') }
}

function describe(error) {
  const m = error?.message ?? String(error)
  if (/invalid login credentials/i.test(m)) return 'Wrong email or password.'
  if (/email not confirmed/i.test(m)) return 'Confirm your email first: open the link we sent, then sign in.'
  if (/already registered|already been registered/i.test(m)) return 'That email already has an account. Sign in instead.'
  if (/failed to fetch|network/i.test(m)) return 'No connection. Try again when you’re online.'
  return m
}

// ── the sync itself ──

function localProgress() {
  return { v: 1, stats: statsSnapshot(useStatsStore.getState()), quizStats: quizSnapshot(useQuizStore.getState().quizzes) }
}

let applying = false
function applyHere(merged) {
  applying = true
  try {
    useStatsStore.setState(merged.stats)
    const qs = merged.quizStats
    useQuizStore.setState((s) => ({
      quizzes: s.quizzes.map((q) => {
        const st = qs[q.id]
        if (!st || (st[0] === (q.playCount || 0) && st[1] === (q.bestScore ?? null))) return q
        return { ...q, playCount: st[0], bestScore: st[1] }
      }),
    }))
  } finally {
    applying = false
  }
}

async function pullMergePush(sb, userId, { overwrite = false } = {}) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const { data: row, error } = await sb.from(TABLE).select('state, rev').eq('user_id', userId).maybeSingle()
    if (error) throw error
    const local = localProgress()
    const merged = overwrite ? local : mergeProgress(local, row?.state)
    const mergedStr = stableStringify(merged)
    if (mergedStr !== stableStringify(local)) applyHere(merged)
    if (row && mergedStr === stableStringify(row.state)) return // the cloud already has exactly this
    if (!row) {
      const { error: e } = await sb.from(TABLE).insert({ user_id: userId, state: merged, rev: 1 })
      if (!e) return
      if (e.code === '23505') continue // another device created it first: merge with theirs
      throw e
    }
    const { data: saved, error: e } = await sb.from(TABLE)
      .update({ state: merged, rev: row.rev + 1, updated_at: new Date().toISOString() })
      .eq('user_id', userId).eq('rev', row.rev).select('rev')
    if (e) throw e
    if (saved?.length) return
    // rev moved on: another device saved in between — read it and merge again
  }
  throw new Error('Another device kept saving at the same moment. It will retry shortly.')
}

let running = null
let again = false
/** Sync now (or right after the one in progress). Safe to call any time. */
export function syncNow(opts) {
  if (running && opts) return running.then(() => syncNow(opts))
  if (running) { again = true; return running }
  running = (async () => {
    try {
      const sb = await client()
      const { data } = await sb.auth.getSession()
      const user = data.session?.user
      if (!user || user.is_anonymous) return
      useSync.setState({ status: 'syncing', error: null })
      await pullMergePush(sb, user.id, opts)
      useSync.setState({ status: 'ok', lastSync: Date.now() })
    } catch (e) {
      useSync.setState({ status: 'error', error: describe(e) })
    } finally {
      running = null
      if (again) { again = false; syncNow() }
    }
  })()
  return running
}

let idleTimer = null
function syncSoon(delay = IDLE_DELAY) {
  if (!useSync.getState().user) return
  clearTimeout(idleTimer)
  idleTimer = setTimeout(() => syncNow(), delay)
}

// ── start-up and auth ──

let started = null
function start() {
  started ??= (async () => {
    const sb = await client()
    sb.auth.onAuthStateChange((event, session) => {
      const u = session?.user && !session.user.is_anonymous ? session.user : null
      const user = u ? { email: u.email, provider: u.app_metadata?.provider ?? 'email' } : null
      useSync.setState((s) => ({ ready: true, user, status: user ? (s.status === 'off' ? 'idle' : s.status) : 'off' }))
      if (user && (event === 'INITIAL_SESSION' || event === 'SIGNED_IN')) {
        if (window.location.hash.includes('access_token')) window.history.replaceState(null, '', window.location.pathname)
        setTimeout(() => syncNow(), 0) // not inside the auth callback (supabase-js holds a lock there)
      }
    })
    // Any change to synced progress → sync once things are quiet; leaving the tab → sync now; coming back → pull
    useStatsStore.subscribe((s, prev) => { if (!applying && SYNCED_STATS.some((k) => s[k] !== prev[k])) syncSoon() })
    useQuizStore.subscribe((s, prev) => { if (!applying && s.quizzes !== prev.quizzes) syncSoon() })
    document.addEventListener('visibilitychange', () => { if (useSync.getState().user) syncSoon(document.visibilityState === 'hidden' ? 0 : 1000) })
    return sb
  })()
  return started
}

/** On app open. Reads the URL before App tidies it, and loads sign-in only if this device uses it. */
export function initSync() {
  const { returning, error } = readUrlAuth()
  if (error) useSync.setState({ error })
  if (returning || hasStoredSession()) start()
  else useSync.setState({ ready: true })
}

export async function signInWithGoogle() {
  const sb = await start()
  const { error } = await sb.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/`, queryParams: { prompt: 'select_account' } },
  })
  if (error) throw new Error(describe(error))
}

export async function signInWithEmail(email, password) {
  const sb = await start()
  const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password })
  if (error) throw new Error(describe(error))
}

/** Returns a message: the project asks new accounts to confirm their email first. */
export async function signUpWithEmail(email, password) {
  const sb = await start()
  const { data, error } = await sb.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: `${window.location.origin}/` } })
  if (error) throw new Error(describe(error))
  return data.session ? 'Account created. Your progress is syncing.' : 'Check your inbox and open the link to confirm, then sign in here.'
}

/** Progress stays on this device; it just stops syncing. */
export async function signOut() {
  const sb = await start()
  await sb.auth.signOut({ scope: 'local' })
  useSync.setState({ user: null, status: 'off', lastSync: null, error: null })
}

/** After "Reset all progress": make the cloud copy match this (empty) device instead of merging it back. */
export function resetCloudProgress() {
  if (!useSync.getState().user) return Promise.resolve()
  return syncNow({ overwrite: true })
}
