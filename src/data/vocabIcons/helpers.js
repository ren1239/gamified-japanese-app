// Shared palette + path helpers for vocab icons (same drawing style as Korean ToGo's set).
// Style: 48×48 grid, 2.5 dark outline (#1F2421), round joins, flat fills (≤3 colours + white),
// shown on a light tile tinted by group. Hex values are fine here: icons are artwork, and the
// tile stays light in dark mode so the dark outline always reads.
// Plain module (no imports) so Node scripts can load it too.

export const D = '#1F2421'
export const P = {
  W: '#FFFFFF', CR: '#FFF4E8', SKY: '#8CC8EE', GLASS: '#E6F3FC',
  IND: '#3C5BD8', INL: '#B7C5F5', NAVY: '#2A3550', // 藍 primary
  VER: '#EE5A2B', VERL: '#F7B59C', // 朱 accent
  GOLD: '#F2B200', GOLDL: '#FFE08A', GOLDD: '#BE8A00', // 金
  RED: '#DC4446', PINK: '#F7B4A0', ORG: '#F7A23B',
  BR: '#9A5B34', BRL: '#C98B5A', TAN: '#E5B36A',
  GR: '#B9BDB8', GRL: '#E4E2DA', GRD: '#5E6460',
  LEAF: '#4FAE5A', LEAFL: '#B9DFB0', BOARD: '#2E6B4F',
  SKIN: '#F9D2B4', HAIR: '#5E3A24',
}

// Tile tint per group
export const TINT = {
  thing: '#E7ECFD', food: '#FDE9E1', place: '#DDF2EC', people: '#FFF4D1',
  event: '#FCE6EA', verb: '#F0E8FB', time: '#E6ECEB', feeling: '#FFF0D6',
}

// Rounded rect, ellipse, circle as path data
export const R = (x, y, w, h, r) => `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 -${r} ${r}h-${w - 2 * r}a${r} ${r} 0 0 1 -${r} -${r}v-${h - 2 * r}a${r} ${r} 0 0 1 ${r} -${r}Z`
export const E = (cx, cy, rx, ry) => `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 -${2 * rx} 0Z`
export const C = (cx, cy, r) => E(cx, cy, r, r)

// Heart centred on x, point at y, lobes `s` wide
export const heart = (x, y, s) => {
  const h = s / 2
  return `M${x} ${y}c-${s * 0.67} -${s * 0.47} -${s} -${s * 0.82} -${s} -${s * 1.2}a${h} ${h} 0 0 1 ${s} -${s * 0.17}a${h} ${h} 0 0 1 ${s} ${s * 0.17}c0 ${s * 0.38} -${s * 0.33} ${s * 0.73} -${s} ${s * 1.2}Z`
}

// Four-point sparkle centred on (x, y)
export const sparkle = (x, y, r) => {
  const k = r * 0.3
  return `M${x} ${y - r}l${k} ${r - k} ${r - k} ${k} -${r - k} ${k} -${k} ${r - k} -${k} -${r - k} -${r - k} -${k} ${r - k} -${k}Z`
}

// Five-point star centred on (x, y)
export const star = (x, y, r) => {
  const pts = []
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r
    pts.push(`${(x + rr * Math.cos(a)).toFixed(2)} ${(y + rr * Math.sin(a)).toFixed(2)}`)
  }
  return `M${pts.join('L')}Z`
}

// [key, group, shapes] → { key, group, tint, shapes:[{d, f, w, s}] }
// Each shape is [pathData, fill, strokeWidth = 2.5, strokeColor = D]; strokeWidth 0 = no outline.
export const build = (list) => Object.fromEntries(list.map(([key, group, shapes]) => [key, {
  key, group, tint: TINT[group],
  shapes: shapes.map(([d, f, w = 2.5, s = D]) => ({ d, f, w, s: w ? s : 'none' })),
}]))
