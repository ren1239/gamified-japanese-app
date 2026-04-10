// Chapter 12 Vocabulary — Genki I
// Each word: { id, kana, kanji, english, category }
// category: 'noun' | 'u-verb' | 'ru-verb' | 'irregular' | 'other'

export const ch12Vocab = [
  // ── Nouns ───────────────────────────────────────────────
  { id: 'n01', kana: 'おなか',         kanji: '',         english: 'stomach',                      category: 'noun' },
  { id: 'n02', kana: 'あし',           kanji: '足',       english: 'leg; foot',                    category: 'noun' },
  { id: 'n03', kana: 'のど',           kanji: '',         english: 'throat',                       category: 'noun' },
  { id: 'n04', kana: 'は',             kanji: '歯',       english: 'tooth',                        category: 'noun' },
  { id: 'n05', kana: 'インフルエンザ', kanji: '',         english: 'influenza',                    category: 'noun' },
  { id: 'n06', kana: 'かぜ',           kanji: '風邪',     english: 'cold',                         category: 'noun' },
  { id: 'n07', kana: 'せき',           kanji: '',         english: 'cough',                        category: 'noun' },
  { id: 'n08', kana: 'ふつかよい',     kanji: '二日酔い', english: 'hangover',                     category: 'noun' },
  { id: 'n09', kana: 'ホームシック',   kanji: '',         english: 'homesickness',                 category: 'noun' },
  { id: 'n10', kana: 'アレルギー',     kanji: '',         english: 'allergy',                      category: 'noun' },
  { id: 'n11', kana: 'ジュース',       kanji: '',         english: 'juice',                        category: 'noun' },
  { id: 'n12', kana: 'たまご',         kanji: '卵',       english: 'egg',                          category: 'noun' },
  { id: 'n13', kana: 'ふく',           kanji: '服',       english: 'clothes',                      category: 'noun' },
  { id: 'n14', kana: 'もの',           kanji: '物',       english: 'thing (concrete object)',      category: 'noun' },
  { id: 'n15', kana: 'プレゼント',     kanji: '',         english: 'present',                      category: 'noun' },
  { id: 'n16', kana: 'きっぷ',         kanji: '切符',     english: 'train ticket',                 category: 'noun' },
  { id: 'n17', kana: '〜だい',         kanji: '〜代',     english: 'charge; fee',                  category: 'noun' },
  { id: 'n18', kana: 'ようじ',         kanji: '用事',     english: 'business to take care of',     category: 'noun' },
  { id: 'n19', kana: 'おてあらい',     kanji: 'お手洗い', english: 'restroom',                     category: 'noun' },
  { id: 'n20', kana: 'しあい',         kanji: '試合',     english: 'match; game',                  category: 'noun' },
  { id: 'n21', kana: 'せいじ',         kanji: '政治',     english: 'politics',                     category: 'noun' },
  { id: 'n22', kana: 'せいせき',       kanji: '成績',     english: 'grade (on a test, etc.)',      category: 'noun' },
  { id: 'n23', kana: 'かのじょ',       kanji: '彼女',     english: 'she; girlfriend',              category: 'noun' },
  { id: 'n24', kana: 'かれ',           kanji: '彼',       english: 'he; boyfriend',                category: 'noun' },
  { id: 'n25', kana: 'かれし',         kanji: '彼氏',     english: 'boyfriend',                    category: 'noun' },
  { id: 'n26', kana: 'いみ',           kanji: '意味',     english: 'meaning',                      category: 'noun' },

  // ── U-verbs ─────────────────────────────────────────────
  { id: 'u01', kana: 'あるく',         kanji: '歩く',     english: 'to walk',                      category: 'u-verb' },
  { id: 'u02', kana: 'かぜをひく',     kanji: '風邪をひく', english: 'to catch a cold',             category: 'u-verb' },
  { id: 'u03', kana: 'ねつがある',     kanji: '熱がある', english: 'to have a fever',              category: 'u-verb' },
  { id: 'u04', kana: 'のどがかわく',   kanji: 'のどが渇く', english: 'to become thirsty',            category: 'u-verb' },
  { id: 'u05', kana: 'はらう',         kanji: '払う',     english: 'to pay (〜を)',                category: 'u-verb' },
  { id: 'u06', kana: 'なくす',         kanji: '',         english: 'to lose (〜を)',               category: 'u-verb' },
  { id: 'u07', kana: 'きょうみがある', kanji: '興味がある', english: 'to be interested (in...) (topic に)', category: 'u-verb' },

  // ── Ru-verbs ────────────────────────────────────────────
  { id: 'r01', kana: 'せきがでる',     kanji: 'せきが出る', english: 'to cough',                   category: 'ru-verb' },
  { id: 'r02', kana: 'わかれる',       kanji: '別れる',   english: 'to break up; to separate (person と)', category: 'ru-verb' },

  // ── Irregular Verbs ─────────────────────────────────────
  { id: 'i01', kana: 'きんちょうする', kanji: '緊張する', english: 'to get nervous',               category: 'irregular' },
  { id: 'i02', kana: 'しんぱいする',   kanji: '心配する', english: 'to worry',                     category: 'irregular' },

  // ── Adjectives, Adverbs, and Other Expressions ─────────────────────────
  { id: 'o01', kana: 'せまい',         kanji: '狭い',     english: 'narrow; not spacious',         category: 'other' },
  { id: 'o02', kana: 'ひろい',         kanji: '広い',     english: 'wide; spacious',               category: 'other' },
  { id: 'o03', kana: 'わるい',         kanji: '悪い',     english: 'bad',                          category: 'other' },
  { id: 'o04', kana: 'いたい',         kanji: '痛い',     english: 'hurt; painful',                category: 'other' },
  { id: 'o05', kana: 'あまい',         kanji: '甘い',     english: 'sweet',                        category: 'other' },
  { id: 'o06', kana: 'おおい',         kanji: '多い',     english: 'there are many...',            category: 'other' },
  { id: 'o07', kana: 'すてき',         kanji: '素敵',     english: 'nice',                         category: 'other' },
  { id: 'o08', kana: 'おだいじに',     kanji: 'お大事に', english: 'get well soon',               category: 'other' },
  { id: 'o09', kana: 'げんきがない',   kanji: '元気がない', english: "don't look well",              category: 'other' },
  { id: 'o10', kana: 'できるだけ',     kanji: '',         english: 'as much as possible',          category: 'other' },
  { id: 'o11', kana: 'たぶん',         kanji: '多分',     english: 'probably; maybe',              category: 'other' },
  { id: 'o12', kana: 'もうすぐ',       kanji: '',         english: 'very soon; in a few moments/days', category: 'other' },
  { id: 'o13', kana: 'はじめて',       kanji: '初めて',   english: 'for the first time',           category: 'other' },
  { id: 'o14', kana: 'にさんにち',     kanji: '二三日',   english: 'for two to three days',        category: 'other' },
  { id: 'o15', kana: 'それに',         kanji: '',         english: 'moreover, ...',                category: 'other' },
  { id: 'o16', kana: 'おなじ',         kanji: '同じ',     english: 'same',                         category: 'other' },
]

// Convenience groupers
export const VOCAB_CATEGORIES = [
  { id: 'all',   label: 'All',  count: () => ch12Vocab.length },
  { id: 'noun',  label: 'Nouns', count: () => ch12Vocab.filter(w => w.category === 'noun').length },
  { id: 'verb',  label: 'Verbs', count: () => ch12Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category)).length },
  { id: 'other', label: 'Other', count: () => ch12Vocab.filter(w => w.category === 'other').length },
]

export function getWordsForCategory(cat) {
  if (cat === 'all')  return ch12Vocab
  if (cat === 'noun') return ch12Vocab.filter(w => w.category === 'noun')
  if (cat === 'verb') return ch12Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category))
  if (cat === 'other') return ch12Vocab.filter(w => w.category === 'other')
  return ch12Vocab
}
