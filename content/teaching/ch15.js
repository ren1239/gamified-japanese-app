// Teaching notes for Ch.15 (長野旅行) — used by voice lessons in Claude chat (CLAUDE.md §16).
// Written in our own words; examples use Ch.15 vocab first, then earlier chapters.
//
// One entry per grammar point, matched to the quiz by `key`.
// Chapters without quizzes add `section`, `label`, `title` and use a key like 'ch5-s1'.
//   summary      one line: what the pattern is for
//   formation    how to build it, one rule per line
//   examples     natural sentences { jp, en }
//   pitfalls     mistakes to listen for
//   drills       quick spoken cues { cue, answer } — the tutor says the cue, the learner answers
//   conversation role-play ideas that make the learner use the pattern freely
export default [
  {
    key: 'ch15-volitional',
    summary: 'Casual "let\'s…" and "shall we/I…?" — the short form of 〜ましょう.',
    formation: [
      'Ru-verbs: drop る, add よう — 見る → 見よう, 調べる → 調べよう',
      'U-verbs: change the final -u sound to -o, add う — 行く → 行こう, 探す → 探そう, 待つ → 待とう, 誘う → 誘おう, 泳ぐ → 泳ごう, 売る → 売ろう',
      'Irregular: する → しよう, くる → こよう (来よう)',
      'Add か for a casual offer or suggestion: 手伝おうか ("shall I help?"), どこに行こうか ("where shall we go?")',
      'Polite equivalents: 〜ましょう / 〜ましょうか',
    ],
    examples: [
      { jp: '週末、一緒に旅館を探そう。', en: 'Let\'s look for a Japanese inn together this weekend.' },
      { jp: '地図を見ようか。', en: 'Shall we look at the map?' },
      { jp: '雨だから、映画館に行こう。', en: 'It\'s raining, so let\'s go to the movie theater.' },
      { jp: '卒業式の後で、写真を撮ろう。', en: 'Let\'s take photos after the graduation ceremony.' },
      { jp: '荷物、持とうか。', en: 'Shall I carry your bags?' },
    ],
    pitfalls: [
      'Adding よう to a u-verb stem (行きよう, 探しよう) — u-verbs use the -o row: 行こう, 探そう.',
      'Dropping the long vowel: 行こ / 見よ sounds clipped; say 行こう, 見よう.',
      'くる → こよう, not きよう or くろう.',
      'Using the volitional with a superior — switch to 〜ましょう(か).',
    ],
    drills: [
      { cue: 'Casual: "Let\'s reserve a hotel."', answer: 'ホテルを予約しよう。' },
      { cue: 'Casual: "Let\'s draw a picture."', answer: '絵を描こう。' },
      { cue: 'Casual offer: "Shall I look it up?"', answer: '調べようか。' },
      { cue: 'Turn into the volitional: 誘います', answer: '誘おう' },
      { cue: 'Turn into the volitional: 着きます', answer: '着こう' },
      { cue: 'Turn into the volitional: 気をつけます', answer: '気をつけよう' },
      { cue: 'Turn into the volitional: 来ます', answer: '来よう（こよう）' },
      { cue: 'Casual: "Let\'s chat all day long."', answer: '一日中しゃべろう。' },
    ],
    conversation: [
      'You and a friend are planning a two-day trip to Nagano. Suggest things to do on 一日目 and 二日目 using only the volitional; the tutor answers casually and counter-suggests.',
      'Your friend is bored at home on a rainy Sunday. Offer three plans with 〜ようか and agree on one.',
      'You are at a train station with no idea where the inn is. Decide together what to do (map, ask someone, look it up online).',
    ],
  },
  {
    key: 'ch15-toomotteimasu',
    title: 'Plans with 〜(よ)うと思っています',
    summary: 'Say what you\'re planning or thinking of doing.',
    formation: [
      'Volitional + と思っています = a plan you have had for a while: 留学しようと思っています',
      'Volitional + と思います = a decision you are making right now: じゃあ、この本を買おうと思います',
      'Volitional + と思っていました / と思いましたが… = "I meant to…, but…"',
      'Talking about someone else\'s plan uses と思っています: 妹は旅館を予約しようと思っています',
      'Negative plan: dictionary negative + つもり is more natural (行かないつもりです); 〜ないと思っています means "I think it doesn\'t…"',
    ],
    examples: [
      { jp: '卒業したら、外国で働こうと思っています。', en: 'I\'m thinking of working abroad after I graduate.' },
      { jp: '冬休みに保険に入ろうと思っています。', en: 'I\'m planning to buy insurance over winter break.' },
      { jp: '使わない家具を売ろうと思っています。', en: 'I\'m thinking of selling the furniture I don\'t use.' },
      { jp: '発表の前に練習しようと思いましたが、時間がありませんでした。', en: 'I meant to practise before the presentation, but I had no time.' },
      { jp: '友達はボランティア活動に参加しようと思っています。', en: 'My friend is thinking of joining a volunteer activity.' },
    ],
    pitfalls: [
      'Using the dictionary form (行くと思っています) — that means "I think (someone) will go", not "I plan to go".',
      'Using と思います for a long-held plan; prefer と思っています.',
      'Forgetting the volitional conjugation for u-verbs (売りようと思っています → 売ろうと思っています).',
    ],
    drills: [
      { cue: '"I\'m thinking of studying abroad next year."', answer: '来年、留学しようと思っています。' },
      { cue: '"I\'m thinking of withdrawing money tomorrow."', answer: 'あした、お金を下ろそうと思っています。' },
      { cue: '"I\'m thinking of inviting Takeshi to the wedding."', answer: 'たけしさんを結婚式に誘おうと思っています。' },
      { cue: '"I meant to look into it, but I forgot."', answer: '調べようと思いましたが、忘れました。' },
      { cue: 'Ask casually: "What are you thinking of doing this weekend?"', answer: '週末、何をしようと思ってる？' },
    ],
    conversation: [
      'Interview: the tutor asks about your plans after graduation, this summer, and this weekend. Answer each with 〜ようと思っています and give a reason with から.',
      'Talk about New Year\'s resolutions: three things you plan to do and one thing you meant to do last year but didn\'t (〜ようと思いましたが…).',
    ],
  },
  {
    key: 'ch15-teoku',
    title: '〜ておく: doing things in advance',
    summary: 'Do something ahead of time, as preparation, or leave something as it is.',
    formation: [
      'て-form + おく (おく conjugates as a u-verb): 予約しておく, 予約しておきます, 予約しておきました',
      'Request: 〜ておいてください ("please … in advance")',
      'Casual speech often contracts ておく → とく: 買っとく, 調べとく; でおく → どく: 読んどく',
      'Combines with the volitional: 調べておこう ("let\'s look it up beforehand")',
    ],
    examples: [
      { jp: '旅行の前に、旅館を予約しておきました。', en: 'I booked the inn before the trip.' },
      { jp: '地震のときのために、電池を買っておきます。', en: 'I\'ll buy batteries in case of an earthquake.' },
      { jp: '締め切りの前に、レポートを書いておいてください。', en: 'Please write the report before the deadline.' },
      { jp: '友達が来るから、部屋を掃除しておこう。', en: 'A friend is coming, so let\'s clean the room beforehand.' },
      { jp: '発表の前に、言葉を調べておいた。', en: 'I looked up the words before the presentation.' },
    ],
    pitfalls: [
      'Using the stem instead of the て-form (予約しおきます → 予約しておきます).',
      'Conjugating おく as a ru-verb: the volitional is ておこう, not ておきよう.',
      'Confusing with 〜てある (resulting state, Ch.21) — ておく is the action of preparing.',
    ],
    drills: [
      { cue: '"I\'ll buy a discount coupon in advance."', answer: '割引券を買っておきます。' },
      { cue: '"I reserved the hotel in advance." (past)', answer: 'ホテルを予約しておきました。' },
      { cue: 'Request: "Please look into it beforehand."', answer: '調べておいてください。' },
      { cue: 'Casual contraction of 買っておく', answer: '買っとく' },
      { cue: '"Let\'s withdraw money before the trip." (casual)', answer: '旅行の前にお金を下ろしておこう。' },
    ],
    conversation: [
      'Trip prep checklist: the tutor names a trip (Nagano in winter, a wedding in Kyoto). Say five things you will do beforehand with 〜ておきます.',
      'You\'re a manager asking a new part-timer to prepare for tomorrow — make requests with 〜ておいてください; the tutor asks follow-up questions.',
    ],
  },
  {
    key: 'ch15-relative',
    title: 'Clauses that describe nouns',
    summary: 'Put a whole short-form sentence before a noun to describe it ("the picture I drew yesterday").',
    formation: [
      'Short form (plain) verb, adjective or noun clause + noun: きのう描いた絵, 日本語が話せる人, 来週ある結婚式',
      'Any tense or polarity works: 行ったことがない国, 使わない家具',
      'The subject inside the clause takes が (or の), not は: 友達が住んでいる町',
      'Nothing between the clause and the noun — no の or な after a verb',
      'Nouns inside the clause still use だった/じゃない: 去年まで学生だった人',
    ],
    examples: [
      { jp: 'これは姉が描いた絵です。', en: 'This is a picture my older sister drew.' },
      { jp: '駅から見える建物は旅館です。', en: 'The building you can see from the station is an inn.' },
      { jp: '使わない家具を売りました。', en: 'I sold the furniture I don\'t use.' },
      { jp: '去年参加したボランティア活動はとても楽しかったです。', en: 'The volunteer activity I joined last year was a lot of fun.' },
      { jp: '外国人がよく行く店を知っていますか。', en: 'Do you know a shop that foreigners often go to?' },
    ],
    pitfalls: [
      'Using は for the subject inside the clause (姉は描いた絵 → 姉が描いた絵).',
      'Using the polite form inside the clause (描きました絵 → 描いた絵).',
      'Adding の after the verb (描いたの絵 → 描いた絵).',
      'Word order from English: the clause always comes BEFORE the noun.',
    ],
    drills: [
      { cue: '"the dictionary I bought yesterday"', answer: 'きのう買った辞書' },
      { cue: '"a person who can speak Japanese"', answer: '日本語が話せる人' },
      { cue: '"the inn we stayed at in Nagano"', answer: '長野で泊まった旅館' },
      { cue: '"a country I have never been to"', answer: '行ったことがない国' },
      { cue: '"the classroom where we make presentations"', answer: '発表する教室' },
      { cue: 'Combine: 友達がジャケットを買いました + そのジャケットは高いです', answer: '友達が買ったジャケットは高いです。' },
    ],
    conversation: [
      'Guessing game: describe a classmate, a place in your town, or an object in the room using only a describing clause ("the person who…", "the place where…"); the tutor guesses, then swaps roles.',
      'Show and tell: talk about three photos from a trip — "this is the inn we stayed at", "this is the garden we saw on day two".',
    ],
  },
]
