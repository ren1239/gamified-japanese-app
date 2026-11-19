import { toRomaji } from 'wanakana'
import { buildReadingRules, applyReadingRules } from './kanjiReadings'

// Readings come from kanjiReadings.js (manual map + rules derived from every chapter's vocab)
const vocabModules = import.meta.glob('../data/ch*VocabData.js', { eager: true })
const VOCAB_LISTS = Object.values(vocabModules).flatMap((m) => Object.values(m).filter(Array.isArray))
const READING_RULES = buildReadingRules(VOCAB_LISTS)

function applyKanjiMap(str) {
  return applyReadingRules(str, READING_RULES)
}

/** Replace known kanji words with their kana reading (unknown kanji are left as-is) */
export function kanjiToKana(str) {
  return str ? applyKanjiMap(str) : str
}

/**
 * Splits a string into [text, reading] segments for furigana: reading is the kana for a known
 * kanji word, null for everything else. Same rules as kanjiToKana.
 */
export function furiganaSegments(str) {
  const found = []
  const mark = (kanji, kana) => `\uE000${found.push([kanji, kana]) - 1}\uE001`
  let s = str
  for (const [pattern, kana] of READING_RULES) {
    s = typeof pattern === 'string' ? s.split(pattern).join(mark(pattern, kana)) : s.replace(pattern, (m) => mark(m, kana))
  }
  return s.split(/\uE000(\d+)\uE001/).flatMap((part, i) =>
    i % 2 ? [found[part]] : part ? [[part, null]] : [])
}

const HAS_JAPANESE = /[\u3040-\u30FF\u4E00-\u9FFF]/

/**
 * Returns romaji for a Japanese string, or null if the string has no Japanese.
 * Remaining unconverted kanji are replaced with · so output is never garbage.
 */
export function toRomajiSafe(str) {
  if (!str || !HAS_JAPANESE.test(str)) return null

  const preprocessed = applyKanjiMap(str)
  const romaji = toRomaji(preprocessed, { upcaseKatakana: false })

  // Replace any kanji that slipped through with · so it doesn't look broken
  return romaji.replace(/[\u4E00-\u9FFF]+/g, '·')
}
