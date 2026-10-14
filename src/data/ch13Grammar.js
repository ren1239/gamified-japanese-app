// Chapter 13 Grammar — Genki II (アルバイト探し)
// Questions are original practice items; choices[0] is the answer (shuffled by makeQuiz).
import { makeQuiz } from './grammarHelpers.js'

export const ch13PotentialQuiz = makeQuiz({
  id: 'ch13-potential',
  title: 'Ch.13 · Potential verbs',
  topic: 'Potential',
  grammarPoint: '〜られる・〜える',
  description: 'Say what someone can do. Ru-verbs: drop る + られる (見る → 見られる). U-verbs: change the final -u to -e + る (行く → 行ける). する → できる, くる → こられる. Potential verbs conjugate like ru-verbs. を may become が; other particles stay the same.',
}, [
  ['How do you say "I can knit a sweater"?', 'セーターが___。', ['編めます', '編まれます', '編みられます', '編めれます'], '編む is a u-verb: む → め + る → 編める → 編めます. 編まれる is the passive, not the potential.'],
  ['How do you say "I can\'t eat spicy food"?', '辛い物が___。', ['食べられません', '食べりません', '食べえません', '食べられないません'], '食べる is a ru-verb: drop る + られる → 食べられる → 食べられません.'],
  ['"Can you do karate?" Which is correct?', '空手が___か。', ['できます', 'されます', 'しられます', 'すれます'], 'The potential of する is できる. 空手をする → 空手ができる.'],
  ['How do you say "Can you come to the airport tomorrow?"', 'あした空港に___か。', ['来られます', '来させます', '来えます', '来ります'], 'くる is irregular: くる → こられる. 来させる is the causative.'],
  ['"I couldn\'t keep my promise." Choose the past negative potential.', '約束が___。', ['守れませんでした', '守りませんでした', '守るませんでした', '守れないでした'], '守る (u-verb) → 守れる → past negative polite 守れませんでした. 守りませんでした means "didn\'t keep" — no "can".'],
  ['頑張る looks like a ru-verb but is a u-verb. "I can\'t try any harder."', 'もう___。', ['頑張れません', '頑張られません', '頑張りえません', '頑張れれません'], '頑張る is a u-verb: る → れ + る → 頑張れる. Adding られる is the classic mistake.'],
  ['Which particle can replace を in a potential sentence?', 'この漢字___読めます。', ['が', 'に', 'で', 'へ'], 'With を-verbs, the object can take が in the potential: 漢字が読める (漢字を読める is also fine).'],
  ['Particles other than を do not change. "I can go to the store by myself."', '一人で店___行けます。', ['に', 'を', 'が', 'で'], '店に行く → 店に行ける. Only を can become が; に stays に.'],
  ['"I was able to swim 1 km, so I was glad." Choose the て-form.', '1キロ___、うれしかったです。', ['泳げて', '泳いで', '泳げって', '泳げで'], 'Potential verbs conjugate like ru-verbs: 泳げる → て-form 泳げて. 泳いで has no "can".'],
  ['Using ことができる: "You cannot keep pets in this apartment."', 'このアパートではペットを飼う___。', ['ことができません', 'ことにできません', 'ことをできません', 'ができません'], 'Dictionary form + ことができる also means "can". Keep を before the verb: ペットを飼うことができる.'],
  ['What does this mean?', '外国語が話せますか。', ['Can you speak a foreign language?', 'Did you speak a foreign language?', 'Do you want to speak a foreign language?', 'Have you ever spoken a foreign language?'], '話せる is the potential of 話す → "can speak".'],
  ['"I\'m so busy I can\'t (even) brush my teeth in the morning."', '忙しくて、朝歯が___んです。', ['磨けない', '磨かない', '磨きない', '磨けなかない'], '磨く → 磨ける → short negative 磨けない. 磨かない is "don\'t brush".'],
])

export const ch13ShiQuiz = makeQuiz({
  id: 'ch13-shi',
  title: 'Ch.13 · 〜し',
  topic: 'Reasons',
  grammarPoint: '〜し、〜し',
  description: 'List two or more reasons (or imply "for one thing"). Short form + し: い-adj → 安いし, な-adj/noun → 便利だし・学生だし, verbs → あるし・行ったし. Tense and negation stay as normal short forms.',
}, [
  ['"This apartment is close to the station and cheap, so I like it."', 'このアパートは駅に___、安いし、好きです。', ['近いし', '近いだし', '近しい', '近くし'], 'い-adjective + し directly: 近いし. Never add だ after an い-adjective.'],
  ['な-adjective + し: "My life is happy, and…"', '今の生活は___、仕事も楽しいし…', ['幸せだし', '幸せし', '幸せなし', '幸せでし'], 'な-adjectives take だ before し: 幸せだし.'],
  ['Noun + し: "Tomorrow is a test, and…"', 'あしたはテスト___、宿題もあるし、遊べません。', ['だし', 'し', 'なし', 'のし'], 'Nouns take だ before し: テストだし.'],
  ['"Yesterday I went to bed late and also practiced karate, so I\'m tired."', 'きのうは遅く___、空手の練習もしたし、疲れました。', ['寝たし', '寝てし', '寝ましし', '寝だし'], 'Use the short past form before し for past events: 寝たし.'],
  ['"I have neither time nor money, so I can\'t travel."', '時間も___、お金もないし、旅行できません。', ['ないし', 'なくし', 'ないだし', 'なしし'], 'Short negative + し: ないし.'],
  ['"The test wasn\'t difficult, and…" (past negative い-adj)', 'テストは___、時間もあったし、よかったです。', ['難しくなかったし', '難しいなかったし', '難しくないだったし', '難しなかったし'], 'い-adj past negative: 難しい → 難しくなかった → + し.'],
  ['What nuance does a single し clause add?', '物価が安いし、この町が好きです。', ['Cheap prices are one reason (among others)', 'Cheap prices are the only reason', 'Prices are cheap, but I don\'t like the town', 'Prices used to be cheap'], 'With just one し clause you imply other reasons too: "for one thing…".'],
  ['"The teacher is strict and there\'s lots of homework, so I don\'t like this class."', '先生は___、宿題も多いし、このクラスは好きじゃないです。', ['厳しいし', '厳しだし', '厳しくし', '厳しいだし'], '厳しい is an い-adjective → 厳しいし.'],
  ['Which sentence is correct?', null, ['この店は安いし、おいしいし、よく来ます。', 'この店は安いだし、おいしいだし、よく来ます。', 'この店は安くし、おいしくし、よく来ます。', 'この店は安いでし、おいしいでし、よく来ます。'], 'い-adjectives go straight into し: 安いし、おいしいし.'],
  ['Cross-pattern (し + potential): "I have work and I don\'t feel well, so I can\'t go."', '仕事があるし、気分も悪いし、___。', ['行けません', '行けれません', '行きられません', '行きえません'], '行く → potential 行ける → 行けません.'],
])

export const ch13SoudesuQuiz = makeQuiz({
  id: 'ch13-soudesu',
  title: 'Ch.13 · 〜そうです (looks like)',
  topic: 'Appearance',
  grammarPoint: '〜そうです',
  description: 'Say how something looks. い-adj: drop い + そう (辛い → 辛そう). な-adj: drop な (元気そう). いい → よさそう. Negative: 〜くなさそう. Before nouns: 〜そうな + noun. Before verbs: 〜そうに. Don\'t confuse with the hearsay そうです (Ch.17), which attaches to the full form.',
}, [
  ['"This curry looks spicy."', 'このカレーは___。', ['辛そうです', '辛いそうです', '辛くそうです', '辛さそうです'], 'Drop い: 辛 + そう. 辛いそうです would mean "I hear it\'s spicy".'],
  ['いい is irregular. "This dictionary looks good."', 'この辞書は___。', ['よさそうです', 'いそうです', 'いいそうです', 'よそうです'], 'いい → よさそう. This is the one exception to learn.'],
  ['"This job doesn\'t look difficult."', 'この仕事は___。', ['難しくなさそうです', '難しくないそうです', '難しなさそうです', '難しないそうです'], 'Negative: 難しくない → drop い → なさ + そう → 難しくなさそうです.'],
  ['な-adjective: "She looks happy."', '彼女は___。', ['幸せそうです', '幸せだそうです', '幸せなそうです', '幸せいそうです'], 'な-adj: drop な → 幸せそう. 幸せだそうです is hearsay.'],
  ['Before a noun: "a strict-looking teacher"', '___先生', ['厳しそうな', '厳しそうの', '厳しいそうな', '厳しそうに'], '〜そう works like a な-adjective: 厳しそうな + noun.'],
  ['Before a verb: "The child is crying sadly."', '子供が___泣いています。', ['悲しそうに', '悲しそうな', '悲しいそうに', '悲しくそうに'], 'To modify a verb, use 〜そうに.'],
  ['What does this mean?', 'この象は強そうです。', ['This elephant looks strong.', 'I heard this elephant is strong.', 'This elephant is the strongest.', 'This elephant wants to be strong.'], '強い → 強そう = "looks strong".'],
  ['"The party looked fun."', 'パーティーは___。', ['楽しそうでした', '楽しいそうでした', '楽しくそうでした', '楽しかったそうでした'], 'Put the past tense on です: 楽しそうでした.'],
  ['"He looks like he feels sick."', '気分が___。', ['悪そうです', '悪いそうです', '悪くそうです', '悪さそうです'], '悪い → drop い → 悪そう.'],
  ['Cross-pattern (そう + し): "This shop looks cheap and the food looks good, so let\'s go in."', 'この店は___、料理もおいしそうだし、入りましょう。', ['安そうだし', '安そうし', '安いそうし', '安そうなし'], '〜そう behaves like a な-adjective, so it takes だ before し.'],
])

export const ch13TemiruQuiz = makeQuiz({
  id: 'ch13-temiru',
  title: 'Ch.13 · 〜てみる',
  topic: 'Trying',
  grammarPoint: '〜てみる',
  description: 'Do something to see what it is like ("try doing"). て-form + みる. みる conjugates as a ru-verb: てみます, てみた, てみたい, てみてください.',
}, [
  ['"I\'ll try wearing a kimono."', '着物を___。', ['着てみます', '着みます', '着るてみます', '着ってみます'], '着る → て-form 着て + みる → 着てみます.'],
  ['"I want to try knitting a sweater."', 'セーターを___。', ['編んでみたいです', '編みてみたいです', '編んでみるたいです', '編んでたいです'], '編む → 編んで + みる → stem み + たい → 編んでみたいです.'],
  ['"I tried using the app."', 'アプリを___。', ['使ってみました', '使いみました', '使うてみました', '使っててみました'], '使う → 使って + みました.'],
  ['する verbs: "I\'ll try practicing karate."', '空手を___。', ['練習してみます', '練習しみます', '練習するてみます', '練習してみります'], '練習する → 練習して + みます.'],
  ['"Please try coming to this shop."', 'この店に___ください。', ['来てみて', '来てみ', '来みて', '来るてみて'], '来る → 来て + みる → て-form 来てみて + ください.'],
  ['What does this mean?', '紅茶を飲んでみます。', ['I\'ll try drinking black tea (to see what it\'s like).', 'I can drink black tea.', 'I\'ll drink black tea for you.', 'I have finished drinking black tea.'], '〜てみる = try doing something to find out what it is like.'],
  ['Cross-pattern (てみる + たい): "I want to try going to Japan."', '日本に___。', ['行ってみたいです', '行きたいてみます', '行ってたいです', '行きてみたいです'], '行く → 行って + みたい (たい attaches to the stem み).'],
  ['"Please try this curry."', 'このカレーを___。', ['食べてみてください', '食べみてください', '食べてみるください', '食べてみください'], '食べて + みて + ください.'],
  ['"I tried polishing my shoes."', '靴を___。', ['磨いてみました', '磨きてみました', '磨ってみました', '磨くてみました'], '磨く → て-form 磨いて (く → いて) + みました.'],
  ['Cross-pattern (てみる + potential): "I tried, but I couldn\'t do it."', 'やって___が、できませんでした。', ['みました', 'みれました', 'みられました', 'みさせました'], 'やってみました = "I tried doing it". The potential is in できませんでした.'],
])

export const ch13NaraQuiz = makeQuiz({
  id: 'ch13-nara',
  title: 'Ch.13 · なら',
  topic: 'Contrast',
  grammarPoint: 'Noun + なら',
  description: 'Noun + なら = "if it is X / as for X". Used to say something holds for X (often in contrast with what was asked): A: 楽器が弾けますか。B: ギターなら弾けます。',
}, [
  ['"If it\'s karate, I can do it."', '空手___、できます。', ['なら', 'ので', 'けど', 'し'], 'Noun + なら = "if it\'s X".'],
  ['"I don\'t like sports, but golf I like."', 'スポーツは好きじゃないけど、ゴルフ___好きです。', ['なら', 'だら', 'まで', 'より'], 'なら picks out the item the statement holds for, in contrast with the rest.'],
  ['A: 楽器が弾けますか。 B: "If it\'s piano, I can."', 'ピアノ___弾けます。', ['なら', 'だし', 'なので', 'ならない'], 'B narrows the answer down to piano with なら.'],
  ['What does B mean?', 'A: コーヒーはありますか。 B: 紅茶ならありますよ。', ['We don\'t have coffee, but we do have black tea.', 'We have coffee and black tea.', 'Because we have black tea, drink it.', 'Black tea is better than coffee.'], 'なら implies the statement applies to 紅茶 (as opposed to what was asked about).'],
  ['"If it\'s Japanese, I can speak a little."', '日本語___少し話せます。', ['なら', 'だら', 'ので', 'のは'], 'Noun + なら.'],
  ['"I\'m busy on weekdays, but on weekends I can meet."', '平日は忙しいですが、週末___会えます。', ['なら', 'ので', 'から', 'のに'], 'Contrast weekdays vs. weekends with なら.'],
  ['Cross-pattern (なら + potential): "Foreign languages? If it\'s English, I can read it."', '英語なら___。', ['読めます', '読みられます', '読めれます', '読むえます'], '読む (u-verb) → 読める → 読めます.'],
  ['What does B like?', 'A: 象が好きですか。 B: 象はちょっと…。パンダなら好きです。', ['Pandas (but not elephants)', 'Elephants and pandas', 'Neither', 'Elephants only'], 'B hesitates on elephants and uses なら for pandas.'],
  ['A: 運動しますか。 B: "If it\'s golf, I play once a week."', '___一週間に一回します。', ['ゴルフなら', 'ゴルフだし', 'ゴルフのに', 'ゴルフまで'], 'ゴルフなら + statement about golf.'],
  ['Which response uses なら correctly?', 'A: 辛い物が食べられますか。', ['B: カレーなら食べられます。', 'B: カレーならないです。', 'B: カレーだら食べられます。', 'B: カレーなのに食べられます。'], 'Noun + なら + statement: カレーなら食べられます.'],
])

export const ch13FrequencyQuiz = makeQuiz({
  id: 'ch13-frequency',
  title: 'Ch.13 · 一週間に三回',
  topic: 'Frequency',
  grammarPoint: '(period) に (number)',
  description: 'Say how often: time period + に + frequency. 一日に三回 (three times a day), 一週間に二回 (twice a week), 一か月に一回 (once a month), 一日に二時間 (two hours a day).',
}, [
  ['"three times a week"', null, ['一週間に三回', '三回に一週間', '一週間を三回', '一週間の三回'], 'Period + に + number: 一週間に三回.'],
  ['"once a month"', null, ['一か月に一回', '一か月を一回', '一回に一か月', '一か月が一回'], '一か月 + に + 一回.'],
  ['"twice a day"', null, ['一日に二回', '二日に一回', '一日を二回', '一日が二回'], '二日に一回 would mean "once every two days".'],
  ['"I brush my teeth three times a day."', '一日に___歯を磨きます。', ['三回', '三日', '三時', '三回に'], 'Frequency uses 〜回 (times).'],
  ['What does this mean?', '二週間に一回', ['once every two weeks', 'twice a week', 'two weeks in a row', 'twice every two weeks'], 'period (二週間) に number (一回).'],
  ['"How many times a week do you practice?"', '一週間に___練習しますか。', ['何回', '何時', '何回に', 'いくつ回'], 'Ask frequency with 何回.'],
  ['"I study for two hours a day."', null, ['一日に二時間勉強します。', '二時間に一日勉強します。', '一日を二時間勉強します。', '一日の二時間に勉強します。'], 'Duration works the same way: 一日に二時間.'],
  ['"once a year"', null, ['一年に一回', '一年を一回', '一回に一年', '一年が一回'], '一年 + に + 一回.'],
  ['"I go to the gym three days a week."', '一週間に___ジムに行きます。', ['三日', '三日目', '三日間に', 'みっかに'], 'Days are counted with the day counter: 三日 (みっか).'],
  ['Cross-pattern (frequency + potential): "I can only go home once a year."', '一年に一回しか国に___。', ['帰れません', '帰れます', '帰られません', '帰るません'], 'しか needs a negative: 帰る (u-verb) → 帰れる → 帰れません.'],
])

export const ch13ReviewQuiz = makeQuiz({
  id: 'ch13-review',
  title: 'Ch.13 · Chapter review',
  topic: 'Review',
  grammarPoint: 'Lesson 13 まとめ',
  description: 'Mixed practice: potential verbs, 〜し, 〜そうです, 〜てみる, なら, and frequency (一週間に三回).',
}, [
  ['"I can ride a motorcycle."', 'バイクに___。', ['乗れます', '乗られます', '乗りれます', '乗えます'], '乗る (u-verb) → 乗れる.'],
  ['"That bag looks expensive."', 'そのかばんは___。', ['高そうです', '高いそうです', '高くそうです', '高さそうです'], 'Appearance: drop い + そう.'],
  ['"I want to try making Japanese food."', '日本料理を___。', ['作ってみたいです', '作りてみたいです', '作ってたいです', '作ってみるたいです'], '作って + みたい.'],
  ['"The town is safe and prices are low, so it\'s easy to live in."', 'この町は___、物価も安いし、住みやすいです。', ['安全だし', '安全し', '安全なし', '安全いし'], 'な-adj + だし.'],
  ['"Tea? If it\'s black tea, I drink it."', 'お茶ですか。紅茶___飲みます。', ['なら', 'ので', 'まで', 'でも'], 'Noun + なら.'],
  ['"I practice the instrument four times a week."', '一週間___四回楽器を練習します。', ['に', 'を', 'で', 'が'], 'Period + に + frequency.'],
  ['"He looks kind." (prenominal)', '___人ですね。', ['やさしそうな', 'やさしそうの', 'やさしいそうな', 'やさしそうに'], '〜そうな + noun.'],
  ['"I couldn\'t sleep last night."', 'きのうの夜、___。', ['寝られませんでした', '寝れられませんでした', '寝りませんでした', '寝えませんでした'], '寝る (ru-verb) → 寝られる → 寝られませんでした.'],
  ['"Grammar? If it\'s grammar, I can explain it."', '文法なら___。', ['説明できます', '説明されます', '説明しられます', '説明すれます'], 'する verbs: 説明する → 説明できる.'],
  ['"I have no money and no time, and I don\'t feel well, so I won\'t go."', 'お金もないし、時間もないし、___し、行きません。', ['気分も悪い', '気分も悪いだ', '気分も悪く', '気分も悪そうに'], 'Short form before し: 悪いし.'],
])
