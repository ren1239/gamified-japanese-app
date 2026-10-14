// Chapter 20 Grammar — Genki II (メアリーさんの買い物)
// Questions are original practice items; choices[0] is the answer (shuffled by makeQuiz).
import { makeQuiz } from './grammarHelpers.js'

export const ch20ExtraModestQuiz = makeQuiz({
  id: 'ch20-extramodest',
  title: 'Ch.20 · Extra-modest expressions',
  topic: 'Extra-modest (丁重語)',
  grammarPoint: 'おります・参ります・申します…',
  description: 'Talk modestly about your own actions to show respect to the listener. いる → おります, 行く/来る → 参ります, 言う → 申します, する → いたします, 食べる/飲む → いただきます, ある → ございます, 〜ている → 〜ております, 〜です → 〜でございます. Usually used in long (ます) forms, often with わたくし.',
}, [
  ['Job interview: "My name is Takeshi Kimura."', 'わたくしは木村たけしと___。', ['申します', 'おっしゃいます', '申しされます', '申されます'], '言う → 申す → 申します (for yourself).'],
  ['"I will be in Japan next year as well."', 'わたくしは来年も日本に___。', ['おります', 'いらっしゃいます', 'おりられます', 'ございます'], 'いる → おります.'],
  ['"I graduated from college this June."', '今年の六月に大学を卒業___。', ['いたしました', 'なさいました', 'いたされました', 'もうしました'], 'する → いたす → いたしました.'],
  ['"I have been studying Japanese for a year."', '一年間日本語を勉強して___。', ['おります', 'いらっしゃいます', 'ございます', 'まいります'], '〜ている → 〜ております.'],
  ['"I\'ll go there tomorrow." (to a customer)', 'あしたそちらに___。', ['参ります', 'いらっしゃいます', '参られます', 'おります'], '行く → 参る → 参ります.'],
  ['Store clerk: "This is the shoe department."', 'こちらは靴売り場___。', ['でございます', 'でおります', 'でいらっしゃいます', 'でござります'], '〜です → 〜でございます.'],
  ['Store clerk: "There is a restroom on the second floor."', 'お手洗いは二階に___。', ['ございます', 'おります', 'いらっしゃいます', 'まいります'], 'ある → ございます.'],
  ['Which sentence is WRONG?', null, ['先生は研究室におります。', 'わたくしは東京に住んでおります。', 'わたくしは山田と申します。', 'あしたまた参ります。'], 'Extra-modest verbs are for yourself (or your side), never for people you respect.'],
  ['"I\'ll have (eat) it." (modest)', 'では、___。', ['いただきます', '召し上がります', 'いただかれます', '食べさせます'], '食べる → いただく.'],
  ['Cross-pattern (extra-modest + ので): "I live in Osaka, so I can\'t come on that day."', '大阪に住んで___ので、その日は参れません。', ['おります', 'いらっしゃいます', 'ございます', 'おりられます'], '〜ている → 〜ております.'],
])

export const ch20HumbleQuiz = makeQuiz({
  id: 'ch20-humble',
  title: 'Ch.20 · Humble expressions',
  topic: 'Humble (謙譲語)',
  grammarPoint: 'お + stem + する',
  description: 'Humbly do something for/toward a person you respect: お + verb stem + する (お持ちする, お貸しする). する-nouns: ご + noun + する (ご案内する). Special humble verbs: いただく (もらう), 伺う (visit / ask), 差し上げる (あげる).',
}, [
  ['"I\'ll carry your bag." (to your teacher)', '先生、かばんを___。', ['お持ちします', 'お持ちになります', 'お持ちいたされます', 'お持ってします'], 'お + 持ち + する.'],
  ['"I\'ll lend you an umbrella." (to a customer)', '傘を___しましょうか。', ['お貸し', 'お貸して', 'お借り', 'ご貸し'], 'お + 貸し + する.'],
  ['"I\'ll show you around." (する-noun)', 'わたくしがご___します。', ['案内', '案内して', 'お案内', '案内し'], 'ご + 案内 + する.'],
  ['"I received a souvenir from my professor."', '先生にお土産を___。', ['いただきました', 'くださいました', 'さしあげました', 'もらわれました'], 'もらう (humble) → いただく.'],
  ['"I gave the professor a present."', '先生にプレゼントを___。', ['差し上げました', 'くださいました', 'いただきました', 'あげられました'], 'あげる (humble) → 差し上げる.'],
  ['"May I visit your home tomorrow?"', 'あしたお宅に___もいいですか。', ['伺って', '伺いて', 'いらっしゃって', '来られて'], '訪ねる/行く (humble) → 伺う.'],
  ['"May I ask you something?"', 'ちょっと___もいいですか。', ['伺って', 'おっしゃって', 'お聞きになって', '聞かれて'], '聞く (ask, humble) → 伺う.'],
  ['Which is humble (for your own action)?', null, ['お待ちします', 'お待ちになります', 'お待ちください', '待たれます'], 'お〜する = humble; お〜になる = honorific.'],
  ['"I\'ll call you later." (to a client)', 'あとでお電話___。', ['します', 'になります', 'なさいます', 'くださいます'], 'Set phrase: お電話します (humble).'],
  ['Cross-pattern (humble + volitional): "Shall I take your coat?" (to a guest)', 'コートをお預かり___か。', ['しましょう', 'になりましょう', 'なさいましょう', 'くださいましょう'], 'お〜する → お〜しましょうか (offer).'],
])

export const ch20NaideQuiz = makeQuiz({
  id: 'ch20-naide',
  title: 'Ch.20 · 〜ないで',
  topic: 'Without doing',
  grammarPoint: '〜ないで',
  description: 'Do Y without doing X / instead of X: short negative + で (宿題をしないで寝た = went to bed without doing homework). Different from 〜なくて (reason/cause, Ch.16).',
}, [
  ['"I went to bed without taking a bath."', 'お風呂に___寝ました。', ['入らないで', '入らなくて', '入りないで', '入らずで'], 'Short negative + で = without doing.'],
  ['"I went out without eating breakfast."', '朝ご飯を___出かけました。', ['食べないで', '食べなくて', '食べないでも', '食べなかって'], '食べない + で.'],
  ['"Please wait without returning home."', '家に___待っていてください。', ['帰らないで', '帰らなくて', '帰りないで', '帰ないで'], '帰る (u-verb) → 帰らない + で.'],
  ['"I watched the anime without sleeping."', '___アニメを見ました。', ['寝ないで', '寝なくて', '寝ないでに', '寝ませんで'], '寝ない + で.'],
  ['Which uses 〜ないで ("without")?', null, ['辞書を使わないで小説を読みました。', '辞書を使わなくて困りました。', '辞書を使わなくてもいいです。', '辞書を使わないと、わかりません。'], '〜ないで + action = without doing.'],
  ['What does this mean?', '傘を持たないで出かけました。', ['I went out without an umbrella.', 'I went out because I didn\'t have an umbrella.', 'I didn\'t go out because of the umbrella.', 'Please don\'t take an umbrella.'], 'Without doing X.'],
  ['"I went straight without turning at the corner."', '角を___まっすぐ行きました。', ['曲がらないで', '曲がらなくて', '曲がりないで', '曲げないで'], '曲がる → 曲がらない + で.'],
  ['"I continued studying without taking a break."', '___勉強を続けました。', ['休まないで', '休まなくて', '休みないで', '休めないで'], '休む → 休まない + で.'],
  ['"Please don\'t worry." (request — different use)', '心配し___ください。', ['ないで', 'なくて', 'ないでも', 'なければ'], '〜ないでください = please don\'t (Genki I).'],
  ['Cross-pattern (ないで + てしまう): "I accidentally went home without saying goodbye."', 'さようならと___帰ってしまいました。', ['言わないで', '言わなくて', '言いないで', '言えないで'], '言う → 言わない + で.'],
])

export const ch20EmbeddedQuiz = makeQuiz({
  id: 'ch20-embedded',
  title: 'Ch.20 · Questions inside sentences',
  topic: 'Embedded questions',
  grammarPoint: '〜か／〜かどうか',
  description: 'Put a question inside a bigger sentence. Question-word questions: short form + か (何を買ったか覚えていません). Yes/no questions: short form + かどうか (おいしいかどうかわかりません). な-adj/noun drop だ before か (学生か, 静かかどうか).',
}, [
  ['"I don\'t remember what I bought."', '何を___覚えていません。', ['買ったか', '買ったかどうか', '買いましたか', '買ったの'], 'Question word + short form + か.'],
  ['"I don\'t know whether it\'s delicious."', 'おいしい___わかりません。', ['かどうか', 'がどうか', 'かどうかの', 'どうか'], 'Yes/no question → かどうか.'],
  ['"Please tell me where the branch office is."', '支店がどこにある___教えてください。', ['か', 'かどうか', 'ですか', 'のを'], 'Question word (どこ) + か.'],
  ['Noun: "I don\'t know if he\'s German."', '彼がドイツ人___わかりません。', ['かどうか', 'だかどうか', 'なかどうか', 'のかどうか'], 'Noun + かどうか (no だ).'],
  ['な-adj: "I wonder whether the town is quiet."', '町が___かどうか知りたいです。', ['静か', '静かだ', '静かな', '静かの'], 'な-adj drops だ before か.'],
  ['"Do you know when the movie starts?"', '映画がいつ___知っていますか。', ['始まるか', '始まるかどうか', '始まりますか', '始まりか'], 'いつ + short form + か.'],
  ['What does this mean?', 'このスニーカーが返品できるかどうか聞いてみます。', ['I\'ll ask whether I can return these sneakers.', 'I\'ll return these sneakers and ask.', 'I asked how to return the sneakers.', 'I can\'t return these sneakers.'], 'かどうか = whether or not.'],
  ['"I don\'t know who the person in charge is."', '係の者がだれ___わかりません。', ['か', 'かどうか', 'がか', 'ですか'], 'Question word + か (noun drops だ).'],
  ['"Let\'s check whether the shop is open."', '店が開いている___調べましょう。', ['かどうか', 'のどうか', 'かどか', 'どうか'], 'Yes/no → かどうか.'],
  ['Cross-pattern (embedded question + ないで): "I bought it without checking how heavy it is."', 'どのぐらい重い___調べないで、買いました。', ['か', 'かどうか', 'ですか', 'の'], 'Question word phrase (どのぐらい) + か.'],
])

export const ch20ToiuQuiz = makeQuiz({
  id: 'ch20-toiu',
  title: 'Ch.20 · Name という Item',
  topic: 'Called…',
  grammarPoint: 'XというY',
  description: '"A Y called X" — introduce a name the listener may not know: 「ドラえもん」というアニメ, 「すし屋」という店. Also: 〜という意味 (the meaning "…").',
}, [
  ['"an anime called \'Doraemon\'"', '「ドラえもん」___アニメ', ['という', 'といって', 'だというの', 'のという'], 'Name + という + noun.'],
  ['"Do you know a novel called \'Kokoro\'?"', '「こころ」___小説を知っていますか。', ['という', 'といい', 'っていうの', 'との'], 'XというY.'],
  ['"I went to a shop called Sakura-ya."', '「さくら屋」という___に行きました。', ['店', 'の店', 'な店', 'に店'], 'という directly modifies the noun.'],
  ['What does this mean?', '「扇子」というのは何ですか。', ['What is a "sensu"?', 'Do you have a sensu?', 'Who said "sensu"?', 'Is this called a sensu?'], 'Xというのは何ですか = "What is X?"'],
  ['"There\'s a town called Nagano."', '長野___町があります。', ['という', 'といった', 'と言います', 'と言うの'], 'Name + という + 町.'],
  ['"What does the word \'fushigi\' mean?"', '「不思議」___言葉はどういう意味ですか。', ['という', 'と言った', 'のいう', 'と言い'], 'XというY.'],
  ['"I like a band called \'Arashi\'."', '「嵐」というバンドが___。', ['好きです', '好きます', '好きいです', '好きだです'], 'Focus check: 好き is a な-adjective → 好きです.'],
  ['Casual: "a game called…"', '「ポケモン」___ゲーム', ['っていう', 'って', 'とう', 'ていう'], 'Casual という → っていう.'],
  ['"I met a person called Mr. Tanaka."', '田中さん___人に会いました。', ['という', 'というの', 'とは', 'なる'], 'Name + という + 人.'],
  ['Cross-pattern (という + embedded question): "Do you know what an anime called \'Totoro\' is about?"', '「トトロ」というアニメが何についての話___知っていますか。', ['か', 'かどうか', 'ですか', 'という'], 'Question word phrase + か.'],
])

export const ch20YasuiNikuiQuiz = makeQuiz({
  id: 'ch20-yasui-nikui',
  title: 'Ch.20 · 〜やすい／〜にくい',
  topic: 'Easy / hard to…',
  grammarPoint: 'Stem + やすい・にくい',
  description: 'Verb stem + やすい = easy to do; + にくい = hard to do. They conjugate as い-adjectives: 読みにくくない, 使いやすかった, 書きやすいペン.',
}, [
  ['"This pen is easy to write with."', 'このペンは___です。', ['書きやすい', '書くやすい', '書いてやすい', '書けやすい'], 'Stem 書き + やすい.'],
  ['"This letter (character) is hard to read."', 'この字は___です。', ['読みにくい', '読むにくい', '読んでにくい', '読みにくいだ'], 'Stem 読み + にくい.'],
  ['"These headphones are easy to use."', 'このヘッドホンは___です。', ['使いやすい', '使うやすい', '使ってやすい', '使いやすいな'], 'Stem 使い + やすい.'],
  ['Past: "That novel was hard to understand."', 'あの小説はわかり___。', ['にくかったです', 'にくいでした', 'にくくでした', 'にくいかったです'], 'にくい (い-adj) → past にくかったです.'],
  ['Negative: "This shirt isn\'t easy to wash."', 'このシャツは洗い___。', ['やすくないです', 'やすいじゃないです', 'やすいないです', 'やすくなかったでした'], 'やすい → やすくない.'],
  ['Before a noun: "an easy-to-live-in town"', '___町', ['住みやすい', '住みやすいな', '住むやすい', '住みやすの'], 'やすい + noun directly.'],
  ['What does this mean?', 'このスープは重くて、食べにくいです。', ['This soup is heavy and hard to eat.', 'This soup is heavy, so I ate it quickly.', 'This soup is easy to eat.', 'I don\'t want to eat this soup.'], 'Stem + にくい = hard to.'],
  ['"The station is easy to find."', '駅は見つけ___です。', ['やすい', 'にくい', 'やすく', 'やすいの'], 'Easy = やすい.'],
  ['"Sneakers are easy to walk in."', 'スニーカーは___です。', ['歩きやすい', '歩くやすい', '歩いてやすい', '歩けやすい'], 'Stem 歩き + やすい.'],
  ['Cross-pattern (やすい + し): "This apartment is easy to live in — it\'s quiet and close."', 'このアパートは静かだし、近いし、___。', ['住みやすいです', '住むやすいです', '住みやすいだです', '住みやすくです'], 'Stem + やすいです.'],
])

export const ch20ReviewQuiz = makeQuiz({
  id: 'ch20-review',
  title: 'Ch.20 · Chapter review',
  topic: 'Review',
  grammarPoint: 'Lesson 20 まとめ',
  description: 'Mixed practice: extra-modest and humble expressions, 〜ないで, embedded questions, という, 〜やすい／〜にくい.',
}, [
  ['Clerk: "Sorry to keep you waiting." (very polite)', 'お___しました。', ['待たせ', '待ち', '待たれ', '待って'], 'Set phrase: お待たせしました.'],
  ['"I\'ll exchange it for you." (humble)', 'お取り替え___。', ['します', 'になります', 'なさいます', 'ください'], 'お〜する (humble).'],
  ['"I came without making a reservation."', '予約し___来ました。', ['ないで', 'なくて', 'なければ', 'ないでも'], 'Without doing → ないで.'],
  ['"I don\'t know whether he will come."', '彼が来る___わかりません。', ['かどうか', 'がどうか', 'ですか', 'からか'], 'Yes/no → かどうか.'],
  ['"a shop called Tanaka-ya"', '「田中屋」___店', ['という', 'といい', 'のいう', 'とする'], 'XというY.'],
  ['"This dictionary is easy to use."', 'この辞書は使い___。', ['やすいです', 'にくいです', 'やすくです', 'やすいだです'], 'Easy = やすい.'],
  ['"My name is Yamada." (job interview)', '山田と___。', ['申します', 'おっしゃいます', '申されます', '言われます'], 'Extra-modest 言う → 申す.'],
  ['"Please tell me where the second floor is."', '二階がどこ___教えてください。', ['か', 'かどうか', 'ですか', 'がか'], 'Question word + か.'],
  ['"I will visit tomorrow." (humble)', 'あした___。', ['伺います', 'いらっしゃいます', '伺われます', '来られます'], 'Humble visit → 伺う.'],
  ['"There is an elevator over there." (store clerk)', 'エレベーターはあちらに___。', ['ございます', 'いらっしゃいます', 'おります', 'でございます'], 'ある → ございます.'],
])
