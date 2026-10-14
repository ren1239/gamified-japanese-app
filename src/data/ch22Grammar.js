// Chapter 22 Grammar — Genki II (日本の教育)
// Questions are original practice items; choices[0] is the answer (shuffled by makeQuiz).
import { makeQuiz } from './grammarHelpers.js'

export const ch22CausativeQuiz = makeQuiz({
  id: 'ch22-causative',
  title: 'Ch.22 · Causative sentences',
  topic: 'Make / let',
  grammarPoint: '〜させる',
  description: 'Make or let someone do something: (director) は (cast) に (causative verb). Ru-verbs: drop る + させる (食べさせる). U-verbs: -u → -aseru (行かせる, 買わせる). する → させる, くる → こさせる. Whether it means "make" or "let" depends on context.',
}, [
  ['"The teacher made the students memorize the dialogue."', '先生は学生に会話を___。', ['覚えさせました', '覚えられました', '覚えらせました', '覚えさました'], 'Ru-verb: 覚える → 覚えさせる.'],
  ['"My mother made me clean my room."', '母は私に部屋を掃除___。', ['させました', 'されました', 'しさせました', 'させられました'], 'する → させる.'],
  ['"My parents let me study in Europe."', '両親は私にヨーロッパで勉強___くれました。', ['させて', 'されて', 'して', 'させられて'], 'Causative + てくれる = kindly let me.'],
  ['U-verb: "The coach made us run."', 'コーチは私たちを___。', ['走らせました', '走られました', '走りさせました', '走さませました'], '走る (u-verb) → 走らせる.'],
  ['"The manager made his subordinate make copies."', '部長は部下にコピーを___。', ['取らせました', '取られました', '取りさせました', '取させました'], '取る (u-verb) → 取らせる.'],
  ['U-verb ending in う: "My parents made me buy it myself."', '両親は私に自分で___。', ['買わせました', '買あせました', '買いさせました', '買させました'], 'う-ending verbs use わ: 買う → 買わせる.'],
  ['くる: "The teacher made me come to school on Saturday."', '先生は私を土曜日に学校に___。', ['来させました', '来られました', '来らせました', '来さました'], 'くる → こさせる.'],
  ['What does this mean?', '子供に野菜を食べさせます。', ['I make (or let) my child eat vegetables.', 'My child makes me eat vegetables.', 'I am made to eat vegetables.', 'My child can eat vegetables.'], 'Causative: director makes/lets cast do.'],
  ['"Please let me carry it." (causative + てください)', '私に___ください。', ['運ばせて', '運ばれて', '運んで', '運びさせて'], '運ぶ → 運ばせる → 運ばせてください.'],
  ['"Don\'t make your mother worry."', 'お母さんを___ください。', ['心配させないで', '心配されないで', '心配させるないで', '心配させなくて'], 'Causative negative + ないでください.'],
  ['"The teacher made the students translate the documents."', '先生は学生に書類を___。', ['翻訳させました', '翻訳されました', '翻訳しさせました', '翻訳させられました'], '翻訳する → 翻訳させる.'],
  ['Cross-pattern (causative + たい): "I want to let my children play freely."', '子供に自由に___たいです。', ['遊ばせ', '遊ばれ', '遊び', '遊ばさ'], '遊ぶ → 遊ばせる → stem 遊ばせ + たい.'],
])

export const ch22CausativeGivingQuiz = makeQuiz({
  id: 'ch22-causative-giving',
  title: 'Ch.22 · Causative + あげる／くれる／もらう',
  topic: 'Let me…',
  grammarPoint: '〜させてあげる／くれる／もらう',
  description: 'Causative + てあげる: let someone do as a favor. Causative + てくれる: someone lets me. Causative + てもらう: I get permission to do. Requests: 〜させてください / 〜させてくれませんか / 〜させていただけませんか ("please let me…").',
}, [
  ['"Please let me do it." (polite request)', 'その仕事、私に___。', ['やらせてください', 'やってください', 'やられてください', 'やらさせてください'], 'Causative + てください = please let me.'],
  ['"My father let me drive his car."', '父は車を運転___くれました。', ['させて', 'して', 'されて', 'させられて'], 'Causative + てくれる.'],
  ['"I let my little sister use my computer."', '妹にパソコンを___あげました。', ['使わせて', '使って', '使われて', '使いさせて'], 'Causative + てあげる.'],
  ['"I was allowed to take a day off by my boss."', '上司に休ませて___。', ['もらいました', 'くれました', 'あげました', 'させました'], 'Causative + てもらう = got permission.'],
  ['Most polite: "Could you please let me go home early?"', '早く___いただけませんか。', ['帰らせて', '帰って', '帰られて', '帰りさせて'], '帰る → 帰らせる → 帰らせていただけませんか.'],
  ['What does this mean?', '一人暮らしをさせてください。', ['Please let me live by myself.', 'Please live by yourself.', 'I was made to live alone.', 'I want to live with you.'], 'させてください = let me.'],
  ['"Let me think about it a little."', '少し___ください。', ['考えさせて', '考えて', '考えられて', '考えさせられて'], '考える → 考えさせる → させてください.'],
  ['"My parents wouldn\'t let me go abroad."', '両親は外国に___くれませんでした。', ['行かせて', '行って', '行かれて', '行きさせて'], 'Causative + てくれない = wouldn\'t let me.'],
  ['"Let me introduce myself." (polite)', '自己紹介___ください。', ['させて', 'して', 'されて', 'しさせて'], 'する → させて.'],
  ['Cross-pattern (causative + てもらいたい): "I want to be allowed to join the project."', 'プロジェクトに参加___もらいたいです。', ['させて', 'して', 'されて', 'させられて'], 'Causative + てもらう + たい.'],
])

export const ch22NasaiQuiz = makeQuiz({
  id: 'ch22-nasai',
  title: 'Ch.22 · Verb stem + なさい',
  topic: 'Commands',
  grammarPoint: 'Stem + なさい',
  description: 'Commands from parents/teachers to children or juniors: verb stem + なさい (早く寝なさい, 宿題をしなさい). Common on exam instructions too (答えなさい).',
}, [
  ['Parent to child: "Go to bed early!"', '早く___。', ['寝なさい', '寝るなさい', '寝てなさい', '寝ないなさい'], 'Stem 寝 + なさい.'],
  ['"Do your homework!"', '宿題を___。', ['しなさい', 'するなさい', 'してなさい', 'さなさい'], 'する → stem し + なさい.'],
  ['"Eat your vegetables!"', '野菜を___。', ['食べなさい', '食べるなさい', '食べってなさい', '食べさない'], '食べる → 食べ + なさい.'],
  ['Exam instruction: "Answer the following questions."', '次の質問に___。', ['答えなさい', '答えるなさい', '答えてなさい', '答なさい'], '答える → 答え + なさい.'],
  ['"Study more!"', 'もっと___。', ['勉強しなさい', '勉強するなさい', '勉強してなさい', '勉強しなさいよう'], 'する verbs → しなさい.'],
  ['Who would normally say 〜なさい?', null, ['A parent to a child', 'An employee to a boss', 'A student to a teacher', 'A customer to a clerk'], 'なさい is used from someone in authority.'],
  ['"Come here!"', 'ここに___。', ['来なさい', '来るなさい', '来てなさい', 'こらなさい'], 'くる → stem き + なさい (来なさい = きなさい).'],
  ['"Prepare for the lesson!"', '予習を___。', ['しなさい', 'しなさる', 'するなさい', 'すなさい'], 'する → しなさい.'],
  ['"Help your little sister!"', '妹を___。', ['助けなさい', '助かりなさい', '助けるなさい', '助けてなさい'], '助ける (transitive) → 助け + なさい.'],
  ['Cross-pattern (なさい + 前に): "Wash your hands before eating."', '食べる前に、手を___。', ['洗いなさい', '洗うなさい', '洗ってなさい', '洗わなさい'], '洗う → 洗い + なさい.'],
])

export const ch22BaQuiz = makeQuiz({
  id: 'ch22-ba',
  title: 'Ch.22 · 〜ば',
  topic: 'Conditional',
  grammarPoint: '〜ば',
  description: '"If X, then (good result) Y": ば-form. U-verbs: -u → -eba (行けば). Ru-verbs: drop る + れば (食べれば). する → すれば, くる → くれば. い-adj: drop い + ければ (安ければ). Negative: 〜なければ. Often used when X is a condition for a desirable outcome.',
}, [
  ['"If you practice, you\'ll be able to win."', '練習___、勝てますよ。', ['すれば', 'しれば', 'するば', 'せば'], 'する → すれば.'],
  ['U-verb: "If you hurry, you\'ll make it in time."', '___、間に合います。', ['急げば', '急ぐば', '急ぎば', '急がば'], '急ぐ → ぐ → げ + ば.'],
  ['Ru-verb: "If you take the test, you\'ll get a license."', '試験を___、免許がもらえます。', ['受ければ', '受けば', '受けるば', '受けられば'], '受ける → 受けれ + ば.'],
  ['い-adj: "If it\'s cheap, I\'ll buy it."', '___、買います。', ['安ければ', '安いば', '安くば', '安いれば'], '安い → 安けれ + ば.'],
  ['Negative: "If you don\'t study, you\'ll fail."', '勉強し___、失敗しますよ。', ['なければ', 'ないば', 'なけば', 'なかれば'], 'ない → なければ.'],
  ['What does this mean?', '先輩に聞けば、わかりますよ。', ['If you ask your senior, you\'ll understand.', 'Because I asked my senior, I understood.', 'Even if you ask, you won\'t understand.', 'Please ask your senior.'], 'ば = if (condition for a good result).'],
  ['くる: "If you come early, you can get a good seat."', '早く___、いい席に座れます。', ['来れば', '来るば', '来ば', '来られば'], 'くる → くれば.'],
  ['"If the wind blows, it gets cooler."', '風が___、涼しくなります。', ['吹けば', '吹くば', '吹きば', '吹かば'], '吹く → 吹け + ば.'],
  ['いい: "If the weather is good, let\'s go to the park."', '天気が___、公園に行こう。', ['よければ', 'いければ', 'いいば', 'よいれば'], 'いい → よければ.'],
  ['Cross-pattern (ば + potential): "If you can speak English fluently, you can get a job."', '英語がぺらぺら話せ___、仕事が見つかります。', ['れば', 'ば', 'るば', 'られば'], 'Potential 話せる (ru-verb pattern) → 話せれば.'],
])

export const ch22NoniQuiz = makeQuiz({
  id: 'ch22-noni',
  title: 'Ch.22 · 〜のに',
  topic: 'Even though',
  grammarPoint: '〜のに',
  description: '"Even though X, Y" — with a sense of surprise, disappointment, or frustration: short form + のに. な-adj and nouns: なのに (静かなのに, 学生なのに). The Y part is a fact, not a request or plan.',
}, [
  ['"Even though I studied a lot, I failed the test."', 'たくさん___、試験に失敗しました。', ['勉強したのに', '勉強したでのに', '勉強しのに', '勉強したなのに'], 'Short form + のに.'],
  ['な-adj: "Even though it\'s quiet, I can\'t sleep."', '___、寝られません。', ['静かなのに', '静かのに', '静かだのに', '静かいのに'], 'な-adj + な + のに.'],
  ['Noun: "Even though it\'s Sunday, I have to work."', '日曜日___、働かなければいけません。', ['なのに', 'のに', 'だのに', 'でのに'], 'Noun + な + のに.'],
  ['い-adj: "Even though it\'s noisy, my roommate is sleeping."', '___、ルームメイトは寝ています。', ['うるさいのに', 'うるさいなのに', 'うるさくのに', 'うるさのに'], 'い-adj + のに directly.'],
  ['What does this mean?', '約束したのに、彼は来ませんでした。', ['Even though he promised, he didn\'t come.', 'Because he promised, he came.', 'He promised so that he could come.', 'If he promises, he\'ll come.'], 'のに = even though (disappointment).'],
  ['"Even though I didn\'t waste money, I\'m broke."', '無駄遣いしなかった___、お金がありません。', ['のに', 'なのに', 'から', 'ので'], 'Short form + のに.'],
  ['Which sentence is WRONG?', null, ['雨なのに、出かけましょう。', '雨なのに、出かけました。', '雨なのに、試合がありました。', '雨なのに、彼は傘を持っていません。'], 'のに can\'t be followed by a suggestion (〜ましょう).'],
  ['"Even though it\'s a holiday, the store is closed."', '休みな___、店が閉まっています。', ['のに', 'ので', 'から', 'のは'], 'なのに.'],
  ['"Even though I asked many times, he didn\'t help me."', '何度も頼んだ___、手伝ってくれませんでした。', ['のに', 'から', 'ので', 'なのに'], 'Short past + のに.'],
  ['Cross-pattern (のに + causative): "Even though I don\'t want to, my parents make me go to cram school."', '行きたくない___、両親は私を塾に行かせます。', ['のに', 'なのに', 'ので', 'ば'], 'い-adj (たくない) + のに.'],
])

export const ch22NoyouniQuiz = makeQuiz({
  id: 'ch22-noyouni',
  title: 'Ch.22 · 〜のように／〜のような',
  topic: 'Like…',
  grammarPoint: 'Noun のように・のような',
  description: '"Like X": Noun + のような + noun (母のような人 = a person like my mother). Noun + のように + verb/adj (猿のように木に登る = climb a tree like a monkey). Also gives examples: 東京のような大きい町.',
}, [
  ['"a person like my mother"', '母___人', ['のような', 'のように', 'みたいに', 'ように'], 'Before a noun → のような.'],
  ['"He climbed the tree like a monkey."', '彼は猿___木に登りました。', ['のように', 'のような', 'のようの', 'みたいな'], 'Before a verb → のように.'],
  ['"I want to speak Japanese fluently like a Japanese person."', '日本人___ぺらぺら話したいです。', ['のように', 'のような', 'ような', 'みたいな'], 'Modifying a verb (話す) → のように.'],
  ['"a big city like Tokyo"', '東京___大きい町', ['のような', 'ようの', 'ように', 'のようで'], 'Example before a noun → のような.'],
  ['What does this mean?', '神様のような人', ['a person like a god (a saint)', 'a person who believes in God', 'God is a person', 'a person who looks at God'], 'Xのような Y = a Y like X.'],
  ['"It\'s cold like winter today."', '今日は冬___寒いです。', ['のように', 'のような', 'ような', 'のようの'], 'Modifying an adjective → のように.'],
  ['"I want to become a senior like you."', 'あなた___先輩になりたいです。', ['のような', 'のように', 'ようの', 'ようで'], 'Before a noun → のような.'],
  ['Which is correct?', null, ['ボールのように丸い', 'ボールのような丸い', 'ボールように丸い', 'ボールのようで丸いの'], 'Adjective after → のように.'],
  ['"The wind was blowing like a typhoon."', '台風___風が吹いていました。', ['のように', 'のような', 'ように', 'のようの'], 'Verb phrase follows → のように.'],
  ['Cross-pattern (のように + たい): "I want to raise my children like my parents did."', '両親___子供を育てたいです。', ['のように', 'のような', 'のようで', 'ような'], '育てる (verb) → のように.'],
])

export const ch22ReviewQuiz = makeQuiz({
  id: 'ch22-review',
  title: 'Ch.22 · Chapter review',
  topic: 'Review',
  grammarPoint: 'Lesson 22 まとめ',
  description: 'Mixed practice: causative, causative + giving verbs, stem + なさい, 〜ば, 〜のに, 〜のように／のような.',
}, [
  ['"My boss made me stay up all night."', '上司は私に徹夜___。', ['させました', 'されました', 'しさせました', 'させられました'], 'する → させる.'],
  ['"Please let me rest a little."', '少し___ください。', ['休ませて', '休まれて', '休んで', '休みさせて'], '休む → 休ませる.'],
  ['"Clean your room!" (parent to child)', '部屋を片付け___。', ['なさい', 'るなさい', 'てなさい', 'なさる'], 'Stem + なさい.'],
  ['"If you review, you\'ll understand."', '復習___、わかります。', ['すれば', 'しれば', 'するば', 'せば'], 'する → すれば.'],
  ['"Even though I\'m poor, I\'m happy."', '貧乏な___、幸せです。', ['のに', 'ので', 'から', 'ば'], 'な-adj + な + のに.'],
  ['"I want to be a person like you."', 'あなた___人になりたいです。', ['のような', 'のように', 'ように', 'みたいに'], 'Before a noun → のような.'],
  ['"My parents let me live alone."', '両親は一人暮らしを___くれました。', ['させて', 'されて', 'して', 'させられて'], 'Causative + てくれる.'],
  ['"If it isn\'t expensive, I\'ll buy it."', '高く___、買います。', ['なければ', 'ないば', 'なくば', 'ないれば'], 'い-adj negative 高くない → 高くなければ.'],
  ['"Even though I explained it many times, he didn\'t understand."', '何度も説明した___、わかってくれませんでした。', ['のに', 'なのに', 'ので', 'ば'], 'Short past + のに.'],
  ['"The teacher made us write a composition."', '先生は私たちに作文を___。', ['書かせました', '書かれました', '書きさせました', '書かさせました'], '書く → 書かせる.'],
])
