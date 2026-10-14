// Daily reminders via Web Push.
// The device's push subscription and a small progress snapshot are stored by the
// `nihongo-push` Supabase Edge Function; `nihongo-remind` runs hourly and sends
// at most one evening ("keep your streak") and one morning ("reviews due") push a day.
import { useStatsStore, getStreakInfo } from '../store/statsStore'
import { todayStr } from './dates'

// Public values (safe to ship): project URL + anon key, which only lets the app call the edge function.
const FUNCTION_URL = 'https://fvbirnlqolsviykthacc.supabase.co/functions/v1/nihongo-push'
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2Ymlybmxxb2xzdml5a3RoYWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4NDM4MTYsImV4cCI6MjEwNTQxOTgxNn0.scdo4va9Fi93ga5LNbHajvI4lCLc_LnspT2DxhTsDYg'

async function call(action, payload = {}) {
  const res = await fetch(FUNCTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ANON_KEY}` },
    body: JSON.stringify({ action, ...payload }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}

export function pushSupport() {
  if (typeof window === 'undefined') return { ok: false, reason: 'unavailable' }
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent)
  const standalone = window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
    return { ok: false, reason: ios && !standalone ? 'ios-home-screen' : 'unsupported' }
  }
  if (Notification.permission === 'denied') return { ok: false, reason: 'denied' }
  return { ok: true }
}

function base64UrlToUint8Array(b64) {
  const pad = '='.repeat((4 - (b64.length % 4)) % 4)
  const raw = atob((b64 + pad).replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from(raw, (c) => c.charCodeAt(0))
}

async function registration() {
  const reg = await navigator.serviceWorker.getRegistration()
  if (reg) return reg
  return navigator.serviceWorker.ready
}

/** Everything the server needs to decide whether to nudge */
function snapshot() {
  const s = useStatsStore.getState()
  const today = todayStr()
  const dueByDate = {}
  for (const e of s.wrongBank) {
    const d = !e.due || e.due < today ? today : e.due
    dueByDate[d] = (dueByDate[d] ?? 0) + 1
  }
  return {
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    prefs: {
      eveningEnabled: s.reminderEvening, eveningHour: s.reminderEveningHour,
      morningEnabled: s.reminderMorning, morningHour: s.reminderMorningHour,
    },
    stats: { dailyGoal: s.dailyGoal, lastGoalDate: s.lastGoalDate ?? null, streak: getStreakInfo(s).current, dueByDate },
  }
}

export async function enableReminders() {
  const support = pushSupport()
  if (!support.ok) throw Object.assign(new Error(support.reason), { reason: support.reason })
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') throw Object.assign(new Error('denied'), { reason: 'denied' })
  const { publicKey } = await call('key')
  const reg = await registration()
  let sub = await reg.pushManager.getSubscription()
  if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: base64UrlToUint8Array(publicKey) })
  await call('subscribe', { subscription: sub.toJSON(), ...snapshot() })
  useStatsStore.getState().setReminders({ remindersOn: true, pushEndpoint: sub.endpoint })
}

export async function disableReminders() {
  const { pushEndpoint } = useStatsStore.getState()
  try {
    const reg = await navigator.serviceWorker?.getRegistration()
    const sub = await reg?.pushManager.getSubscription()
    if (sub) await sub.unsubscribe()
    if (pushEndpoint) await call('unsubscribe', { endpoint: pushEndpoint })
  } finally {
    useStatsStore.getState().setReminders({ remindersOn: false, pushEndpoint: null })
  }
}

export async function sendTestReminder() {
  const { pushEndpoint } = useStatsStore.getState()
  if (!pushEndpoint) throw new Error('Reminders are off on this device')
  await call('test', { endpoint: pushEndpoint })
}

let syncTimer = null
/** Push the latest progress snapshot (debounced). Re-registers if the server forgot this device. */
export function syncReminders() {
  const { remindersOn, pushEndpoint } = useStatsStore.getState()
  if (!remindersOn || !pushEndpoint) return
  clearTimeout(syncTimer)
  syncTimer = setTimeout(async () => {
    try {
      const { known } = await call('sync', { endpoint: pushEndpoint, ...snapshot() })
      if (!known) {
        const reg = await navigator.serviceWorker?.getRegistration()
        const sub = await reg?.pushManager.getSubscription()
        if (sub) await call('subscribe', { subscription: sub.toJSON(), ...snapshot() })
      }
    } catch {
      /* offline — next sync will catch up */
    }
  }, 800)
}
