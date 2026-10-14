// Chapter 21 Grammar — Genki II (どろぼう)
// Questions are original practice items; choices[0] is the answer (shuffled by makeQuiz).
import { makeQuiz } from './grammarHelpers.js'

export const ch21PassiveQuiz = makeQuiz({
  id: 'ch21-passive',
  title: 'Ch.21 · Passive sentences',
  topic: 'Passive',
  grammarPoint: '〜られる・〜れる',
  description: 'Say something (usually unpleasant) was done to you: (victim) は (villain) に (passive verb). Ru-verbs: drop る + られる (食べられる). U-verbs: -u → -areru (盗む → 盗まれる, 買う → 買われる). する → される, くる → こられる. Also used for good things (ほめられる).',
}, [
  ['"My wallet was stolen by a thief." (I had my wallet stolen)', '私はどろぼうに財布を___。', ['盗まれました', '盗めました', '盗ませました', '盗みられました'], '盗む → む → ま + れる → 盗まれる.'],
  ['"I was bitten by a mosquito."', '蚊に___。', ['刺されました', '刺せました', '刺させました', '刺しられました'], '刺す → さ + れる → 刺される.'],
  ['"My younger brother kicked me." → passive', '私は弟に___。', ['けられました', 'けれました', 'けさせました', 'けりました'], 'ける (u-verb) → けら + れる.'],
  ['Who takes に in a passive sentence?', '私は同僚___ばかにされました。', ['に', 'が', 'を', 'で'], 'The doer (villain) is marked with に.'],
  ['Ru-verb: "My cake was eaten by my roommate."', 'ルームメイトにケーキを___。', ['食べられました', '食べれました', '食べさせました', '食べらせました'], '食べる → 食べられる.'],
  ['する: "I was insulted."', 'ばかに___。', ['されました', 'しられました', 'させました', 'すられました'], 'する → される.'],
  ['くる: "A friend came over (and I was bothered) while I was studying."', '勉強している時、友だちに___。', ['来られました', '来させました', '来れました', '来らせました'], 'くる → こられる (suffering passive).'],
  ['"I was praised by my teacher." (positive)', '先生に___。', ['ほめられました', 'ほめれました', 'ほめさせました', 'ほめりました'], 'ほめる (ru-verb) → ほめられる.'],
  ['買う-type verbs: "My bread was bought up by someone." passive of 買う', null, ['買われる', '買あれる', '買いられる', '買られる'], 'Verbs ending in う use わ: 買う → 買われる.'],
  ['What does this mean?', '電車でだれかに足を踏まれました。', ['Someone stepped on my foot on the train.', 'I stepped on someone\'s foot.', 'I was able to step on the train.', 'I made someone step on my foot.'], 'Passive: I had my foot stepped on.'],
  ['"I was told off by my parents."', '両親に___。', ['しかられました', 'しかれました', 'しからせました', 'しかりました'], 'しかる → しから + れる.'],
  ['Cross-pattern (passive + てしまう): "I ended up being rejected by her."', '彼女に___しまいました。', ['ふられて', 'ふって', 'ふらせて', 'ふれて'], 'ふる → ふられる → て-form ふられて.'],
])

export const ch21TearuQuiz = makeQuiz({
  id: 'ch21-tearu',
  title: 'Ch.21 · 〜てある',
  topic: 'Done & ready',
  grammarPoint: '〜てある',
  description: 'Transitive verb + てある: something has been done (on purpose, often in preparation) and the result remains. The thing takes が: ポスターが貼ってある (a poster has been put up). Compare intransitive + ている (Ch.18: 窓が開いている = the window is open).',
}, [
  ['"A poster has been put up on the wall."', '壁にポスターが___。', ['貼ってあります', '貼っています', '貼られます', '貼りてあります'], '貼る (transitive) + てある.'],
  ['Which particle marks the thing in a てある sentence?', '机の上に花___置いてあります。', ['が', 'を', 'に', 'で'], 'てある sentences use が for the thing.'],
  ['"The present has been wrapped (and is ready)."', 'プレゼントが___。', ['包んであります', '包まれます', '包みてあります', '包んでおきます'], '包む → 包んで + ある.'],
  ['"The window has been left open (on purpose)."', '窓が___。', ['開けてあります', '開いてあります', '開けられてあります', '開かれてあります'], 'Transitive 開ける + てある (someone opened it on purpose).'],
  ['What does this mean?', 'ビールが冷蔵庫に入れてあります。', ['Beer has been put in the fridge (for later).', 'The beer is going into the fridge.', 'Please put beer in the fridge.', 'Someone is putting beer in the fridge.'], 'てある = done and the result remains.'],
  ['"Your name has been written here."', 'ここに名前が___。', ['書いてあります', '書いています', '書けてあります', '書きてあります'], '書く → 書いて + ある.'],
  ['Which is correct?', null, ['ホテルが予約してあります。', 'ホテルが予約しています。', 'ホテルが予約してています。', 'ホテルが予約されてあります。'], 'する verbs: 予約してある, with が.'],
  ['"The room has been cleaned (and is ready for guests)."', '部屋がきれいに___。', ['してあります', 'しています', 'なってあります', 'されてあります'], 'きれいにする + てある.'],
  ['"Gasoline has been bought (already)."', 'ガソリンが___。', ['買ってあります', '買われてあります', '買っています', '買いてあります'], '買う → 買って + ある.'],
  ['Cross-pattern (てある + から): "The bread has been baked, so let\'s eat."', 'パンが___から、食べましょう。', ['焼いてある', '焼いている', '焼かれる', '焼けてある'], '焼く (transitive) → 焼いてある.'],
])

export const ch21AidaniQuiz = makeQuiz({
  id: 'ch21-aidani',
  title: 'Ch.21 · 〜間に',
  topic: 'While / during',
  grammarPoint: '〜間に',
  description: 'X 間に Y: Y happens at some point during X. X is usually ている or a noun + の (留守の間に, 寝ている間に). Use 間 (without に) when Y lasts the whole time.',
}, [
  ['"A thief came in while I was out."', '留守___、どろぼうが入りました。', ['の間に', 'の間', 'な間に', 'に間'], 'Noun + の + 間に.'],
  ['"While I was sleeping, my friend called."', '___間に、友だちから電話がありました。', ['寝ている', '寝る', '寝た', '寝て'], 'ている + 間に.'],
  ['"Please wait while I change clothes."', '私が___間、待っていてください。', ['着替えている', '着替えた', '着替えて', '着替えます'], 'Y lasts the whole time → 間 (no に).'],
  ['What does this mean?', '昼寝をしている間に、雨が降りました。', ['It rained while I was napping.', 'I napped while it was raining all day.', 'I napped after the rain.', 'It will rain while I nap.'], '間に = at some point during.'],
  ['"During the summer vacation, I\'ll save money."', '夏休みの___、お金をためます。', ['間に', '間で', 'うちで', 'ながら'], 'Noun の間に.'],
  ['"While my parents were in Japan, I worked part-time."', '両親が日本に___間に、アルバイトをしました。', ['いる', 'いた', 'いて', 'います'], 'State verb いる + 間に.'],
  ['"Someone stole my bike while I was in the store."', '店にいる___、自転車を盗まれました。', ['間に', '間', 'ながら', '時間'], 'One event during another → 間に.'],
  ['Which describes something that lasted the whole time?', null, ['授業の間、ずっと寝ていました。', '授業の間に、一回寝ました。', '授業の間に、電話がありました。', '授業の間に、友だちが来ました。'], 'ずっと + 間 (no に) = the whole time.'],
  ['"While the baby is sleeping, let\'s eat."', '赤ちゃんが寝ている___、食べましょう。', ['間に', 'ながら', 'の間', 'から'], 'Different subjects → 間に (ながら needs the same subject).'],
  ['Cross-pattern (間に + passive): "My cake was eaten while I was out."', '出かけている間に、ケーキを___。', ['食べられました', '食べさせました', '食べらせました', '食べれました'], 'Passive (suffering): 食べられる.'],
])

export const ch21AdjSuruQuiz = makeQuiz({
  id: 'ch21-adj-suru',
  title: 'Ch.21 · Adjective + する',
  topic: 'Make it…',
  grammarPoint: '〜くする／〜にする',
  description: 'Make something a certain way: い-adj → 〜くする (部屋を明るくする, 音を小さくする). な-adj → 〜にする (部屋をきれいにする, 静かにする). Compare 〜くなる／〜になる (it becomes…).',
}, [
  ['"Please make the room brighter."', '部屋を___してください。', ['明るく', '明るい', '明るいに', '明るくて'], 'い-adj: 明るい → 明るく + する.'],
  ['"Let\'s make the environment safe."', '環境を___しましょう。', ['安全に', '安全く', '安全な', '安全だ'], 'な-adj: 安全 → 安全に + する.'],
  ['"Please be quiet." (make it quiet)', '___してください。', ['静かに', '静かく', '静かな', '静かで'], '静か → 静かに + する.'],
  ['"Please turn the TV volume down."', 'テレビの音を___してください。', ['小さく', '小さい', '小さに', '小さくて'], '小さい → 小さく + する.'],
  ['What\'s the difference?', '部屋がきれいになりました。 vs. 部屋をきれいにしました。', ['なる = it became clean; する = someone made it clean', 'They mean exactly the same', 'なる = past; する = future', 'する = it became clean; なる = I made it clean'], 'なる (become) is intransitive; する (make) is transitive.'],
  ['"The government made tuition cheaper."', '政府は授業料を___。', ['安くしました', '安いしました', '安くなりました', '安にしました'], '安い → 安く + しました.'],
  ['"I made my hair short."', '髪を___しました。', ['短く', '短い', '短に', '短くて'], '短い → 短く + する.'],
  ['"My roommate made the room messy."', 'ルームメイトが部屋をめちゃくちゃに___。', ['しました', 'なりました', 'なれました', 'ありました'], 'な-adj + に + する (someone made it so).'],
  ['"Please make it a little warmer."', 'もう少し___してください。', ['暖かく', '暖かい', '暖かに', '暖かくて'], '暖かい → 暖かく.'],
  ['Cross-pattern (adj + する + てある): "The room has been made clean (for the guests)."', '部屋がきれいに___。', ['してあります', 'なってあります', 'してています', 'されてあります'], 'きれいにする + てある.'],
])

export const ch21TehoshiiQuiz = makeQuiz({
  id: 'ch21-tehoshii',
  title: 'Ch.21 · 〜てほしい',
  topic: 'Want someone to…',
  grammarPoint: '〜てほしい',
  description: 'Want someone (に) to do something: (person) に + て-form + ほしい (友だちに手伝ってほしい). Don\'t want them to: 〜ないでほしい. ほしい conjugates as an い-adjective.',
}, [
  ['"I want my friend to help me."', '友だち___手伝ってほしいです。', ['に', 'が', 'を', 'で'], 'The person you want to act takes に.'],
  ['"I want you to believe me."', '私を___ほしいです。', ['信じて', '信じる', '信じたい', '信じって'], 'て-form + ほしい.'],
  ['"I don\'t want you to complain."', '文句を___ほしいです。', ['言わないで', '言わなくて', '言ってない', '言いないで'], 'Negative: 〜ないでほしい.'],
  ['"I want my parents to contact me."', '両親に___ほしいです。', ['連絡して', '連絡する', '連絡したい', '連絡しって'], 'する → して + ほしい.'],
  ['What does this mean?', 'ルームメイトにもっと部屋を片付けてほしいです。', ['I want my roommate to tidy up the room more.', 'I want to tidy up my roommate\'s room.', 'My roommate wants me to tidy up.', 'I tidied up for my roommate.'], 'Xに〜てほしい = I want X to…'],
  ['Difference: 〜たい vs 〜てほしい', null, ['たい = I want to do; てほしい = I want someone else to do', 'They mean the same thing', 'てほしい = I want to do', 'たい is for others, てほしい is for me'], 'たい: my action. てほしい: someone else\'s action.'],
  ['"I don\'t want you to bully my little brother."', '弟を___ほしいです。', ['いじめないで', 'いじめなくて', 'いじめてない', 'いじめないでも'], 'いじめない + で + ほしい.'],
  ['Past: "I wanted him to praise me."', '彼にほめて___。', ['ほしかったです', 'ほしいでした', 'ほしくでした', 'ほしいかったです'], 'ほしい → past ほしかったです.'],
  ['"I want the rain to stop."', '雨に___ほしいです。', ['やんで', 'やめて', 'やむ', 'やみて'], 'やむ (stop, intransitive) → やんで.'],
  ['Cross-pattern (てほしい + passive context): "I was laughed at. I didn\'t want them to laugh."', '笑われました。笑わ___ほしかったです。', ['ないで', 'なくて', 'れないで', 'ないでも'], 'Negative wish: 笑わないでほしかった.'],
])

export const ch21ReviewQuiz = makeQuiz({
  id: 'ch21-review',
  title: 'Ch.21 · Chapter review',
  topic: 'Review',
  grammarPoint: 'Lesson 21 まとめ',
  description: 'Mixed practice: passive, 〜てある, 〜間に, adjective + する, 〜てほしい.',
}, [
  ['"I was hit by someone."', 'だれかに___。', ['殴られました', '殴りました', '殴らせました', '殴れました'], 'Passive: 殴る → 殴られる.'],
  ['"The map has been put on the desk."', '机の上に地図が___。', ['置いてあります', '置いています', '置かれます', '置きてあります'], 'Transitive 置く + てある.'],
  ['"While I was out, a package came."', '留守の___、荷物が来ました。', ['間に', 'ながら', '間で', '時間'], 'Noun の間に.'],
  ['"Please make the soup hotter."', 'スープを___してください。', ['熱く', '熱い', '熱に', '熱くて'], 'い-adj → 〜く + する.'],
  ['"I want my colleague to come to the meeting."', '同僚に会議に___ほしいです。', ['来て', '来る', '来た', '来って'], 'て-form + ほしい.'],
  ['"The criminal was caught by the police."', '犯人は警察に___。', ['捕まりました', '捕まられました', '捕まりられました', '捕まらせました'], '捕まる = to be caught (already intransitive, no passive needed).'],
  ['"I was surprised that I was praised."', 'ほめられて、___。', ['びっくりしました', 'びっくりされました', 'びっくりさせました', 'びっくりにしました'], 'びっくりする = be surprised.'],
  ['"The present has been wrapped."', 'プレゼントが包んで___。', ['あります', 'います', 'おきます', 'しまいます'], 'てある.'],
  ['"I don\'t want you to touch it."', '___ほしいです。', ['触らないで', '触らなくて', '触ってない', '触りないで'], '〜ないでほしい.'],
  ['"My bike was stolen while I was shopping."', '買い物をしている間に、自転車を___。', ['盗まれました', '盗みました', '盗ませました', '盗めました'], 'Passive of 盗む.'],
])
