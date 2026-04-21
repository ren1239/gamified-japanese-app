// Chapter 5 Vocabulary — Genki I
// Each word: { id, kana, kanji, english, category }
// category: 'noun' | 'u-verb' | 'ru-verb' | 'irregular' | 'other'

export const ch05Vocab = [
  // ── Nouns ───────────────────────────────────────────────
  { id: 'n01', kana: 'たべもの',     kanji: '食べ物', english: 'food',                                category: 'noun' },
  { id: 'n02', kana: 'のみもの',     kanji: '飲み物', english: 'drink',                               category: 'noun' },
  { id: 'n03', kana: 'くだもの',     kanji: '果物',   english: 'fruit',                               category: 'noun' },
  { id: 'n04', kana: 'やすみ',       kanji: '休み',   english: 'holiday; day off; absence',           category: 'noun' },
  { id: 'n05', kana: 'りょこう',     kanji: '旅行',   english: 'travel',                              category: 'noun' },
  { id: 'n06', kana: 'うみ',         kanji: '海',     english: 'sea',                                 category: 'noun' },
  { id: 'n07', kana: 'サーフィン',   kanji: '',       english: 'surfing',                             category: 'noun' },
  { id: 'n08', kana: 'おみやげ',     kanji: 'お土産', english: 'souvenir',                            category: 'noun' },
  { id: 'n09', kana: 'バス',         kanji: '',       english: 'bus',                                 category: 'noun' },
  { id: 'n10', kana: 'てんき',       kanji: '天気',   english: 'weather',                             category: 'noun' },
  { id: 'n11', kana: 'しゅくだい',   kanji: '宿題',   english: 'homework',                            category: 'noun' },
  { id: 'n12', kana: 'テスト',       kanji: '',       english: 'test',                                category: 'noun' },
  { id: 'n13', kana: 'たんじょうび', kanji: '誕生日', english: 'birthday',                            category: 'noun' },
  { id: 'n14', kana: 'へや',         kanji: '部屋',   english: 'room',                                category: 'noun' },
  { id: 'n15', kana: 'ぼく',         kanji: '僕',     english: 'I (used by men)',                     category: 'noun' },
  { id: 'n16', kana: 'Lサイズ',      kanji: '',       english: 'size L',                              category: 'noun' },

  // ── U-verbs ─────────────────────────────────────────────
  { id: 'u01', kana: 'およぐ',       kanji: '泳ぐ',   english: 'to swim',                             category: 'u-verb' },
  { id: 'u02', kana: 'きく',         kanji: '聞く',   english: 'to ask',                              category: 'u-verb' },
  { id: 'u03', kana: 'のる',         kanji: '乗る',   english: 'to ride; to board',                  category: 'u-verb' },
  { id: 'u04', kana: 'やる',         kanji: '',       english: 'to do; to perform',                  category: 'u-verb' },

  // ── Ru-verbs ────────────────────────────────────────────
  { id: 'r01', kana: 'でかける',     kanji: '出かける', english: 'to go out',                         category: 'ru-verb' },

  // ── Adjectives, Adverbs, and Other Expressions ──────────
  { id: 'o01', kana: 'あたらしい',   kanji: '新しい', english: 'new',                                 category: 'other' },
  { id: 'o02', kana: 'ふるい',       kanji: '古い',   english: 'old (thing)',                         category: 'other' },
  { id: 'o03', kana: 'あつい',       kanji: '暑い',   english: 'hot (weather)',                       category: 'other' },
  { id: 'o04', kana: 'さむい',       kanji: '寒い',   english: 'cold (weather)',                      category: 'other' },
  { id: 'o05', kana: 'あつい',       kanji: '熱い',   english: 'hot (thing)',                         category: 'other' },
  { id: 'o06', kana: 'いそがしい',   kanji: '忙しい', english: 'busy (people/days)',                  category: 'other' },
  { id: 'o07', kana: 'おおきい',     kanji: '大きい', english: 'large',                               category: 'other' },
  { id: 'o08', kana: 'ちいさい',     kanji: '小さい', english: 'small',                               category: 'other' },
  { id: 'o09', kana: 'おもしろい',   kanji: '面白い', english: 'interesting; funny',                  category: 'other' },
  { id: 'o10', kana: 'つまらない',   kanji: '',       english: 'boring',                              category: 'other' },
  { id: 'o11', kana: 'やさしい',     kanji: '',       english: 'easy (problem); kind (person)',       category: 'other' },
  { id: 'o12', kana: 'むずかしい',   kanji: '難しい', english: 'difficult',                           category: 'other' },
  { id: 'o13', kana: 'かっこいい',   kanji: '',       english: 'good-looking',                        category: 'other' },
  { id: 'o14', kana: 'こわい',       kanji: '怖い',   english: 'frightening',                         category: 'other' },
  { id: 'o15', kana: 'たのしい',     kanji: '楽しい', english: 'fun',                                 category: 'other' },
  { id: 'o16', kana: 'やすい',       kanji: '安い',   english: 'inexpensive; cheap (thing)',          category: 'other' },
  { id: 'o17', kana: 'すき',         kanji: '好き',   english: 'fond of; to like',                   category: 'other' },
  { id: 'o18', kana: 'きらい',       kanji: '嫌い',   english: 'disgusted with; to dislike',         category: 'other' },
  { id: 'o19', kana: 'だいすき',     kanji: '大好き', english: 'very fond of; to love',              category: 'other' },
  { id: 'o20', kana: 'だいきらい',   kanji: '大嫌い', english: 'to hate',                             category: 'other' },
  { id: 'o21', kana: 'きれい',       kanji: '',       english: 'beautiful; clean',                   category: 'other' },
  { id: 'o22', kana: 'げんき',       kanji: '元気',   english: 'healthy; energetic',                 category: 'other' },
  { id: 'o23', kana: 'しずか',       kanji: '静か',   english: 'quiet',                               category: 'other' },
  { id: 'o24', kana: 'にぎやか',     kanji: '',       english: 'lively',                              category: 'other' },
  { id: 'o25', kana: 'ひま',         kanji: '暇',     english: 'not busy; free (time)',               category: 'other' },
  { id: 'o26', kana: 'いっしょに',   kanji: '一緒に', english: 'together',                            category: 'other' },
  { id: 'o27', kana: 'すごく',       kanji: '',       english: 'extremely',                           category: 'other' },
  { id: 'o28', kana: 'だいじょうぶ', kanji: '大丈夫', english: "it's okay; not to worry",            category: 'other' },
  { id: 'o29', kana: 'とても',       kanji: '',       english: 'very',                                category: 'other' },
  { id: 'o30', kana: 'どんな',       kanji: '',       english: 'what kind of ...',                   category: 'other' },
  { id: 'o31', kana: '〜まい',       kanji: '〜枚',   english: '[counter for flat objects]',         category: 'other' },
]

// Convenience groupers
export const VOCAB_CATEGORIES = [
  { id: 'all',   label: 'All',   count: () => ch05Vocab.length },
  { id: 'noun',  label: 'Nouns', count: () => ch05Vocab.filter(w => w.category === 'noun').length },
  { id: 'verb',  label: 'Verbs', count: () => ch05Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category)).length },
  { id: 'other', label: 'Other', count: () => ch05Vocab.filter(w => w.category === 'other').length },
]

export function getWordsForCategory(cat) {
  if (cat === 'all')   return ch05Vocab
  if (cat === 'noun')  return ch05Vocab.filter(w => w.category === 'noun')
  if (cat === 'verb')  return ch05Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category))
  if (cat === 'other') return ch05Vocab.filter(w => w.category === 'other')
  return ch05Vocab
}
