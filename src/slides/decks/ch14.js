// Slide extras for Ch.14 — format in decks/ch15.js. Markup: [grammar] = vermilion, {noun} = indigo.
export default {
  'ch14-hoshii': {
    equation: {
      parts: [{ cap: 'thing', jp: 'マフラー', kind: 'noun' }, { cap: 'particle', jp: 'が' }, { cap: 'want', jp: 'ほしいです', kind: 'hl' }],
      en: 'I want a scarf.',
    },
    uses: [
      ['[ほしいです]', 'want'],
      ['[ほしくないです]', 'don\'t want'],
      ['[ほしかったです]', 'wanted'],
      ['[ほしくなかったです]', 'didn\'t want'],
      ['ほしいと言っています', 'someone else: says they want'],
      ['買いたいです', 'wanting to DO → 〜たい'],
    ],
    examples: [
      ['クリスマスに新しい{マフラー}が[ほしいです]。', 'I want a new scarf for Christmas.'],
      ['こんなおしゃれな{指輪}が[ほしいです]。', 'I want a stylish ring like this.'],
      ['去年は{ラジオ}が[ほしかったです]が、今はあまり[ほしくないです]。', 'Last year I wanted a radio, but now I don\'t really want one.'],
      ['姉は新しい{化粧品}が[ほしいと言っています]。', 'My older sister says she wants new cosmetics.'],
      ['妹は{ぬいぐるみ}を[ほしがっています]。', 'My little sister wants a stuffed animal.'],
    ],
  },
  'ch14-kamoshirenai': {
    equation: {
      parts: [{ cap: 'short form', jp: '雪が降る' }, { cap: 'might', jp: 'かもしれません', kind: 'hl' }],
      en: 'It might snow.',
    },
    uses: [
      ['来る[かもしれません]', 'verb: might come'],
      ['来ない[かもしれません]', 'negative: might not come'],
      ['忘れた[かもしれません]', 'past: might have forgotten'],
      ['高い[かもしれません]', 'い-adj: might be expensive'],
      ['けち[かもしれません]', 'な-adj: drop だ'],
      ['大家さん[かもしれません]', 'noun: drop だ'],
    ],
    examples: [
      ['あしたは雪が降る[かもしれません]。', 'It might snow tomorrow.'],
      ['このシャツは父に似合わない[かもしれません]。', 'This shirt might not look good on my father.'],
      ['あの人は大家さんの奥さん[かもしれません]。', 'That person might be the landlord\'s wife.'],
      ['たけしくんはもう寝た[かもしれない]。', 'Takeshi might have gone to bed already.'],
      ['急に雨が降る[かもしれない]ので、傘を持っていきます。', 'It might suddenly rain, so I\'ll take an umbrella.'],
    ],
  },
  'ch14-giving': {
    rows: [
      ['あげる', 'I / anyone → others', ['私は友達に本を[あげました]']],
      ['くれる', 'someone → me or my side', ['友達が私に本を[くれました]']],
      ['もらう', 'I receive (from: に or から)', ['私は友達に本を[もらいました]']],
    ],
    uses: [
      ['友達が[妹]に本をくれました', 'my family counts as my side → くれる'],
      ['友達[から]本をもらいました', 'the giver takes に or から'],
    ],
    examples: [
      ['私は父にネクタイを[あげました]。', 'I gave my father a necktie.'],
      ['おばさんが私にマフラーを[くれました]。', 'My aunt gave me a scarf.'],
      ['バレンタインデーに友達からチョコレートを[もらいました]。', 'I got chocolate from a friend on Valentine\'s Day.'],
      ['大家さんが私たちにみかんを[くれました]。', 'The landlord gave us mandarin oranges.'],
      ['ホワイトデーに、たけしくんはメアリーさんにお返しを[あげました]。', 'On White Day, Takeshi gave Mary a return gift.'],
    ],
  },
  'ch14-taradoudesuka': {
    rows: [
      ['う-verbs', 'た-form + ら', [['送る', '送ったら'], ['書く', '書いたら'], ['飲む', '飲んだら'], ['話す', '話したら']]],
      ['る-verbs', 'た-form + ら', [['寝る', '寝たら'], ['着る', '着たら']]],
      ['Irregular', '', [['する', 'したら'], ['くる', 'きたら']]],
    ],
    uses: [
      ['相談し[たらどうですか]。', 'polite: why don\'t you…?'],
      ['相談し[たら]？', 'casual, rising intonation'],
    ],
    examples: [
      ['大家さんに相談し[たらどうですか]。', 'Why don\'t you talk it over with your landlord?'],
      ['寒いから、トレーナーを着[たらどうですか]。', 'It\'s cold, so why don\'t you put on a sweatshirt?'],
      ['そんなにほしいなら、買っ[たら]？', 'If you want it that much, why don\'t you buy it?'],
      ['履歴書をもう一度見てみ[たらどうですか]。', 'Why don\'t you try looking over your résumé once more?'],
      ['彼女が好きなら、プロポーズし[たら]？', 'If you love her, why don\'t you propose?'],
    ],
  },
  'ch14-mo-shika': {
    equation: {
      parts: [{ cap: 'number + counter', jp: '十個', kind: 'noun' }, { cap: 'as many as · only (+ negative)', jp: 'も ／ しか', kind: 'hl' }],
      en: 'as many as ten! / only ten',
    },
    uses: [
      ['みかんを{十個}[も]食べました', 'ate as many as ten'],
      ['本を{一冊}[しか]読み[ませんでした]', 'read only one'],
      ['{〜個}', 'small items'],
      ['{〜冊}', 'books'],
      ['{〜台}', 'machines, cars'],
      ['{〜匹}', 'small animals'],
      ['{〜本}', 'long, thin things'],
    ],
    examples: [
      ['バレンタインデーにチョコレートを{五個}[も]もらいました。', 'I got as many as five chocolates on Valentine\'s Day.'],
      ['この教室にはパソコンが{一台}[しか]あり[ません]。', 'There\'s only one computer in this classroom.'],
      ['大家さんは猫を{四匹}[も]飼っています。', 'The landlord has four cats!'],
      ['きのうは漫画を{一冊}[しか]読み[ませんでした]。', 'Yesterday I read only one comic book.'],
      ['ネクタイを{三本}[しか]持ってい[ません]。', 'I only have three neckties.'],
    ],
  },
}
