// Chapter 18 Grammar — Genki II (ジョンさんのアルバイト)
// Questions are original practice items; choices[0] is the answer (shuffled by makeQuiz).
import { makeQuiz } from './grammarHelpers.js'

export const ch18TransitivityQuiz = makeQuiz({
  id: 'ch18-transitivity',
  title: 'Ch.18 · Transitivity pairs',
  topic: 'Transitive / intransitive',
  grammarPoint: '開ける／開く',
  description: 'Transitive verbs: someone acts on a thing (Xを開ける). Intransitive verbs: the thing changes by itself (Xが開く). Pairs: 開ける/開く, 閉める/閉まる, 入れる/入る, 出す/出る, つける/つく, 消す/消える, 壊す/壊れる, 汚す/汚れる, 落とす/落ちる, 沸かす/沸く.',
}, [
  ['"I opened the curtain." (someone acts on it)', 'カーテンを___。', ['開けました', '開きました', '開かれました', '開いました'], 'を + transitive 開ける.'],
  ['"The door opened." (by itself)', 'ドアが___。', ['開きました', '開けました', '開けられました', '開いてました'], 'が + intransitive 開く.'],
  ['"Takeshi turned on the light."', 'たけしさんが電気を___。', ['つけました', 'つきました', 'ついてました', 'つかせました'], 'Transitive つける (をつける).'],
  ['"The light came on."', '電気が___。', ['つきました', 'つけました', 'つけてました', 'ついられました'], 'Intransitive つく.'],
  ['"I broke my phone." (I did it)', '携帯を___。', ['壊しました', '壊れました', '壊れさせました', '壊いました'], 'Transitive 壊す.'],
  ['"The refrigerator broke."', '冷蔵庫が___。', ['壊れました', '壊しました', '壊されました', '壊りました'], 'Intransitive 壊れる.'],
  ['"The candle went out."', 'ろうそくが___。', ['消えました', '消しました', '消されました', '消かれました'], 'Intransitive 消える (transitive: 消す).'],
  ['"I dropped my wallet."', '財布を___。', ['落としました', '落ちました', '落ちさせました', '落といました'], 'Transitive 落とす; intransitive 落ちる.'],
  ['"The water boiled."', 'お湯が___。', ['沸きました', '沸かしました', '沸かれました', '沸けました'], 'Intransitive 沸く; transitive 沸かす.'],
  ['Which particle goes with an intransitive verb?', 'シャツ___汚れました。', ['が', 'を', 'に', 'で'], 'Intransitive verbs take が for the thing that changes.'],
  ['"I put the bananas in the fridge."', 'バナナを冷蔵庫に___。', ['入れました', '入りました', '入られました', '入っていました'], 'Transitive 入れる (put in); intransitive 入る (go in).'],
  ['Cross-pattern (transitive + てください): "Please close the window."', '窓を___ください。', ['閉めて', '閉まって', '閉めって', '閉まりて'], 'Requests act on something → transitive 閉める.'],
])

export const ch18TeiruQuiz = makeQuiz({
  id: 'ch18-intransitive-teiru',
  title: 'Ch.18 · Intransitive + ている',
  topic: 'Resulting state',
  grammarPoint: '〜が〜ている',
  description: 'Intransitive verb + ている describes the state resulting from a change: 窓が開いている (the window is open), 電気がついている (the light is on), シャツが汚れている (the shirt is dirty). Transitive + ている is an ongoing action instead (窓を開けている = someone is opening it).',
}, [
  ['"The window is open." (state)', '窓が___。', ['開いています', '開けています', '開いてあります', '開けます'], 'Intransitive 開く + ている = resulting state.'],
  ['"The light is on."', '電気が___。', ['ついています', 'つけています', 'つきます', 'つかれています'], 'つく + ている.'],
  ['"The towel is dirty."', 'タオルが___。', ['汚れています', '汚しています', '汚れます', '汚くしています'], '汚れる + ている = is dirty.'],
  ['What does this mean?', '冷蔵庫が壊れています。', ['The refrigerator is broken.', 'Someone is breaking the refrigerator.', 'The refrigerator will break.', 'I broke the refrigerator.'], 'Intransitive + ている = state.'],
  ['What does this mean?', 'たけしさんが窓を開けています。', ['Takeshi is (in the middle of) opening the window.', 'The window is open.', 'Takeshi opened the window yesterday.', 'Takeshi wants to open the window.'], 'Transitive + ている = ongoing action.'],
  ['"The store is closed."', '店が___。', ['閉まっています', '閉めています', '閉まります', '閉まれています'], '閉まる + ている.'],
  ['"There\'s money on the floor (it has fallen)."', 'お金が___。', ['落ちています', '落としています', '落ちます', '落とされています'], '落ちる + ている = has fallen and is there.'],
  ['"The cherry blossoms are in bloom."', '桜が___。', ['咲いています', '咲きます', '咲かれています', '咲けています'], '咲く + ている = in bloom.'],
  ['"The TV is off (the power has gone off)."', 'テレビが___。', ['消えています', '消しています', '消えます', '消されます'], '消える + ている.'],
  ['Cross-pattern (state + から): "The water is boiling, so let\'s make tea."', 'お湯が___から、お茶をいれましょう。', ['沸いている', '沸かしている', '沸く', '沸かれている'], '沸く + ている.'],
])

export const ch18TeshimauQuiz = makeQuiz({
  id: 'ch18-teshimau',
  title: 'Ch.18 · 〜てしまう',
  topic: 'Completion / regret',
  grammarPoint: '〜てしまう',
  description: 'て-form + しまう: (1) do something completely (宿題をしてしまう), (2) something regrettable happened (財布を落としてしまった). Casual: 〜ちゃう／〜じゃう (食べちゃった, 飲んじゃった).',
}, [
  ['"I (accidentally) dropped my phone."', '携帯を___。', ['落としてしまいました', '落ちてしまいました', '落としてしまります', '落としてしまって'], 'Regret: 落として + しまいました.'],
  ['"I finished all my homework."', '宿題を全部___。', ['してしまいました', 'しってしまいました', 'しましてしまいました', 'するしまいました'], 'Completion: して + しまう.'],
  ['Casual form of 食べてしまった', null, ['食べちゃった', '食べじゃった', '食べしゃった', '食べてちゃった'], '〜てしまった → 〜ちゃった.'],
  ['Casual form of 飲んでしまった', null, ['飲んじゃった', '飲んちゃった', '飲みちゃった', '飲じゃった'], 'With で-forms: 〜でしまった → 〜じゃった.'],
  ['"I fell down in front of everyone. (embarrassing)"', 'みんなの前で___。', ['転んでしまいました', '転びてしまいました', '転ってしまいました', '転んでしまいって'], '転ぶ → 転んで + しまいました.'],
  ['What does this mean?', 'ケーキを全部食べてしまいました。', ['I ate the whole cake (and maybe regret it).', 'I didn\'t eat the cake.', 'I want to eat the whole cake.', 'Please eat all the cake.'], 'てしまう = completion and/or regret.'],
  ['"I broke my friend\'s camera."', '友だちのカメラを___。', ['壊してしまいました', '壊れてしまいました', '壊ししまいました', '壊してしまいます'], 'I did it → transitive 壊す + てしまう.'],
  ['"The rent got expensive. (unfortunately)"', '家賃が___。', ['高くなってしまいました', '高いなってしまいました', '高くしまいました', '高くなりしまいました'], 'い-adj + なる → 高くなって + しまいました.'],
  ['"Let\'s tidy up before the guests come." (finish doing)', 'お客さんが来る前に___。', ['片付けてしまおう', '片付けしまおう', '片付けてしまよう', '片付けてしまいろう'], 'しまう → volitional しまおう.'],
  ['Cross-pattern (てしまう + んです): "Actually, I forgot the key."', '実は、かぎを___んです。', ['忘れてしまった', '忘れてしまいました', '忘れてしまうた', '忘れしまった'], 'Short form before んです: 忘れてしまったんです.'],
])

export const ch18ToQuiz = makeQuiz({
  id: 'ch18-to',
  title: 'Ch.18 · 〜と',
  topic: 'Whenever',
  grammarPoint: 'Dictionary form + と',
  description: 'X と Y: "whenever X, Y" / "if X, then (automatically) Y". X is in the present short form. Y is a natural result, not a request, plan, or wish (use たら for those).',
}, [
  ['"When you press this button, the light comes on."', 'このボタンを___と、電気がつきます。', ['押す', '押した', '押して', '押しと'], 'Present short form + と.'],
  ['"When spring comes, the cherry blossoms bloom."', '春に___と、桜が咲きます。', ['なる', 'なった', 'なって', 'なります'], 'Natural consequence → と.'],
  ['"Whenever I drink coffee, I can\'t sleep."', 'コーヒーを___と、寝られません。', ['飲む', '飲んだ', '飲みます', '飲んで'], 'Habitual consequence.'],
  ['Negative: "If I don\'t wear glasses, I can\'t see."', 'めがねを___と、見えません。', ['かけない', 'かけなく', 'かけません', 'かけなかった'], 'Short negative + と.'],
  ['Which sentence uses と correctly?', null, ['夏になると、暑くなります。', '日本に行くと、すしを食べたいです。', '暇だと、遊びに来てください。', '卒業すると、就職しようと思っています。'], 'と cannot end with a wish, request, or plan — use たら for those.'],
  ['"When it gets dark, it gets cold."', '___と、寒くなります。', ['暗くなる', '暗いなる', '暗くなった', '暗くなって'], 'い-adj + なる + と.'],
  ['What does this mean?', 'この道をまっすぐ行くと、駅があります。', ['If you go straight down this road, you\'ll find the station.', 'Let\'s go straight to the station.', 'I went straight to the station.', 'Please go straight on this road.'], 'Directions often use と.'],
  ['"Whenever I see that movie, I cry."', 'あの映画を___と、泣いてしまいます。', ['見る', '見た', '見て', '見ます'], 'Present + と + result.'],
  ['"When I eat too much, I feel sick."', '___と、気分が悪くなります。', ['食べすぎる', '食べすぎた', '食べすぎて', '食べすぎます'], 'すぎる (ru-verb) dictionary form + と.'],
  ['Cross-pattern (と + intransitive): "When you open the window, insects come in."', '窓を開けると、虫が___。', ['入ってきます', '入れてきます', '入ってください', '入りましょう'], 'Result is a natural event with intransitive 入る.'],
])

export const ch18NagaraQuiz = makeQuiz({
  id: 'ch18-nagara',
  title: 'Ch.18 · 〜ながら',
  topic: 'While',
  grammarPoint: 'Stem + ながら',
  description: 'Do two things at once: verb stem + ながら + main action. The ながら action is secondary: 音楽を聞きながら勉強する ("study while listening to music"). Both actions are done by the same person.',
}, [
  ['"I study while listening to music."', '音楽を___勉強します。', ['聞きながら', '聞くながら', '聞いてながら', '聞けながら'], 'Stem 聞き + ながら.'],
  ['"Don\'t use your phone while walking."', '___携帯を使わないでください。', ['歩きながら', '歩くながら', '歩いながら', '歩いてながら'], '歩く → 歩き + ながら.'],
  ['"We watched the movie while eating popcorn."', 'ポップコーンを___映画を見ました。', ['食べながら', '食べるながら', '食べてながら', '食べたながら'], 'Ru-verb stem 食べ + ながら.'],
  ['する verbs: "I worked while thinking about it."', 'そのことを___仕事をしました。', ['考えながら', '考えるながら', '考えてながら', '考えりながら'], '考える → 考え + ながら.'],
  ['What does this mean?', '日記を書きながら、ラジオを聞きます。', ['I listen to the radio while writing my diary.', 'I write my diary after listening to the radio.', 'I write my diary instead of listening to the radio.', 'I listen to the radio before writing my diary.'], 'Stem + ながら = while.'],
  ['"Let\'s talk while drinking tea."', 'お茶を___話しましょう。', ['飲みながら', '飲むながら', '飲んでながら', '飲みまながら'], '飲む → 飲み + ながら.'],
  ['"She sings while taking a shower."', 'シャワーを___歌を歌います。', ['浴びながら', '浴びるながら', '浴びてながら', '浴びりながら'], '浴びる → 浴び + ながら.'],
  ['"Don\'t laugh while I\'m apologizing!" — which is grammatical (same subject)?', null, ['笑いながら謝らないでください。', '笑うながら謝らないでください。', '笑ってながら謝らないでください。', '笑いのながら謝らないでください。'], 'Stem 笑い + ながら.'],
  ['"I drove while singing."', '___運転しました。', ['歌いながら', '歌うながら', '歌ってながら', '歌えながら'], '歌う → 歌い + ながら.'],
  ['Cross-pattern (ながら + てしまう): "I fell asleep while watching TV."', 'テレビを___寝てしまいました。', ['見ながら', '見るながら', '見てながら', '見たながら'], '見る → 見 + ながら.'],
])

export const ch18BayokattaQuiz = makeQuiz({
  id: 'ch18-bayokatta',
  title: 'Ch.18 · 〜ばよかったです',
  topic: 'Regret',
  grammarPoint: '〜ばよかったです',
  description: 'Regret about the past: "I should have…". ば-form: u-verbs -u → -eば (行けば), ru-verbs drop る + れば (食べれば), する → すれば, くる → くれば, negative ない → なければ. + よかったです.',
}, [
  ['"I should have studied more."', 'もっと___よかったです。', ['勉強すれば', '勉強しれば', '勉強するば', '勉強せば'], 'する → すれば.'],
  ['"I should have gone to bed early."', '早く___よかったです。', ['寝れば', '寝るば', '寝ば', '寝られば'], 'Ru-verb: 寝る → 寝れば.'],
  ['"I should have bought it."', '___よかったです。', ['買えば', '買わば', '買いば', '買うば'], 'U-verb: 買う → 買えば.'],
  ['Negative: "I shouldn\'t have said that."', 'あんなことを___よかったです。', ['言わなければ', '言わないば', '言いなければ', '言わなくれば'], 'ない → なければ.'],
  ['"I should have taken an umbrella."', '傘を持って___よかったです。', ['いけば', 'いくば', 'いきば', 'いれば'], '持っていく → 持っていけば.'],
  ['"I should have apologized to her."', '彼女に___よかったです。', ['謝れば', '謝るば', '謝りば', '謝られば'], '謝る (u-verb) → 謝れば.'],
  ['What does this mean?', 'もっと早く注文すればよかったです。', ['I should have ordered earlier.', 'It\'s good that I ordered early.', 'If I order early, it will be good.', 'Please order earlier.'], '〜ばよかった = regret.'],
  ['"I shouldn\'t have eaten so much."', 'あんなに___よかったです。', ['食べなければ', '食べないば', '食べなくば', '食べなかったら'], '食べない → 食べなければ.'],
  ['"I should have come yesterday."', 'きのう___よかったです。', ['来れば', '来るば', '来ば', '来られば'], 'くる → くれば.'],
  ['Cross-pattern (てしまう + ばよかった): "I dropped it... I should have been careful."', '落としてしまいました。気を___よかったです。', ['つければ', 'つけるば', 'つけば', 'つかなければ'], 'つける (ru-verb) → つければ.'],
])

export const ch18ReviewQuiz = makeQuiz({
  id: 'ch18-review',
  title: 'Ch.18 · Chapter review',
  topic: 'Review',
  grammarPoint: 'Lesson 18 まとめ',
  description: 'Mixed practice: transitivity pairs, intransitive + ている, 〜てしまう, 〜と, 〜ながら, 〜ばよかった.',
}, [
  ['"The door is closed." (state)', 'ドアが___。', ['閉まっています', '閉めています', '閉まります', '閉めます'], 'Intransitive + ている.'],
  ['"I (accidentally) made my skirt dirty."', 'スカートを___。', ['汚してしまいました', '汚れてしまいました', '汚くてしまいました', '汚しってしまいました'], 'Transitive 汚す + てしまう.'],
  ['"When you press the switch, it turns on."', 'スイッチを押すと、___。', ['つきます', 'つけます', 'つけてください', 'つけましょう'], 'Natural result → intransitive つく.'],
  ['"I made dinner while talking on the phone."', '電話で___晩ご飯を作りました。', ['話しながら', '話すながら', '話してながら', '話しなから'], 'Stem + ながら.'],
  ['"I should have brought an umbrella."', '傘を持ってくれば___。', ['よかったです', 'いいです', 'よかったでした', 'よくないです'], '〜ばよかったです.'],
  ['"I turned off the light."', '電気を___。', ['消しました', '消えました', '消されました', '消しってました'], 'Transitive 消す.'],
  ['"Thanks to you, I was saved."', 'あなたのおかげで、___。', ['助かりました', '助けました', '助かれました', '助けられました'], '助かる = to be saved / helped (intransitive).'],
  ['"The rent must be paid by Friday."', '家賃は金曜日___払わなければいけません。', ['までに', 'まで', 'に', 'から'], 'Deadline = までに.'],
  ['"I fell asleep while reading."', '本を___寝てしまいました。', ['読みながら', '読むながら', '読んでながら', '読めながら'], 'Stem + ながら.'],
  ['"The candle has gone out." (state)', 'ろうそくが___。', ['消えています', '消しています', '消えます', '消せています'], '消える + ている.'],
])
