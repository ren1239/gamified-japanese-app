import { toRomaji } from 'wanakana'

// Kanji → kana replacements ordered longest-first to avoid partial matches.
// Covers Genki I & II vocabulary appearing in quiz choices.
const KANJI_MAP = [
  ['授業中', 'じゅぎょうちゅう'],
  ['韓国語', 'かんこくご'],
  ['日本語', 'にほんご'],
  ['富士山', 'ふじさん'],
  ['勉強', 'べんきょう'],
  ['運転', 'うんてん'],
  ['音楽', 'おんがく'],
  ['映画', 'えいが'],
  ['神社', 'じんじゃ'],
  ['広島', 'ひろしま'],
  ['日本', 'にほん'],
  ['食べ', 'たべ'],
  ['飲み', 'のみ'],
  ['飲む', 'のむ'],
  ['飲ん', 'のん'],
  ['働い', 'はたらい'],
  ['働く', 'はたらく'],
  ['書い', 'かい'],
  ['書く', 'かく'],
  ['書け', 'かけ'],
  ['登っ', 'のぼっ'],
  ['登る', 'のぼる'],
  ['登れ', 'のぼれ'],
  ['寝', 'ね'],
  ['来る', 'くる'],
  ['来た', 'きた'],
  ['来て', 'きて'],
  ['来れ', 'これ'],
  ['来', 'き'],
  ['行っ', 'いっ'],
  ['行く', 'いく'],
  ['行か', 'いか'],
  ['行き', 'いき'],
  ['行け', 'いけ'],
  ['行', 'い'],
  ['読ん', 'よん'],
  ['読む', 'よむ'],
  ['読み', 'よみ'],
  ['読', 'よ'],
  ['見た', 'みた'],
  ['見て', 'みて'],
  ['見る', 'みる'],
  ['見れ', 'みれ'],
  ['見', 'み'],
  ['机', 'つくえ'],
  ['本', 'ほん'],
  ['私', 'わたし'],
  ['車', 'くるま'],
  ['母', 'はは'],
  ['父', 'ちち'],
  ['友達', 'ともだち'],
  ['先生', 'せんせい'],
  ['医者', 'いしゃ'],
]

function applyKanjiMap(str) {
  let result = str
  for (const [kanji, kana] of KANJI_MAP) {
    result = result.split(kanji).join(kana)
  }
  return result
}

const KATAKANA_RE = /[\u30A0-\u30FF]/
const HIRAGANA_RE = /[\u3040-\u309F]/
const KANJI_RE = /[\u4E00-\u9FFF]/

/**
 * Returns romaji for a Japanese string, or null if the string has no Japanese.
 */
export function toRomajiSafe(str) {
  if (!str) return null
  if (!KATAKANA_RE.test(str) && !HIRAGANA_RE.test(str) && !KANJI_RE.test(str)) return null

  const preprocessed = applyKanjiMap(str)
  const romaji = toRomaji(preprocessed, { upcaseKatakana: false })

  // If kanji remain (unconverted), they'll still be in the output — strip them
  // so we don't show half-converted garbage
  const remainingKanji = romaji.match(/[\u4E00-\u9FFF]/g)
  if (remainingKanji) {
    // Replace remaining kanji with · placeholder
    return romaji.replace(/[\u4E00-\u9FFF]+/g, '·')
  }

  return romaji
}
