// Contact sheet of the vocab icons for a chapter: design/vocab-icons-chNN.png (+ .html).
//   node scripts/icon-sheet.mjs 15
// Renders with headless Chrome; words without an icon are shown as plain text tiles.
import { writeFileSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import VOCAB_ICONS from '../src/data/vocabIcons/index.js'

const ch = Number(process.argv[2] ?? 15)
const pad = String(ch).padStart(2, '0')
const vocabMod = await import(pathToFileURL(resolve(`src/data/ch${pad}VocabData.js`)))
const words = Object.entries(vocabMod).find(([k]) => /Vocab$/.test(k))[1]

const svg = (icon, size) => `<svg viewBox="0 0 48 48" width="${size}" height="${size}" stroke-linecap="round" stroke-linejoin="round">${
  icon.shapes.map((s) => `<path d="${s.d}" fill="${s.f}" stroke="${s.s}" stroke-width="${s.w}"/>`).join('')}</svg>`

const tiles = words.map((w) => {
  const icon = VOCAB_ICONS[`ch${ch}-${w.id}`]
  const label = `<b>${w.kanji || w.kana}</b><small>${w.english.replace(/\s*\(.*?\)/g, '')}</small>`
  return icon
    ? `<figure><div class="tile" style="background:${icon.tint}">${svg(icon, 64)}</div>${label}</figure>`
    : `<figure><div class="tile text">${w.kanji || w.kana}</div>${label}</figure>`
}).join('')

const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;padding:20px;background:#F6F5F1;font:600 12px/1.25 "Hiragino Sans",system-ui,sans-serif;color:#1F2421}
main{display:grid;grid-template-columns:repeat(8,104px);gap:14px 10px}
figure{margin:0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px}
.tile{width:92px;height:92px;border-radius:22px;display:grid;place-items:center}
.tile.text{background:#ECEAE3;font-size:22px;font-weight:800;color:#5E6460}
b{font-size:13px}small{font-size:11px;color:#5E6460;max-width:104px}
</style><main>${tiles}</main>`

mkdirSync('design', { recursive: true })
const htmlPath = resolve(`design/vocab-icons-ch${pad}.html`)
const pngPath = resolve(`design/vocab-icons-ch${pad}.png`)
writeFileSync(htmlPath, html)
const rows = Math.ceil(words.length / 8)
execFileSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=2',
  `--window-size=${40 + 8 * 104 + 7 * 10},${40 + rows * 172}`, `--screenshot=${pngPath}`, pathToFileURL(htmlPath).href,
], { stdio: 'ignore' })
console.log(`${words.filter((w) => VOCAB_ICONS[`ch${ch}-${w.id}`]).length}/${words.length} icons → ${pngPath}`)
