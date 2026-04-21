// Chapter 8 Vocabulary — Genki I
// Each word: { id, kana, kanji, english, category }
// category: 'noun' | 'u-verb' | 'ru-verb' | 'irregular' | 'other'

export const ch08Vocab = [
  // ── Nouns ───────────────────────────────────────────────
  { id: 'n01', kana: 'はれ',         kanji: '晴れ',   english: 'sunny weather',                       category: 'noun' },
  { id: 'n02', kana: 'あめ',         kanji: '雨',     english: 'rain',                                category: 'noun' },
  { id: 'n03', kana: 'くもり',       kanji: '曇り',   english: 'cloudy weather',                      category: 'noun' },
  { id: 'n04', kana: 'ゆき',         kanji: '雪',     english: 'snow',                                category: 'noun' },
  { id: 'n05', kana: 'てんきよほう', kanji: '天気予報', english: 'weather forecast',                  category: 'noun' },
  { id: 'n06', kana: 'きおん',       kanji: '気温',   english: 'temperature (weather)',               category: 'noun' },
  { id: 'n07', kana: 'なつ',         kanji: '夏',     english: 'summer',                              category: 'noun' },
  { id: 'n08', kana: 'ふゆ',         kanji: '冬',     english: 'winter',                              category: 'noun' },
  { id: 'n09', kana: 'けさ',         kanji: '今朝',   english: 'this morning',                        category: 'noun' },
  { id: 'n10', kana: 'あさって',     kanji: '',       english: 'the day after tomorrow',              category: 'noun' },
  { id: 'n11', kana: 'まいしゅう',   kanji: '毎週',   english: 'every week',                          category: 'noun' },
  { id: 'n12', kana: 'こんげつ',     kanji: '今月',   english: 'this month',                          category: 'noun' },
  { id: 'n13', kana: 'らいげつ',     kanji: '来月',   english: 'next month',                          category: 'noun' },
  { id: 'n14', kana: 'かいしゃいん', kanji: '会社員', english: 'office worker',                       category: 'noun' },
  { id: 'n15', kana: 'しごと',       kanji: '仕事',   english: 'job; work; occupation',               category: 'noun' },
  { id: 'n16', kana: 'カメラ',       kanji: '',       english: 'camera',                              category: 'noun' },
  { id: 'n17', kana: 'カラオケ',     kanji: '',       english: 'karaoke',                             category: 'noun' },
  { id: 'n18', kana: 'ところ',       kanji: '所',     english: 'place',                               category: 'noun' },
  { id: 'n19', kana: 'トマト',       kanji: '',       english: 'tomato',                              category: 'noun' },
  { id: 'n20', kana: 'はし',         kanji: '',       english: 'chopsticks',                          category: 'noun' },
  { id: 'n21', kana: 'パーティー',   kanji: '',       english: 'party',                               category: 'noun' },
  { id: 'n22', kana: 'バーベキュー', kanji: '',       english: 'barbecue',                            category: 'noun' },
  { id: 'n23', kana: 'ホームステイ', kanji: '',       english: 'homestay; living with a local family', category: 'noun' },
  { id: 'n24', kana: 'おふろ',       kanji: 'お風呂', english: 'bath',                                category: 'noun' },
  { id: 'n25', kana: 'スペイン',     kanji: '',       english: 'Spain',                               category: 'noun' },
  { id: 'n26', kana: 'なにか',       kanji: '何か',   english: 'something',                           category: 'noun' },

  // ── U-verbs ─────────────────────────────────────────────
  { id: 'u01', kana: 'あらう',       kanji: '洗う',   english: 'to wash',                             category: 'u-verb' },
  { id: 'u02', kana: 'いう',         kanji: '言う',   english: 'to say',                              category: 'u-verb' },
  { id: 'u03', kana: 'いる',         kanji: '',       english: 'to need',                             category: 'u-verb' },
  { id: 'u04', kana: 'おそくなる',   kanji: '遅くなる', english: 'to be late',                        category: 'u-verb' },
  { id: 'u05', kana: 'おふろにはいる', kanji: 'お風呂に入る', english: 'to take a bath',              category: 'u-verb' },
  { id: 'u06', kana: 'おもう',       kanji: '思う',   english: 'to think',                            category: 'u-verb' },
  { id: 'u07', kana: 'きる',         kanji: '切る',   english: 'to cut',                              category: 'u-verb' },
  { id: 'u08', kana: 'つくる',       kanji: '作る',   english: 'to make',                             category: 'u-verb' },
  { id: 'u09', kana: 'ふる',         kanji: '降る',   english: '(rain/snow) falls',                   category: 'u-verb' },
  { id: 'u10', kana: 'もっていく',   kanji: '持っていく', english: 'to take (a thing)',               category: 'u-verb' },

  // ── Ru-verbs ────────────────────────────────────────────
  { id: 'r01', kana: 'すてる',       kanji: '捨てる', english: 'to throw away',                       category: 'ru-verb' },
  { id: 'r02', kana: 'はじめる',     kanji: '始める', english: 'to begin',                            category: 'ru-verb' },

  // ── Irregular Verbs ─────────────────────────────────────
  { id: 'i01', kana: 'うんてんする', kanji: '運転する', english: 'to drive',                          category: 'irregular' },
  { id: 'i02', kana: 'せんたくする', kanji: '洗濯する', english: 'to do laundry',                     category: 'irregular' },
  { id: 'i03', kana: 'そうじする',   kanji: '掃除する', english: 'to clean',                          category: 'irregular' },
  { id: 'i04', kana: 'りょうりする', kanji: '料理する', english: 'to cook',                           category: 'irregular' },

  // ── Adjectives, Adverbs, and Other Expressions ──────────
  { id: 'o01', kana: 'じょうず',     kanji: '上手',   english: 'skillful; good at ...',               category: 'other' },
  { id: 'o02', kana: 'へた',         kanji: '下手',   english: 'clumsy; poor at ...',                 category: 'other' },
  { id: 'o03', kana: 'ゆうめい',     kanji: '有名',   english: 'famous',                              category: 'other' },
  { id: 'o04', kana: 'うん',         kanji: '',       english: 'uh-huh; yes',                         category: 'other' },
  { id: 'o05', kana: 'ううん',       kanji: '',       english: 'uh-uh; no',                           category: 'other' },
  { id: 'o06', kana: 'いつも',       kanji: '',       english: 'always',                              category: 'other' },
  { id: 'o07', kana: 'おそく',       kanji: '遅く',   english: '(do something) late',                 category: 'other' },
  { id: 'o08', kana: 'かんぱい',     kanji: '乾杯',   english: 'Cheers! (a toast)',                   category: 'other' },
  { id: 'o09', kana: 'みんなで',     kanji: '',       english: 'all (of the people) together',        category: 'other' },
  { id: 'o10', kana: 'ざんねん',     kanji: '残念',   english: "that's too bad",                      category: 'other' },
  { id: 'o11', kana: 'まだ',         kanji: '',       english: 'not ... yet',                         category: 'other' },
  { id: 'o12', kana: '〜について',   kanji: '',       english: 'about ...; concerning ...',           category: 'other' },
  { id: 'o13', kana: '〜ど',         kanji: '〜度',   english: '... degrees (temperature)',           category: 'other' },
  { id: 'o14', kana: 'どう',         kanji: '',       english: 'how',                                 category: 'other' },
]

// Convenience groupers
export const VOCAB_CATEGORIES = [
  { id: 'all',   label: 'All',   count: () => ch08Vocab.length },
  { id: 'noun',  label: 'Nouns', count: () => ch08Vocab.filter(w => w.category === 'noun').length },
  { id: 'verb',  label: 'Verbs', count: () => ch08Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category)).length },
  { id: 'other', label: 'Other', count: () => ch08Vocab.filter(w => w.category === 'other').length },
]

export function getWordsForCategory(cat) {
  if (cat === 'all')   return ch08Vocab
  if (cat === 'noun')  return ch08Vocab.filter(w => w.category === 'noun')
  if (cat === 'verb')  return ch08Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category))
  if (cat === 'other') return ch08Vocab.filter(w => w.category === 'other')
  return ch08Vocab
}
