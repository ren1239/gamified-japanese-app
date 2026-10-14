// Chapter 19 Grammar — Genki II (出迎え)
// Questions are original practice items; choices[0] is the answer (shuffled by makeQuiz).
import { makeQuiz } from './grammarHelpers.js'

export const ch19HonorificQuiz = makeQuiz({
  id: 'ch19-honorific',
  title: 'Ch.19 · Honorific verbs',
  topic: 'Honorifics (尊敬語)',
  grammarPoint: 'いらっしゃる・召し上がる…',
  description: 'Exalt the actions of people you respect. いる/行く/来る → いらっしゃる, 食べる/飲む → 召し上がる, くれる → くださる, する → なさる, 寝る → お休みになる, 見る → ご覧になる, 言う → おっしゃる, 〜ている → 〜ていらっしゃる. Long forms end in 〜います (いらっしゃいます, おっしゃいます, なさいます, くださいます). Other verbs: お + stem + になる (お待ちになる). Never use them for your own actions.',
}, [
  ['"The professor is in his office."', '先生は研究室に___。', ['いらっしゃいます', 'いらっしゃります', 'おります', 'いらっしゃられます'], 'いる → いらっしゃる → long form いらっしゃいます (not りまず).'],
  ['"Please eat (to a guest)."', 'どうぞ___ください。', ['召し上がって', '召し上がりて', 'いただいて', '食べられて'], '食べる → 召し上がる → 召し上がってください. いただく is humble — for yourself.'],
  ['"What did the manager say?"', '部長は何と___か。', ['おっしゃいました', 'おっしゃりました', '申しました', '言いになりました'], '言う → おっしゃる → おっしゃいました. 申す is humble (for yourself).'],
  ['"Did you see this movie?" (to your teacher)', '先生はこの映画を___か。', ['ご覧になりました', 'ご覧しました', '拝見しました', '見になりました'], '見る → ご覧になる.'],
  ['"The company president gave me a present."', '社長がプレゼントを___。', ['くださいました', 'くださりました', 'さしあげました', 'くれになりました'], 'くれる → くださる → くださいました.'],
  ['"What will you do this weekend?" (to your boss)', '週末は何を___か。', ['なさいます', 'なさります', 'いたします', 'しになります'], 'する → なさる → なさいます.'],
  ['"The manager went to bed early."', '部長は早く___。', ['お休みになりました', 'お寝になりました', '休みになりました', 'お休みしました'], '寝る → お休みになる.'],
  ['Regular verb: "Please wait. / The professor is waiting." Which honorific is correct for 待つ?', '先生がお___になっています。', ['待ち', '待つ', '待って', '待た'], 'お + stem + になる → お待ちになる.'],
  ['"Is your wife (someone else\'s) working?"', '奥様は働いて___か。', ['いらっしゃいます', 'おります', 'いらっしゃります', 'いられます'], '〜ている → 〜ていらっしゃる.'],
  ['Which sentence is WRONG?', null, ['私は毎朝コーヒーを召し上がります。', '先生は毎朝コーヒーを召し上がります。', '社長はもうお休みになりました。', '先生は何とおっしゃいましたか。'], 'Honorific verbs are never used for your own actions.'],
  ['What does this mean?', '部長は出張にいらっしゃいました。', ['The manager went on a business trip.', 'I went on a business trip with the manager.', 'The manager will come back from a trip.', 'The manager said to go on a trip.'], 'いらっしゃる = honorific 行く/来る/いる; context: 出張に → went.'],
  ['Cross-pattern (honorific + んですか): "Where do you live?" (to your teacher, polite)', '先生はどちらに住んで___んですか。', ['いらっしゃる', 'いらっしゃいます', 'おる', 'いらっしゃれる'], 'Before んです use the short form: 住んでいらっしゃるんですか.'],
])

export const ch19AdviceQuiz = makeQuiz({
  id: 'ch19-respectful-advice',
  title: 'Ch.19 · Giving respectful advice',
  topic: 'お〜ください',
  grammarPoint: 'お + stem + ください',
  description: 'Polite instructions/advice to customers or superiors: お + verb stem + ください (お待ちください, お使いください). する-nouns: ご + noun + ください (ご連絡ください). Special honorific verbs use the honorific + てください (召し上がってください) or ご覧ください.',
}, [
  ['"Please wait a moment." (to a customer)', '少々___ください。', ['お待ち', 'お待って', '待ち', 'お待つ'], 'お + stem 待ち + ください.'],
  ['"Please use this pen."', 'このペンを___ください。', ['お使い', 'お使って', 'お使う', 'ご使い'], 'お + 使い + ください.'],
  ['"Please sit down here." (かける = to sit)', 'こちらに___ください。', ['おかけ', 'おかけて', 'ごかけ', 'おかける'], 'かける → stem かけ → おかけください.'],
  ['"Please look at this." (honorific 見る)', 'こちらを___ください。', ['ご覧', 'ご覧して', 'お見', 'お見て'], 'Special form: ご覧ください.'],
  ['"Please contact us." (する-noun)', '___ください。', ['ご連絡', 'お連絡', 'ご連絡して', 'お連絡し'], 'Sino-Japanese する-nouns usually take ご: ご連絡ください.'],
  ['"Please eat." (to your teacher, honorific)', 'どうぞ___。', ['召し上がってください', 'お食べください', 'いただいてください', 'お召しください'], '召し上がる + てください.'],
  ['"Please don\'t hold back." (遠慮する)', 'どうぞご___なく。', ['遠慮', '遠慮して', 'お遠慮', '遠慮しない'], 'Set phrase: ご遠慮なく ("don\'t hesitate").'],
  ['"Please come in." (to a guest)', 'どうぞお___ください。', ['入り', '入って', '入る', '入れ'], 'お + 入り + ください.'],
  ['"Please say hello to your wife for me."', '奥様によろしくお___ください。', ['伝え', '伝えて', '伝える', '伝わり'], 'Set phrase: よろしくお伝えください.'],
  ['Cross-pattern (honorific + advice): "Please get some rest, professor."', '先生、ゆっくり___ください。', ['お休み', 'お休んで', 'お休みして', 'お寝'], 'お休みください = please rest.'],
])

export const ch19TekuretearigatouQuiz = makeQuiz({
  id: 'ch19-tekurete',
  title: 'Ch.19 · 〜てくれてありがとう',
  topic: 'Thanks',
  grammarPoint: '〜てくれてありがとう',
  description: 'Thank someone for a specific action: て-form + くれてありがとう. More polite: 〜てくださってありがとうございました (for superiors).',
}, [
  ['"Thanks for helping me."', '___ありがとう。', ['手伝ってくれて', '手伝ってあげて', '手伝ってもらって', '手伝いくれて'], 'て-form + くれて + ありがとう.'],
  ['"Thanks for inviting me."', '___くれてありがとう。', ['招待して', '招待した', '招待しって', '招待すて'], '招待する → 招待して + くれて.'],
  ['To your professor: "Thank you for writing a letter of recommendation."', '推薦状を書いて___ありがとうございました。', ['くださって', 'くれて', 'いただいて', 'あげて'], 'Polite: 〜てくださってありがとうございました.'],
  ['"Thanks for walking me home."', 'うちまで送って___ありがとう。', ['くれて', 'あげて', 'もらって', 'くださいて'], '送る (walk/drive someone) → 送って + くれて.'],
  ['"Thank you for treating me (to a meal)."', 'ごちそうして___ありがとうございました。', ['くださって', 'くださいて', 'くださりて', 'さしあげて'], 'くださる → て-form くださって.'],
  ['What does this mean?', '待っていてくれてありがとう。', ['Thanks for waiting for me.', 'Thanks, I\'ll wait for you.', 'Please wait for me.', 'I waited for you, you\'re welcome.'], '待っていて (were waiting) + くれて.'],
  ['"Thanks for calling me."', '電話して___ありがとう。', ['くれて', 'くれた', 'くれると', 'くれって'], 'くれる → て-form くれて.'],
  ['"Thanks for coming to pick me up."', '迎えに___くれてありがとう。', ['来て', '来た', '来る', '来って'], '来る → 来て.'],
  ['"Thanks for lending me the umbrella."', '傘を___くれてありがとう。', ['貸して', '借りて', '貸した', '貸すて'], '貸す (lend) → 貸して. 借りる = borrow.'],
  ['Cross-pattern (くださる + polite thanks): "Thank you for coming all this way." (to a guest)', '遠いところ、来て___ありがとうございました。', ['くださって', 'くれって', 'いただきて', 'くださいて'], 'Honorific thanks: 来てくださって.'],
])

export const ch19TeyokattaQuiz = makeQuiz({
  id: 'ch19-teyokatta',
  title: 'Ch.19 · 〜てよかったです',
  topic: 'Relief',
  grammarPoint: '〜てよかったです',
  description: '"I\'m glad that…": て-form + よかったです. Negative: 〜なくてよかったです ("I\'m glad I didn\'t…"). Compare 〜ばよかった (Ch.18 regret: "I should have…").',
}, [
  ['"I\'m glad I came to Japan."', '日本に___よかったです。', ['来て', '来た', '来れば', '来る'], 'て-form + よかったです.'],
  ['"I\'m glad I didn\'t miss the train."', '電車に___よかったです。', ['乗り遅れなくて', '乗り遅れないで', '乗り遅れなければ', '乗り遅れて'], 'Negative: 〜なくてよかった.'],
  ['Which one expresses relief (not regret)?', null, ['この大学を選んでよかったです。', 'この大学を選べばよかったです。', 'この大学を選ばなければよかったです。', 'この大学を選んだらどうですか。'], '〜てよかった = glad; 〜ばよかった = should have.'],
  ['"I\'m glad I got to know you."', 'あなたと___よかったです。', ['知り合えて', '知り合えるて', '知り合えば', '知り合った'], 'Potential 知り合える → て-form 知り合えて.'],
  ['"I\'m glad it cleared up."', '___よかったです。', ['晴れて', '晴れた', '晴れれば', '晴れる'], '晴れる → 晴れて.'],
  ['What does this mean?', '道に迷わなくてよかったです。', ['I\'m glad I didn\'t get lost.', 'I should have gotten lost.', 'I\'m glad I got lost.', 'I didn\'t want to get lost.'], '〜なくてよかった = glad that didn\'t happen.'],
  ['"I\'m glad I talked with the professor."', '先生と話を___よかったです。', ['して', 'した', 'すれば', 'しって'], 'する → して.'],
  ['"I\'m glad it wasn\'t a big deal (wasn\'t serious)."', '病気が重く___よかったです。', ['なくて', 'ないで', 'なければ', 'なかった'], 'い-adj negative 重くない → 重くなくて.'],
  ['"I\'m glad I didn\'t get angry."', '___よかったです。', ['怒らなくて', '怒らないで', '怒りなくて', '怒れなくて'], '怒る → 怒らない → 怒らなくて.'],
  ['Cross-pattern (contrast with ばよかった): "I should have moved earlier… but I\'m glad I moved."', 'もっと早く引っ越せばよかった。でも、___よかったです。', ['引っ越して', '引っ越せば', '引っ越さなくて', '引っ越した'], 'Glad = て-form + よかった.'],
])

export const ch19HazuQuiz = makeQuiz({
  id: 'ch19-hazu',
  title: 'Ch.19 · 〜はずです',
  topic: 'Expectation',
  grammarPoint: '〜はずです',
  description: '"Supposed to / should be" (based on what you know): short form + はずです. い-adj + はず, な-adj + なはず, noun + のはず. Negative: 〜ないはずです. Past: 〜はずでした = "was supposed to (but didn\'t)".',
}, [
  ['"The manager should be in the office today."', '部長は今日会社に___はずです。', ['いる', 'います', 'いて', 'いるの'], 'Short form + はずです.'],
  ['な-adjective: "He should be serious (diligent)."', '彼はまじめ___はずです。', ['な', 'だ', 'の', 'で'], 'な-adj + な + はず.'],
  ['Noun: "That person should be a junior high student."', 'あの人は中学生___はずです。', ['の', 'な', 'だ', 'が'], 'Noun + の + はず.'],
  ['い-adjective: "That restaurant should be good."', 'あのレストランはおいしい___。', ['はずです', 'なはずです', 'のはずです', 'だはずです'], 'い-adj + はず directly.'],
  ['Negative: "The class shouldn\'t be cancelled."', '授業は休講じゃない___。', ['はずです', 'なはずです', 'だはずです', 'のはずでした'], 'Negative short form + はずです.'],
  ['"The meeting was supposed to start at three (but didn\'t)."', '会議は三時に始まる___。', ['はずでした', 'はずです', 'はずだったでした', 'そうでした'], 'はずでした = was supposed to.'],
  ['What does this mean?', 'メールを送ったから、もう知っているはずです。', ['I sent an email, so they should know already.', 'I sent an email, but they don\'t know.', 'They must not know.', 'They said they know.'], 'はず = logical expectation.'],
  ['"The train should come soon."', '電車はもうすぐ___はずです。', ['来る', '来ます', '来るの', '来て'], 'Dictionary form + はず.'],
  ['"It was supposed to be sunny, but it rained."', '晴れる___でしたが、雨が降りました。', ['はず', 'そう', 'みたい', 'かもしれない'], 'はずでした + が.'],
  ['Cross-pattern (はず + honorific): "The professor should be in Tokyo now."', '先生は今東京に___はずです。', ['いらっしゃる', 'いらっしゃいます', 'おる', 'いらっしゃって'], 'Short honorific form before はず.'],
])

export const ch19ReviewQuiz = makeQuiz({
  id: 'ch19-review',
  title: 'Ch.19 · Chapter review',
  topic: 'Review',
  grammarPoint: 'Lesson 19 まとめ',
  description: 'Mixed practice: honorific verbs, お〜ください, 〜てくれてありがとう, 〜てよかった, 〜はずです.',
}, [
  ['"Will the president come to the party?"', '社長はパーティーに___か。', ['いらっしゃいます', 'まいります', 'いらっしゃります', '来られになります'], 'Honorific 来る → いらっしゃる.'],
  ['"Please write your name here." (to a customer)', 'こちらにお名前をお___ください。', ['書き', '書いて', '書く', '書け'], 'お + stem + ください.'],
  ['"Thanks for calling my name."', '名前を呼んで___ありがとう。', ['くれて', 'あげて', 'もらって', 'くれた'], '〜てくれてありがとう.'],
  ['"I\'m glad I didn\'t give up."', 'あきらめ___よかったです。', ['なくて', 'ないで', 'なければ', 'なかった'], 'Negative て + よかった.'],
  ['"He should be stopping by on his way."', '彼は帰りに寄る___。', ['はずです', 'のはずです', 'なはずです', 'だはずです'], 'Short form + はずです.'],
  ['"What did your teacher say?"', '先生は何と___か。', ['おっしゃいました', 'もうしました', 'おっしゃりました', '言いになりました'], 'Honorific 言う → おっしゃる.'],
  ['"The manager has already gone to bed."', '部長はもう___。', ['お休みになりました', 'お寝になりました', 'お休みしました', '休まれになりました'], '寝る → お休みになる.'],
  ['"Please wait in this room."', 'この部屋でお___ください。', ['待ち', '待って', '待つ', '待た'], 'お待ちください.'],
  ['"Your child is a junior high student, right?"', '___は中学生ですよね。', ['お子さん', 'お子供', 'お子様さん', 'うちの子'], 'Polite for someone else\'s child: お子さん.'],
  ['"I\'m glad we\'re on good terms."', '仲が___よかったです。', ['よくて', 'いくて', 'よかって', 'いいで'], 'いい → よくて.'],
])
