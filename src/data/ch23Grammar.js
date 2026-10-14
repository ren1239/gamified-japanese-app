// Chapter 23 Grammar — Genki II (別れ)
// Questions are original practice items; choices[0] is the answer (shuffled by makeQuiz).
import { makeQuiz } from './grammarHelpers.js'

export const ch23CausativePassiveQuiz = makeQuiz({
  id: 'ch23-causative-passive',
  title: 'Ch.23 · Causative-passive',
  topic: 'Made to…',
  grammarPoint: '〜させられる・〜される',
  description: 'Say you were made to do something you didn\'t want to: (victim) は (causer) に (causative-passive). Ru-verbs: させられる (食べさせられる). U-verbs ending in す: させられる (話させられる). Other u-verbs: -u → -asareru (行かされる, 待たされる, 歌わされる). する → させられる, くる → こさせられる.',
}, [
  ['"I was made to eat vegetables (by my mother)."', '私は母に野菜を___。', ['食べさせられました', '食べられさせました', '食べさせました', '食べさされました'], 'Ru-verb: 食べる → 食べさせられる.'],
  ['"I was made to sing (by my friends)."', '友だちに歌を___。', ['歌わされました', '歌われました', '歌わせました', '歌いさせられました'], 'う → わ: 歌う → 歌わされる.'],
  ['"I was made to wait for an hour."', '一時間も___。', ['待たされました', '待たれました', '待たせました', '待ちさせられました'], '待つ → 待たされる.'],
  ['す-ending verb: "I was made to talk in front of everyone."', 'みんなの前で___。', ['話させられました', '話されました', '話さされました', '話しさせられました'], 'Verbs ending in す use させられる: 話させられる.'],
  ['する: "I was made to take care of the dog."', '犬の世話を___。', ['させられました', 'されました', 'させました', 'しさせられました'], 'する → させられる.'],
  ['"I was made to go to cram school by my parents."', '両親に塾に___。', ['行かされました', '行かれました', '行かせました', '行きさせられました'], '行く → 行かされる.'],
  ['くる: "I was made to come to the office on Sunday."', '日曜日に会社に___。', ['来させられました', '来られました', '来させました', '来さされました'], 'くる → こさせられる.'],
  ['What does this mean?', '先輩にお酒を飲まされました。', ['I was made to drink alcohol by my senior.', 'My senior made me buy alcohol.', 'I made my senior drink.', 'My senior drank my alcohol.'], 'Causative-passive: made to do.'],
  ['Who takes に in a causative-passive sentence?', '私はコーチ___走らされました。', ['に', 'が', 'を', 'で'], 'The causer (who forced you) takes に.'],
  ['"I was made to write my name many times."', '名前を何度も___。', ['書かされました', '書かれました', '書かせました', '書きさせられました'], '書く → 書かされる.'],
  ['"I was made to put up with it."', '___。', ['我慢させられました', '我慢されました', '我慢させました', '我慢しされました'], '我慢する → 我慢させられる.'],
  ['Cross-pattern (causative-passive + のに): "Even though I didn\'t want to, I was made to give a speech."', 'したくなかった___、スピーチをさせられました。', ['のに', 'ので', 'ば', 'なのに'], 'Short form + のに; させられる for the forced action.'],
])

export const ch23TemoQuiz = makeQuiz({
  id: 'ch23-temo',
  title: 'Ch.23 · 〜ても',
  topic: 'Even if',
  grammarPoint: '〜ても',
  description: '"Even if X, Y": verb て-form + も (行っても), い-adj → 〜くても (高くても), な-adj/noun → 〜でも (不便でも, 雨でも). Negative: 〜なくても ("even if not").',
}, [
  ['"Even if it rains, I\'ll go."', '雨が___、行きます。', ['降っても', '降るても', '降りても', '降ったでも'], 'て-form + も.'],
  ['い-adj: "Even if it\'s expensive, I\'ll buy it."', '___、買います。', ['高くても', '高いても', '高いでも', '高でも'], 'い-adj → 高く + ても.'],
  ['な-adj: "Even if it\'s inconvenient, I like this place."', '___、この場所が好きです。', ['不便でも', '不便ても', '不便なでも', '不便くても'], 'な-adj + でも.'],
  ['Noun: "Even if it\'s free, I don\'t want it."', '___、いりません。', ['ただでも', 'ただても', 'ただなでも', 'ただくても'], 'Noun + でも.'],
  ['Negative: "Even if you don\'t check, it\'s fine."', 'チェックし___、大丈夫です。', ['なくても', 'ないても', 'ないでも', 'なかっても'], 'Negative: なくても.'],
  ['What does this mean?', '面接の結果が悪くても、がっかりしないでください。', ['Even if the interview result is bad, please don\'t be disappointed.', 'Because the result was bad, I was disappointed.', 'If the result is good, don\'t be disappointed.', 'The result was bad, but I wasn\'t disappointed.'], '〜ても = even if.'],
  ['"Even if the food is terrible, I\'ll eat it."', '料理が___、食べます。', ['まずくても', 'まずいても', 'まずいでも', 'まずでも'], 'まずい → まずく + ても.'],
  ['"Even if I\'m busy, I\'ll write you a message."', '___、メッセージを書きます。', ['忙しくても', '忙しいても', '忙しでも', '忙しいでも'], 'い-adj → くても.'],
  ['"Even if I separate from my friends, we\'ll stay friends."', '友だちと___、ずっと友だちです。', ['離れても', '離れるても', '離れでも', '離れなくても'], 'Ru-verb: 離れて + も.'],
  ['Cross-pattern (ても + potential): "Even if I try, I can\'t answer."', 'がんばって考えても、___。', ['答えられません', '答えられます', '答えさせません', '答えれれません'], '答える → potential 答えられる → 答えられません.'],
])

export const ch23KotonisuruQuiz = makeQuiz({
  id: 'ch23-kotonisuru',
  title: 'Ch.23 · 〜ことにする',
  topic: 'Deciding',
  grammarPoint: '〜ことにする',
  description: 'Decide to do something: dictionary form (or ない-form) + ことにする. Past ことにした / ことにしました = "I decided to…".',
}, [
  ['"I decided to go on a trip abroad."', '海外旅行に___ことにしました。', ['行く', '行った', '行って', '行きます'], 'Dictionary form + ことにする.'],
  ['"I decided not to cheat."', 'カンニングを___ことにしました。', ['しない', 'しなくて', 'しません', 'しないで'], 'Negative short form + ことにする.'],
  ['"Let\'s decide to meet at the station."', '駅で___ことにしましょう。', ['会う', '会った', '会って', '会おう'], 'Dictionary form.'],
  ['What does this mean?', '日本に残ることにしました。', ['I decided to stay in Japan.', 'I was told to stay in Japan.', 'I usually stay in Japan.', 'I might stay in Japan.'], 'ことにした = decided.'],
  ['"I\'ve decided to quit my job." (casual)', '仕事を___ことにした。', ['やめる', 'やめた', 'やめて', 'やめます'], 'Dictionary form + ことにした.'],
  ['"I decided not to say bad things about people."', '人の悪口を___ことにしました。', ['言わない', '言いない', '言わなくて', '言いません'], '言う → 言わない + ことにする.'],
  ['Choose the particle', '毎日運動する___にしました。', ['こと', 'の', 'もの', 'ところ'], 'Fixed form: ことにする.'],
  ['"We decided to have dinner together."', '一緒に夕食を___ことにしました。', ['食べる', '食べた', '食べて', '食べよう'], 'Dictionary form.'],
  ['"I decided to take care of my health."', '健康に気をつける___。', ['ことにしました', 'ことをしました', 'ことがあります', 'ことができました'], 'ことにした = I decided (my choice).'],
  ['Cross-pattern (ことにする + ても): "Even if it\'s hard, I decided to keep going."', '大変でも、___ことにしました。', ['続ける', '続けた', '続けて', '続けよう'], 'Dictionary form + ことにする.'],
])

export const ch23KotonishiteiruQuiz = makeQuiz({
  id: 'ch23-kotonishiteiru',
  title: 'Ch.23 · 〜ことにしている',
  topic: 'Habits / rules',
  grammarPoint: '〜ことにしている',
  description: 'Talk about a habit or personal rule you made: dictionary form (or ない-form) + ことにしている ("I make it a rule to…").',
}, [
  ['"I make it a rule to jog every morning."', '毎朝ジョギングする___。', ['ことにしています', 'ことにしました', 'ことがあります', 'ことができます'], 'Personal rule → ことにしている.'],
  ['"I make it a rule not to eat sweets at night."', '夜は甘い物を___ことにしています。', ['食べない', '食べなくて', '食べません', '食べないで'], 'Negative + ことにしている.'],
  ['Difference: ことにした vs ことにしている', null, ['ことにした = decided (once); ことにしている = keep it as a habit', 'They are the same', 'ことにしている = decided once', 'ことにした = a long habit'], 'ている shows an ongoing rule.'],
  ['What does this mean?', '一週間に一回、両親に電話することにしています。', ['I make it a rule to call my parents once a week.', 'I decided to call my parents once.', 'I was told to call my parents.', 'I can call my parents once a week.'], 'ことにしている = habit / personal rule.'],
  ['"I make it a rule to check my email in the morning."', '朝、メールを___ことにしています。', ['チェックする', 'チェックした', 'チェックして', 'チェックします'], 'Dictionary form.'],
  ['"I make it a rule not to use my phone while walking."', '歩きながら携帯を___ことにしています。', ['使わない', '使いない', '使わなくて', '使いません'], '使う → 使わない.'],
  ['"I make it a rule to go to bed before midnight."', '十二時前に___ことにしています。', ['寝る', '寝た', '寝て', '寝ます'], 'Dictionary form.'],
  ['"I make it a rule to answer in Japanese."', '日本語で___ことにしています。', ['答える', '答えた', '答えて', '答えれる'], 'Dictionary form.'],
  ['"I make it a rule to take the stairs."', '階段を___ことにしています。', ['使う', '使った', '使って', '使おう'], 'Dictionary form.'],
  ['Cross-pattern (ことにしている + ても): "Even if I\'m tired, I make it a rule to study."', '___、勉強することにしています。', ['疲れていても', '疲れていて', '疲れているでも', '疲れたても'], 'ている → ていて + も.'],
])

export const ch23MadeQuiz = makeQuiz({
  id: 'ch23-made',
  title: 'Ch.23 · 〜まで',
  topic: 'Until',
  grammarPoint: '〜まで',
  description: '"Until X": verb (dictionary form) + まで (雨がやむまで待つ). The main action continues through that time. Compare 〜までに (by a deadline). Nouns: 三時まで.',
}, [
  ['"Let\'s wait until the rain stops."', '雨が___まで待ちましょう。', ['やむ', 'やんだ', 'やんで', 'やみ'], 'Dictionary form + まで.'],
  ['"I\'ll stay here until my friend comes back."', '友だちが___まで、ここにいます。', ['戻ってくる', '戻ってきた', '戻ってきて', '戻るって'], 'Dictionary form + まで.'],
  ['まで vs までに: "Please hand it in by Friday."', '金曜日___出してください。', ['までに', 'まで', 'に', 'から'], 'Deadline → までに.'],
  ['まで vs までに: "I\'ll be in Japan until Friday."', '金曜日___日本にいます。', ['まで', 'までに', 'に', 'から'], 'Continuous state until → まで.'],
  ['What does this mean?', '日本語がぺらぺらになるまで、日本にいるつもりです。', ['I plan to stay in Japan until I become fluent in Japanese.', 'I will become fluent before going to Japan.', 'I was in Japan until I became fluent.', 'I\'ll go to Japan after I become fluent.'], 'X まで = until X.'],
  ['"I studied until I understood."', 'わかる___勉強しました。', ['まで', 'までに', 'から', 'ので'], 'Dictionary form + まで.'],
  ['"Please wait until I call you."', '私が電話する___待っていてください。', ['まで', 'までに', 'ために', 'ながら'], 'まで + continuous action (待っている).'],
  ['"I worked until the store closed."', '店が___まで働きました。', ['閉まる', '閉まった', '閉まって', '閉める'], 'Dictionary form, intransitive 閉まる.'],
  ['"I\'ll look after the house until my parents come back."', '両親が帰ってくる___、留守番をします。', ['まで', 'までに', 'まえ', 'ので'], 'まで = until.'],
  ['Cross-pattern (まで + causative-passive): "I was made to practice until I could do it."', 'できるようになる___、練習させられました。', ['まで', 'までに', 'ので', 'のに'], 'まで = until; forced practice = causative-passive.'],
])

export const ch23KataQuiz = makeQuiz({
  id: 'ch23-kata',
  title: 'Ch.23 · 〜方',
  topic: 'How to',
  grammarPoint: 'Stem + 方',
  description: '"The way of doing / how to": verb stem + 方 (作り方, 読み方, 使い方). The object particle を becomes の: すしを作る → すしの作り方. する verbs: 勉強の仕方.',
}, [
  ['"how to make sushi"', 'すし___作り方', ['の', 'を', 'が', 'に'], 'を → の before 〜方.'],
  ['"Please teach me how to read this kanji."', 'この漢字の___を教えてください。', ['読み方', '読む方', '読んで方', '読め方'], 'Stem 読み + 方.'],
  ['"I don\'t know how to use this machine."', 'この機械の___がわかりません。', ['使い方', '使う方', '使って方', '使い方法'], 'Stem 使い + 方.'],
  ['する verbs: "a way of studying"', '勉強の___', ['仕方', 'し方', 'する方', 'しい方'], 'する → し方 (written 仕方).'],
  ['What does this mean?', '盆踊りの踊り方を習いました。', ['I learned how to dance the Bon dance.', 'I danced the Bon dance with someone.', 'I watched the Bon dance.', 'I taught the Bon dance.'], 'Stem + 方 = way of doing.'],
  ['"Tell me how to get to the station."', '駅への___を教えてください。', ['行き方', '行く方', '行って方', '行け方'], 'Stem 行き + 方.'],
  ['"His way of talking is interesting."', '彼の___はおもしろいです。', ['話し方', '話す方', '話して方', '話せ方'], 'Stem 話し + 方.'],
  ['"how to write a letter"', '手紙___書き方', ['の', 'を', 'が', 'で'], 'を → の.'],
  ['"I don\'t know how to answer."', '___がわかりません。', ['答え方', '答える方', '答えて方', '答えり方'], 'Stem 答え + 方.'],
  ['Cross-pattern (方 + embedded question): "I don\'t know whether this way of cooking is correct."', 'この料理の___が正しいかどうかわかりません。', ['作り方', '作る方', '作った方', '作って方'], 'Stem + 方, then かどうか.'],
])

export const ch23ReviewQuiz = makeQuiz({
  id: 'ch23-review',
  title: 'Ch.23 · Chapter review',
  topic: 'Review',
  grammarPoint: 'Lesson 23 まとめ',
  description: 'Mixed practice: causative-passive, 〜ても, 〜ことにする, 〜ことにしている, 〜まで, 〜方.',
}, [
  ['"I was made to clean the room."', '部屋を掃除___。', ['させられました', 'されました', 'させました', 'しさせられました'], 'する → させられる.'],
  ['"Even if it\'s cold, I\'ll go out."', '___、出かけます。', ['寒くても', '寒いても', '寒でも', '寒いでも'], 'い-adj → くても.'],
  ['"I decided to go to graduate school."', '大学院に行く___。', ['ことにしました', 'ことにしています', 'ことがあります', 'ことができます'], 'Decision → ことにした.'],
  ['"I make it a rule to eat breakfast."', '朝ご飯を食べる___。', ['ことにしています', 'ことにしました', 'ことになります', 'ことがありました'], 'Habit → ことにしている.'],
  ['"I\'ll wait until you come."', 'あなたが来る___待ちます。', ['まで', 'までに', 'ので', 'から'], 'Until → まで.'],
  ['"how to make onigiri"', 'おにぎりの___', ['作り方', '作る方', '作って方', '作れ方'], 'Stem + 方.'],
  ['"I was made to wait by my friend."', '友だちに___。', ['待たされました', '待たれました', '待たせました', '待ちさせました'], '待つ → 待たされる.'],
  ['"Even if you don\'t go, it\'s okay."', '行か___、いいです。', ['なくても', 'ないでも', 'なくて', 'ないても'], 'Negative + なくても.'],
  ['"Even if I\'m disappointed, I won\'t give up."', 'がっかり___、あきらめません。', ['しても', 'するても', 'したでも', 'しでも'], 'する → して + も.'],
  ['"I decided not to take part in the survey."', '調査に参加___ことにしました。', ['しない', 'しなくて', 'しません', 'しないで'], 'Negative + ことにする.'],
])
