// Chapter 17 Grammar — Genki II (ぐちとうわさ話)
// Questions are original practice items; choices[0] is the answer (shuffled by makeQuiz).
import { makeQuiz } from './grammarHelpers.js'

export const ch17HearsayQuiz = makeQuiz({
  id: 'ch17-hearsay',
  title: 'Ch.17 · 〜そうです (I hear)',
  topic: 'Hearsay',
  grammarPoint: 'short form + そうです',
  description: 'Report what you heard: short form + そうです. Keep the original tense/negation. い-adj keeps い (寒いそうです), な-adj & nouns take だ (元気だそうです, 学生だそうです). Source: 〜によると. Compare Ch.13 looks-like そう (寒そう).',
}, [
  ['"I hear the prime minister is coming."', '首相が___そうです。', ['来る', '来ます', '来そう', '来るだ'], 'Short form + そうです.'],
  ['い-adjective: "I hear his salary is high."', '彼の給料は___そうです。', ['高い', '高', '高いだ', '高く'], 'Hearsay keeps the full い: 高いそうです (高そう = looks expensive).'],
  ['な-adjective: "I hear the dorm is quiet."', '寮は___そうです。', ['静かだ', '静か', '静かな', '静かに'], 'な-adj + だ + そうです.'],
  ['Noun: "I hear she\'s a salaryman\'s wife."', '彼女のご主人はサラリーマン___そうです。', ['だ', 'な', 'の', 'で'], 'Noun + だ + そうです.'],
  ['Past: "I hear there was a fire yesterday."', 'きのう火事が___そうです。', ['あった', 'ありました', 'ある', 'あって'], 'Keep the past tense: あったそうです.'],
  ['Negative: "I hear there\'s no overtime work."', '残業は___そうです。', ['ない', 'ありません', 'なさ', 'なく'], 'Short negative + そうです.'],
  ['Source: "According to the news, it\'s going to snow."', 'ニュース___、雪が降るそうです。', ['によると', 'に比べて', 'のために', 'について'], 'Source of information: 〜によると.'],
  ['Which one means "I hear it\'s dangerous"?', null, ['危ないそうです。', '危なそうです。', '危ないそうでした。', '危なさそうです。'], 'Full い-form + そうです = hearsay. Hearsay そうです doesn\'t take a past or negative form itself.'],
  ['What does this mean?', 'たけしさんは宝くじに当たったそうです。', ['I heard Takeshi won the lottery.', 'Takeshi looks like he won the lottery.', 'Takeshi wants to win the lottery.', 'Takeshi might win the lottery.'], 'Past short form + そうです = I heard that…'],
  ['Cross-pattern (hearsay + potential): "I hear Mary can speak Chinese."', 'メアリーさんは中国語が___そうです。', ['話せる', '話せます', '話せ', '話せるだ'], 'Potential short form + そうです.'],
])

export const ch17TteQuiz = makeQuiz({
  id: 'ch17-tte',
  title: 'Ch.17 · 〜って',
  topic: 'Casual quotes',
  grammarPoint: '〜って',
  description: 'Casual quotation marker, used like と言っていた or そうだ: 「あした休みだって。」 ("She said tomorrow is a day off" / "I hear…"). Attaches to short forms. Also casual topic: 〜って何？ ("What is…?")',
}, [
  ['Casual: "Mary said she\'ll be late."', 'メアリー、遅れる___。', ['って', 'だって', 'だって言いました', 'ってです'], '〜って = casual "she said".'],
  ['"Takeshi said there\'s no class tomorrow."', 'たけしくん、あした授業がない___。', ['って', 'そうだよって', 'と', 'みたい'], 'Short form + って.'],
  ['な-adjective / noun: "She said she\'s fine."', '元気___。', ['だって', 'って', 'なって', 'のって'], 'With な-adj and nouns, だ comes before って: 元気だって.'],
  ['What does this mean?', 'あの店、すごく混むって。', ['I heard that store gets really crowded.', 'That store looks crowded.', 'Let\'s go to that crowded store.', 'That store is never crowded.'], '〜って reports what you heard.'],
  ['Asking "What is a 宝くじ?" casually', '宝くじ___何？', ['って', 'だって', 'そう', 'なら'], 'Xって何？ = "What is X?" (casual).'],
  ['Which is the casual equivalent of 「行きたいと言っていました」?', null, ['行きたいって。', '行きたいだって。', '行きたいだって言った。', '行きたいってです。'], 'って replaces と言っていた in casual speech.'],
  ['"He said his parents got divorced."', '彼の両親、離婚した___。', ['って', 'だって', 'そうです', 'みたいに'], 'Past short form + って.'],
  ['"Ken said he got used to the new job."', 'けんくん、新しい仕事に___って。', ['慣れた', '慣れました', '慣れて', '慣れる'], 'Use short forms before って.'],
  ['"She said the boots are too expensive."', 'ブーツ、高すぎる___。', ['って', 'だって', 'とって', 'そうだって'], 'い-adj / verbs → って directly.'],
  ['Cross-pattern (って + ので): "He said he can\'t come because he has a scheduling conflict."', '都合が悪いので、___って。', ['来られない', '来られません', '来れないです', '来ない'], 'Potential negative 来られない + って. (来ない would mean he won\'t, not can\'t.)'],
])

export const ch17TaraQuiz = makeQuiz({
  id: 'ch17-tara',
  title: 'Ch.17 · 〜たら',
  topic: 'Conditional',
  grammarPoint: '〜たら',
  description: '"If / when (once) X happens, Y": short past + ら. Verbs: 行ったら, い-adj: 高かったら, な-adj/noun: 暇だったら, 学生だったら. Negative: 〜なかったら. The main clause can be a plan, request, or suggestion. Y happens after X.',
}, [
  ['"If I win the lottery, I\'ll travel the world."', '宝くじに___、世界旅行をします。', ['当たったら', '当たるたら', '当たりたら', '当たって'], 'Short past 当たった + ら.'],
  ['い-adjective: "If it\'s cold, turn on the heater."', '___、ヒーターをつけてください。', ['寒かったら', '寒いたら', '寒くたら', '寒いだったら'], 'い-adj past 寒かった + ら.'],
  ['な-adjective: "If you\'re free, let\'s go to the shopping mall."', '___、ショッピングモールに行こう。', ['暇だったら', '暇たら', '暇なたら', '暇かったら'], 'な-adj + だった + ら.'],
  ['Negative: "If there isn\'t enough money, I\'ll give up."', 'お金が___、あきらめます。', ['足りなかったら', '足りないたら', '足りなくたら', '足りませんでしたら'], 'Negative short past 足りなかった + ら.'],
  ['"When I get home, I\'ll boil water."', 'うちに___、お湯を沸かします。', ['帰ったら', '帰るたら', '帰りたら', '帰ると'], 'When/once X happens → 〜たら.'],
  ['What does this mean?', '大学を卒業したら、就職するつもりです。', ['After I graduate, I plan to get a job.', 'Because I graduated, I got a job.', 'Before graduating, I\'ll get a job.', 'Even if I graduate, I won\'t get a job.'], '〜たら = once X happens.'],
  ['Noun: "If it\'s a secret, I won\'t tell anyone."', '秘密___、だれにも言いません。', ['だったら', 'たら', 'だたら', 'かったら'], 'Noun + だった + ら.'],
  ['"If the store is crowded, let\'s go somewhere else."', '店が___、ほかの所に行こう。', ['混んでいたら', '混むいたら', '混みたら', '混んでいるたら'], 'ている → ていた + ら.'],
  ['Which sentence is correct?', null, ['日本に行ったら、すしを食べたいです。', '日本に行くたら、すしを食べたいです。', '日本に行ったから、すしを食べたいです。', '日本に行きたら、すしを食べたいです。'], 'た-form + ら.'],
  ['Cross-pattern (たら + てみる): "If you go to Kyoto, please try visiting the temples."', '京都に___、お寺に行ってみてください。', ['行ったら', '行くたら', '行きたら', '行ってたら'], '〜たら + request.'],
])

export const ch17NakutemoiiQuiz = makeQuiz({
  id: 'ch17-nakutemoii',
  title: 'Ch.17 · 〜なくてもいいです',
  topic: 'Not necessary',
  grammarPoint: '〜なくてもいいです',
  description: '"Don\'t have to": short negative, drop い + くてもいいです (行かない → 行かなくてもいいです). Past: 〜なくてもよかったです. Opposite of 〜なければいけません.',
}, [
  ['"You don\'t have to take off your shoes."', '靴を___もいいです。', ['脱がなくて', '脱がないで', '脱ぎなくて', '脱がなくって'], '脱ぐ → 脱がない → 脱がなくてもいいです.'],
  ['"You don\'t have to come tomorrow."', 'あしたは___もいいです。', ['来なくて', '来ないて', '来なくで', '来ませんて'], '来ない → 来なくても.'],
  ['"You don\'t have to wear contact lenses."', 'コンタクトを___もいいです。', ['しなくて', 'しないで', 'すなくて', 'さなくて'], 'する (to wear small items) → しない → しなくても.'],
  ['"You don\'t have to work overtime today."', '今日は残業___。', ['しなくてもいいです', 'しなくていけません', 'しないでもいいでした', 'しなきゃいいです'], 'しなくてもいいです = don\'t have to.'],
  ['Past: "I didn\'t have to prepare (after all)."', '準備___。', ['しなくてもよかったです', 'しなくてもいいでした', 'しないでもよかったです', 'しなくてよかったでした'], 'Past: 〜なくてもよかったです.'],
  ['Question: "Do I have to lock the door?" — "No, you don\'t have to."', 'いいえ、かぎを___もいいですよ。', ['かけなくて', 'かけないで', 'かからなくて', 'かけないて'], 'かける (ru-verb) → かけない → かけなくても.'],
  ['What does this mean?', 'スーツを着なくてもいいです。', ['You don\'t have to wear a suit.', 'You must not wear a suit.', 'You have to wear a suit.', 'It\'s good to wear a suit.'], '〜なくてもいい = not necessary.'],
  ['"You don\'t have to shave your beard."', 'ひげを___もいいです。', ['そらなくて', 'そりなくて', 'そらないで', 'そるなくて'], 'そる (u-verb) → そらない → そらなくても.'],
  ['Opposite: "You have to choose." (must)', null, ['選ばなければいけません。', '選ばなくてもいいです。', '選ばないでください。', '選んでもいいです。'], 'Must = 〜なければいけません.'],
  ['Cross-pattern (なくてもいい + から): "It\'s close, so you don\'t have to take the bus."', '近いから、バスに___。', ['乗らなくてもいいです', '乗らなくていけません', '乗りなくてもいいです', '乗らないでもいいでした'], '乗る → 乗らない → 乗らなくてもいいです.'],
])

export const ch17MitaiQuiz = makeQuiz({
  id: 'ch17-mitai',
  title: 'Ch.17 · 〜みたいです',
  topic: 'Seems like',
  grammarPoint: '〜みたいです',
  description: '"Seems / looks like" based on what you observe: short form + みたいです. な-adj and nouns drop だ (元気みたい, 学生みたい). Noun + みたい also means "resembles": 子供みたい ("like a child"). みたいな + noun.',
}, [
  ['"It seems the baby is sleeping."', '赤ちゃんは___みたいです。', ['寝ている', '寝ています', '寝ているだ', '寝そう'], 'Short form + みたいです.'],
  ['い-adjective: "He seems busy."', '彼は___みたいです。', ['忙しい', '忙しいだ', '忙し', '忙しく'], 'い-adj + みたい directly.'],
  ['な-adjective: "That restaurant seems popular."', 'あのレストランは___みたいです。', ['人気がある', '人気だ', '人気な', '人気の'], 'Verb phrase + みたい. (人気みたい would also be OK — no だ.)'],
  ['Noun resemblance: "You look like a panda!" (dark eye circles)', 'パンダ___ですね。', ['みたい', 'みたいな', 'だみたい', 'のみたい'], 'Noun + みたい = resembles.'],
  ['Before a noun: "a person like a movie star"', '映画スターみたい___人', ['な', 'の', 'に', 'だ'], 'みたい behaves like a な-adj: みたいな + noun.'],
  ['な-adj drops だ: "She seems to like you."', '彼女はあなたが___みたいです。', ['好き', '好きだ', '好きな', '好きの'], 'な-adj stem + みたい.'],
  ['Past: "It seems he forgot the key."', '彼はかぎを___みたいです。', ['忘れた', '忘れました', '忘れたの', '忘れたな'], 'Past short form + みたい.'],
  ['What does this mean?', 'あの人は首相みたいです。', ['That person looks like the prime minister.', 'That person is the prime minister.', 'I heard that person is the prime minister.', 'That person wants to be prime minister.'], 'Noun + みたい = seems / resembles.'],
  ['Negative: "It seems there isn\'t any hot water."', 'お湯が___みたいです。', ['ない', 'ありません', 'なさ', 'なく'], 'Short negative + みたい.'],
  ['Cross-pattern (みたい + ので): "It seems the shop is closed, so let\'s go home."', '店が閉まっている___、帰りましょう。', ['みたいなので', 'みたいので', 'みたいだので', 'みたいのので'], 'みたい is like a な-adj → みたいなので.'],
])

export const ch17MaeniKaraQuiz = makeQuiz({
  id: 'ch17-maeni-tekara',
  title: 'Ch.17 · 〜前に／〜てから',
  topic: 'Sequence',
  grammarPoint: '〜前に・〜てから',
  description: 'X 前に Y: "Y before X" — X is always in the dictionary (present) form, even for past events (寝る前に). X てから Y: "Y after X" — X in the て-form (食べてから).',
}, [
  ['"I brush my teeth before going to bed."', '___前に、歯を磨きます。', ['寝る', '寝た', '寝て', '寝ます'], 'Dictionary form + 前に.'],
  ['Past event: "I called my mom before I left Japan."', '日本を___前に、母に電話しました。', ['出る', '出た', '出て', '出ました'], 'Even for past events, 前に takes the dictionary form.'],
  ['"After I take a shower, I eat breakfast."', 'シャワーを___から、朝ご飯を食べます。', ['浴びて', '浴びた', '浴びる', '浴びます'], 'て-form + から = after.'],
  ['"I put on makeup before going out."', '出かける___、化粧します。', ['前に', 'てから', '後で', 'から'], 'Before = 前に.'],
  ['"After I got used to the job, it became fun."', '仕事に___から、楽しくなりました。', ['慣れて', '慣れた', '慣れる', '慣れ'], 'て-form + から.'],
  ['What does this mean?', 'お祈りしてから、食べます。', ['I eat after I pray.', 'I pray after I eat.', 'I pray before I eat... and eat later.', 'I pray instead of eating.'], 'XてからY = Y after X.'],
  ['"Comb your hair before the interview."', '面接の___、髪をとかしてください。', ['前に', 'てから', 'から', 'まえ'], 'Noun + の + 前に.'],
  ['"I\'ll decide after I compare them."', '比べ___、決めます。', ['てから', 'る前に', 'たから', 'るから'], 'て-form + から = after.'],
  ['"Lock the door before you go out."', '出かける前に、___ください。', ['かぎをかけて', 'かぎをかかって', 'かぎをかけって', 'かぎがかけて'], 'かぎをかける → かけてください.'],
  ['Cross-pattern (てから + たい): "I want to get a job after I graduate."', '卒業___、就職したいです。', ['してから', 'する前に', 'したから', 'してまえに'], 'する → して + から.'],
])

export const ch17ReviewQuiz = makeQuiz({
  id: 'ch17-review',
  title: 'Ch.17 · Chapter review',
  topic: 'Review',
  grammarPoint: 'Lesson 17 まとめ',
  description: 'Mixed practice: hearsay そうです, って, 〜たら, 〜なくてもいい, 〜みたい, 〜前に／〜てから.',
}, [
  ['"I hear the travel agency is closed today."', '旅行会社は今日休みだ___。', ['そうです', 'みたいだそうです', 'そうだです', 'って言います'], 'Noun + だ + そうです.'],
  ['"If you\'re tired, you don\'t have to come."', '疲れていたら、___。', ['来なくてもいいです', '来なくていけません', '来ないでいいでした', '来なきゃいいです'], '〜たら + 〜なくてもいい.'],
  ['"It seems there are a lot of guests."', 'お客さんが多い___。', ['みたいです', 'みたいだです', 'そうみたいです', 'みたいの'], 'い-adj + みたいです.'],
  ['"Wash your hands before eating."', '___前に、手を洗ってください。', ['食べる', '食べた', '食べて', '食べ'], 'Dictionary form + 前に.'],
  ['Casual: "She said she wants to quit."', 'やめたい___。', ['って', 'そう', 'みたいって', 'と言うって'], 'Casual quote って.'],
  ['"If I get a high salary, I\'ll buy a car."', '給料が___、車を買います。', ['高かったら', '高いたら', '高くたら', '高いだったら'], 'い-adj → 高かった + ら.'],
  ['"After I boil water, I\'ll make tea."', 'お湯を沸かして___、お茶をいれます。', ['から', 'まえに', 'たから', 'ので'], 'て-form + から.'],
  ['"I hear the panda was born last month."', 'パンダの赤ちゃんが先月___そうです。', ['生まれた', '生まれました', '生まれ', '生まれて'], 'Hearsay keeps the past tense in short form.'],
  ['"You don\'t have to bring a spoon."', 'スプーンを___。', ['持ってこなくてもいいです', '持ってこないでもいいでした', '持ってきなくてもいいです', '持ってくなくてもいいです'], '持ってくる → 持ってこない → 持ってこなくてもいい.'],
  ['"He looks like a child."', '彼は子供___です。', ['みたい', 'そう', 'みたいな', 'だみたい'], 'Noun + みたい = resembles.'],
])
