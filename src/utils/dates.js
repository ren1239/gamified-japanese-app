// Local-time date helpers. Dates are stored as 'YYYY-MM-DD' in the user's timezone
// (toISOString() would use UTC and shift late-evening sessions to the wrong day).

export function localDateStr(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function todayStr() {
  return localDateStr()
}

export function addDays(dateStr, n) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return localDateStr(new Date(y, m - 1, d + n))
}

/** Whole days from a → b (b later = positive) */
export function daysBetween(a, b) {
  const [y1, m1, d1] = a.split('-').map(Number)
  const [y2, m2, d2] = b.split('-').map(Number)
  return Math.round((new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1)) / 86400000)
}
