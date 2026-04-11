// Chapter 1 Vocabulary — Genki I
// Each word: { id, kana, kanji, english, category }
// category: 'noun' | 'u-verb' | 'ru-verb' | 'irregular' | 'other'

export const ch1Vocab = [
  // ── Nouns (School) ──────────────────────────────────────────
  { id: 'n01', kana: 'だいがく',       kanji: '大学',     english: 'college; university', category: 'noun' },
  { id: 'n02', kana: 'こうこう',       kanji: '高校',     english: 'high school', category: 'noun' },
  { id: 'n03', kana: 'がくせい',       kanji: '学生',     english: 'student', category: 'noun' },
  { id: 'n04', kana: 'だいがくせい',   kanji: '大学生',   english: 'college student', category: 'noun' },
  { id: 'n05', kana: 'りゅうがくせい', kanji: '留学生',   english: 'international student', category: 'noun' },
  { id: 'n06', kana: 'せんせい',       kanji: '先生',     english: 'teacher; Professor...', category: 'noun' },
  { id: 'n07', kana: '〜ねんせい',     kanji: '〜年生',   english: '...year student', category: 'noun' },
  { id: 'n08', kana: 'いちねんせい',   kanji: '一年生',   english: 'first-year student', category: 'noun' },
  { id: 'n09', kana: 'せんこう',       kanji: '専攻',     english: 'major', category: 'noun' },

  // ── Nouns (Person) ──────────────────────────────────────────
  { id: 'n10', kana: 'わたし',         kanji: '私',       english: 'I', category: 'noun' },
  { id: 'n11', kana: 'ともだち',       kanji: '友達',     english: 'friend', category: 'noun' },
  { id: 'n12', kana: '〜さん',         kanji: '',         english: 'Mr./Ms....', category: 'noun' },
  { id: 'n13', kana: '〜じん',         kanji: '〜人',     english: '...people', category: 'noun' },
  { id: 'n14', kana: 'にほんじん',     kanji: '日本人',   english: 'Japanese people', category: 'noun' },

  // ── Nouns (General) ─────────────────────────────────────────
  { id: 'n15', kana: 'にほん',         kanji: '日本',     english: 'Japan', category: 'noun' },
  { id: 'n16', kana: 'アメリカ',       kanji: '',         english: 'U.S.A.', category: 'noun' },
  { id: 'n17', kana: '〜ご',           kanji: '〜語',     english: '...language', category: 'noun' },
  { id: 'n18', kana: 'にほんご',       kanji: '日本語',   english: 'Japanese language', category: 'noun' },
  { id: 'n19', kana: '〜さい',         kanji: '〜歳',     english: '...years old', category: 'noun' },
  { id: 'n20', kana: 'でんわ',         kanji: '電話',     english: 'telephone', category: 'noun' },
  { id: 'n21', kana: '〜ばん',         kanji: '〜番',     english: 'number...', category: 'noun' },
  { id: 'n22', kana: 'ばんごう',       kanji: '番号',     english: 'number', category: 'noun' },
  { id: 'n23', kana: 'なまえ',         kanji: '名前',     english: 'name', category: 'noun' },

  // ── Nouns (Majors) ──────────────────────────────────────────
  { id: 'n24', kana: 'アジアけんきゅう', kanji: 'アジア研究', english: 'Asian studies', category: 'noun' },
  { id: 'n25', kana: 'けいざい',       kanji: '経済',     english: 'economics', category: 'noun' },
  { id: 'n26', kana: 'こうがく',       kanji: '工学',     english: 'engineering', category: 'noun' },
  { id: 'n27', kana: 'こくさいかんけい', kanji: '国際関係', english: 'international relations', category: 'noun' },
  { id: 'n28', kana: 'コンピューター', kanji: '',         english: 'computer', category: 'noun' },
  { id: 'n29', kana: 'せいじ',         kanji: '政治',     english: 'politics', category: 'noun' },
  { id: 'n30', kana: 'せいぶつがく',   kanji: '生物学',   english: 'biology', category: 'noun' },
  { id: 'n31', kana: 'ビジネス',       kanji: '',         english: 'business', category: 'noun' },
  { id: 'n32', kana: 'ぶんがく',       kanji: '文学',     english: 'literature', category: 'noun' },
  { id: 'n33', kana: 'れきし',         kanji: '歴史',     english: 'history', category: 'noun' },

  // ── Nouns (Occupations) ─────────────────────────────────────
  { id: 'n34', kana: 'いしゃ',         kanji: '医者',     english: 'doctor', category: 'noun' },
  { id: 'n35', kana: 'かいしゃいん',   kanji: '会社員',   english: 'office worker', category: 'noun' },
  { id: 'n36', kana: 'かんごし',       kanji: '看護師',   english: 'nurse', category: 'noun' },
  { id: 'n37', kana: 'こうこうせい',   kanji: '高校生',   english: 'high school student', category: 'noun' },
  { id: 'n38', kana: 'しゅふ',         kanji: '主婦',     english: 'housewife', category: 'noun' },
  { id: 'n39', kana: 'だいがくいんせい', kanji: '大学院生', english: 'graduate student', category: 'noun' },
  { id: 'n40', kana: 'べんごし',       kanji: '弁護士',   english: 'lawyer', category: 'noun' },

  // ── Nouns (Family) ──────────────────────────────────────────
  { id: 'n41', kana: 'おかあさん',     kanji: 'お母さん', english: 'mother', category: 'noun' },
  { id: 'n42', kana: 'おとうさん',     kanji: 'お父さん', english: 'father', category: 'noun' },
  { id: 'n43', kana: 'おねえさん',     kanji: 'お姉さん', english: 'older sister', category: 'noun' },
  { id: 'n44', kana: 'おにいさん',     kanji: 'お兄さん', english: 'older brother', category: 'noun' },
  { id: 'n45', kana: 'いもうと',       kanji: '妹',       english: 'younger sister', category: 'noun' },
  { id: 'n46', kana: 'おとうと',       kanji: '弟',       english: 'younger brother', category: 'noun' },

  // ── Other (Time, Expressions, etc) ──────────────────────────
  { id: 'o01', kana: 'いま',           kanji: '今',       english: 'now', category: 'other' },
  { id: 'o02', kana: 'ごぜん',         kanji: '午前',     english: 'A.M.', category: 'other' },
  { id: 'o03', kana: 'ごご',           kanji: '午後',     english: 'P.M.', category: 'other' },
  { id: 'o04', kana: '〜じ',           kanji: '〜時',     english: 'o\'clock', category: 'other' },
  { id: 'o05', kana: 'いちじ',         kanji: '一時',     english: 'one o\'clock', category: 'other' },
  { id: 'o06', kana: 'はん',           kanji: '半',       english: 'half', category: 'other' },
  { id: 'o07', kana: 'にじはん',       kanji: '二時半',   english: 'half past two', category: 'other' },
  { id: 'o08', kana: 'なん / なに',    kanji: '何',       english: 'what', category: 'other' },
  { id: 'o09', kana: 'あのう',         kanji: '',         english: 'um...', category: 'other' },
  { id: 'o10', kana: 'はい',           kanji: '',         english: 'yes', category: 'other' },
  { id: 'o11', kana: 'そうです',       kanji: '',         english: 'That\'s right.', category: 'other' },
  { id: 'o12', kana: 'そうですか',     kanji: '',         english: 'I see.; Is that so?', category: 'other' },
]

export function getWordsForCategory(cat) {
  if (cat === 'all')  return ch1Vocab
  if (cat === 'noun') return ch1Vocab.filter(w => w.category === 'noun')
  if (cat === 'verb') return ch1Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category))
  if (cat === 'other') return ch1Vocab.filter(w => w.category === 'other')
  return ch1Vocab
}
