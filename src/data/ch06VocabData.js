// Chapter 6 Vocabulary — Genki I
// Each word: { id, kana, kanji, english, category }
// category: 'noun' | 'u-verb' | 'ru-verb' | 'irregular' | 'other'

export const ch06Vocab = [
  // ── Nouns ───────────────────────────────────────────────
  { id: 'n01', kana: 'かんじ',       kanji: '漢字',   english: 'kanji; Chinese character',            category: 'noun' },
  { id: 'n02', kana: 'きょうかしょ', kanji: '教科書', english: 'textbook',                            category: 'noun' },
  { id: 'n03', kana: 'ページ',       kanji: '',       english: 'page',                                category: 'noun' },
  { id: 'n04', kana: 'つぎ',         kanji: '次',     english: 'next',                                category: 'noun' },
  { id: 'n05', kana: 'おかね',       kanji: 'お金',   english: 'money',                               category: 'noun' },
  { id: 'n06', kana: 'にもつ',       kanji: '荷物',   english: 'baggage',                             category: 'noun' },
  { id: 'n07', kana: 'パソコン',     kanji: '',       english: 'personal computer',                   category: 'noun' },
  { id: 'n08', kana: 'シャワー',     kanji: '',       english: 'shower',                              category: 'noun' },
  { id: 'n09', kana: 'エアコン',     kanji: '',       english: 'air conditioner',                     category: 'noun' },
  { id: 'n10', kana: 'でんき',       kanji: '電気',   english: 'electricity; light',                  category: 'noun' },
  { id: 'n11', kana: 'まど',         kanji: '窓',     english: 'window',                              category: 'noun' },
  { id: 'n12', kana: 'でんしゃ',     kanji: '電車',   english: 'train',                               category: 'noun' },
  { id: 'n13', kana: 'くに',         kanji: '国',     english: 'country; place of origin',            category: 'noun' },
  { id: 'n14', kana: 'こんしゅう',   kanji: '今週',   english: 'this week',                           category: 'noun' },
  { id: 'n15', kana: 'らいしゅう',   kanji: '来週',   english: 'next week',                           category: 'noun' },
  { id: 'n16', kana: 'らいねん',     kanji: '来年',   english: 'next year',                           category: 'noun' },
  { id: 'n17', kana: 'よる',         kanji: '夜',     english: 'night',                               category: 'noun' },

  // ── U-verbs ─────────────────────────────────────────────
  { id: 'u01', kana: 'あそぶ',       kanji: '遊ぶ',   english: 'to play; to spend time pleasantly',  category: 'u-verb' },
  { id: 'u02', kana: 'いそぐ',       kanji: '急ぐ',   english: 'to hurry',                            category: 'u-verb' },
  { id: 'u03', kana: 'かえす',       kanji: '返す',   english: 'to return (a thing)',                 category: 'u-verb' },
  { id: 'u04', kana: 'けす',         kanji: '消す',   english: 'to turn off; to erase',              category: 'u-verb' },
  { id: 'u05', kana: 'しぬ',         kanji: '死ぬ',   english: 'to die',                              category: 'u-verb' },
  { id: 'u06', kana: 'すわる',       kanji: '座る',   english: 'to sit down',                         category: 'u-verb' },
  { id: 'u07', kana: 'たつ',         kanji: '立つ',   english: 'to stand up',                         category: 'u-verb' },
  { id: 'u08', kana: 'たばこをすう', kanji: 'たばこを吸う', english: 'to smoke',                     category: 'u-verb' },
  { id: 'u09', kana: 'つかう',       kanji: '使う',   english: 'to use',                              category: 'u-verb' },
  { id: 'u10', kana: 'てつだう',     kanji: '手伝う', english: 'to help',                             category: 'u-verb' },
  { id: 'u11', kana: 'はいる',       kanji: '入る',   english: 'to enter',                            category: 'u-verb' },
  { id: 'u12', kana: 'もつ',         kanji: '持つ',   english: 'to carry; to hold',                  category: 'u-verb' },
  { id: 'u13', kana: 'やすむ',       kanji: '休む',   english: 'to be absent; to rest',              category: 'u-verb' },

  // ── Ru-verbs ────────────────────────────────────────────
  { id: 'r01', kana: 'あける',       kanji: '開ける', english: 'to open (something)',                 category: 'ru-verb' },
  { id: 'r02', kana: 'しめる',       kanji: '閉める', english: 'to close (something)',                category: 'ru-verb' },
  { id: 'r03', kana: 'おしえる',     kanji: '教える', english: 'to teach; to instruct',              category: 'ru-verb' },
  { id: 'r04', kana: 'わすれる',     kanji: '忘れる', english: 'to forget; to leave behind',         category: 'ru-verb' },
  { id: 'r05', kana: 'おりる',       kanji: '降りる', english: 'to get off',                          category: 'ru-verb' },
  { id: 'r06', kana: 'かりる',       kanji: '借りる', english: 'to borrow',                           category: 'ru-verb' },
  { id: 'r07', kana: 'シャワーをあびる', kanji: 'シャワーを浴びる', english: 'to take a shower',    category: 'ru-verb' },
  { id: 'r08', kana: 'つける',       kanji: '',       english: 'to turn on',                          category: 'ru-verb' },

  // ── Irregular Verbs ─────────────────────────────────────
  { id: 'i01', kana: 'でんわする',   kanji: '電話する', english: 'to call',                           category: 'irregular' },
  { id: 'i02', kana: 'つれてくる',   kanji: '連れてくる', english: 'to bring (a person)',             category: 'irregular' },
  { id: 'i03', kana: 'もってくる',   kanji: '持ってくる', english: 'to bring (a thing)',              category: 'irregular' },

  // ── Adjectives, Adverbs, and Other Expressions ──────────
  { id: 'o01', kana: 'たいへん',     kanji: '大変',   english: 'tough (situation)',                   category: 'other' },
  { id: 'o02', kana: 'あとで',       kanji: '後で',   english: 'later on',                            category: 'other' },
  { id: 'o03', kana: 'すぐ',         kanji: '',       english: 'right away',                          category: 'other' },
  { id: 'o04', kana: 'ゆっくり',     kanji: '',       english: 'slowly; leisurely; unhurriedly',     category: 'other' },
  { id: 'o05', kana: 'けっこうです', kanji: '結構です', english: 'that would be fine; that wouldn\'t be necessary', category: 'other' },
  { id: 'o06', kana: 'ほんとうですか', kanji: '本当ですか', english: 'Really?',                      category: 'other' },
]

// Convenience groupers
export const VOCAB_CATEGORIES = [
  { id: 'all',   label: 'All',   count: () => ch06Vocab.length },
  { id: 'noun',  label: 'Nouns', count: () => ch06Vocab.filter(w => w.category === 'noun').length },
  { id: 'verb',  label: 'Verbs', count: () => ch06Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category)).length },
  { id: 'other', label: 'Other', count: () => ch06Vocab.filter(w => w.category === 'other').length },
]

export function getWordsForCategory(cat) {
  if (cat === 'all')   return ch06Vocab
  if (cat === 'noun')  return ch06Vocab.filter(w => w.category === 'noun')
  if (cat === 'verb')  return ch06Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category))
  if (cat === 'other') return ch06Vocab.filter(w => w.category === 'other')
  return ch06Vocab
}
