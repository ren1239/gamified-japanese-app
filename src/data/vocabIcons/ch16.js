// Ch.16 (忘れ物) vocab icons. Keys match ch16VocabData ids.
// No picture (text only): 文化 n15, 日 n17, 今日中に o02, 授業中に o03, この間 o04, このぐらい o06, 自分で o07,
// ほかの o08, ええと o09, 実は o10, 〜以外 o11 — too abstract to draw clearly, or too close to
// Ch.15's 教室 / 最近 icons to tell apart.
import { D, P, R, E, C, heart, sparkle, build } from './helpers.js'

const { W, SKY, GLASS, IND, INL, NAVY, VER, VERL, GOLD, GOLDL, GOLDD, RED, PINK, BR, BRL, TAN, GR, GRL, GRD, LEAF, LEAFL, SKIN } = P

// Person: head (centre x, y, radius r) + shoulders `bw` wide each side, standing on `bottom`
const n = (v) => +v.toFixed(2)
const person = (x, y, r, body, bw = r * 1.9, bottom = 44) => {
  const h = bottom - (y + r * 0.9)
  return [
    [`M${n(x - bw)} ${bottom}c0-${n(h * 0.62)} ${n(bw * 0.45)}-${n(h)} ${bw}-${n(h)}s${bw} ${n(h * 0.38)} ${bw} ${n(h)}Z`, body],
    [C(x, y, r), SKIN],
  ]
}
// Graduation cap (mortarboard) with tassel
const cap = (x, y, s = 1) => [
  [`M${x - 11 * s} ${y + 7 * s}v${5 * s}c0 ${2.4 * s} ${5 * s} ${4.2 * s} ${11 * s} ${4.2 * s}s${11 * s}-${1.8 * s} ${11 * s}-${4.2 * s}v-${5 * s}`, NAVY],
  [`M${x} ${y}l${15 * s} ${5.6 * s}-${15 * s} ${5.6 * s}-${15 * s}-${5.6 * s}Z`, NAVY],
  [`M${x + 12 * s} ${y + 4.6 * s}v${8 * s}`, 'none', 2, GOLD],
  [C(x + 12 * s, y + 13.6 * s, 1.8 * s), GOLD, 1.4],
]
// Yen sign centred on (x, y)
const yen = (x, y, s = 1) => `M${x - 3.4 * s} ${y - 5 * s}l${3.4 * s} ${5 * s} ${3.4 * s}-${5 * s}M${x} ${y}v${6 * s}M${x - 3.2 * s} ${y + 1 * s}h${6.4 * s}M${x - 3.2 * s} ${y + 3.6 * s}h${6.4 * s}`
// Archimedean spiral from radius r0 to r1
const spiral = (cx, cy, r0, r1, turns, a0 = 0) => {
  const pts = []
  for (let i = 0; i <= 64; i++) {
    const t = i / 64, a = a0 + t * turns * 2 * Math.PI, r = r0 + (r1 - r0) * t
    pts.push(`${n(cx + r * Math.cos(a))} ${n(cy + r * Math.sin(a))}`)
  }
  return `M${pts.join('L')}`
}
// Arrow head (open chevron) pointing in direction dx, dy (unit) at (x, y)
const head = (x, y, dx, dy, s = 4) => {
  const px = -dy, py = dx
  return `M${n(x - dx * s + px * s)} ${n(y - dy * s + py * s)}L${x} ${y}L${n(x - dx * s - px * s)} ${n(y - dy * s - py * s)}`
}

export default build([
  // ── Nouns ──
  ['ch16-n01', 'people', [ // 駅員 station attendant: conductor's cap + tie
    ...person(24, 22, 7, NAVY, 14),
    ['M21.6 31.2l2.4-1.6 2.4 1.6-2.4 7.4Z', RED, 1.8],
    ['M12.5 9.5h23l-3 8.5h-17Z', NAVY],
    ['M14.5 18h19l-1.8 3H16.3Z', D, 1.8],
    [C(24, 13.4, 2.2), GOLD, 1.4],
    [C(21.4, 24.4, 0.9) + C(26.6, 24.4, 0.9), D, 0],
    ['M21.6 27.2c1.4 1.2 3.4 1.2 4.8 0', 'none', 1.6]]],
  ['ch16-n02', 'people', [ // 親 parent: grown-up with a small child
    ...person(17, 14, 6.5, IND, 12.5),
    [C(14.6, 15, 0.9) + C(19.4, 15, 0.9), D, 0],
    ['M14.8 18c1.2 1 3.2 1 4.4 0', 'none', 1.6],
    ...person(34, 27, 4.6, VER, 8.5),
    [C(32.4, 27.6, 0.8) + C(35.6, 27.6, 0.8), D, 0]]],
  ['ch16-n03', 'people', [ // 親せき relatives: family tree
    ['M16 20v3h16v-3M24 23v3M10 29v-3h28v3', 'none', 2.2],
    ...person(16, 10, 3.6, NAVY, 6.2, 20),
    ...person(32, 10, 3.6, VER, 6.2, 20),
    ...person(10, 32.4, 3.6, LEAF, 6.2, 43),
    ...person(24, 32.4, 3.6, GOLD, 6.2, 43),
    ...person(38, 32.4, 3.6, INL, 6.2, 43)]],
  ['ch16-n04', 'thing', [ // ごみ garbage: bin with crumpled paper + apple core
    ['M32.5 7.4c0-1.6.6-3 1.8-3.8', 'none', 2],
    ['M27.6 11.6c2.2 1.8 2.6 5.4 0 8.4h10.8c-2.6-3-2.2-6.6 0-8.4Z', W, 2.2],
    ['M27 12c0-3 2.6-4.8 6-4.8s6 1.8 6 4.8Z', RED, 2.2],
    [C(31.6, 15.6, 0.9) + C(34.4, 15.6, 0.9), D, 0],
    [C(16.5, 16.5, 5.5), W, 2.2],
    ['M13.5 14.5l3 2.5 3-3.5M14 19.5l3-1.5', 'none', 1.6],
    ['M10 21h28l-3 21H13Z', GR],
    ['M18 26.5l1 11M24 26.5v11M30 26.5l-1 11', 'none', 2],
    [R(8, 19.5, 32, 4.5, 1.6), GRD, 2.2]]],
  ['ch16-n05', 'food', [ // 砂糖 sugar: bowl of sugar cubes
    ['M10 18l7 3.5-7 3.5-7-3.5Z', W, 2.2], ['M3 21.5l7 3.5v7l-7-3.5Z', GRL, 2.2], ['M10 25l7-3.5v7L10 32Z', W, 2.2],
    ['M38 18l7 3.5-7 3.5-7-3.5Z', W, 2.2], ['M31 21.5l7 3.5v7l-7-3.5Z', GRL, 2.2], ['M38 25l7-3.5v7L38 32Z', W, 2.2],
    ['M24 11l7 3.5-7 3.5-7-3.5Z', W, 2.2], ['M17 14.5l7 3.5v7l-7-3.5Z', GRL, 2.2], ['M24 18l7-3.5v7L24 25Z', W, 2.2],
    ['M5 27h38c0 8.4-8.4 15-19 15S5 35.4 5 27Z', IND],
    ['M10.5 33h27', 'none', 2.2, INL],
    [sparkle(9, 9, 3.6) + sparkle(40, 8, 2.8), GOLD, 1.4]]],
  ['ch16-n06', 'thing', [ // ファイル file folder with papers
    ['M5 11a2 2 0 0 1 2-2h10l3 4h21a2 2 0 0 1 2 2v25a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z', GOLDD],
    [R(10, 11, 26, 20, 1.5), W, 2],
    ['M14 16h18M14 21h12', 'none', 2, GR],
    ['M4 20h40l-2.4 20a2.4 2.4 0 0 1-2.4 2H8.8a2.4 2.4 0 0 1-2.4-2Z', GOLD],
    [R(18, 27, 12, 5, 1.2), W, 1.8]]],
  ['ch16-n07', 'thing', [ // 大きさ size: small / medium / large box + growth arrow
    [R(4, 33, 8, 8, 1.6), INL],
    [R(15, 28, 13, 13, 2), INL],
    [R(31, 23, 14, 18, 2), INL],
    ['M3 42h42', 'none', 2.5],
    ['M7 27c3-10 13-17 26-16', 'none', 2.6, VER],
    [head(33, 11, 1, 0.05, 3.6), 'none', 2.6, VER]]],
  ['ch16-n08', 'place', [ // 道 road: road into the distance
    [R(4, 6, 40, 36, 4), LEAFL],
    ['M21 6h6l13 36H8Z', GRD, 0],
    ['M24 9v4M24 17.5v6M24 29v9', 'none', 2.6, W],
    ['M21 6L8 42M27 6l13 36', 'none', 2.5],
    [R(4, 6, 40, 36, 4), 'none']]],
  ['ch16-n09', 'event', [ // 期末試験 final exam: test paper marked with red circles + pencil
    [R(7, 5, 25, 36, 2.5), W],
    [R(11, 9, 17, 5, 1), GRL, 1.8],
    [C(14, 21, 2.6) + C(14, 28.5, 2.6) + C(14, 36, 2.6), 'none', 2, RED],
    ['M19.5 21h8M19.5 28.5h8M19.5 36h5', 'none', 2],
    ['M27.75 35.55L39 18.7L43 21.3L31.75 38.15Z', GOLD, 2.2],
    ['M39 18.7l1.9-2.9 4 2.6-1.9 2.9Z', PINK, 2],
    ['M27.75 35.55L27 41l4.75-2.85Z', TAN, 2]]],
  ['ch16-n10', 'thing', [ // 研究 research: lab flask + test tube
    ['M16 6h12M18 6v11L7 37a3 3 0 0 0 2.6 4.6h22.8A3 3 0 0 0 35 37L24 17V6', W],
    ['M11.4 29h19.2L35 37a3 3 0 0 1-2.6 4.6H9.6A3 3 0 0 1 7 37Z', LEAF, 0],
    ['M18 6v11L7 37a3 3 0 0 0 2.6 4.6h22.8A3 3 0 0 0 35 37L24 17V6M16 6h12', 'none'],
    ['M11.4 29h19.2', 'none', 2],
    [C(16, 35, 1.8) + C(24, 33, 1.3) + C(19, 23.5, 1.4) + C(22, 13, 1.2), W, 1.6],
    ['M36 12h6v22a3 3 0 0 1-6 0Z', W],
    ['M36 24h6v10a3 3 0 0 1-6 0Z', VER, 0],
    ['M36 12h6v22a3 3 0 0 1-6 0ZM36 24h6', 'none'],
    ['M34.5 12h9', 'none', 2.5]]],
  ['ch16-n11', 'place', [ // 大学院 graduate school: columned academic building + cap
    [R(4, 38, 36, 5, 1), GRL],
    [R(7, 19, 5, 19, .8) + R(15.5, 19, 5, 19, .8) + R(24, 19, 5, 19, .8) + R(32.5, 19, 5, 19, .8), W, 2.2],
    [R(5, 15, 35, 4.5, 1), GRL],
    ['M3 15L22.5 5 42 15Z', IND],
    [C(22.5, 11, 2), GOLD, 1.6],
    ...cap(37, 29, 0.48)]],
  ['ch16-n12', 'thing', [ // 奨学金 scholarship: graduation cap on a yen coin
    [C(24, 30, 13), GOLD],
    [C(24, 30, 9.6), 'none', 1.8, GOLDD],
    [yen(24, 29.5, 1.15), 'none', 2.2],
    ...cap(24, 3.5, 0.75)]],
  ['ch16-n13', 'thing', [ // 推薦状 letter of recommendation: letter + thumbs up
    [R(5, 5, 25, 33, 2.5), W],
    ['M10 12h15M10 17.5h15M10 23h10', 'none', 2],
    ['M10 31c2-3 3-3 4 0s2 3 4-1', 'none', 2, IND],
    [R(22, 27, 5.5, 15, 1.5), IND],
    [R(27.5, 26.5, 14.5, 15.5, 3.5), SKIN],
    ['M29 26.6l3.4-8.4c.8-1.9 4-1.4 3.9.7l-.5 7.7', SKIN],
    ['M35 31h7M35 35h7M35 39h6', 'none', 1.8]]],
  ['ch16-n14', 'event', [ // 台風 typhoon: swirling storm
    [C(24, 24, 19), INL, 0],
    [spiral(24, 24, 1.5, 17.5, 2.4, -Math.PI / 2), 'none', 3.6, IND],
    [C(24, 24, 3.4), W, 2.2]]],
  ['ch16-n16', 'thing', [ // 返事 reply: letter + reply arrow
    [R(4, 8, 32, 24, 3), W],
    ['M4.8 10.4L20 21l15.2-10.6', 'none', 2.5],
    [C(34, 33, 10), LEAF],
    ['M39.4 38c0-5.4-3-8.6-8.4-8.6h-3.6', 'none', 2.6, W],
    [head(27.4, 29.4, -1, 0, 3.6), 'none', 2.6, W]]],

  // ── Adjective ──
  ['ch16-o01', 'feeling', [ // 汚い dirty: stained T-shirt with stink lines
    ['M18 10l-9 4.5-4 9 5.5 2.6 2.3-4.4V43h22.4V21.7l2.3 4.4 5.5-2.6-4-9L30 10c-1 2.6-3.4 4-6 4s-5-1.4-6-4Z', W],
    [E(18, 29, 3.6, 2.8) + C(22.4, 32.6, 1.3) + E(29.5, 37, 3.2, 2.4) + C(31, 27, 1.6), BR, 0],
    ['M20 7c-1.6-1.4 1.6-2.6 0-4.4M28 7c-1.6-1.4 1.6-2.6 0-4.4', 'none', 2, LEAF],
    ['M41 34c-1.6-1.4 1.6-2.6 0-4.4M6 34c-1.6-1.4 1.6-2.6 0-4.4', 'none', 2, LEAF]]],

  // ── Verbs ──
  ['ch16-u01', 'verb', [ // 起こす wake someone up: shaking a sleeper in bed
    ...person(34, 10, 4.8, VER, 8, 26),
    [R(3, 30, 42, 7, 2), W],
    ['M6 37v5M42 37v5', 'none'],
    [E(11, 27.5, 6.5, 3.2), W, 2.2],
    [C(12, 22, 5.5), SKIN],
    ['M9.8 22.4c.8.8 2.2.8 3 0', 'none', 1.6],
    ['M17 31c1-5 4-7 9-7h16a3 3 0 0 1 3 3v4Z', INL],
    ['M28.5 17c-3.5.6-6.4 2-8.4 4', 'none', 2.6],
    [C(19, 21.6, 2.4), SKIN, 1.8],
    ['M5 13.5L3 11M9.5 11.5l-.6-3M14.5 12.5l1.4-2.8', 'none', 2]]],
  ['ch16-u02', 'verb', [ // おごる treat someone: paying the bill (receipt + heart)
    ['M8 5h22v34l-3.7-2.6-3.6 2.6-3.7-2.6-3.6 2.6-3.7-2.6L8 39Z', W],
    [yen(19, 15, 1.1), 'none', 2.2],
    ['M12.5 26h13M12.5 31h9', 'none', 2, GR],
    [C(34, 32, 10), VER],
    [heart(34, 37, 6), W, 2]]],
  ['ch16-u03', 'verb', [ // 笑う laugh: laughing face with happy tears
    [C(24, 25, 16.5), GOLD],
    ['M14 21c1.4-2.8 5.2-2.8 6.6 0M27.4 21c1.4-2.8 5.2-2.8 6.6 0', 'none', 2.4],
    ['M13.5 27h21c-.8 6.4-5 10.6-10.5 10.6S14.3 33.4 13.5 27Z', '#9B2F2F', 2.2],
    ['M18.6 34.4c3-2 7.8-2 10.8 0-1.6 2-3.4 3.2-5.4 3.2s-3.8-1.2-5.4-3.2Z', PINK, 0],
    ['M10 24.5c-2 2.6-2.4 4.6-.8 5.6s3-.6 2.4-3.2ZM38 24.5c2 2.6 2.4 4.6.8 5.6s-3-.6-2.4-3.2Z', SKY, 1.6],
    ['M5 10l3 2.4M9 5.5l1.6 3.4M43 10l-3 2.4M39 5.5l-1.6 3.4', 'none', 2.2]]],
  ['ch16-u04', 'verb', [ // 落ち込む get depressed: gloomy face under a rain cloud
    [C(24, 31, 12.5), INL],
    ['M17 29l4 1.4M31 29l-4 1.4', 'none', 2.2],
    ['M19.5 38c2.4-2.4 6.6-2.4 9 0', 'none', 2.4],
    ['M13 14a4.5 4.5 0 0 1 1.4-8.8A7 7 0 0 1 27.4 5a5.5 5.5 0 0 1 7.6 5 4 4 0 0 1-1 8H14.6c-.6 0-1.1-.1-1.6-.3Z', GR, 2.2],
    ['M16 21l-1 2.6M23 21l-1 2.6M30 21l-1 2.6', 'none', 2, IND]]],
  ['ch16-u05', 'verb', [ // 困る be in trouble: worried face with a sweat drop
    [C(23, 25, 16.5), GOLD],
    ['M12.6 17.4l5.4-2.2M33.4 17.4l-5.4-2.2', 'none', 2.4],
    [C(16.6, 22.6, 1.8) + C(29.4, 22.6, 1.8), D, 0],
    ['M15 32.6c1.6-1.8 3.2-1.8 4.8 0s3.2 1.8 4.8 0 3.2-1.8 4.8 0', 'none', 2.4],
    ['M40.6 12c-2.6 3.4-3.6 5.6-3.6 7.2a3.6 3.6 0 0 0 7.2 0c0-1.6-1-3.8-3.6-7.2Z', SKY, 2]]],
  ['ch16-u06', 'verb', [ // 出す take out / hand in: paper pulled out of a drawer, up arrow
    [R(5, 20, 30, 23, 2.5), BRL],
    [R(9, 6, 18, 22, 1.5), W, 2.2],
    ['M12.5 11.5h11M12.5 16h11M12.5 20.5h7', 'none', 1.8, GR],
    [R(3, 24, 34, 9, 2), TAN],
    ['M16 28.5h8', 'none', 2.6],
    ['M41 23V7', 'none', 3, LEAF],
    [head(41, 6.5, 0, -1, 4.2), 'none', 3, LEAF]]],
  ['ch16-u07', 'verb', [ // 直す fix: wrench + screwdriver
    ['M32.12 20.12L12.12 40.12a3 3 0 0 1-4.24-4.24L27.88 15.88Z', GR, 2.2],
    ['M36.14 8.74A7 7 0 1 0 39.26 11.86L35.62 15.5L32.5 12.38Z', GR, 2.2],
    ['M8 8l18 18', 'none', 6],
    ['M8 8l18 18', 'none', 2.4, GRL],
    ['M29.83 24.17L41.83 36.17a4 4 0 0 1-5.66 5.66L24.17 29.83Z', RED, 2.2],
    ['M31.5 31.5l3 3', 'none', 2, W]]],
  ['ch16-u08', 'verb', [ // 見つかる be found: magnifier over a lost key, sparkles
    ['M30.4 34.4l3.8-3.8 9 9a2.7 2.7 0 0 1-3.8 3.8Z', BR, 2],
    [C(20, 20, 13.5), GR],
    [C(20, 20, 9.8), GLASS, 2],
    [C(15.6, 20, 3.2), GOLD, 1.8],
    ['M18.8 20h7.4M23.6 20v3.2M26 20v2.4', 'none', 2],
    [sparkle(40, 8, 4.4) + sparkle(7, 40, 3.2), GOLD, 1.4]]],
  ['ch16-u09', 'verb', [ // 訳す translate: A ⇄ 文 cards
    [R(4, 4, 22, 22, 4), IND],
    ['M9.8 21.4l5.2-12.8 5.2 12.8M11.8 17h6.4', 'none', 2.6, W],
    [R(22, 22, 22, 22, 4), W],
    ['M33 24.8v2.2M27 28.6h12M29.6 29.4c1.6 5 4.4 9.2 8.6 11.4M36.4 29.4c-1.6 5-4.4 9.2-8.6 11.4', 'none', 2.4],
    ['M7 31c0 5.4 3.2 8.6 8.6 8.6', 'none', 2.4, VER],
    [head(16, 39.6, 1, 0, 3.2), 'none', 2.4, VER],
    ['M41 17c0-5.4-3.2-8.6-8.6-8.6', 'none', 2.4, VER],
    [head(32, 8.4, -1, 0, 3.2), 'none', 2.4, VER]]],
  ['ch16-u10', 'verb', [ // 貸す lend: book handed over, with a return arrow
    ...person(11, 15, 5.4, VER, 9, 42),
    ['M20 19.5h12.5', 'none', 2.6, GOLDD],
    [head(33, 19.5, 1, 0, 3.6), 'none', 2.6, GOLDD],
    [R(30, 24, 14, 17, 2), IND],
    ['M33.5 24v17', 'none', 2],
    [R(36.5, 28, 5, 3.6, .8), W, 1.6],
]],
  ['ch16-u11', 'verb', [ // 連れていく take someone along: leading a friend to a place
    ...person(10, 19, 4.8, INL, 8, 43),
    ...person(23, 17, 4.8, VER, 8, 43),
    ['M16 31.5l2.4-.6', 'none', 3, D],
    ['M14 8h16', 'none', 2.6, IND],
    [head(31, 8, 1, 0, 3.6), 'none', 2.6, IND],
    [E(39, 41.5, 5, 1.8), GRL, 1.8],
    ['M39 40c-4.4-5-6.4-7.8-6.4-11a6.4 6.4 0 0 1 12.8 0c0 3.2-2 6-6.4 11Z', RED, 2.2],
    [C(39, 29, 2.3), W, 1.6]]],
  ['ch16-u12', 'verb', [ // 道に迷う get lost: signpost with a question mark
    [R(26, 10, 4.4, 32, 1), BR, 2.2],
    ['M30 12h10l4 4.5-4 4.5H30Z', GOLD, 2.2],
    ['M26.4 23H14l-4 4.5 4 4.5h12.4Z', VERL, 2.2],
    ['M18 42h20', 'none', 2.5],
    ['M6.5 10a5 5 0 1 1 7.6 4.2c-1.6 1-2.6 2-2.6 3.8', 'none', 3, IND],
    [C(11.5, 22.4, 1.9), IND, 0]]],
  ['ch16-u13', 'verb', [ // 迎えに行く go to pick up: car driving off to someone waiting
    ...person(39.5, 25, 4.4, VER, 5.5, 41),
    ['M4 26l3.6-6.6A3 3 0 0 1 10.2 18h11.4a3 3 0 0 1 2.4 1.2L29 26Z', SKY, 2.2],
    [R(3, 25, 30, 9, 3), IND],
    ['M16 18.4V26', 'none', 2],
    [C(10, 35, 3.6) + C(26, 35, 3.6), GRD, 2.2],
    [R(29.5, 27, 3, 2.6, .8), GOLDL, 1.4],
    ['M3 41h42', 'none', 2.5],
    ['M14 11.5h12', 'none', 2.4, GOLDD],
    [head(27, 11.5, 1, 0, 3.4), 'none', 2.4, GOLDD]]],
  ['ch16-r01', 'verb', [ // 集める collect: things flying into a jar
    ['M17 18c0 2-4 3.4-4 7v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V25c0-3.6-4-5-4-7Z', GLASS],
    [C(18.6, 37.4, 3.2) + C(29.4, 37.4, 3.2), VER, 1.8],
    [C(24, 37.6, 3.2), GOLD, 1.8],
    [C(21, 31, 3) + C(27.6, 30.6, 3), LEAF, 1.8],
    [R(15, 14, 18, 5, 1.6), BRL, 2.2],
    [C(7, 7.5, 3.2), GOLD, 1.8],
    [C(41, 7.5, 3.2), VER, 1.8],
    ['M10.6 9.6c3 .8 5.4 2.4 7 5M37.4 9.6c-3 .8-5.4 2.4-7 5', 'none', 2.4, IND],
    [head(17.6, 14.6, 0.5, 0.86, 3.2), 'none', 2.4, IND],
    [head(30.4, 14.6, -0.5, 0.86, 3.2), 'none', 2.4, IND]]],
  ['ch16-r02', 'verb', [ // 入れる put in: something going into an open box
    ['M8 25h32l-3.6-5H11.6Z', BR, 2.2],
    [R(15, 4, 12, 15, 1.6), IND, 2.2],
    ['M18 4v15', 'none', 1.8],
    ['M34 6v10', 'none', 3, VER],
    [head(34, 16.5, 0, 1, 4.2), 'none', 3, VER],
    [R(8, 25, 32, 17, 1.5), TAN],
    ['M8 25L3 19.5M40 25l5-5.5', 'none', 2.5],
    ['M20 30h8', 'none', 2.4, BR]]],
  ['ch16-r03', 'verb', [ // 見せる show: holding up a photo for someone to see
    ['M3 13c4.2-5.6 13.8-5.6 18 0-4.2 5.6-13.8 5.6-18 0Z', W, 2.2],
    [C(12, 13, 3), IND, 1.6],
    ['M21.5 18l2.6 2.4', 'none', 2, GR],
    [R(20, 17, 24, 20, 2), W],
    [R(23.5, 20.5, 17, 13, 1), SKY, 1.8],
    ['M23.9 33.1l5.6-7.2 3.4 4 2.6-2.6 5 5.8Z', LEAF, 1.8],
    ['M26 44v-5.6c0-2 1.6-3.4 3.6-3.4h3.2a3 3 0 0 1 3 3V44', SKIN, 2.2],
    ['M26 40.4h-1.6a2 2 0 0 1 0-4H27', SKIN, 2]]],
  ['ch16-r04', 'verb', [ // 乗り遅れる miss a train: train pulling away, clock
    ['M3 41h42', 'none', 2.5],
    ['M17 15h18c5 0 9 4 9 9v13H17Z', IND],
    [R(20, 19, 6, 6, 1) + R(29, 19, 6, 6, 1), SKY, 1.8],
    ['M38 19c2.4.8 3.6 2.6 4 6h-4Z', SKY, 1.8],
    ['M17 31h27', 'none', 2.2, GOLD],
    [C(23, 38.5, 2.4) + C(36, 38.5, 2.4), GR, 1.8],
    ['M5 22h7M3 27h9M6 32h6', 'none', 2.2, GR],
    [C(10, 10, 6.5), W, 2.2],
    ['M10 6.6V10l2.6 1.6', 'none', 1.8, RED]]],
  ['ch16-r05', 'verb', [ // アイロンをかける iron: iron with steam
    ['M17 22c0-5.6 2.4-8 6.4-8H37a3 3 0 0 1 3 3v5', 'none', 3],
    ['M4 36L11 24.6a5 5 0 0 1 4.2-2.6H41a3 3 0 0 1 3 3V36Z', INL],
    [R(3, 35, 42, 5, 1.8), GR, 2.2],
    [C(30, 29, 2.4), VER, 1.6],
    ['M7 21c-1.6-1.6 1.6-2.8 0-4.6M12 18c-1.6-1.6 1.6-2.8 0-4.6', 'none', 2, GR]]],
  ['ch16-i01', 'verb', [ // 朝寝坊する oversleep: alarm clock ringing, still Zzz
    ['M9 41l3-4M29 41l-3-4', 'none', 2.5],
    [C(10.5, 17, 4) + C(27.5, 17, 4), GOLD, 2.2],
    [C(19, 28, 12.5), GOLD],
    [C(19, 28, 9), W, 2],
    ['M19 28v-6M19 28l-4.4 2', 'none', 2.4],
    ['M4 12l-1.8-2.4M8.4 9.4l-.6-3M34 12l1.8-2.4M29.6 9.4l.6-3', 'none', 2],
    ['M31 19h7.6L31 28h7.6', 'none', 2.6, IND],
    ['M37.5 6h6l-6 7h6', 'none', 2.4, IND]]],
  ['ch16-i02', 'verb', [ // 案内する show around: tour guide with a flag
    ['M33 5v26', 'none', 2.5],
    ['M33 5l11 4-11 4Z', GOLD, 2.2],
    ...person(17, 18, 5.8, VER, 10, 42),
    ['M23.4 28.4L33 22', 'none', 2.6],
    [C(33, 22, 2.3), SKIN, 1.8],
    ...person(38, 34, 3.6, INL, 6, 44)]],
  ['ch16-i03', 'verb', [ // 説明する explain: speaker + bubble with a diagram
    ...person(11, 25, 5.4, IND, 9),
    ['M20 4h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H26l-5 4.6V26h-1a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z', W],
    [C(23.5, 15, 3.4), GOLD, 1.8],
    [R(33, 11.5, 7, 7, 1), VERL, 1.8],
    ['M27.6 15h4', 'none', 1.8],
    [head(32, 15, 1, 0, 2), 'none', 1.8]]],
  ['ch16-i04', 'verb', [ // 迎えに来る come to pick up: car coming toward you, someone waving
    [R(19.5, 13, 22, 13, 4), SKY],
    [R(16, 23, 29, 13, 3.5), IND],
    [R(18, 36, 6, 5, 1.5) + R(37, 36, 6, 5, 1.5), GRD, 2],
    [C(21.6, 29.5, 2.6) + C(39.4, 29.5, 2.6), GOLDL, 1.6],
    ['M27 31.5h7', 'none', 2.2],
    ...person(6.5, 24, 3.6, VER, 4.5, 42),
    ['M9.6 30.4l3-9', 'none', 2.4],
    [C(13, 19.6, 2), SKIN, 1.6],
    ['M9.4 14.8l1.4 1.8M13.4 13v2.2M17.4 14.8l-1.4 1.8', 'none', 1.8]]],

  // ── Other ──
  ['ch16-o05', 'time', [ // これから from now on: arrow running forward from "now"
    [R(16, 30, 24, 9, 4.5), INL, 0],
    ['M5 34.5h29', 'none', 2.5],
    ['M30 34.5h13', 'none', 3, IND],
    [head(43.5, 34.5, 1, 0, 4.4), 'none', 3, IND],
    ['M16 10v13', 'none', 3, VER],
    [head(16, 23, 0, 1, 5), 'none', 3, VER],
    [C(16, 34.5, 3.4), VER, 2]]],
  ['ch16-o12', 'feeling', [ // ごめん sorry: eyes squeezed shut, hands pressed together
    [C(24, 20, 15.5), GOLD],
    ['M14.8 14.6l4.2 2.4-4.2 2.4M33.2 14.6l-4.2 2.4 4.2 2.4', 'none', 2.4],
    [E(12.6, 24, 2.6, 1.6) + E(35.4, 24, 2.6, 1.6), PINK, 0],
    ['M24 29.4c-1.8-2-4.6-1.6-5.6.8l-3.6 9.8c-.8 2.2.6 4 2.8 4H24ZM24 29.4c1.8-2 4.6-1.6 5.6.8l3.6 9.8c.8 2.2-.6 4-2.8 4H24Z', SKIN, 2.2],
    ['M20 33.4l-1.8 5M28 33.4l1.8 5', 'none', 1.6],
    ['M40.6 5c-2.4 3-3.2 5-3.2 6.4a3.2 3.2 0 0 0 6.4 0c0-1.4-.8-3.4-3.2-6.4Z', SKY, 1.8]]],
  ['ch16-o13', 'event', [ // 失礼します excuse me: knocking on a door
    [R(10, 4, 23, 39, 2), BRL],
    [R(14, 8, 15, 12, 1) + R(14, 24, 15, 15, 1), TAN, 2],
    [C(28.6, 26.6, 1.8), GOLD, 1.6],
    ['M5 43h38', 'none', 2.5],
    ['M37 14c2.2 1.8 2.2 5.2 0 7M41 11c3.6 3 3.6 10 0 13', 'none', 2.4, VER]]],
])
