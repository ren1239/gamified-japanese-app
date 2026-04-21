// Chapter 9 Vocabulary — Genki I
// Each word: { id, kana, kanji, english, category }
// category: 'noun' | 'u-verb' | 'ru-verb' | 'irregular' | 'other'

export const ch09Vocab = [
  // ── Nouns ───────────────────────────────────────────────
  { id: 'n01', kana: 'たんご',       kanji: '単語',   english: 'word; vocabulary',                    category: 'noun' },
  { id: 'n02', kana: 'さくぶん',     kanji: '作文',   english: 'essay; composition',                  category: 'noun' },
  { id: 'n03', kana: 'しけん',       kanji: '試験',   english: 'exam',                                category: 'noun' },
  { id: 'n04', kana: 'てがみ',       kanji: '手紙',   english: 'letter',                              category: 'noun' },
  { id: 'n05', kana: 'メール',       kanji: '',       english: 'e-mail',                              category: 'noun' },
  { id: 'n06', kana: 'ギター',       kanji: '',       english: 'guitar',                              category: 'noun' },
  { id: 'n07', kana: 'ピアノ',       kanji: '',       english: 'piano',                               category: 'noun' },
  { id: 'n08', kana: 'コンサート',   kanji: '',       english: 'concert',                             category: 'noun' },
  { id: 'n09', kana: 'チケット',     kanji: '',       english: 'ticket',                              category: 'noun' },
  { id: 'n10', kana: 'かぶき',       kanji: '歌舞伎', english: 'Kabuki; traditional Japanese theatrical art', category: 'noun' },
  { id: 'n11', kana: 'スキー',       kanji: '',       english: 'ski',                                 category: 'noun' },
  { id: 'n12', kana: 'おべんとう',   kanji: 'お弁当', english: 'boxed lunch',                         category: 'noun' },
  { id: 'n13', kana: 'ピザ',         kanji: '',       english: 'pizza',                               category: 'noun' },
  { id: 'n14', kana: 'びょうき',     kanji: '病気',   english: 'illness; sickness',                   category: 'noun' },
  { id: 'n15', kana: 'くすり',       kanji: '薬',     english: 'medicine',                            category: 'noun' },
  { id: 'n16', kana: 'いいこ',       kanji: 'いい子', english: 'good child',                          category: 'noun' },
  { id: 'n17', kana: 'いろ',         kanji: '色',     english: 'color',                               category: 'noun' },
  { id: 'n18', kana: 'こんど',       kanji: '今度',   english: 'near future',                         category: 'noun' },
  { id: 'n19', kana: 'せんげつ',     kanji: '先月',   english: 'last month',                          category: 'noun' },
  { id: 'n20', kana: 'きょねん',     kanji: '去年',   english: 'last year',                           category: 'noun' },

  // ── U-verbs ─────────────────────────────────────────────
  { id: 'u01', kana: 'おどる',       kanji: '踊る',   english: 'to dance',                            category: 'u-verb' },
  { id: 'u02', kana: 'おわる',       kanji: '終わる', english: '(something) ends',                    category: 'u-verb' },
  { id: 'u03', kana: 'くすりをのむ', kanji: '薬を飲む', english: 'to take medicine',                  category: 'u-verb' },
  { id: 'u04', kana: 'にんきがある', kanji: '人気がある', english: 'to be popular',                   category: 'u-verb' },
  { id: 'u05', kana: 'はじまる',     kanji: '始まる', english: '(something) begins',                  category: 'u-verb' },
  { id: 'u06', kana: 'ひく',         kanji: '弾く',   english: 'to play (a string instrument or piano)', category: 'u-verb' },
  { id: 'u07', kana: 'もらう',       kanji: '',       english: 'to get (from somebody)',              category: 'u-verb' },

  // ── Ru-verbs ────────────────────────────────────────────
  { id: 'r01', kana: 'おぼえる',     kanji: '覚える', english: 'to memorize',                         category: 'ru-verb' },
  { id: 'r02', kana: 'でる',         kanji: '出る',   english: 'to appear; to attend; to exit',       category: 'ru-verb' },

  // ── Irregular Verbs ─────────────────────────────────────
  { id: 'i01', kana: 'うんどうする', kanji: '運動する', english: 'to exercise',                       category: 'irregular' },
  { id: 'i02', kana: 'さんぽする',   kanji: '散歩する', english: 'to take a walk',                    category: 'irregular' },

  // ── Adjectives, Adverbs, and Other Expressions ──────────
  { id: 'o01', kana: 'あおい',       kanji: '青い',   english: 'blue',                                category: 'other' },
  { id: 'o02', kana: 'あかい',       kanji: '赤い',   english: 'red',                                 category: 'other' },
  { id: 'o03', kana: 'くろい',       kanji: '黒い',   english: 'black',                               category: 'other' },
  { id: 'o04', kana: 'しろい',       kanji: '白い',   english: 'white',                               category: 'other' },
  { id: 'o05', kana: 'さびしい',     kanji: '寂しい', english: 'lonely',                              category: 'other' },
  { id: 'o06', kana: 'わかい',       kanji: '若い',   english: 'young',                               category: 'other' },
  { id: 'o07', kana: 'いじわる',     kanji: '意地悪', english: 'mean-spirited',                       category: 'other' },
  { id: 'o08', kana: 'そう',         kanji: '',       english: '(I think) so',                        category: 'other' },
  { id: 'o09', kana: '〜から',       kanji: '',       english: 'from ...',                            category: 'other' },
  { id: 'o10', kana: '〜まで',       kanji: '',       english: 'to (a place/a time)',                 category: 'other' },
  { id: 'o11', kana: 'ぜひ',         kanji: '是非',   english: 'by all means',                        category: 'other' },
  { id: 'o12', kana: 'ところで',     kanji: '',       english: 'by the way',                          category: 'other' },
  { id: 'o13', kana: 'みんな',       kanji: '',       english: 'all',                                 category: 'other' },
  { id: 'o14', kana: 'もう',         kanji: '',       english: 'already',                             category: 'other' },
  { id: 'o15', kana: 'ひとつ',       kanji: '一つ',   english: 'one',                                 category: 'other' },
  { id: 'o16', kana: 'ふたつ',       kanji: '二つ',   english: 'two',                                 category: 'other' },
  { id: 'o17', kana: 'みっつ',       kanji: '三つ',   english: 'three',                               category: 'other' },
  { id: 'o18', kana: 'よっつ',       kanji: '四つ',   english: 'four',                                category: 'other' },
  { id: 'o19', kana: 'いつつ',       kanji: '五つ',   english: 'five',                                category: 'other' },
  { id: 'o20', kana: 'むっつ',       kanji: '六つ',   english: 'six',                                 category: 'other' },
  { id: 'o21', kana: 'ななつ',       kanji: '七つ',   english: 'seven',                               category: 'other' },
  { id: 'o22', kana: 'やっつ',       kanji: '八つ',   english: 'eight',                               category: 'other' },
  { id: 'o23', kana: 'ここのつ',     kanji: '九つ',   english: 'nine',                                category: 'other' },
  { id: 'o24', kana: 'とお',         kanji: '十',     english: 'ten',                                 category: 'other' },
]

// Convenience groupers
export const VOCAB_CATEGORIES = [
  { id: 'all',   label: 'All',   count: () => ch09Vocab.length },
  { id: 'noun',  label: 'Nouns', count: () => ch09Vocab.filter(w => w.category === 'noun').length },
  { id: 'verb',  label: 'Verbs', count: () => ch09Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category)).length },
  { id: 'other', label: 'Other', count: () => ch09Vocab.filter(w => w.category === 'other').length },
]

export function getWordsForCategory(cat) {
  if (cat === 'all')   return ch09Vocab
  if (cat === 'noun')  return ch09Vocab.filter(w => w.category === 'noun')
  if (cat === 'verb')  return ch09Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category))
  if (cat === 'other') return ch09Vocab.filter(w => w.category === 'other')
  return ch09Vocab
}
