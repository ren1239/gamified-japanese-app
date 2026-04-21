// Chapter 10 Vocabulary — Genki I
// Each word: { id, kana, kanji, english, category }
// category: 'noun' | 'u-verb' | 'ru-verb' | 'irregular' | 'other'

export const ch10Vocab = [
  // ── Nouns ───────────────────────────────────────────────
  { id: 'n01', kana: 'きせつ',       kanji: '季節',   english: 'season',                          category: 'noun' },
  { id: 'n02', kana: 'はる',         kanji: '春',     english: 'spring',                          category: 'noun' },
  { id: 'n03', kana: 'あき',         kanji: '秋',     english: 'fall',                            category: 'noun' },
  { id: 'n04', kana: 'ぎゅうにゅう', kanji: '牛乳',   english: 'milk',                            category: 'noun' },
  { id: 'n05', kana: 'ケーキ',       kanji: '',       english: 'cake',                            category: 'noun' },
  { id: 'n06', kana: 'すし',         kanji: '',       english: 'sushi',                           category: 'noun' },
  { id: 'n07', kana: 'てんぷら',     kanji: '天ぷら', english: 'tempura',                         category: 'noun' },
  { id: 'n08', kana: 'りんご',       kanji: '',       english: 'apple',                           category: 'noun' },
  { id: 'n09', kana: 'りょうり',     kanji: '料理',   english: 'cuisine',                         category: 'noun' },
  { id: 'n10', kana: 'サッカー',     kanji: '',       english: 'soccer',                          category: 'noun' },
  { id: 'n11', kana: 'やきゅう',     kanji: '野球',   english: 'baseball',                        category: 'noun' },
  { id: 'n12', kana: 'いしゃ',       kanji: '医者',   english: 'doctor',                          category: 'noun' },
  { id: 'n13', kana: 'おかねもち',   kanji: 'お金持ち', english: 'rich person',                   category: 'noun' },
  { id: 'n14', kana: 'ゆうめいじん', kanji: '有名人', english: 'celebrity',                       category: 'noun' },
  { id: 'n15', kana: 'かお',         kanji: '顔',     english: 'face',                            category: 'noun' },
  { id: 'n16', kana: 'としうえ',     kanji: '年上',   english: 'someone older',                   category: 'noun' },
  { id: 'n17', kana: 'えき',         kanji: '駅',     english: 'station',                         category: 'noun' },
  { id: 'n18', kana: 'しんかんせん', kanji: '新幹線', english: 'Shinkansen; "Bullet Train"',      category: 'noun' },
  { id: 'n19', kana: 'ちかてつ',     kanji: '地下鉄', english: 'subway',                          category: 'noun' },
  { id: 'n20', kana: 'ふね',         kanji: '船',     english: 'ship; boat',                      category: 'noun' },
  { id: 'n21', kana: 'ひこうき',     kanji: '飛行機', english: 'airplane',                        category: 'noun' },
  { id: 'n22', kana: 'よやく',       kanji: '予約',   english: 'reservation',                     category: 'noun' },
  { id: 'n23', kana: 'ツアー',       kanji: '',       english: 'tour',                            category: 'noun' },
  { id: 'n24', kana: 'どうぶつえん', kanji: '動物園', english: 'zoo',                             category: 'noun' },
  { id: 'n25', kana: 'じかん',       kanji: '時間',   english: 'time',                            category: 'noun' },
  { id: 'n26', kana: 'せかい',       kanji: '世界',   english: 'world',                           category: 'noun' },
  { id: 'n27', kana: 'びよういん',   kanji: '美容院', english: 'beauty parlor',                   category: 'noun' },
  { id: 'n28', kana: 'てぶくろ',     kanji: '手袋',   english: 'gloves',                          category: 'noun' },
  { id: 'n29', kana: 'せいかつ',     kanji: '生活',   english: 'life; living',                    category: 'noun' },
  { id: 'n30', kana: 'ことし',       kanji: '今年',   english: 'this year',                       category: 'noun' },

  // ── U-verbs ─────────────────────────────────────────────
  { id: 'u01', kana: 'かかる',       kanji: '',       english: 'to take (amount of time/money)',  category: 'u-verb' },
  { id: 'u02', kana: 'とまる',       kanji: '泊まる', english: 'to stay (at a hotel, etc.)',      category: 'u-verb' },
  { id: 'u03', kana: 'なる',         kanji: '',       english: 'to become',                       category: 'u-verb' },

  // ── Ru-verbs ────────────────────────────────────────────
  { id: 'r01', kana: 'きめる',       kanji: '決める', english: 'to decide',                       category: 'ru-verb' },

  // ── Irregular Verbs ─────────────────────────────────────
  { id: 'i01', kana: 'ごろごろする', kanji: '',       english: 'to chill out at home; to do nothing', category: 'irregular' },
  { id: 'i02', kana: 'りょこうする', kanji: '旅行する', english: 'to travel',                     category: 'irregular' },
  { id: 'i03', kana: 'れんしゅうする', kanji: '練習する', english: 'to practice',                 category: 'irregular' },

  // ── Adjectives, Adverbs, and Other Expressions ──────────
  { id: 'o01', kana: 'あたたかい',   kanji: '暖かい', english: 'warm',                            category: 'other' },
  { id: 'o02', kana: 'すずしい',     kanji: '涼しい', english: 'cool (weather)',                  category: 'other' },
  { id: 'o03', kana: 'つめたい',     kanji: '冷たい', english: 'cold (things/people)',             category: 'other' },
  { id: 'o04', kana: 'おそい',       kanji: '遅い',   english: 'slow; late',                      category: 'other' },
  { id: 'o05', kana: 'ねむい',       kanji: '眠い',   english: 'sleepy',                          category: 'other' },
  { id: 'o06', kana: 'かんたん',     kanji: '簡単',   english: 'easy; simple',                    category: 'other' },
  { id: 'o07', kana: 'いちばん',     kanji: '一番',   english: 'best; most',                      category: 'other' },
  { id: 'o08', kana: 'どっち／どちら', kanji: '',     english: 'which',                           category: 'other' },
  { id: 'o09', kana: 'はやく',       kanji: '早く／速く', english: '(do something) early; fast', category: 'other' },
  { id: 'o10', kana: 'あるいて',     kanji: '歩いて', english: 'on foot',                         category: 'other' },
  { id: 'o11', kana: '〜で',         kanji: '',       english: 'by (means of transportation); with (a tool)', category: 'other' },
  { id: 'o12', kana: 'どうやって',   kanji: '',       english: 'how; by what means',              category: 'other' },
  { id: 'o13', kana: 'どのぐらい',   kanji: '',       english: 'how much; how long',              category: 'other' },
  { id: 'o14', kana: '〜しゅうかん', kanji: '〜週間', english: 'for ... weeks',                   category: 'other' },
  { id: 'o15', kana: '〜かげつ',     kanji: '〜か月', english: 'for ... months',                  category: 'other' },
  { id: 'o16', kana: '〜ねん',       kanji: '〜年',   english: '... years',                       category: 'other' },
  { id: 'o17', kana: 'このごろ',     kanji: '',       english: 'these days',                      category: 'other' },
  { id: 'o18', kana: '〜ご',         kanji: '〜後',   english: 'in ... time; after ...',          category: 'other' },
  { id: 'o19', kana: '〜か〜',       kanji: '',       english: 'or',                              category: 'other' },
]

// Convenience groupers
export const VOCAB_CATEGORIES = [
  { id: 'all',   label: 'All',   count: () => ch10Vocab.length },
  { id: 'noun',  label: 'Nouns', count: () => ch10Vocab.filter(w => w.category === 'noun').length },
  { id: 'verb',  label: 'Verbs', count: () => ch10Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category)).length },
  { id: 'other', label: 'Other', count: () => ch10Vocab.filter(w => w.category === 'other').length },
]

export function getWordsForCategory(cat) {
  if (cat === 'all')   return ch10Vocab
  if (cat === 'noun')  return ch10Vocab.filter(w => w.category === 'noun')
  if (cat === 'verb')  return ch10Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category))
  if (cat === 'other') return ch10Vocab.filter(w => w.category === 'other')
  return ch10Vocab
}
