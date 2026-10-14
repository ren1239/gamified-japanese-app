// Chapter 15 Grammar — Genki II (長野旅行)
// Questions are original practice items; choices[0] is the answer (shuffled by makeQuiz).
import { makeQuiz } from './grammarHelpers.js'

export const ch15VolitionalQuiz = makeQuiz({
  id: 'ch15-volitional',
  title: 'Ch.15 · Volitional form',
  topic: 'Let\'s…',
  grammarPoint: '〜(よ)う',
  description: 'Casual "let\'s…" (= ましょう). Ru-verbs: drop る + よう (見よう). U-verbs: final -u → -oo (行こう, 待とう, 買おう). する → しよう, くる → こよう. Volitional + か = "shall we/I…?" (手伝おうか).',
}, [
  ['"Let\'s go to the movie theater!" (casual)', '映画館に___。', ['行こう', '行くよう', '行きよう', '行けよう'], '行く → く → こ + う → 行こう.'],
  ['Ru-verb: "Let\'s look at the map."', '地図を___。', ['見よう', '見ろう', '見こう', '見るよう'], '見る → drop る + よう.'],
  ['する: "Let\'s reserve a Japanese inn."', '旅館を予約___。', ['しよう', 'そう', 'するよう', 'しろう'], 'する → しよう.'],
  ['くる: "Let\'s come here again."', 'またここに___。', ['来よう', '来ろう', '来こう', '来るよう'], 'くる → こよう (来よう).'],
  ['"Let\'s look for a cheap hotel."', '安いホテルを___。', ['探そう', '探よう', '探しよう', '探すよう'], '探す → す → そ + う.'],
  ['"Let\'s invite Takeshi."', 'たけしさんを___。', ['誘おう', '誘よう', '誘わう', '誘いよう'], '誘う → う → お + う → 誘おう.'],
  ['"Let\'s wait a little more."', 'もう少し___。', ['待とう', '待よう', '待ちよう', '待つよう'], '待つ → つ → と + う.'],
  ['"Shall I help?" (casual offer)', null, ['手伝おうか。', '手伝いようか。', '手伝わうか。', '手伝ようか。'], 'Volitional + か = offer / suggestion: 手伝おうか.'],
  ['What does this mean?', '一緒にそばを食べよう。', ['Let\'s eat soba together.', 'I can eat soba.', 'I ate soba together.', 'I want to eat soba.'], '食べよう = casual "let\'s eat".'],
  ['"Let\'s swim in the pool."', 'プールで___。', ['泳ごう', '泳よう', '泳ぎよう', '泳ぐよう'], '泳ぐ → ぐ → ご + う.'],
  ['"Let\'s draw a picture."', '絵を___。', ['描こう', '描よう', '描きよう', '描くよう'], '描く → く → こ + う.'],
  ['Cross-pattern (から + volitional): "There\'s no class tomorrow, so let\'s go somewhere tonight."', 'あしたは授業がないから、今晩どこかに___。', ['行こう', '行きましょうか', '行けよう', '行くよう'], 'Casual suggestion with the volitional.'],
])

export const ch15VolitionalOmouQuiz = makeQuiz({
  id: 'ch15-toomotteimasu',
  title: 'Ch.15 · 〜(よ)うと思っています',
  topic: 'Plans',
  grammarPoint: 'Volitional + と思っています',
  description: 'Talk about a plan you have been thinking about: volitional + と思っています ("I\'m thinking of…"). と思います sounds like a decision made on the spot. 〜ようと思いました, but… = "I meant to…, but…".',
}, [
  ['"I\'m thinking of studying abroad."', '留学___と思っています。', ['しよう', 'しよ', 'するよう', 'しろう'], 'する → しよう + と思っています.'],
  ['"I\'m thinking of buying insurance."', '保険に___と思っています。', ['入ろう', '入りよう', '入るよう', '入よう'], '入る (u-verb) → 入ろう.'],
  ['"I\'m thinking of selling my furniture."', '家具を___と思っています。', ['売ろう', '売よう', '売りよう', '売るよう'], '売る (u-verb) → 売ろう.'],
  ['Which sentence expresses a plan you\'ve been considering?', null, ['ボランティア活動に参加しようと思っています。', 'ボランティア活動に参加すると思っています。', 'ボランティア活動に参加したと思っています。', 'ボランティア活動に参加しようと言っています。'], 'Volitional + と思っています = intention.'],
  ['"I\'m thinking of watching that movie one more time."', 'あの映画をもう一度___と思っています。', ['見よう', '見ろう', '見るよう', '見こう'], '見る → 見よう.'],
  ['What does this mean?', 'メールしようと思いましたが、忘れました。', ['I meant to send an email, but I forgot.', 'I sent an email, but forgot what I wrote.', 'I think I\'ll email and forget.', 'I forgot that I emailed.'], '〜ようと思いました、が… = "I was going to…, but…".'],
  ['"I\'m thinking of withdrawing money."', 'お金を___と思っています。', ['下ろそう', '下ろよう', '下ろしよう', '下ろすよう'], '下ろす → す → そ + う.'],
  ['Third person: "Takeshi is thinking of sightseeing in Kyoto."', 'たけしさんは京都で___と思っています。', ['観光しよう', '観光するよう', '観光しろう', '観光そう'], 'と思っています also works for others\' ongoing plans.'],
  ['"I\'m thinking of presenting about Japanese customs."', '日本の習慣について___と思っています。', ['発表しよう', '発表するよう', '発表しろう', '発表しよ'], '発表する → 発表しよう.'],
  ['Cross-pattern (ので + volitional): "I want good grades, so I\'m thinking of studying all day."', 'いい成績を取りたいので、一日中___と思っています。', ['勉強しよう', '勉強する', '勉強しろう', '勉強しよ'], 'Intention → volitional + と思っています.'],
])

export const ch15TeokuQuiz = makeQuiz({
  id: 'ch15-teoku',
  title: 'Ch.15 · 〜ておく',
  topic: 'Preparation',
  grammarPoint: '〜ておく',
  description: 'Do something in advance / in preparation: て-form + おく (u-verb). ておきます, ておきました, ておいてください. Casual contraction: 〜とく (買っとく).',
}, [
  ['"I\'ll reserve the hotel (in advance)."', 'ホテルを___。', ['予約しておきます', '予約しおきます', '予約するておきます', '予約しておいます'], '予約して + おきます.'],
  ['"I\'ll buy batteries in case of an earthquake."', '地震のために電池を___。', ['買っておきます', '買いておきます', '買うておきます', '買んでおきます'], '買う → 買って + おきます.'],
  ['Past: "I looked it up beforehand."', '___。', ['調べておきました', '調べておいました', '調べおきました', '調べてきおきました'], 'おく is a u-verb: おきました (not おいました).'],
  ['"Please read this before class."', '授業の前にこれを___ください。', ['読んでおいて', '読んでおきて', '読みておいて', '読んでおって'], 'おく → て-form おいて → 読んでおいてください.'],
  ['What does this mean?', '割引券をもらっておきました。', ['I got discount coupons (so they\'re ready for later).', 'I got discount coupons by accident.', 'I will get discount coupons.', 'I couldn\'t get discount coupons.'], 'ておく = prepared in advance.'],
  ['Casual form of 買っておく', null, ['買っとく', '買っおく', '買っく', '買っとおく'], 'In casual speech 〜ておく often becomes 〜とく.'],
  ['"Before the deadline, I\'ll write it (ahead of time)."', '締め切りの前に___。', ['書いておきます', '書きておきます', '書くておきます', '書っておきます'], '書く → 書いて + おきます.'],
  ['Cross-pattern (ておく + volitional): "Let\'s look at the map beforehand."', '地図を見て___。', ['おこう', 'おきよう', 'おくよう', 'おいよう'], 'おく → volitional おこう.'],
  ['Cross-pattern (ておく + と思っています): "I\'m thinking of reserving the inn ahead of time."', '旅館を___と思っています。', ['予約しておこう', '予約しておきよう', '予約しおこう', '予約するておこう'], '予約しておく → volitional 予約しておこう.'],
  ['"Please take out the money in advance."', 'お金を___ください。', ['下ろしておいて', '下ろしておきて', '下ろすておいて', '下ろしおいて'], '下ろす → 下ろして + おいて + ください.'],
])

export const ch15RelativeQuiz = makeQuiz({
  id: 'ch15-relative',
  title: 'Ch.15 · Clauses that describe nouns',
  topic: 'Noun modifiers',
  grammarPoint: 'Sentence + Noun',
  description: 'Put a short-form clause before a noun to describe it: きのう描いた絵 (the picture I drew yesterday), 日本語が話せる人 (a person who can speak Japanese). The subject inside the clause takes が (not は). No の/な between the verb and the noun.',
}, [
  ['"the picture I drew yesterday"', null, ['きのう描いた絵', 'きのう絵を描いた', '絵きのう描いた', 'きのう描いたの絵'], 'Clause (きのう描いた) + noun (絵).'],
  ['"a person who can speak Japanese"', null, ['日本語が話せる人', '日本語が話せるの人', '人日本語が話せる', '日本語が話せるな人'], 'No の or な between the clause and the noun.'],
  ['"the movie I want to see"', null, ['見たい映画', '見たいの映画', '映画見たい', '見たいな映画'], 'たい-form (an い-adj) + noun.'],
  ['"Who is the person wearing glasses?"', '___はだれですか。', ['めがねをかけている人', 'めがねをかけているな人', 'めがねをかけていますの人', '人めがねをかけている'], 'ている clause + 人.'],
  ['Which particle marks the subject inside the clause?', '友だち___住んでいる町', ['が', 'は', 'を', 'で'], 'Inside a noun-modifying clause, the subject takes が, not は.'],
  ['"a student who doesn\'t have insurance"', '保険に___学生', ['入っていない', '入っていません', '入っていないの', '入らないな'], 'Use short forms inside the clause.'],
  ['"a custom I didn\'t know"', null, ['知らなかった習慣', '知りませんでした習慣', '知らなかったの習慣', '習慣知らなかった'], 'Short past negative + noun.'],
  ['What does this mean?', '去年卒業した友だち', ['a friend who graduated last year', 'I graduated with a friend last year', 'the friend will graduate next year', 'a friend I met at graduation'], 'Clause 去年卒業した describes 友だち.'],
  ['Which sentence is correct?', null, ['これは母が作った料理です。', 'これは母が作りました料理です。', 'これは母が作ったの料理です。', 'これは料理母が作りました。'], 'Use short forms (作った), not polite forms, inside the clause.'],
  ['"the building you can see over there"', 'あそこに___建物', ['見える', '見えます', '見えるの', '見えるな'], '見える (to be visible) + noun.'],
  ['"Is there a store that sells cheap furniture?"', '安い家具を___はありますか。', ['売っている店', '売っているの店', '店が売っている', '売るの店'], 'Clause + 店.'],
  ['Cross-pattern (clause + volitional + と思う): "I\'m thinking of joining an activity where I can talk with foreigners."', '外国人と___に参加しようと思っています。', ['話せる活動', '話せるの活動', '話せます活動', '話せるな活動'], 'Potential clause + noun: 話せる活動.'],
])

export const ch15ReviewQuiz = makeQuiz({
  id: 'ch15-review',
  title: 'Ch.15 · Chapter review',
  topic: 'Review',
  grammarPoint: 'Lesson 15 まとめ',
  description: 'Mixed practice: volitional form, 〜ようと思っています, 〜ておく, and noun-modifying clauses.',
}, [
  ['"Let\'s chat at a café." (casual)', '喫茶店で___。', ['しゃべろう', 'しゃべよう', 'しゃべりよう', 'しゃべるよう'], 'しゃべる is a u-verb → しゃべろう.'],
  ['"I\'ll look up the schedule in advance."', '予定を___。', ['調べておきます', '調べおきます', '調べるておきます', '調べっておきます'], '調べて + おきます.'],
  ['"the person I\'m dating"', '私が___人', ['付き合っている', '付き合っています', '付き合っているの', '付き合いている'], 'Short form ている clause + 人.'],
  ['"I\'m thinking of participating in the wedding."', '結婚式に___と思っています。', ['参加しよう', '参加するよう', '参加しろう', '参加そう'], 'Volitional + と思っています.'],
  ['"Let\'s be careful."', '気を___。', ['つけよう', 'つけろう', 'つこう', 'つけるよう'], 'つける (ru-verb) → つけよう.'],
  ['"the station where we arrive tomorrow"', 'あした___駅', ['着く', '着きます', '着くの', '着くな'], 'Dictionary form for a future clause.'],
  ['"I\'ll ask my friend (in advance)."', '友だちに___。', ['聞いておきます', '聞きておきます', '聞くておきます', '聞っておきます'], '聞く → 聞いて + おきます.'],
  ['"I\'m thinking of graduating next year."', '来年___と思っています。', ['卒業しよう', '卒業する', '卒業しろう', '卒業しよ'], 'Volitional expresses intention.'],
  ['"Is there a place where you can rent a jacket?"', 'ジャケットが___ところはありますか。', ['借りられる', '借りられます', '借りられるの', '借りるられる'], 'Potential clause + noun.'],
  ['"Shall we look for it together?" (casual)', '一緒に___。', ['探そうか', '探しようか', '探すようか', '探よか'], 'Volitional + か.'],
])
