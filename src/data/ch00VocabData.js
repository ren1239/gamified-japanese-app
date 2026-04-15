// Chapter 0 Vocabulary — Numbers & Counters
// category: 'noun' (numbers) | 'other' (counters)

export const ch00Vocab = [
  // ── Numbers ────────────────────────────────────────────────────
  { id: 'n01', kana: 'いち',   kanji: '一',  english: 'one',           category: 'noun' },
  { id: 'n02', kana: 'に',     kanji: '二',  english: 'two',           category: 'noun' },
  { id: 'n03', kana: 'さん',   kanji: '三',  english: 'three',         category: 'noun' },
  { id: 'n04', kana: 'よん',   kanji: '四',  english: 'four (also し)', category: 'noun' },
  { id: 'n05', kana: 'ご',     kanji: '五',  english: 'five',          category: 'noun' },
  { id: 'n06', kana: 'ろく',   kanji: '六',  english: 'six',           category: 'noun' },
  { id: 'n07', kana: 'なな',   kanji: '七',  english: 'seven (also しち)', category: 'noun' },
  { id: 'n08', kana: 'はち',   kanji: '八',  english: 'eight',         category: 'noun' },
  { id: 'n09', kana: 'きゅう', kanji: '九',  english: 'nine (also く)', category: 'noun' },
  { id: 'n10', kana: 'じゅう', kanji: '十',  english: 'ten',           category: 'noun' },
  { id: 'n11', kana: 'ひゃく', kanji: '百',  english: 'one hundred',   category: 'noun' },
  { id: 'n12', kana: 'せん',   kanji: '千',  english: 'one thousand',  category: 'noun' },
  { id: 'n13', kana: 'まん',   kanji: '万',  english: 'ten thousand',  category: 'noun' },

  // ── Counters ───────────────────────────────────────────────────
  { id: 'o01', kana: '〜どる',   kanji: '〜ドル',  english: 'dollars',                        category: 'other' },
  { id: 'o02', kana: '〜まい',   kanji: '〜枚',   english: 'counter for flat things',         category: 'other' },
  { id: 'o03', kana: '〜ど',     kanji: '〜度',   english: 'degrees; times',                  category: 'other' },
  { id: 'o04', kana: '〜じゅう', kanji: '〜十',   english: 'tens (twenty, thirty…)',          category: 'other' },
  { id: 'o05', kana: '〜まん',   kanji: '〜万',   english: 'ten thousands',                   category: 'other' },
  { id: 'o06', kana: '〜がつ',   kanji: '〜月',   english: 'month (of the year)',             category: 'other' },
  { id: 'o07', kana: '〜じかん', kanji: '〜時間', english: 'hours (duration)',                category: 'other' },
  { id: 'o08', kana: '〜じ',     kanji: '〜時',   english: "o'clock",                         category: 'other' },
  { id: 'o09', kana: '〜ねん',   kanji: '〜年',   english: 'year; counter for years',         category: 'other' },
  { id: 'o10', kana: '〜ねんかん', kanji: '〜年間', english: 'years (duration)',              category: 'other' },
  { id: 'o11', kana: '〜ふん',   kanji: '〜分',   english: 'minute',                          category: 'other' },
  { id: 'o12', kana: '〜ふんかん', kanji: '〜分間', english: 'minutes (duration)',            category: 'other' },
  { id: 'o13', kana: '〜にん',   kanji: '〜人',   english: 'counter for people',              category: 'other' },
  { id: 'o14', kana: '〜えん',   kanji: '〜円',   english: 'yen',                             category: 'other' },
  { id: 'o15', kana: '〜ほん',   kanji: '〜本',   english: 'counter for long cylindrical objects', category: 'other' },
  { id: 'o16', kana: '〜はい',   kanji: '〜杯',   english: 'counter for cups, glasses, bowls', category: 'other' },
  { id: 'o17', kana: '〜ひき',   kanji: '〜匹',   english: 'counter for small animals',       category: 'other' },
  { id: 'o18', kana: '〜ひゃく', kanji: '〜百',   english: 'hundreds (two hundred, three hundred…)', category: 'other' },
  { id: 'o19', kana: '〜ぺーじ', kanji: '〜ページ', english: 'page; counter for pages',      category: 'other' },
  { id: 'o20', kana: '〜ぽんど', kanji: '〜ポンド', english: 'pounds (weight)',               category: 'other' },
  { id: 'o21', kana: '〜か',     kanji: '〜課',   english: 'counter for lessons',             category: 'other' },
  { id: 'o22', kana: '〜かげつ', kanji: '〜か月', english: 'months (duration)',               category: 'other' },
  { id: 'o23', kana: '〜かい',   kanji: '〜回',   english: 'times; counter for occurrences',  category: 'other' },
  { id: 'o24', kana: '〜こ',     kanji: '〜個',   english: 'counter for small compact items', category: 'other' },
]

export function getWordsForCategory(cat) {
  if (cat === 'noun')  return ch00Vocab.filter(w => w.category === 'noun')
  if (cat === 'verb')  return ch00Vocab.filter(w => ['u-verb', 'ru-verb', 'irregular'].includes(w.category))
  if (cat === 'other') return ch00Vocab.filter(w => w.category === 'other')
  return ch00Vocab // 'all'
}
