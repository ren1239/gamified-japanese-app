// Chapter 14 Grammar — Genki II (バレンタインデー)
// Questions are original practice items; choices[0] is the answer (shuffled by makeQuiz).
import { makeQuiz } from './grammarHelpers.js'

export const ch14HoshiiQuiz = makeQuiz({
  id: 'ch14-hoshii',
  title: 'Ch.14 · ほしい',
  topic: 'Wanting things',
  grammarPoint: '〜がほしい',
  description: '(私は) X がほしい = "I want X". ほしい is an い-adjective (ほしくない, ほしかった). Mainly for the speaker; for others use ほしいと言っています, ほしいでしょう, or ほしがっている (with を).',
}, [
  ['"I want a new necktie."', '新しいネクタイ___ほしいです。', ['が', 'を', 'に', 'で'], 'The object of ほしい takes が.'],
  ['"When I was a child, I wanted a stuffed animal."', '子供の時、ぬいぐるみがほし___。', ['かったです', 'いでした', 'いかったです', 'くでした'], 'ほしい is an い-adjective: past ほしかったです.'],
  ['"I don\'t want chocolate." (negative)', 'チョコレートは___。', ['ほしくないです', 'ほしいじゃないです', 'ほしいないです', 'ほしなかったです'], 'い-adj negative: ほしくないです. は is common in negatives.'],
  ['How do you say "Do you want a ring?" casually?', null, ['指輪、ほしい？', '指輪、ほしがる？', '指輪、ほしいだ？', '指輪、ほしく？'], 'Casual question: just ほしい with rising intonation.'],
  ['Reporting someone else\'s wish: "My mother says she wants cosmetics."', '母は化粧品がほしい___。', ['と言っています', 'です', 'がります', 'ています'], 'For third persons, quote: ほしいと言っています.'],
  ['"My younger brother wants a new game." (他人 + ほしがる)', '弟は新しいゲーム___ほしがっています。', ['を', 'が', 'に', 'は'], 'ほしがる takes を, unlike ほしい.'],
  ['Which sentence is natural?', null, ['私は新しいシャツがほしいです。', 'メアリーさんは新しいシャツがほしいです。', '私は新しいシャツをほしいです。', '私は新しいシャツがほしがります。'], 'Plain ほしいです is for the speaker; others need と言っています / ほしがっている.'],
  ['"Ami probably doesn\'t want a stuffed animal."', '亜美さんはぬいぐるみがほしくない___。', ['でしょう', 'です', 'がっています', 'と思いました'], 'Guessing about others: ほしくないでしょう.'],
  ['"What do you want for Christmas?"', 'クリスマスに何___ほしいですか。', ['が', 'を', 'に', 'で'], 'Question word + が + ほしい.'],
  ['Cross-pattern (ほしい + し): "I want a scarf — it\'s cold and it\'s stylish."', '寒いし、おしゃれだし、マフラーが___。', ['ほしいです', 'ほしがります', 'ほしだです', 'ほしいでした'], 'Speaker\'s own wish → ほしいです.'],
])

export const ch14KamoshirenaiQuiz = makeQuiz({
  id: 'ch14-kamoshirenai',
  title: 'Ch.14 · 〜かもしれません',
  topic: 'Possibility',
  grammarPoint: '〜かもしれません',
  description: '"Might / maybe": short form + かもしれません (casual かもしれない). Verbs and い-adj attach directly (来るかもしれない, 高いかもしれない). な-adj and nouns drop だ (元気かもしれない, 学生かもしれない). Works with past and negative too.',
}, [
  ['"It might rain tomorrow."', 'あした雨が___かもしれません。', ['降る', '降ります', '降った', '降って'], 'Short (plain) form + かもしれません: 降るかもしれません.'],
  ['な-adjective: "He might be stingy."', '彼は___かもしれません。', ['けち', 'けちだ', 'けちな', 'けちで'], 'Drop だ: けちかもしれません.'],
  ['Noun: "That person might be the landlord."', 'あの人は大家さん___。', ['かもしれません', 'だかもしれません', 'なかもしれません', 'のかもしれません'], 'Noun + かもしれません (no だ).'],
  ['い-adjective negative: "This ring might not be expensive."', 'この指輪は高く___かもしれません。', ['ない', 'なかった', 'ありません', 'なくて'], 'Short negative 高くない + かもしれません.'],
  ['Past: "He might have forgotten."', '彼は忘れた___。', ['かもしれません', 'かもしれませんでした', 'でしたかもしれません', 'かもしれなかったです'], 'The tense goes in the verb before かもしれません: 忘れたかもしれません.'],
  ['"She might not come to the party."', '彼女はパーティーに___かもしれません。', ['来ない', '来ません', '来なく', '来なかったです'], 'Short negative + かもしれません.'],
  ['What does this mean?', 'このシャツは似合わないかもしれません。', ['This shirt might not look good on me.', 'This shirt doesn\'t look good on me.', 'This shirt will definitely look good on me.', 'I want this shirt.'], '似合わない (doesn\'t suit) + かもしれない (might).'],
  ['Casual: "I might give up."', null, ['あきらめるかもしれない。', 'あきらめますかもしれない。', 'あきらめかもしれない。', 'あきらめるだかもしれない。'], 'Casual: かもしれない after the dictionary form.'],
  ['"He might have been busy." (い-adj past)', '彼は忙し___かもしれません。', ['かった', 'いでした', 'いだった', 'くて'], '忙しい → past short 忙しかった + かもしれません.'],
  ['Cross-pattern (かもしれない + ので): "It might snow, so please be careful."', '雪が___、気をつけてください。', ['降るかもしれないので', '降るかもしれないなので', '降りかもしれないので', '降るかもしれなくて'], 'かもしれない ends in い, so it connects directly to ので.'],
])

export const ch14GivingQuiz = makeQuiz({
  id: 'ch14-giving',
  title: 'Ch.14 · あげる・くれる・もらう',
  topic: 'Giving & receiving',
  grammarPoint: 'あげる／くれる／もらう',
  description: 'あげる: giving away from the speaker\'s side (私は友だちに本をあげる). くれる: someone gives to me/my side (友だちが私に本をくれる). もらう: receiving (私は友だちに/から本をもらう). Viewpoint matters: くれる is only for things coming toward you.',
}, [
  ['"I gave my father a necktie."', '私は父にネクタイを___。', ['あげました', 'くれました', 'もらいました', 'あげてもらいました'], 'Speaker gives → あげる.'],
  ['"My friend gave me a scarf."', '友だちが私にマフラーを___。', ['くれました', 'あげました', 'もらいました', 'くださいました'], 'Someone gives to me → くれる. (くださいました would be honorific and not for a friend.)'],
  ['"I received chocolate from Takeshi."', '私はたけしさん___チョコレートをもらいました。', ['に', 'を', 'が', 'で'], 'もらう: the giver takes に (or から).'],
  ['"Takeshi gave Mary a stuffed animal." (neither is me)', 'たけしさんはメアリーさんにぬいぐるみを___。', ['あげました', 'くれました', 'もらわれました', 'くれさせました'], 'Third person → third person: あげる.'],
  ['"The landlord gave us mandarin oranges."', '大家さんが私たちにみかんを___。', ['くれました', 'あげました', 'もらいました', 'あげられました'], '私たち is the speaker\'s side, so giving toward it → くれる.'],
  ['"Who gave you that ring?"', 'その指輪はだれが___んですか。', ['くれた', 'あげた', 'もらった', 'くれられた'], 'Someone gave it to "you" (the listener, on my side in conversation) → くれた.'],
  ['"I received a return gift (お返し) on White Day."', 'ホワイトデーにお返しを___。', ['もらいました', 'くれました', 'あげさせました', 'あげられました'], 'The speaker receives → もらう.'],
  ['Which sentence is wrong?', null, ['私は友だちにお皿をくれました。', '友だちが私にお皿をくれました。', '私は友だちにお皿をあげました。', '私は友だちにお皿をもらいました。'], 'くれる never has 私 as the giver.'],
  ['What does this mean?', '両親が時計をくれました。', ['My parents gave me a watch.', 'I gave my parents a watch.', 'My parents received a watch.', 'I received a watch for my parents.'], 'くれる = given toward the speaker.'],
  ['Cross-pattern (もらう + たい): "I want to receive a letter from my boyfriend."', '彼から手紙を___。', ['もらいたいです', 'くれたいです', 'あげたいです', 'もらってたいです'], 'もらう → stem もらい + たい.'],
])

export const ch14TaradoudesuQuiz = makeQuiz({
  id: 'ch14-taradoudesuka',
  title: 'Ch.14 · 〜たらどうですか',
  topic: 'Suggestions',
  grammarPoint: '〜たらどうですか',
  description: 'Give advice: short past (た-form) + らどうですか ("why don\'t you…?"). Casual: 〜たら？ It can sound pushy, so don\'t use it with superiors. Negative advice (〜なかったら) is not normally used.',
}, [
  ['"Why don\'t you consult your teacher?"', '先生に___どうですか。', ['相談したら', '相談するたら', '相談して', '相談しったら'], 'する → した + ら → 相談したら.'],
  ['"Why don\'t you give up?"', 'もう___どうですか。', ['あきらめたら', 'あきらめるたら', 'あきらめて', 'あきらめったら'], 'Ru-verb: あきらめる → あきらめた + ら.'],
  ['"Why don\'t you send her a present?"', 'プレゼントを___どうですか。', ['送ったら', '送りたら', '送るたら', '送んだら'], 'U-verb 送る → 送った + ら.'],
  ['"Why don\'t you write your résumé today?"', 'きょう履歴書を___どうですか。', ['書いたら', '書きたら', '書くたら', '書ったら'], '書く → 書いた + ら.'],
  ['Casual advice to a friend: "Why don\'t you propose?"', null, ['プロポーズしたら？', 'プロポーズするたら？', 'プロポーズしてたら？', 'プロポーズしましたら？'], 'Casual: 〜たら？ with rising intonation.'],
  ['"Why don\'t you take medicine?"', '薬を___どうですか。', ['飲んだら', '飲みたら', '飲むたら', '飲ったら'], '飲む → 飲んだ + ら.'],
  ['Who should you NOT say 〜たらどうですか to?', null, ['Your boss or professor', 'Your close friend', 'Your younger sibling', 'Your classmate'], 'It can sound like unsolicited advice, so avoid it with superiors.'],
  ['"Why don\'t you go to bed early?"', '早く___どうですか。', ['寝たら', '寝るたら', '寝ったら', '寝んだら'], '寝る (ru-verb) → 寝た + ら.'],
  ['What does this mean?', '大家さんに話したらどうですか。', ['Why don\'t you talk to your landlord?', 'If you talk to the landlord, what happens?', 'You talked to the landlord, didn\'t you?', 'The landlord talked to you.'], '話す → 話した + らどうですか = suggestion.'],
  ['Cross-pattern (たらどうですか + てみる): "Why don\'t you try wearing this sweater?"', 'このセーターを着て___どうですか。', ['みたら', 'みるたら', 'みって', 'みたって'], 'てみる → てみた + ら → 着てみたらどうですか.'],
])

export const ch14NumberMoShikaQuiz = makeQuiz({
  id: 'ch14-mo-shika',
  title: 'Ch.14 · Number + も／しか',
  topic: 'Quantity',
  grammarPoint: '数 + も ／ 数 + しか〜ない',
  description: 'Number + も = "as many as" (more than expected). Number + しか + negative = "only" (less than expected). Counters: 〜個 (small items), 〜冊 (books), 〜台 (machines), 〜匹 (small animals), 〜本 (long objects).',
}, [
  ['"I ate as many as ten mandarin oranges!"', 'みかんを十個___食べました。', ['も', 'しか', 'だけしか', 'まで'], 'Number + も = "as many as" (surprisingly many).'],
  ['"I only read one book."', '本を一冊___読みませんでした。', ['しか', 'も', 'だけ', 'まで'], 'しか needs a negative verb: 一冊しか読みませんでした.'],
  ['しか must go with which verb form?', 'お金が千円しか___。', ['ありません', 'あります', 'ありました', 'あって'], 'しか always pairs with a negative.'],
  ['Counter for small animals: "I have three cats."', '猫を三___飼っています。', ['匹', '本', '台', '冊'], '匹 (ひき/びき/ぴき) counts small animals: 三匹 (さんびき).'],
  ['Counter for machines/equipment: "There are two computers."', 'パソコンが二___あります。', ['台', '個', '匹', '本'], '台 counts machines and vehicles.'],
  ['Counter for long objects: "I bought five pencils."', '鉛筆を五___買いました。', ['本', '冊', '個', '台'], '本 counts long, thin objects.'],
  ['What does this mean?', '友だちが二人しか来ませんでした。', ['Only two friends came.', 'As many as two friends came.', 'Two friends didn\'t come.', 'No friends came.'], '二人しか〜ない = only two.'],
  ['"He has as many as five rings!"', '彼女は指輪を五個___持っています。', ['も', 'しか', 'に', 'を'], 'も after a number shows "that many!".'],
  ['Which sentence is correct?', null, ['ネクタイを一本しか持っていません。', 'ネクタイを一本しか持っています。', 'ネクタイを一本もしか持っていません。', 'ネクタイしか一本持っていません。'], 'Number + しか + negative.'],
  ['Cross-pattern (しか + potential): "I can only eat one."', '一個___。', ['しか食べられません', 'しか食べられます', 'も食べられません', 'しか食べません'], 'Potential (食べられる) + しか〜ない.'],
])

export const ch14ReviewQuiz = makeQuiz({
  id: 'ch14-review',
  title: 'Ch.14 · Chapter review',
  topic: 'Review',
  grammarPoint: 'Lesson 14 まとめ',
  description: 'Mixed practice: ほしい, かもしれません, あげる／くれる／もらう, 〜たらどうですか, number + も／しか.',
}, [
  ['"I want a sweatshirt."', 'トレーナーが___。', ['ほしいです', 'ほしがります', 'ほしだです', 'ほしいでした'], 'Speaker\'s wish → ほしいです.'],
  ['"My friend gave me a plate."', '友だちがお皿を___。', ['くれました', 'あげました', 'もらいました', 'あげられました'], 'Toward me → くれる.'],
  ['"It might be a little difficult."', 'ちょっと難しい___。', ['かもしれません', 'だかもしれません', 'くかもしれません', 'のかもしれました'], 'い-adj + かもしれません.'],
  ['"Why don\'t you ask the landlord?"', '大家さんに___どうですか。', ['聞いたら', '聞きたら', '聞くたら', '聞ったら'], '聞く → 聞いた + ら.'],
  ['"I only have two shirts."', 'シャツが二枚___ありません。', ['しか', 'も', 'だけ', 'まで'], 'しか + negative.'],
  ['"I received chocolate from my coworker."', '同僚___チョコレートをもらいました。', ['から', 'が', 'を', 'で'], 'もらう: giver + に or から.'],
  ['"I gave my mother flowers."', '母に花を___。', ['あげました', 'くれました', 'もらいました', 'くださいました'], 'From me → あげる.'],
  ['"He might not like it." (な-adj)', '彼は好きじゃない___。', ['かもしれません', 'だかもしれません', 'のかもしれました', 'でかもしれません'], 'Short negative + かもしれません.'],
  ['"I drank as many as five cups of coffee."', 'コーヒーを五杯___飲みました。', ['も', 'しか', 'で', 'だけしか'], 'Number + も = as many as.'],
  ['"Mary says she wants a new phone."', 'メアリーさんは新しいスマホがほしい___。', ['と言っています', 'です', 'ます', 'でした'], 'Report others\' wishes with と言っています.'],
])
