// Chapter 11 Vocabulary — Genki I
// Each word: { id, kana, kanji, english, category }
// category: 'noun' | 'u-verb' | 'ru-verb' | 'irregular' | 'other'

export const ch11Vocab = [
  // ── Nouns ───────────────────────────────────────────────
  { id: 'n01', kana: 'がいこく',       kanji: '外国',     english: 'foreign country',         category: 'noun' },
  { id: 'n02', kana: 'オーストラリア', kanji: '',         english: 'Australia',               category: 'noun' },
  { id: 'n03', kana: 'かわ',           kanji: '川',       english: 'river',                   category: 'noun' },
  { id: 'n04', kana: 'おんせん',       kanji: '温泉',     english: 'spa; hot spring',         category: 'noun' },
  { id: 'n05', kana: 'つり',           kanji: '',         english: 'fishing',                 category: 'noun' },
  { id: 'n06', kana: 'みずうみ',       kanji: '湖',       english: 'lake',                    category: 'noun' },
  { id: 'n07', kana: 'やま',           kanji: '山',       english: 'mountain',                category: 'noun' },
  { id: 'n08', kana: 'キャンプ',       kanji: '',         english: 'camp; camping',           category: 'noun' },
  { id: 'n09', kana: 'ドライブ',       kanji: '',         english: 'drive; road trip',        category: 'noun' },
  { id: 'n10', kana: 'じんじゃ',       kanji: '神社',     english: 'Shinto shrine',           category: 'noun' },
  { id: 'n11', kana: 'びじゅつかん',   kanji: '美術館',   english: 'art museum',              category: 'noun' },
  { id: 'n12', kana: 'しゃちょう',     kanji: '社長',     english: 'president of a company',  category: 'noun' },
  { id: 'n13', kana: 'かしゅ',         kanji: '歌手',     english: 'singer',                  category: 'noun' },
  { id: 'n14', kana: 'ルームメイト',   kanji: '',         english: 'roommate',                category: 'noun' },
  { id: 'n15', kana: 'ホストファミリー', kanji: '',        english: 'host family',             category: 'noun' },
  { id: 'n16', kana: 'しょうらい',     kanji: '将来',     english: 'future',                  category: 'noun' },
  { id: 'n17', kana: 'ゆめ',           kanji: '夢',       english: 'dream',                   category: 'noun' },
  { id: 'n18', kana: 'おまつり',       kanji: 'お祭り',   english: 'festival',                category: 'noun' },
  { id: 'n19', kana: 'おしょうがつ',   kanji: 'お正月',   english: "New Year's",              category: 'noun' },
  { id: 'n20', kana: 'おかし',         kanji: 'お菓子',   english: 'snack; sweets',           category: 'noun' },
  { id: 'n21', kana: 'ビール',         kanji: '',         english: 'beer',                    category: 'noun' },
  { id: 'n22', kana: 'おもちゃ',       kanji: '',         english: 'toy',                     category: 'noun' },
  { id: 'n23', kana: 'こんがっき',     kanji: '今学期',   english: 'this semester',           category: 'noun' },
  { id: 'n24', kana: 'らいがっき',     kanji: '来学期',   english: 'next semester',           category: 'noun' },
  { id: 'n25', kana: 'じゅぎょう',     kanji: '授業',     english: 'class',                   category: 'noun' },
  { id: 'n26', kana: 'こちら',         kanji: '',         english: 'this person (polite)',    category: 'noun' },

  // ── U-verbs ─────────────────────────────────────────────
  { id: 'u01', kana: 'うそをつく',     kanji: '',         english: 'to tell a lie',           category: 'u-verb' },
  { id: 'u02', kana: 'おなかがすく',   kanji: '',         english: 'to become hungry',        category: 'u-verb' },
  { id: 'u03', kana: 'かう',           kanji: '飼う',     english: 'to own (a pet)',          category: 'u-verb' },
  { id: 'u04', kana: 'サボる',         kanji: '',         english: 'to cut (skip) class',     category: 'u-verb' },
  { id: 'u05', kana: 'とる',           kanji: '取る',     english: 'to take (a class); to get (a grade)', category: 'u-verb' },
  { id: 'u06', kana: 'ならう',         kanji: '習う',     english: 'to learn',                category: 'u-verb' },
  { id: 'u07', kana: 'のぼる',         kanji: '登る',     english: 'to climb',                category: 'u-verb' },
  { id: 'u08', kana: 'はしる',         kanji: '走る',     english: 'to run',                  category: 'u-verb' },

  // ── Ru-verbs ────────────────────────────────────────────
  { id: 'r01', kana: 'つかれる',       kanji: '疲れる',   english: 'to get tired',            category: 'ru-verb' },
  { id: 'r02', kana: 'やめる',         kanji: '',         english: 'to quit',                 category: 'ru-verb' },

  // ── Irregular Verbs ─────────────────────────────────────
  { id: 'i01', kana: 'けんかする',     kanji: '',         english: 'to have a fight; to quarrel', category: 'irregular' },
  { id: 'i02', kana: 'しょうかいする', kanji: '紹介する', english: 'to introduce',            category: 'irregular' },
  { id: 'i03', kana: 'ダイエットする', kanji: '',         english: 'to go on a diet',         category: 'irregular' },
  { id: 'i04', kana: 'ちこくする',     kanji: '遅刻する', english: 'to be late (for an appointment)', category: 'irregular' },
  { id: 'i05', kana: 'りゅうがくする', kanji: '留学する', english: 'to study abroad',         category: 'irregular' },

  // ── Adverbs & Other Expressions ─────────────────────────
  { id: 'o01', kana: 'しゅっしん',     kanji: '出身',     english: 'coming from (a place)',   category: 'other' },
  { id: 'o02', kana: 'ひさしぶり',     kanji: '久しぶり', english: 'it has been a long time', category: 'other' },
  { id: 'o03', kana: 'まあまあ',       kanji: '',         english: 'okay; so-so',             category: 'other' },
  { id: 'o04', kana: 'もっと',         kanji: '',         english: 'more',                    category: 'other' },
  { id: 'o05', kana: 'あと',           kanji: '後',       english: 'after (an event)',        category: 'other' },
  { id: 'o06', kana: 'そして',         kanji: '',         english: 'and then',                category: 'other' },
  { id: 'o07', kana: '〜だけ',         kanji: '',         english: 'just...; only...',        category: 'other' },
  { id: 'o08', kana: '〜てん',         kanji: '〜点',     english: '...points',               category: 'other' },
]

// Convenience groupers
export const VOCAB_CATEGORIES = [
  { id: 'all',   label: 'All',  count: () => ch11Vocab.length },
  { id: 'noun',  label: 'Nouns', count: () => ch11Vocab.filter(w => w.category === 'noun').length },
  { id: 'verb',  label: 'Verbs', count: () => ch11Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category)).length },
  { id: 'other', label: 'Other', count: () => ch11Vocab.filter(w => w.category === 'other').length },
]

export function getWordsForCategory(cat) {
  if (cat === 'all')  return ch11Vocab
  if (cat === 'noun') return ch11Vocab.filter(w => w.category === 'noun')
  if (cat === 'verb') return ch11Vocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category))
  if (cat === 'other') return ch11Vocab.filter(w => w.category === 'other')
  return ch11Vocab
}
