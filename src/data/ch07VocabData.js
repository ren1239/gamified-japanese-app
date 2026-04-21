// Chapter 7 Vocabulary — Genki I
// Each word: { id, kana, kanji, english, category }
// category: 'noun' | 'u-verb' | 'ru-verb' | 'irregular' | 'other'

export const ch07Vocab = [
  // ── Nouns ───────────────────────────────────────────────
  { id: 'n01', kana: 'かぞく',       kanji: '家族',   english: 'family',                              category: 'noun' },
  { id: 'n02', kana: 'おじいさん',   kanji: '',       english: 'grandfather; old man',               category: 'noun' },
  { id: 'n03', kana: 'おばあさん',   kanji: '',       english: 'grandmother; old woman',             category: 'noun' },
  { id: 'n04', kana: 'おにいさん',   kanji: 'お兄さん', english: 'older brother',                    category: 'noun' },
  { id: 'n05', kana: 'おねえさん',   kanji: 'お姉さん', english: 'older sister',                     category: 'noun' },
  { id: 'n06', kana: 'ちち',         kanji: '父',     english: '(my) father',                        category: 'noun' },
  { id: 'n07', kana: 'はは',         kanji: '母',     english: '(my) mother',                        category: 'noun' },
  { id: 'n08', kana: 'あに',         kanji: '兄',     english: '(my) older brother',                 category: 'noun' },
  { id: 'n09', kana: 'あね',         kanji: '姉',     english: '(my) older sister',                  category: 'noun' },
  { id: 'n10', kana: 'いもうと',     kanji: '妹',     english: 'younger sister',                     category: 'noun' },
  { id: 'n11', kana: 'おとうと',     kanji: '弟',     english: 'younger brother',                    category: 'noun' },
  { id: 'n12', kana: 'きょうだい',   kanji: '兄弟',   english: 'brothers and sisters',               category: 'noun' },
  { id: 'n13', kana: 'おとこのひと', kanji: '男の人', english: 'man',                                category: 'noun' },
  { id: 'n14', kana: 'おんなのひと', kanji: '女の人', english: 'woman',                              category: 'noun' },
  { id: 'n15', kana: 'かいしゃ',     kanji: '会社',   english: 'company',                            category: 'noun' },
  { id: 'n16', kana: 'しょくどう',   kanji: '食堂',   english: 'cafeteria; dining commons',          category: 'noun' },
  { id: 'n17', kana: 'デパート',     kanji: '',       english: 'department store',                   category: 'noun' },
  { id: 'n18', kana: 'かみ',         kanji: '髪',     english: 'hair',                               category: 'noun' },
  { id: 'n19', kana: 'くち',         kanji: '口',     english: 'mouth',                              category: 'noun' },
  { id: 'n20', kana: 'め',           kanji: '目',     english: 'eye',                                category: 'noun' },
  { id: 'n21', kana: 'めがね',       kanji: '眼鏡',   english: 'glasses',                            category: 'noun' },
  { id: 'n22', kana: 'うた',         kanji: '歌',     english: 'song',                               category: 'noun' },
  { id: 'n23', kana: 'サークル',     kanji: '',       english: 'club activity',                      category: 'noun' },
  { id: 'n24', kana: 'くるま',       kanji: '車',     english: 'car',                                category: 'noun' },

  // ── U-verbs ─────────────────────────────────────────────
  { id: 'u01', kana: 'うたう',       kanji: '歌う',   english: 'to sing',                            category: 'u-verb' },
  { id: 'u02', kana: 'かぶる',       kanji: '',       english: 'to put on (a hat)',                  category: 'u-verb' },
  { id: 'u03', kana: 'はく',         kanji: '',       english: 'to put on (items below your waist)', category: 'u-verb' },
  { id: 'u04', kana: 'しる',         kanji: '知る',   english: 'to get to know',                     category: 'u-verb' },
  { id: 'u05', kana: 'すむ',         kanji: '住む',   english: 'to live',                            category: 'u-verb' },
  { id: 'u06', kana: 'はたらく',     kanji: '働く',   english: 'to work',                            category: 'u-verb' },
  { id: 'u07', kana: 'ふとる',       kanji: '太る',   english: 'to gain weight',                     category: 'u-verb' },

  // ── Ru-verbs ────────────────────────────────────────────
  { id: 'r01', kana: 'かける',       kanji: '',       english: 'to put on (glasses)',                category: 'ru-verb' },
  { id: 'r02', kana: 'きる',         kanji: '着る',   english: 'to put on (clothes above your waist)', category: 'ru-verb' },
  { id: 'r03', kana: 'やせる',       kanji: '',       english: 'to lose weight',                     category: 'ru-verb' },

  // ── Irregular Verbs ─────────────────────────────────────
  { id: 'i01', kana: 'けっこんする', kanji: '結婚する', english: 'to get married',                   category: 'irregular' },

  // ── Adjectives, Adverbs, and Other Expressions ──────────
  { id: 'o01', kana: 'ながい',       kanji: '長い',   english: 'long',                               category: 'other' },
  { id: 'o02', kana: 'みじかい',     kanji: '短い',   english: 'short (length)',                     category: 'other' },
  { id: 'o03', kana: 'はやい',       kanji: '速い',   english: 'fast',                               category: 'other' },
  { id: 'o04', kana: 'せがたかい',   kanji: '背が高い', english: 'tall (stature)',                   category: 'other' },
  { id: 'o05', kana: 'せがひくい',   kanji: '背が低い', english: 'short (stature)',                  category: 'other' },
  { id: 'o06', kana: 'あたまがいい', kanji: '頭がいい', english: 'bright; smart; clever',            category: 'other' },
  { id: 'o07', kana: 'かわいい',     kanji: '',       english: 'cute',                               category: 'other' },
  { id: 'o08', kana: 'しんせつ',     kanji: '親切',   english: 'kind',                               category: 'other' },
  { id: 'o09', kana: 'べんり',       kanji: '便利',   english: 'convenient',                         category: 'other' },
  { id: 'o10', kana: '〜が',         kanji: '',       english: '..., but',                           category: 'other' },
  { id: 'o11', kana: 'なにも',       kanji: '何も',   english: 'not ... anything',                   category: 'other' },
  { id: 'o12', kana: '〜にん',       kanji: '〜人',   english: '[counter for people]',               category: 'other' },
  { id: 'o13', kana: 'ひとり',       kanji: '一人',   english: 'one person',                         category: 'other' },
  { id: 'o14', kana: 'ふたり',       kanji: '二人',   english: 'two people',                         category: 'other' },
  { id: 'o15', kana: 'べつに',       kanji: '別に',   english: 'nothing in particular',              category: 'other' },
  { id: 'o16', kana: 'もちろん',     kanji: '',       english: 'of course',                          category: 'other' },
  { id: 'o17', kana: 'よかったら',   kanji: '',       english: 'if you like',                        category: 'other' },
]

// Convenience groupers
export const VOCAB_CATEGORIES = [
  { id: 'all',   label: 'All',   count: () => ch07Vocab.length },
  { id: 'noun',  label: 'Nouns', count: () => ch07Vocab.filter(w => w.category === 'noun').length },
  { id: 'verb',  label: 'Verbs', count: () => ch07Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category)).length },
  { id: 'other', label: 'Other', count: () => ch07Vocab.filter(w => w.category === 'other').length },
]

export function getWordsForCategory(cat) {
  if (cat === 'all')   return ch07Vocab
  if (cat === 'noun')  return ch07Vocab.filter(w => w.category === 'noun')
  if (cat === 'verb')  return ch07Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category))
  if (cat === 'other') return ch07Vocab.filter(w => w.category === 'other')
  return ch07Vocab
}
