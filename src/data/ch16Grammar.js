// Chapter 16 Grammar — Genki II (忘れ物)
// Questions are original practice items; choices[0] is the answer (shuffled by makeQuiz).
import { makeQuiz } from './grammarHelpers.js'

export const ch16TeageruQuiz = makeQuiz({
  id: 'ch16-teageru',
  title: 'Ch.16 · 〜てあげる／てくれる／てもらう',
  topic: 'Favors',
  grammarPoint: '〜てあげる・〜てくれる・〜てもらう',
  description: 'Giving and receiving actions (favors). て-form + あげる: I/someone do something for others. て-form + くれる: someone does something for me/my side. て-form + もらう: I get someone (に) to do something. Keep the main verb\'s particles: 妹にお金を貸してあげた.',
}, [
  ['"I lent my little sister money (as a favor)."', '私は妹にお金を___。', ['貸してあげました', '貸してくれました', '貸してもらいました', '貸しあげました'], 'Speaker does a favor for someone → てあげる.'],
  ['"My friend showed me around Kyoto."', '友だちが京都を___。', ['案内してくれました', '案内してあげました', '案内してもらわれました', '案内しくれました'], 'Someone does a favor for me → てくれる.'],
  ['"I had my friend correct my essay."', '私は友だち___作文を直してもらいました。', ['に', 'が', 'を', 'で'], 'てもらう: the person who does the favor takes に.'],
  ['"Takeshi treated me to lunch."', 'たけしさんが昼ご飯を___。', ['おごってくれました', 'おごってあげました', 'おごってもらいました', 'おごりくれました'], 'Toward me → てくれる.'],
  ['"I got my mother to wake me up at seven."', '母に七時に___。', ['起こしてもらいました', '起こしてくれました', '起こしてあげました', '起きてもらいました'], 'I receive the favor → てもらう. Note: 起こす = wake someone up (transitive).'],
  ['"I\'ll take you to the station." (offering a favor)', '駅まで___。', ['連れていってあげます', '連れていってくれます', '連れていってもらいます', '連れていきあげます'], 'Doing something for the listener → てあげる (can sound condescending, so use carefully).'],
  ['What does this mean?', '駅員さんに道を教えてもらいました。', ['I had the station attendant tell me the way.', 'I told the station attendant the way.', 'The station attendant asked me the way.', 'I taught the station attendant.'], 'XにVてもらう = I got X to do V for me.'],
  ['"My parents came to pick me up at the airport."', '両親が空港まで___。', ['迎えに来てくれました', '迎えに来てあげました', '迎えに来てもらいました', '迎えに来くれました'], 'Favor toward me → てくれる.'],
  ['Which sentence is wrong?', null, ['私は友だちに手伝ってくれました。', '友だちが手伝ってくれました。', '友だちに手伝ってもらいました。', '私は友だちを手伝ってあげました。'], 'With てくれる the doer is the subject (が), and 私 can\'t be the doer.'],
  ['Cross-pattern (てもらう + たい): "I want to have my teacher write a letter of recommendation."', '先生に推薦状を___。', ['書いてもらいたいです', '書いてくれたいです', '書いてあげたいです', '書きてもらいたいです'], 'てもらう → stem てもらい + たい.'],
])

export const ch16RequestQuiz = makeQuiz({
  id: 'ch16-request',
  title: 'Ch.16 · 〜ていただけませんか',
  topic: 'Polite requests',
  grammarPoint: '〜ていただけませんか',
  description: 'Asking a favor, from casual to polite: 〜てくれない？ / 〜てもらえない？ (friends) → 〜てくれませんか / 〜てもらえませんか → 〜ていただけませんか (most polite, e.g. to a professor).',
}, [
  ['Most polite: asking your professor "Could you please write a letter of recommendation?"', '推薦状を___。', ['書いていただけませんか', '書いてくれない', '書いてもらえない', '書いてあげませんか'], 'For superiors, use 〜ていただけませんか.'],
  ['Casual to a friend: "Can you lend me your notes?"', 'ノート、___？', ['貸してくれない', '貸していただけませんか', '貸してあげない', '貸しくれない'], 'Casual request: 〜てくれない？'],
  ['Which is the MOST polite?', null, ['説明していただけませんか。', '説明してくれませんか。', '説明してもらえませんか。', '説明してくれない？'], 'いただけませんか is the most polite.'],
  ['"Could you translate this into English?" (polite)', 'これを英語に___。', ['訳していただけませんか', '訳していただけないませんか', '訳しいただけませんか', '訳していただきませんか'], 'て-form 訳して + いただけませんか.'],
  ['"Could you show me that file?" (to a coworker, polite)', 'そのファイルを___。', ['見せてもらえませんか', '見せてもらいませんか', '見てもらえませんか', '見せもらえませんか'], 'もらう → potential もらえる → もらえませんか. 見せる = show.'],
  ['"Can you come pick me up?" (casual)', '迎えに___？', ['来てもらえない', '来てもらわない', '来もらえない', '来てあげない'], 'Casual: 〜てもらえない？'],
  ['What does this mean?', 'ちょっと手伝ってくれませんか。', ['Could you help me a little?', 'I\'ll help you a little.', 'You didn\'t help me.', 'Shall we help?'], '〜てくれませんか = "Would you (do it for me)?"'],
  ['"Could you speak a little more slowly?" (to your teacher)', 'もう少しゆっくり___。', ['話していただけませんか', '話してくれない', '話してあげませんか', '話していただけない'], 'Polite request to a superior.'],
  ['"Could you reply by the end of today?" (polite)', '今日中に返事を___。', ['していただけませんか', 'していただきませんか', 'しいただけませんか', 'してあげませんか'], 'する → して + いただけませんか.'],
  ['Cross-pattern (request + ので): "I don\'t understand, so could you explain once more?"', 'よくわからないので、もう一度___。', ['説明していただけませんか', '説明しいただけませんか', '説明していただけますので', '説明してあげませんか'], 'Reason with ので, then polite request.'],
])

export const ch16ToiiQuiz = makeQuiz({
  id: 'ch16-toii',
  title: 'Ch.16 · 〜といい',
  topic: 'Hopes',
  grammarPoint: '〜といいですね／〜といいんですが',
  description: 'Express hope: present short form + といい. For someone else: 〜といいですね ("I hope… for you"). For yourself: 〜といいんですが／〜といいんだけど ("I hope…"). The clause is usually present tense (晴れるといい), even about the future.',
}, [
  ['Wishing a friend well: "I hope you get a scholarship."', '奨学金がもらえる___。', ['といいですね', 'といいんですが', 'たらいいです', 'のがいいです'], 'For the listener → 〜といいですね.'],
  ['Hoping for yourself: "I hope it doesn\'t rain."', '雨が降らない___。', ['といいんですが', 'といいですね', 'とよかったです', 'でいいです'], 'For yourself → 〜といいんですが.'],
  ['Which form goes before といい?', 'あした___といいですね。', ['晴れる', '晴れた', '晴れて', '晴れます'], 'Use the present short form before といい.'],
  ['"I hope the typhoon doesn\'t come." (for myself)', '台風が___といいんですが。', ['来ない', '来なくて', '来ません', '来なかった'], 'Short negative + といいんですが.'],
  ['"I hope your test is easy." (to a friend)', '試験が___といいですね。', ['易しい', '易しかった', '易しくて', '易しいだ'], 'い-adj present + といいですね.'],
  ['What does this mean?', '財布が見つかるといいですね。', ['I hope your wallet turns up.', 'If you find your wallet, it\'s good.', 'Your wallet was found, good.', 'You should look for your wallet.'], '〜といいですね = hope for the listener.'],
  ['"I hope I can go to graduate school." (myself)', '大学院に___といいんですが。', ['行ける', '行けた', '行けて', '行けます'], 'Potential + といいんですが.'],
  ['Casual: "I hope the weather is good." (myself)', '天気がいい___。', ['といいんだけど', 'といいですね', 'たらいいでした', 'といいだ'], 'Casual version for yourself: 〜といいんだけど.'],
  ['Which is natural when your friend has a job interview?', null, ['いい仕事が見つかるといいですね。', 'いい仕事が見つかるといいんですが。', 'いい仕事が見つかったといいですね。', 'いい仕事が見つけるといいですね。'], 'For the listener → といいですね; use 見つかる (intransitive).'],
  ['Cross-pattern (といい + potential): "I hope I can get a good grade on the final exam." (myself)', '期末試験でいい成績が___といいんですが。', ['取れる', '取られる', '取りれる', '取れて'], '取る (u-verb) → 取れる.'],
])

export const ch16TokiQuiz = makeQuiz({
  id: 'ch16-toki',
  title: 'Ch.16 · 〜時',
  topic: 'When…',
  grammarPoint: '〜時',
  description: '"When…": short form + 時. Tense in the 時 clause shows order: present tense = the main action happens before or at the same time (日本に行く時, buy before going). Past tense = after the 時 event (日本に行った時, buy after arriving). Adj/noun: 寂しい時, 暇な時, 子供の時.',
}, [
  ['"I bought a camera before going to Japan (when I was going)."', '日本に___時、カメラを買いました。', ['行く', '行った', '行って', '行きます'], 'Bought before the trip → present tense 行く時.'],
  ['"I bought a camera in Japan (when I went there)."', '日本に___時、カメラを買いました。', ['行った', '行く', '行って', '行きました'], 'Bought after arriving → past tense 行った時.'],
  ['な-adjective: "When I\'m free, I read comics."', '___時、漫画を読みます。', ['暇な', '暇の', '暇だ', '暇'], 'な-adj + な + 時.'],
  ['Noun: "When I was a child, I lived in Osaka."', '子供___時、大阪に住んでいました。', ['の', 'な', 'だ', 'が'], 'Noun + の + 時.'],
  ['い-adjective: "When I\'m lonely, I call my parents."', '___時、親に電話します。', ['寂しい', '寂しいな', '寂しかったの', '寂しくて'], 'い-adj + 時 directly.'],
  ['"When I got depressed, my friend listened to me."', '___時、友だちが話を聞いてくれました。', ['落ち込んだ', '落ち込む', '落ち込んで', '落ち込みの'], 'The feeling had already happened → past tense.'],
  ['"Say \'いってきます\' when you leave home."', 'うちを___時、「いってきます」と言います。', ['出る', '出た', '出て', '出ます'], 'You say it before/as you leave → present tense.'],
  ['"Say \'ただいま\' when you get home."', 'うちに___時、「ただいま」と言います。', ['帰った', '帰る', '帰って', '帰ります'], 'You say it after arriving → past tense.'],
  ['What does this mean?', '道に迷った時、駅員さんに聞きました。', ['When I got lost, I asked a station attendant.', 'Before getting lost, I asked a station attendant.', 'I got lost because I asked.', 'I asked where the station was.'], 'Past 時 clause: after getting lost.'],
  ['Cross-pattern (時 + てもらう): "When I was sick, my friend took me to the hospital."', '病気の時、友だちに病院に___。', ['連れていってもらいました', '連れていってくれました', '連れていってあげました', '連れていきもらいました'], 'XにVてもらう: I got X to do it.'],
])

export const ch16SumimasenQuiz = makeQuiz({
  id: 'ch16-tesumimasen',
  title: 'Ch.16 · 〜てすみませんでした',
  topic: 'Apologies',
  grammarPoint: '〜てすみませんでした',
  description: 'Apologize for what you did: て-form + すみませんでした (casual: 〜てごめん). For something you didn\'t do: 〜なくてすみませんでした.',
}, [
  ['"Sorry for being late."', '___すみませんでした。', ['遅くなって', '遅くなった', '遅くなるて', '遅くなりて'], 'て-form + すみませんでした.'],
  ['"Sorry I overslept."', '___すみませんでした。', ['朝寝坊して', '朝寝坊した', '朝寝坊するて', '朝寝坊しって'], 'する → して.'],
  ['"Sorry I didn\'t reply."', '返事を___すみませんでした。', ['しなくて', 'しないで', 'しなかって', 'しなくって'], 'Negative て-form for apologies: 〜なくて.'],
  ['Casual: "Sorry I laughed."', '___ごめん。', ['笑って', '笑った', '笑いて', '笑んで'], 'Casual apology: て-form + ごめん.'],
  ['"Sorry I woke you up."', '___すみませんでした。', ['起こして', '起きて', '起こした', '起こしって'], '起こす (wake someone up) → て-form 起こして. 起きて would mean "I got up".'],
  ['"Sorry I missed the train (and was late)."', '電車に___すみませんでした。', ['乗り遅れて', '乗り遅れた', '乗り遅れるて', '乗り遅りて'], '乗り遅れる (ru-verb) → 乗り遅れて.'],
  ['"Sorry I didn\'t come to class."', '授業に___すみませんでした。', ['来なくて', '来ないで', '来なかった', '来ませんで'], 'Didn\'t do → 〜なくてすみませんでした.'],
  ['What does this mean?', 'この間は失礼なことを言ってすみませんでした。', ['I\'m sorry I said something rude the other day.', 'Excuse me, can I say something?', 'It\'s rude to apologize.', 'You said something rude to me.'], 'て-form apology for a past action.'],
  ['"Sorry I didn\'t hand in my homework."', '宿題を___すみませんでした。', ['出さなくて', '出さないで', '出しなくて', '出なくて'], '出す → 出さない → 出さなくて.'],
  ['Cross-pattern (てくれる + apology context): "Thanks for coming to pick me up — sorry for making you wait."', '迎えに来てくれて、ありがとう。___ごめん。', ['待たせて', '待って', '待たせた', '待たれて'], '待たせる = make (someone) wait → て-form 待たせて.'],
])

export const ch16ReviewQuiz = makeQuiz({
  id: 'ch16-review',
  title: 'Ch.16 · Chapter review',
  topic: 'Review',
  grammarPoint: 'Lesson 16 まとめ',
  description: 'Mixed practice: てあげる／てくれる／てもらう, polite requests, 〜といい, 〜時, 〜てすみませんでした.',
}, [
  ['"My classmate lent me a dictionary."', 'クラスメートが辞書を___。', ['貸してくれました', '貸してあげました', '借りてくれました', '貸しくれました'], 'Toward me → てくれる.'],
  ['"Could you collect the documents?" (to your professor)', '書類を___。', ['集めていただけませんか', '集めてくれない', '集めいただけませんか', '集めてあげませんか'], 'Most polite request.'],
  ['"I hope you find a good job." (to a friend)', 'いい仕事が見つかる___。', ['といいですね', 'といいんですが', 'とよかったです', 'のがいいです'], 'For the listener.'],
  ['"When I went to bed, I turned off the light." (before sleeping)', '___時、電気を消しました。', ['寝る', '寝た', '寝て', '寝ます'], 'Turned off the light before falling asleep → present tense.'],
  ['"Sorry I forgot."', '___すみませんでした。', ['忘れて', '忘れた', '忘れるて', '忘れりて'], 'て-form + すみませんでした.'],
  ['"I had my friend iron my shirt."', '友だちにシャツにアイロンを___。', ['かけてもらいました', 'かけてくれました', 'かけてあげました', 'かかってもらいました'], 'Xに〜てもらう.'],
  ['"When I have trouble, I consult my parents."', '___時、親に相談します。', ['困った', '困る', '困って', '困り'], 'You consult after the trouble arises → past.'],
  ['"Can you take me to the hospital?" (casual)', '病院に連れていって___？', ['くれない', 'あげない', 'いただけない', 'もらわない'], 'Casual request: 〜てくれない？'],
  ['"Sorry I didn\'t go to the meeting."', '会議に___すみませんでした。', ['行かなくて', '行かないで', '行きなくて', '行かなかって'], 'Didn\'t do → なくて.'],
  ['"I\'ll put the sugar in for you."', '砂糖を___。', ['入れてあげます', '入ってあげます', '入れてくれます', '入れあげます'], 'Favor for someone else → てあげる. 入れる = put in (transitive).'],
])
