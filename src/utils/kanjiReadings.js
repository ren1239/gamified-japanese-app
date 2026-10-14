// Kanji → kana readings for the romaji toggle.
// MANUAL_KANJI_MAP holds hand-written entries; buildReadingRules() adds readings derived
// from the chapter vocab lists (whole words + verb/adjective stems with okurigana lookahead).

// Kanji → kana replacements, longest-first to avoid partial matches.
// Covers Genki I & II vocabulary appearing in quiz choices.
export const MANUAL_KANJI_MAP = [
  // ── Multi-kanji words ───────────────────────────
  // Ch.1 & Ch.11 additions
  ['大学生', 'だいがくせい'],
  ['留学生', 'りゅうがくせい'],
  ['留学', 'りゅうがく'],
  ['着物', 'きもの'],
  ['電話番号', 'でんわばんごう'],
  ['三年生', 'さんねんせい'],
  ['何年生', 'なんねんせい'],
  ['大学', 'だいがく'],
  ['専攻', 'せんこう'],
  ['高校', 'こうこう'],
  ['電話', 'でんわ'],
  ['番号', 'ばんごう'],
  ['年生', 'ねんせい'],
  ['九時', 'くじ'],
  ['授業中', 'じゅぎょうちゅう'],
  ['授業', 'じゅぎょう'],
  ['韓国語', 'かんこくご'],
  ['日本語', 'にほんご'],
  ['富士山', 'ふじさん'],
  ['買い物', 'かいもの'],
  ['お弁当', 'おべんとう'],
  ['勉強', 'べんきょう'],
  ['運転', 'うんてん'],
  ['音楽', 'おんがく'],
  ['映画', 'えいが'],
  ['神社', 'じんじゃ'],
  ['広島', 'ひろしま'],
  ['友達', 'ともだち'],
  ['先生', 'せんせい'],
  ['医者', 'いしゃ'],
  ['二日酔い', 'ふつかよい'],
  ['彼氏', 'かれし'],
  ['彼女', 'かのじょ'],
  ['素敵', 'すてき'],
  ['心配', 'しんぱい'],
  ['風邪', 'かぜ'],
  ['試合中', 'しあいちゅう'],
  ['試合', 'しあい'],
  ['緊張', 'きんちょう'],
  ['大変', 'たいへん'],
  ['説明', 'せつめい'],
  ['掃除', 'そうじ'],
  ['宿題', 'しゅくだい'],
  ['料理', 'りょうり'],
  ['試験', 'しけん'],
  ['誕生日', 'たんじょうび'],
  ['切符', 'きっぷ'],
  ['難し', 'むずかし'],
  ['週末', 'しゅうまつ'],
  ['学生', 'がくせい'],
  ['部屋', 'へや'],
  ['弁当', 'べんとう'],
  ['日本', 'にほん'],
  // ── Ch.12 grammar additions ───────────────────
  ['日曜日', 'にちようび'],
  ['上手', 'じょうず'],
  ['野菜', 'やさい'],
  ['銀行', 'ぎんこう'],
  ['問題', 'もんだい'],
  // ── Verb stems / conjugated forms ──────────────
  ['歩いて', 'あるいて'],
  ['歩いた', 'あるいた'],
  ['歩い', 'あるい'],
  ['歩く', 'あるく'],
  ['歩き', 'あるき'],
  ['歩か', 'あるか'],
  ['歩け', 'あるけ'],
  ['歩', 'ある'],
  ['出て', 'でて'],
  ['出た', 'でた'],
  ['出る', 'でる'],
  ['出', 'で'],
  ['甘かっ', 'あまかっ'],
  ['甘い', 'あまい'],
  ['甘く', 'あまく'],
  ['甘', 'あま'],
  ['多い', 'おおい'],
  ['多く', 'おおく'],
  ['多', 'おお'],
  ['広い', 'ひろい'],
  ['広', 'ひろ'],
  ['終わっ', 'おわっ'],
  ['終わ', 'おわ'],
  ['別れ', 'わかれ'],
  ['払わ', 'はらわ'],
  ['払っ', 'はらっ'],
  ['払う', 'はらう'],
  ['払い', 'はらい'],
  ['払', 'はら'],
  ['忘れ', 'わすれ'],
  ['忘', 'わす'],
  ['教え', 'おしえ'],
  ['教', 'おし'],
  ['助け', 'たすけ'],
  ['助', 'たす'],
  ['作っ', 'つくっ'],
  ['作る', 'つくる'],
  ['作り', 'つくり'],
  ['作', 'つく'],
  ['買っ', 'かっ'],
  ['買い', 'かい'],
  ['買', 'か'],
  ['診', 'み'],
  ['着', 'き'],
  ['食べ', 'たべ'],
  ['飲め', 'のめ'],
  ['飲み', 'のみ'],
  ['飲む', 'のむ'],
  ['飲ん', 'のん'],
  ['飲', 'の'],
  ['聞い', 'きい'],
  ['聞く', 'きく'],
  ['聞け', 'きけ'],
  ['聞か', 'きか'],
  ['聞', 'き'],
  ['働い', 'はたらい'],
  ['働く', 'はたらく'],
  ['働か', 'はたらか'],
  ['書い', 'かい'],
  ['書く', 'かく'],
  ['書け', 'かけ'],
  ['書か', 'かか'],
  ['登っ', 'のぼっ'],
  ['登る', 'のぼる'],
  ['登れ', 'のぼれ'],
  ['登', 'のぼ'],
  ['寝', 'ね'],
  ['来る', 'くる'],
  ['来た', 'きた'],
  ['来て', 'きて'],
  ['来れ', 'これ'],
  ['来', 'き'],
  ['行っ', 'いっ'],
  ['行く', 'いく'],
  ['行か', 'いか'],
  ['行き', 'いき'],
  ['行け', 'いけ'],
  ['行', 'い'],
  ['読ん', 'よん'],
  ['読む', 'よむ'],
  ['読み', 'よみ'],
  ['読', 'よ'],
  ['見た', 'みた'],
  ['見て', 'みて'],
  ['見る', 'みる'],
  ['見れ', 'みれ'],
  ['見', 'み'],
  ['話し', 'はなし'],
  ['話す', 'はなす'],
  ['話', 'はなし'],
  // 走る forms
  ['走り', 'はしり'],
  ['走る', 'はしる'],
  ['走', 'はし'],
  // 疲れる forms
  ['疲れ', 'つかれ'],
  // 休む forms
  ['休', 'やす'],
  // ── Common nouns / particles ────────────────────
  ['服', 'ふく'],
  ['歯', 'は'],
  ['卵', 'たまご'],
  ['酒', 'さけ'],
  ['痛', 'いた'],
  ['代', 'だい'],
  ['今日', 'きょう'],
  ['今', 'いま'],
  ['時', 'じ'],
  ['何', 'なに'],
  ['弟', 'おとうと'],
  ['机', 'つくえ'],
  ['上', 'うえ'],
  ['下', 'した'],
  ['中', 'なか'],
  ['前', 'まえ'],
  ['本', 'ほん'],
  ['私', 'わたし'],
  ['彼', 'かれ'],
  ['車', 'くるま'],
  ['母', 'はは'],
  ['父', 'ちち'],
  ['花', 'はな'],
  ['足', 'あし'],
  ['夜', 'よる'],
  ['家', 'いえ'],
  ['人', 'ひと'],
]

// Possible kana after a u-verb stem, by dictionary ending (covers ない/ます/て/た/ば/volitional/potential)
const U_ROWS = { く: 'かきくけこい', ぐ: 'がぎぐげごい', す: 'さしすせそ', つ: 'たちつてとっ', ぬ: 'なにぬねのん', ぶ: 'ばびぶべぼん', む: 'まみむめもん', る: 'らりるれろっ', う: 'わいうえおっ' }
const RU_NEXT = 'なまたてよられろさずぬ'
const I_ADJ_NEXT = 'いくかけさそすぎ'
const HAS_KANJI = /[\u4E00-\u9FFF々]/

function commonSuffixLength(a, b) {
  let n = 0
  while (n < a.length && n < b.length && a[a.length - 1 - n] === b[b.length - 1 - n]) n++
  return n
}

// Extra whole words that appear in grammar sentences but not in any vocab list
const EXTRA_WORDS = [
  ['気分', 'きぶん'], ['友だち', 'ともだち'], ['英語', 'えいご'], ['携帯', 'けいたい'], ['山田', 'やまだ'], ['田中', 'たなか'],
  ['木村', 'きむら'], ['京都', 'きょうと'], ['東京', 'とうきょう'], ['大阪', 'おおさか'], ['長野', 'ながの'], ['不便', 'ふべん'],
  ['ご覧', 'ごらん'], ['研究室', 'けんきゅうしつ'], ['上司', 'じょうし'], ['平日', 'へいじつ'], ['亜美', 'あみ'], ['失礼', 'しつれい'],
  ['出すぎ', 'ですぎ'], ['動詞', 'どうし'], ['活用', 'かつよう'], ['名詞', 'めいし'], ['沖縄', 'おきなわ'], ['尊敬語', 'そんけいご'], ['教育', 'きょういく'], ['数', 'かず'], ['電気をつけ', 'でんきをつけ'], ['気をつけ', 'きをつけ'], ['間に合', 'まにあ'], ['仲', 'なか'], ['売り場', 'うりば'], ['取り替え', 'とりかえ'], ['預か', 'あずか'], ['嵐', 'あらし'], ['壁', 'かべ'], ['席', 'せき'],
  ['自己紹介', 'じこしょうかい'], ['質問', 'しつもん'], ['機械', 'きかい'], ['方法', 'ほうほう'], ['仕方', 'しかた'], ['会話', 'かいわ'],
  ['浴び', 'あび'], ['手伝', 'てつだ'], ['手紙', 'てがみ'], ['手', 'て'], ['掃除', 'そうじ'], ['運転', 'うんてん'], ['紹介', 'しょうかい'],
  ['成績', 'せいせき'], ['世界', 'せかい'], ['料理', 'りょうり'], ['作文', 'さくぶん'], ['宿題', 'しゅくだい'], ['試験', 'しけん'],
  ['試合', 'しあい'], ['野菜', 'やさい'], ['漢字', 'かんじ'], ['日本人', 'にほんじん'], ['子供', 'こども'], ['お子様', 'おこさま'],
  ['靴', 'くつ'], ['財布', 'さいふ'], ['電気', 'でんき'], ['窓', 'まど'], ['花', 'はな'], ['授業', 'じゅぎょう'], ['残', 'のこ'],
]
// い-adjective stems (matched only before an adjective ending)
const ADJ_STEMS = [
  ['安', 'やす'], ['高', 'たか'], ['寒', 'さむ'], ['暑', 'あつ'], ['暖か', 'あたたか'], ['短', 'みじか'], ['熱', 'あつ'], ['小さ', 'ちいさ'],
  ['大き', 'おおき'], ['新し', 'あたらし'], ['忙し', 'いそがし'], ['易し', 'やさし'], ['正し', 'ただし'], ['丸', 'まる'], ['近', 'ちか'],
  ['厳し', 'きびし'], ['遠', 'とお'], ['難し', 'むずかし'], ['楽し', 'たのし'], ['悲し', 'かなし'], ['寂し', 'さび'], ['甘', 'あま'],
]

const PARTICLE_SPLIT = /[をがに]/

function stripMarks(s) {
  return (s || '').replace(/[〜()（）]/g, '')
}

// Split "お湯を沸かす" / "おゆをわかす" at the last particle shared by both spellings
function splitPhrase(kanji, kana) {
  for (const p of ['を', 'が', 'に']) {
    const ki = kanji.lastIndexOf(p), ri = kana.lastIndexOf(p)
    // Only a real particle if a word with kanji follows it (曲がる's が is okurigana)
    if (ki > 0 && ri > 0 && HAS_KANJI.test(kanji.slice(ki + 1))) {
      return [[kanji.slice(0, ki), kana.slice(0, ri)], [kanji.slice(ki + 1), kana.slice(ri + 1)]]
    }
  }
  return null
}

/**
 * Returns ordered [pattern, kana] rules. pattern is a string (exact) or RegExp (stem + lookahead).
 * Order: whole words (manual + vocab + extras) longest first, then stems longest first.
 */
export function buildReadingRules(vocabLists) {
  const words = new Map([...MANUAL_KANJI_MAP, ...EXTRA_WORDS].map(([k, v]) => [k, v]))
  const stems = ADJ_STEMS.map(([k, r]) => [new RegExp(k + '(?=[' + I_ADJ_NEXT + '])', 'g'), r])
  const addWord = (k, r) => { if (HAS_KANJI.test(k) && r && !words.has(k)) words.set(k, r) }

  function derive(kanji, kana, category) {
    addWord(kanji, kana)
    const isVerb = ['u-verb', 'ru-verb', 'irregular'].includes(category)
    if (isVerb && kanji.endsWith('する') && kana.endsWith('する')) {
      // する-verbs: the noun part (参加する → 参加)
      addWord(kanji.slice(0, -2).replace(/を$/, ''), kana.slice(0, -2).replace(/を$/, ''))
      return
    }
    const suf = commonSuffixLength(kanji, kana)
    if (suf === 0) return
    // Kanji + first okurigana stays fixed in most inflections (連れ, 易し, 生ま)
    if (suf < kanji.length) addWord(kanji.slice(0, kanji.length - suf + 1), kana.slice(0, kana.length - suf + 1))
    const last = kanji[kanji.length - 1]
    if (isVerb && category === 'ru-verb' && last === 'る') {
      const k = kanji.slice(0, -1), r = kana.slice(0, -1)
      if (!HAS_KANJI.test(k)) return
      if (k === kanji.slice(0, kanji.length - suf)) stems.push([new RegExp(k + '(?=[' + RU_NEXT + '])', 'g'), r])
      else addWord(k, r)
    } else if (isVerb && U_ROWS[last]) {
      const k = kanji.slice(0, -1), r = kana.slice(0, -1)
      if (HAS_KANJI.test(k)) stems.push([new RegExp(k + '(?=[' + U_ROWS[last] + '])', 'g'), r])
    } else if (!isVerb && last === 'い' && kana.endsWith('い')) {
      const k = kanji.slice(0, -1), r = kana.slice(0, -1)
      if (HAS_KANJI.test(k)) stems.push([new RegExp(k + '(?=[' + I_ADJ_NEXT + '])', 'g'), r])
    }
  }

  for (const list of vocabLists) {
    for (const w of list) {
      const kanji = stripMarks(w.kanji), kana = stripMarks(w.kana)
      if (!HAS_KANJI.test(kanji) || !kana) continue
      const parts = PARTICLE_SPLIT.test(kanji) ? splitPhrase(kanji, kana) : null
      if (!parts && /^.[^をがに]*[をがに]/.test(kanji)) {
        // Phrase ending in a kana-only verb (お世話になる): keep the noun before the particle
        const m = kanji.match(/^(.+?)[をがに]/), n = kana.match(/^(.+?)[をがに]/)
        if (m && n && m[1].length >= 2) addWord(m[1], n[1])
      }
      if (parts) {
        addWord(kanji, kana)
        const [[k1, r1], [k2, r2]] = parts
        if (k1.length >= 2) addWord(k1, r1)
        derive(k2, r2, w.category)
      } else {
        derive(kanji, kana, w.category)
      }
    }
  }
  // One list, longest key first; on equal length, stems (with okurigana lookahead) win
  const keyLen = (p) => (typeof p === 'string' ? p : p.source.split('(?=')[0].replace(/[()?<!=[\]]/g, '')).length
  const ordered = [...stems, ...words.entries()].sort((a, b) =>
    keyLen(b[0]) - keyLen(a[0]) || (typeof a[0] === 'string') - (typeof b[0] === 'string'))
  // Context-dependent single kanji, applied before the generic word list:
  // 時 after a clause/の is とき (寝る時, 子供の時) but じ after numbers (三時);
  // 方 after の is ほう (私の方が), after a verb stem かた (作り方).
  const context = [[/(?<=[ぁ-んー])時(?![計間代々])/g, 'とき'], [/の方(?!法)/g, 'のほう'], [/(?<=[ぁ-ん〜])方(?!法)/g, 'かた']]
  return [...context, ...ordered]
}

export function applyReadingRules(str, rules) {
  let result = str
  for (const [pattern, kana] of rules) {
    result = typeof pattern === 'string' ? result.split(pattern).join(kana) : result.replace(pattern, kana)
  }
  return result
}
