// Chapter structure for all 23 Genki chapters
// categories.vocab → main vocab quiz
// categories.grammar → array of grammar point drills

export const chapters = [
  {
    number: 1, title: 'Chapter 1', subtitle: 'あのう、すみません',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 2, title: 'Chapter 2', subtitle: 'じゃ、また明日',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 3, title: 'Chapter 3', subtitle: 'アニメと漫画',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 4, title: 'Chapter 4', subtitle: '友達の家',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 5, title: 'Chapter 5', subtitle: '沖縄への旅行',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 6, title: 'Chapter 6', subtitle: 'ロバートさんのアルバイト',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 7, title: 'Chapter 7', subtitle: '家族の写真',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 8, title: 'Chapter 8', subtitle: 'バーベキュー',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 9, title: 'Chapter 9', subtitle: 'かぜ',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 10, title: 'Chapter 10', subtitle: '冬休みの予定',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 11, title: 'Chapter 11', subtitle: '友達とのトラブル',
    vocab: { quizId: 'genki-g1c11', available: true },
    grammar: [
      { id: 'tai',    label: 'たい・たかった',   desc: 'Want to do', quizId: 'ch11-tai',    available: true },
      { id: 'tari',   label: 'たり〜たりする',   desc: 'Doing things like…', quizId: 'ch11-tari',   available: true },
      { id: 'koto',   label: 'ことがある',       desc: 'Have done before', quizId: 'ch11-koto',   available: true },
      { id: 'ya',     label: 'や（など）',       desc: 'Listing: and, among others', quizId: 'ch11-ya',    available: true },
      { id: 'teform', label: '〜て forms',       desc: 'てしまう・ておく・てみる', quizId: 'ch11-teform', available: true },
      { id: 'giving', label: 'Giving & Receiving', desc: 'あげる・もらう・くれる', quizId: 'ch11-giving', available: true },
    ],
  },
  {
    number: 12, title: 'Chapter 12', subtitle: '病気',
    vocab: { available: true },
    grammar: [],
  },
  {
    number: 13, title: 'Chapter 13', subtitle: 'アルバイト探し',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 14, title: 'Chapter 14', subtitle: 'バレンタインデー',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 15, title: 'Chapter 15', subtitle: '長野マラソン',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 16, title: 'Chapter 16', subtitle: '忘れ物',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 17, title: 'Chapter 17', subtitle: '今昔物語',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 18, title: 'Chapter 18', subtitle: 'ジョンさんのアパート',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 19, title: 'Chapter 19', subtitle: '出会い',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 20, title: 'Chapter 20', subtitle: '小説を読んで',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 21, title: 'Chapter 21', subtitle: 'どろぼう',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 22, title: 'Chapter 22', subtitle: '旅行のトラブル',
    vocab: { available: false },
    grammar: [],
  },
  {
    number: 23, title: 'Chapter 23', subtitle: '別れ',
    vocab: { available: false },
    grammar: [],
  },
]
