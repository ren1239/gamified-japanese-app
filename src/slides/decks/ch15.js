// Slide extras for Ch.15 — everything else (summary, formation, drills, conversation) comes from
// content/teaching/ch15.js. Markup in Japanese: [grammar] = vermilion highlight, {noun} = indigo.
//   rows      table: [label, rule, [[from, to] | 'marked sentence', …]] — conversions highlight the changed ending
//   equation  building blocks: { parts: [{ cap, jp, kind: 'hl' | 'noun' }], en }
//   uses      [jp, en] pairs shown under the equation
//   examples  [jp, en] — replaces the notes' examples so the grammar can be marked
//   pitfalls  [{ bad, good, note }] — replaces the notes' pitfalls with ✗ / ✓ pairs
export default {
  'ch15-volitional': {
    rows: [
      ['る-verbs', 'drop る, add よう', [['見る', '見よう'], ['調べる', '調べよう']]],
      ['う-verbs', '-u → -o, add う', [['行く', '行こう'], ['探す', '探そう'], ['待つ', '待とう'], ['誘う', '誘おう']]],
      ['Irregular', '', [['する', 'しよう'], ['くる', 'こよう']]],
    ],
    uses: [
      ['[行こう]！', 'Let\'s go! (casual 行きましょう)'],
      ['[手伝おうか]？', 'Shall I help? — add か to offer'],
    ],
    examples: [
      ['週末、一緒に旅館を[探そう]。', 'Let\'s look for a Japanese inn together this weekend.'],
      ['地図を[見ようか]。', 'Shall we look at the map?'],
      ['雨だから、映画館に[行こう]。', 'It\'s raining, so let\'s go to the movie theater.'],
      ['卒業式の後で、写真を[撮ろう]。', 'Let\'s take photos after the graduation ceremony.'],
      ['荷物、[持とうか]。', 'Shall I carry your bags?'],
    ],
    pitfalls: [
      { bad: '行きよう', good: '行こう', note: 'う-verbs use the -o row, not the stem' },
      { bad: 'きよう', good: 'こよう', note: 'くる → こよう' },
      { bad: '行こ', good: '行こう', note: 'Keep the long vowel' },
      { bad: '先生、帰ろう', good: '先生、帰りましょう', note: 'To someone above you, use 〜ましょう' },
    ],
  },
  'ch15-toomotteimasu': {
    equation: {
      parts: [{ cap: 'volitional', jp: '留学しよう' }, { cap: 'plan', jp: 'と思っています', kind: 'hl' }],
      en: 'I\'m thinking of studying abroad.',
    },
    uses: [
      ['[と思っています]', 'a plan you\'ve had for a while'],
      ['[と思います]', 'a decision you\'re making right now'],
      ['[と思いましたが]…', 'I meant to…, but…'],
    ],
    examples: [
      ['卒業したら、外国で[働こうと思っています]。', 'I\'m thinking of working abroad after I graduate.'],
      ['冬休みに保険に[入ろうと思っています]。', 'I\'m planning to buy insurance over winter break.'],
      ['使わない家具を[売ろうと思っています]。', 'I\'m thinking of selling the furniture I don\'t use.'],
      ['発表の前に[練習しようと思いました]が、時間がありませんでした。', 'I meant to practise before the presentation, but I had no time.'],
      ['友達はボランティア活動に[参加しようと思っています]。', 'My friend is thinking of joining a volunteer activity.'],
    ],
    pitfalls: [
      { bad: '行くと思っています', good: '行こうと思っています', note: 'Dictionary form = "I think someone will go"' },
      { bad: '売りようと思っています', good: '売ろうと思っています', note: 'Get the う-verb volitional right first' },
      { bad: 'ずっと留学しようと思います', good: 'ずっと留学しようと思っています', note: 'A long-held plan takes と思っています' },
    ],
  },
  'ch15-teoku': {
    equation: {
      parts: [{ cap: 'て-form', jp: '予約して' }, { cap: 'in advance', jp: 'おく', kind: 'hl' }],
      en: 'to book (ahead of time)',
    },
    uses: [
      ['予約し[ておきます]', 'I\'ll book it in advance'],
      ['予約し[ておきました]', 'I booked it in advance'],
      ['予約し[ておいてください]', 'Please book it in advance'],
      ['予約し[ておこう]', 'Let\'s book it in advance'],
      ['買っ[とく]・読ん[どく]', 'casual: ておく → とく, でおく → どく'],
    ],
    examples: [
      ['旅行の前に、旅館を予約し[ておきました]。', 'I booked the inn before the trip.'],
      ['地震のときのために、電池を買っ[ておきます]。', 'I\'ll buy batteries in case of an earthquake.'],
      ['締め切りの前に、レポートを書い[ておいてください]。', 'Please write the report before the deadline.'],
      ['友達が来るから、部屋を掃除し[ておこう]。', 'A friend is coming, so let\'s clean the room beforehand.'],
      ['発表の前に、言葉を調べ[ておいた]。', 'I looked up the words before the presentation.'],
    ],
    pitfalls: [
      { bad: '予約しおきます', good: '予約しておきます', note: 'て-form + おく, not the stem' },
      { bad: '買っておきよう', good: '買っておこう', note: 'おく conjugates as a う-verb' },
      { note: 'ておく is the action of preparing; 〜てある (Ch.21) is the state that results' },
    ],
  },
  'ch15-relative': {
    equation: {
      parts: [{ cap: 'short-form clause', jp: 'きのう描いた', kind: 'hl' }, { cap: 'noun', jp: '絵', kind: 'noun' }],
      en: 'the picture I drew yesterday',
    },
    uses: [
      ['[友達が住んでいる]{町}', 'the town where my friend lives'],
      ['[使わない]{家具}', 'furniture I don\'t use'],
      ['[日本語が話せる]{人}', 'a person who can speak Japanese'],
      ['[行ったことがない]{国}', 'a country I\'ve never been to'],
    ],
    examples: [
      ['これは[姉が描いた]{絵}です。', 'This is a picture my older sister drew.'],
      ['[駅から見える]{建物}は旅館です。', 'The building you can see from the station is an inn.'],
      ['[使わない]{家具}を売りました。', 'I sold the furniture I don\'t use.'],
      ['[去年参加した]{ボランティア活動}はとても楽しかったです。', 'The volunteer activity I joined last year was a lot of fun.'],
      ['[外国人がよく行く]{店}を知っていますか。', 'Do you know a shop that foreigners often go to?'],
    ],
    pitfalls: [
      { bad: '姉は描いた絵', good: '姉が描いた絵', note: 'The subject inside the clause takes が' },
      { bad: '描きました絵', good: '描いた絵', note: 'Short form inside the clause' },
      { bad: '描いたの絵', good: '描いた絵', note: 'Nothing between the verb and the noun' },
      { bad: '絵、姉が描いた', good: '姉が描いた絵', note: 'The clause always comes before the noun' },
    ],
  },
}
