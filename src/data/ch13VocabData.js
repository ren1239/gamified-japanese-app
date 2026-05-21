// Chapter 13 Vocabulary — Genki I
// Each word: { id, kana, kanji, english, category }
// category: 'noun' | 'u-verb' | 'ru-verb' | 'irregular' | 'other'

export const ch13Vocab = [
  // ── Nouns ───────────────────────────────────────────────
  { id: 'n01', kana: 'おとな',         kanji: '大人',       english: 'adult',                                      category: 'noun' },
  { id: 'n02', kana: 'べんごし',       kanji: '弁護士',     english: 'lawyer',                                     category: 'noun' },
  { id: 'n03', kana: 'わたくし',       kanji: '私',         english: 'i (formal)',                                 category: 'noun' },
  { id: 'n04', kana: 'カレー',         kanji: '',           english: 'curry',                                      category: 'noun' },
  { id: 'n05', kana: 'こうちゃ',       kanji: '紅茶',       english: 'black tea',                                  category: 'noun' },
  { id: 'n06', kana: 'きもの',         kanji: '着物',       english: 'kimono; japanese traditional dress',         category: 'noun' },
  { id: 'n07', kana: 'セーター',       kanji: '',           english: 'sweater',                                    category: 'noun' },
  { id: 'n08', kana: 'がっき',         kanji: '楽器',       english: 'musical instrument',                         category: 'noun' },
  { id: 'n09', kana: 'からて',         kanji: '空手',       english: 'karate',                                     category: 'noun' },
  { id: 'n10', kana: 'ゴルフ',         kanji: '',           english: 'golf',                                       category: 'noun' },
  { id: 'n11', kana: 'バイク',         kanji: '',           english: 'motorcycle',                                 category: 'noun' },
  { id: 'n12', kana: 'ぞう',           kanji: '象',         english: 'elephant',                                   category: 'noun' },
  { id: 'n13', kana: 'からだ',         kanji: '体',         english: 'body',                                       category: 'noun' },
  { id: 'n14', kana: 'がいこくご',     kanji: '外国語',     english: 'foreign language',                           category: 'noun' },
  { id: 'n15', kana: 'ことば',         kanji: '言葉',       english: 'language',                                   category: 'noun' },
  { id: 'n16', kana: 'ぶんぽう',       kanji: '文法',       english: 'grammar',                                    category: 'noun' },
  { id: 'n17', kana: 'アプリ',         kanji: '',           english: 'application',                                category: 'noun' },
  { id: 'n18', kana: 'アパート',       kanji: '',           english: 'apartment; smaller apartment building',      category: 'noun' },
  { id: 'n19', kana: 'マンション',     kanji: '',           english: 'larger apartment building; condominium',     category: 'noun' },
  { id: 'n20', kana: 'くうこう',       kanji: '空港',       english: 'airport',                                    category: 'noun' },
  { id: 'n21', kana: 'みせ',           kanji: '店',         english: 'shop; store',                                category: 'noun' },
  { id: 'n22', kana: 'ぶっか',         kanji: '物価',       english: 'consumer prices',                            category: 'noun' },
  { id: 'n23', kana: 'こうこく',       kanji: '広告',       english: 'advertisement',                              category: 'noun' },
  { id: 'n24', kana: 'ぼしゅう',       kanji: '募集',       english: 'recruitment',                                category: 'noun' },
  { id: 'n25', kana: 'やくそく',       kanji: '約束',       english: 'promise; appointment',                       category: 'noun' },

  // ── U-verbs ─────────────────────────────────────────────
  { id: 'u01', kana: 'あむ',           kanji: '編む',       english: 'to knit (〜を)',                             category: 'u-verb' },
  { id: 'u02', kana: 'がんばる',       kanji: '頑張る',     english: "to do one's best; to try hard",              category: 'u-verb' },
  { id: 'u03', kana: 'なく',           kanji: '泣く',       english: 'to cry',                                     category: 'u-verb' },
  { id: 'u04', kana: 'みがく',         kanji: '磨く',       english: 'to brush (teeth); to polish (〜を)',         category: 'u-verb' },
  { id: 'u05', kana: 'やくそくをまもる', kanji: '約束を守る', english: 'to keep a promise',                         category: 'u-verb' },

  // ── Irregular Verbs ─────────────────────────────────────
  { id: 'i01', kana: 'かんどうする',   kanji: '感動する',   english: 'to be moved/touched (by...) (〜に)',         category: 'irregular' },

  // ── い-adjectives ────────────────────────────────────────
  { id: 'o01', kana: 'うれしい',       kanji: '',           english: 'glad',                                       category: 'other' },
  { id: 'o02', kana: 'かなしい',       kanji: '悲しい',     english: 'sad',                                        category: 'other' },
  { id: 'o03', kana: 'きびしい',       kanji: '厳しい',     english: 'strict',                                     category: 'other' },
  { id: 'o04', kana: 'きぶんがわるい', kanji: '気分が悪い', english: 'to feel sick',                               category: 'other' },
  { id: 'o05', kana: 'からい',         kanji: '辛い',       english: 'hot and spicy; salty',                       category: 'other' },
  { id: 'o06', kana: 'すごい',         kanji: '',           english: 'incredible; awesome',                        category: 'other' },
  { id: 'o07', kana: 'ちかい',         kanji: '近い',       english: 'close; near',                                category: 'other' },

  // ── な-adjectives ────────────────────────────────────────
  { id: 'o08', kana: 'いろいろ',       kanji: '',           english: 'various; different kinds of',                category: 'other' },
  { id: 'o09', kana: 'しあわせ',       kanji: '幸せ',       english: 'happy (lasting happiness)',                  category: 'other' },
  { id: 'o10', kana: 'だめ',           kanji: '',           english: 'no good',                                    category: 'other' },

  // ── Adverbs and Other Expressions ───────────────────────
  { id: 'o11', kana: '〜かい',         kanji: '〜回',       english: '...times',                                   category: 'other' },
  { id: 'o12', kana: '〜キロ',         kanji: '',           english: '...kilometers; ...kilograms',                category: 'other' },
  { id: 'o13', kana: 'ぜんぶ',         kanji: '全部',       english: 'all',                                        category: 'other' },
  { id: 'o14', kana: '〜ともうします', kanji: '〜と申します', english: 'my name is...',                             category: 'other' },
  { id: 'o15', kana: 'とくに',         kanji: '特に',       english: 'especially',                                 category: 'other' },

  // ── Numbers (counting days) ──────────────────────────────
  { id: 'o16', kana: 'いちにち',       kanji: '一日',       english: 'one day',                                    category: 'other' },
  { id: 'o17', kana: 'ふつか',         kanji: '二日',       english: 'two days',                                   category: 'other' },
  { id: 'o18', kana: 'みっか',         kanji: '三日',       english: 'three days',                                 category: 'other' },
  { id: 'o19', kana: 'よっか',         kanji: '四日',       english: 'four days',                                  category: 'other' },
  { id: 'o20', kana: 'いつか',         kanji: '五日',       english: 'five days',                                  category: 'other' },
  { id: 'o21', kana: 'むいか',         kanji: '六日',       english: 'six days',                                   category: 'other' },
  { id: 'o22', kana: 'なのか',         kanji: '七日',       english: 'seven days',                                 category: 'other' },
  { id: 'o23', kana: 'ようか',         kanji: '八日',       english: 'eight days',                                 category: 'other' },
  { id: 'o24', kana: 'ここのか',       kanji: '九日',       english: 'nine days',                                  category: 'other' },
  { id: 'o25', kana: 'とおか',         kanji: '十日',       english: 'ten days',                                   category: 'other' },
]

export function getWordsForCategory(cat) {
  if (cat === 'all')   return ch13Vocab
  if (cat === 'noun')  return ch13Vocab.filter(w => w.category === 'noun')
  if (cat === 'verb')  return ch13Vocab.filter(w => ['u-verb', 'ru-verb', 'irregular'].includes(w.category))
  if (cat === 'other') return ch13Vocab.filter(w => w.category === 'other')
  return ch13Vocab
}
