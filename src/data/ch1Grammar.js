export const ch1DesuQuiz = {
  id: 'ch1-desu',
  title: 'Ch.1 · X は Y です',
  topic: 'X は Y です',
  grammarPoint: 'は / です',
  description: 'Basic statements (X is Y). Example: わたしはがくせいです。',
  created: '2026-04-11',
  playCount: 0,
  bestScore: null,
  questions: [
    {
      id: 1,
      question: 'How do you say "I am a student."?',
      jp: '学生',
      choices: ['わたしのがくせいです', 'わたしがくせいです', 'わたしはがくせいです'],
      correct: 2,
    },
    {
      id: 2,
      question: 'How do you say "(My) major is the Japanese language."?',
      jp: '専攻',
      choices: ['せんこうはにほんごです', 'にほんごはせんこうです', 'せんこうをにほんごです'],
      correct: 0,
    },
    {
      id: 3,
      question: '"Mr. Yamashita is a teacher." Which is correct?',
      jp: '先生',
      choices: ['せんせいはやましたさんです', 'やましたさんはせんせいです', 'やましたさんをせんせいです'],
      correct: 1,
    },
    {
      id: 4,
      question: '"Mary is an American." Fill in the blank:',
      jp: 'メアリーさんはアメリカ＿＿＿です。',
      choices: ['じん', 'ご', 'さん'],
      correct: 0,
    },
    {
      id: 5,
      question: '"I am a third-year student." Which is correct?',
      jp: '三年生',
      choices: ['わたしはさんねんせい', 'わたしはさんねんせいです', 'わたしさんねんせいです'],
      correct: 1,
    }
  ],
}

export const ch1KaQuiz = {
  id: 'ch1-ka',
  title: 'Ch.1 · 〜ですか',
  topic: 'Asking Questions',
  grammarPoint: 'ですか / なん',
  description: 'Asking questions. Just add か to the end. Example: りゅうがくせいですか。',
  created: '2026-04-11',
  playCount: 0,
  bestScore: null,
  questions: [
    {
      id: 1,
      question: 'How do you ASK "What is your major?"',
      jp: '専攻',
      choices: ['せんこうはなにです', 'せんこうはなんです', 'せんこうはなんですか'],
      correct: 2,
    },
    {
      id: 2,
      question: 'How do you ASK "What time is it right now?"',
      jp: '今',
      choices: ['いまなんじですか', 'いまなんですか', 'いまなんじですが'],
      correct: 0,
    },
    {
      id: 3,
      question: '"Are you an international student?" Which is correct?',
      jp: '留学生',
      choices: ['りゅうがくせいです', 'りゅうがくせいですか', 'りゅうがくせいですが'],
      correct: 1,
    },
    {
      id: 4,
      question: 'How do you ASK "What year are you in college?"',
      jp: '何年生',
      choices: ['なんねんせいですかね', 'なんねんせいですか', 'なんさいですか'],
      correct: 1,
    },
    {
      id: 5,
      question: 'How do you ANSWER "It is nine o\'clock."?',
      jp: '九時',
      choices: ['きゅうじです', 'くじですか', 'くじです'],
      correct: 2,
    }
  ]
}

export const ch1NoQuiz = {
  id: 'ch1-no',
  title: 'Ch.1 · Noun の Noun',
  topic: '名詞 の 名詞',
  grammarPoint: 'の (Possession/Restriction)',
  description: 'Connecting nouns. The main idea comes last. Example: 日本の大学',
  created: '2026-04-11',
  playCount: 0,
  bestScore: null,
  questions: [
    {
      id: 1,
      question: 'How do you say "A student of the Japanese language"?',
      jp: '日本語の学生',
      choices: ['がくせいのにほんご', 'にほんごがくせい', 'にほんごのがくせい'],
      correct: 2,
    },
    {
      id: 2,
      question: '"A college in Japan" — Which is correct?',
      jp: '日本の大学',
      choices: ['にほんのだいがく', 'だいがくのにほん', 'にほんだいがく'],
      correct: 0,
    },
    {
      id: 3,
      question: 'How do you say "Takeshi\'s phone number"?',
      jp: '電話番号',
      choices: ['でんわばんごうのたけしさん', 'たけしさんのでんわばんごう', 'たけしさんでんわばんごう'],
      correct: 1,
    },
    {
      id: 4,
      question: '"A high school teacher" — Which is correct?',
      jp: '高校の先生',
      choices: ['せんせいのこうこう', 'こうこうせんせい', 'こうこうのせんせい'],
      correct: 2,
    },
    {
      id: 5,
      question: 'What does "さくらだいがくのがくせい" mean?',
      jp: 'さくら大学の学生',
      choices: ['A student at Sakura University', 'The University of Sakura Students', 'Sakura and a university student'],
      correct: 0,
    }
  ]
}
