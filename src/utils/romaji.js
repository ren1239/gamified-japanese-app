import { toRomaji } from 'wanakana'

// Kanji → kana replacements, longest-first to avoid partial matches.
// Covers Genki I & II vocabulary appearing in quiz choices.
const KANJI_MAP = [
  // ── Multi-kanji words ───────────────────────────
  ['授業中', 'じゅぎょうちゅう'],
  ['韓国語', 'かんこくご'],
  ['日本語', 'にほんご'],
  ['富士山', 'ふじさん'],
  ['買い物', 'かいもの'],
  ['お弁当', 'おべんとう'],
  ['勉強', 'べんきょう'],
  ['運転', 'うんてん'],
  ['音楽', 'おんがく'],
  ['映画', 'えいが'],
  ['神社', 'じんじゃ'],
  ['広島', 'ひろしま'],
  ['友達', 'ともだち'],
  ['先生', 'せんせい'],
  ['医者', 'いしゃ'],
  ['彼女', 'かのじょ'],
  ['説明', 'せつめい'],
  ['掃除', 'そうじ'],
  ['宿題', 'しゅくだい'],
  ['料理', 'りょうり'],
  ['試験', 'しけん'],
  ['週末', 'しゅうまつ'],
  ['学生', 'がくせい'],
  ['部屋', 'へや'],
  ['弁当', 'べんとう'],
  ['日本', 'にほん'],
  // ── Verb stems / conjugated forms ──────────────
  ['忘れ', 'わすれ'],
  ['忘', 'わす'],
  ['教え', 'おしえ'],
  ['教', 'おし'],
  ['助け', 'たすけ'],
  ['助', 'たす'],
  ['作っ', 'つくっ'],
  ['作る', 'つくる'],
  ['作り', 'つくり'],
  ['作', 'つく'],
  ['買っ', 'かっ'],
  ['買い', 'かい'],
  ['買', 'か'],
  ['診', 'み'],
  ['食べ', 'たべ'],
  ['飲め', 'のめ'],
  ['飲み', 'のみ'],
  ['飲む', 'のむ'],
  ['飲ん', 'のん'],
  ['飲', 'の'],
  ['聞い', 'きい'],
  ['聞く', 'きく'],
  ['聞け', 'きけ'],
  ['聞か', 'きか'],
  ['聞', 'き'],
  ['働い', 'はたらい'],
  ['働く', 'はたらく'],
  ['働か', 'はたらか'],
  ['書い', 'かい'],
  ['書く', 'かく'],
  ['書け', 'かけ'],
  ['書か', 'かか'],
  ['登っ', 'のぼっ'],
  ['登る', 'のぼる'],
  ['登れ', 'のぼれ'],
  ['登', 'のぼ'],
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
  ['話し', 'はなし'],
  ['話す', 'はなす'],
  ['話', 'はなし'],
  // ── Common nouns / particles ────────────────────
  ['何', 'なに'],
  ['弟', 'おとうと'],
  ['机', 'つくえ'],
  ['上', 'うえ'],
  ['下', 'した'],
  ['中', 'なか'],
  ['前', 'まえ'],
  ['本', 'ほん'],
  ['私', 'わたし'],
  ['彼', 'かれ'],
  ['車', 'くるま'],
  ['母', 'はは'],
  ['父', 'ちち'],
  ['花', 'はな'],
]

function applyKanjiMap(str) {
  let result = str
  for (const [kanji, kana] of KANJI_MAP) {
    result = result.split(kanji).join(kana)
  }
  return result
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
