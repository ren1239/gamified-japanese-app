export const ch12SugiruQuiz = {
  id: 'ch12-sugiru',
  title: 'Ch.12 · すぎる',
  topic: 'すぎる',
  grammarPoint: '〜すぎる',
  description: 'Express excess: verb stem + すぎる ("too much/too many"). U-verbs: drop -u → -i stem. Ru-verbs: drop る. する → し. い-adj: drop い. な-adj: drop な. すぎる itself conjugates as a ru-verb.',
  created: '2026-04-17',
  playCount: 0,
  bestScore: null,
  questions: [
    // ── Q1: U-verb stem — 歩く (present positive, polite) ──────
    {
      id: 1,
      question: 'Which correctly means "I walked too much"?',
      choices: ['歩きすぎました', '歩くすぎました', '歩いすぎました', '歩いてすぎました'],
      correct: 0,
      explanation: 'U-verb 歩く → stem 歩き (drop く → き). Attach すぎる → 歩きすぎる → polite: 歩きすぎました. Never use the て-form or dictionary form before すぎる.',
    },
    // ── Q2: Ru-verb stem — 出る (て-form, cause-effect) ────────
    {
      id: 2,
      question: 'You coughed too much and now your throat hurts. Which て-form is correct?',
      jp: 'せきが___、のどが痛いんです。',
      choices: ['出すぎて', '出るすぎて', '出てすぎて', '出いすぎて'],
      correct: 0,
      explanation: '出る is a ru-verb. Drop る → 出 + すぎる → 出すぎる → て-form: 出すぎて. Never keep る before すぎる.',
    },
    // ── Q3: い-adj stem — 痛い (present positive, plain) ───────
    {
      id: 3,
      question: 'Your tooth hurts too much. Which is correct?',
      jp: '歯が___んです。',
      choices: ['痛すぎる', '痛いすぎる', '痛くすぎる', '痛なすぎる'],
      correct: 0,
      explanation: 'い-adjective 痛い → drop い → 痛 + すぎる → 痛すぎる. Never keep い before すぎる — this is the #1 mistake with い-adjectives.',
    },
    // ── Q4: Irregular stem — 緊張する (past positive, plain) ───
    {
      id: 4,
      question: 'Which correctly means "I got too nervous"?',
      jp: '___んです。',
      choices: ['緊張しすぎた', '緊張するすぎた', '緊張してすぎた', '緊張すぎた'],
      correct: 0,
      explanation: 'する → irregular stem し. 緊張する → 緊張し + すぎる → past: 緊張しすぎた. Skipping し (緊張すぎた) or using して are both wrong.',
    },
    // ── Q5: な-adj stem — 素敵 (present positive, polite) ──────
    {
      id: 5,
      question: 'The present is too nice (beyond what\'s proper). Which is correct?',
      jp: 'このプレゼントは___。',
      choices: ['素敵すぎます', '素敵なすぎます', '素敵いすぎます', '素敵にすぎます'],
      correct: 0,
      explanation: 'な-adjective 素敵 → drop な → 素敵 + すぎる → 素敵すぎます. Drop な before attaching すぎる.',
    },
    // ── Q6: U-verb — 飲む (present negative instruction) ───────
    {
      id: 6,
      question: 'Your doctor says you must not drink too much alcohol. Complete the sentence.',
      jp: 'お酒を___はいけません。',
      choices: ['飲みすぎては', '飲むすぎては', '飲んですぎては', '飲みすぎれば'],
      correct: 0,
      explanation: '飲む → u-verb stem 飲み + すぎる → て-form: 飲みすぎて + はいけません. The stem is 飲み, not 飲ん (that\'s the て-form 飲んで).',
    },
    // ── Q7: Irregular — 心配する (present negative request) ─────
    {
      id: 7,
      question: 'Tell your friend "please don\'t worry too much."',
      jp: '心配___ください。',
      choices: ['しすぎないで', 'するすぎないで', 'しすぎずに', 'しすぎなくて'],
      correct: 0,
      explanation: '心配する → stem し → 心配しすぎる → negative: 心配しすぎない + でください → 心配しすぎないでください.',
    },
    // ── Q8: い-adj — 甘い (past positive, plain) ────────────────
    {
      id: 8,
      question: 'Last night\'s egg dish was too sweet. Which past form is correct?',
      jp: 'ゆうべの卵は___んです。',
      choices: ['甘すぎた', '甘いすぎた', '甘かったすぎた', '甘くすぎた'],
      correct: 0,
      explanation: '甘い → drop い → 甘 + すぎる → すぎる conjugates as a ru-verb → past: 甘すぎた. Don\'t add かった to the adjective — すぎる handles the tense.',
    },
    // ── Q9: U-verb — 払う (past positive, plain) ────────────────
    {
      id: 9,
      question: 'You paid too much for the ticket. Which past form is correct?',
      jp: '切符の代を___んです。',
      choices: ['払いすぎた', '払うすぎた', '払ってすぎた', '払わすぎた'],
      correct: 0,
      explanation: '払う → u-verb stem 払い (drop う → い). + すぎる → past: 払いすぎた.',
    },
    // ── Q10: Irregular — 心配する (present negative, polite) ────
    {
      id: 10,
      question: 'Politely say "I don\'t worry too much." Which is correct?',
      jp: '___んです。',
      choices: ['心配しすぎません', '心配するすぎません', '心配しないすぎます', '心配しすぎないです'],
      correct: 0,
      explanation: '心配する → stem し → 心配しすぎる → polite negative: 心配しすぎません. This is the same stem rule as positive — just conjugate すぎる as a normal ru-verb.',
    },
    // ── Q11: い-adj — 多い (て-form, cause-effect) ───────────────
    {
      id: 11,
      question: 'There is too much homework, so you\'re stressed. Which て-form is correct?',
      jp: '宿題が___、大変なんです。',
      choices: ['多すぎて', '多いすぎて', '多くすぎて', '多なすぎて'],
      correct: 0,
      explanation: '多い → drop い → 多 + すぎる → て-form: 多すぎて. Same stem rule as always — drop い first, then conjugate すぎる.',
    },
    // ── Q12: U-verb — 歩く (past negative, polite) ──────────────
    {
      id: 12,
      question: 'Politely tell your doctor you did NOT walk too much.',
      jp: '歩き___。',
      choices: ['すぎませんでした', 'すぎなかった', 'すぎないでした', 'すぎていません'],
      correct: 0,
      explanation: 'すぎる → polite negative past: すぎませんでした → 歩きすぎませんでした. すぎなかった is correct grammar but too plain for a doctor.',
    },
    // ── Q13: な-adj — 素敵 (past positive, plain) ───────────────
    {
      id: 13,
      question: 'The present they gave you was too nice. Which past form is correct?',
      jp: 'もらったプレゼントが___んです。',
      choices: ['素敵すぎた', '素敵なすぎた', '素敵だすぎた', '素敵いすぎた'],
      correct: 0,
      explanation: 'な-adj 素敵 → drop な → 素敵 + すぎる → past: 素敵すぎた. The な rule applies in all tenses — always drop な before すぎる.',
    },
    // ── Q14: Ru-verb — 出る (past positive, plain) ──────────────
    {
      id: 14,
      question: 'During the match your cough was excessive. Which past form is correct?',
      jp: '試合中にせきが___んです。',
      choices: ['出すぎた', '出るすぎた', '出てすぎた', 'でいすぎた'],
      correct: 0,
      explanation: '出る → ru-verb stem 出 (drop る) + すぎる → past plain: 出すぎた. Ru-verb stems are simply the dictionary form minus る.',
    },
    // ── Q15: Nuance — すぎる = unwelcome excess ─────────────────
    {
      id: 15,
      question: 'Your friend\'s new apartment is wonderfully spacious and you love it. Which expresses genuine admiration (not unwelcome excess)?',
      choices: ['とても広いですね！', '広すぎますね！', '広いすぎますね！', '広がすぎますね！'],
      correct: 0,
      explanation: 'すぎる implies excess that is beyond normal or unwelcome. 広すぎますね suggests "uncomfortably too spacious." For a sincere compliment, use とても or すごく instead.',
    },
  ],
}

export const ch12NdesuQuiz = {
  id: 'ch12-ndesu',
  title: 'Ch.12 · んです',
  topic: 'んです',
  grammarPoint: '〜んです',
  description: 'Explanation mode: short form + んです. Nouns/な-adjectives add な in present affirmative; い-adjectives and verbs attach directly.',
  created: '2026-04-13',
  playCount: 0,
  bestScore: null,
  questions: [
    // ── い-adjective ───────────────────────────────────────────
    {
      id: 1,
      question: 'Explain your throat hurts right now.',
      jp: 'のどが痛___んです。',
      choices: ['い', 'な', 'かった', 'くない'],
      correct: 0,
      explanation: '痛い is an い-adjective. In present tense, い-adjectives attach directly to んです → 痛いんです.',
    },
    {
      id: 2,
      question: 'Explain your stomach does NOT hurt.',
      jp: 'おなかは痛___んです。',
      choices: ['い', 'くない', 'くなかった', 'な'],
      correct: 1,
      explanation: 'Negative い-adjectives (痛くない) attach directly to んです — no な needed → 痛くないんです.',
    },
    {
      id: 3,
      question: 'Explain why you stayed home — it WAS cold.',
      jp: 'さむ___んです。',
      choices: ['くない', 'い', 'かった', 'くなかった'],
      correct: 2,
      explanation: 'さむい → past short form → さむかった. い-adjectives attach directly → さむかったんです.',
    },
    {
      id: 4,
      question: 'Explain that the exam was NOT difficult.',
      jp: '試験が難し___んです。',
      choices: ['かった', 'くない', 'な', 'くなかった'],
      correct: 3,
      explanation: 'Past negative of 難しい is 難しくなかった. Attach directly to んです → 難しくなかったんです.',
    },
    // ── な-adjective ───────────────────────────────────────────
    {
      id: 5,
      question: 'Your clothes are lovely. What goes before んです? (素敵 = な-adjective)',
      jp: '服が素敵___んです。',
      choices: ['な', 'だ', 'の', 'に'],
      correct: 0,
      explanation: '素敵 is a な-adjective. Present affirmative な-adjectives need な before んです → 素敵なんです. Never 素敵だんです.',
    },
    {
      id: 6,
      question: "Which correctly explains 'I'm not worried'? (心配 = な-adjective)",
      jp: '___んです。',
      choices: ['心配くない', '心配ない', '心配じゃない', '心配でない'],
      correct: 2,
      explanation: '心配 is a な-adjective. Negatives use じゃない — not くない, which is for い-adjectives only → 心配じゃないんです.',
    },
    {
      id: 7,
      question: 'Explain you USED TO BE homesick. What goes before んです?',
      jp: 'ホームシック___んです。',
      choices: ['なだった', 'だった', 'だな', 'な'],
      correct: 1,
      explanation: 'Past tense of nouns/な-adjectives uses だった — no な. Don\'t carry な into the past → ホームシックだったんです.',
    },
    // ── Noun ──────────────────────────────────────────────────
    {
      id: 8,
      question: 'Explain you have a cold. What goes before んです?',
      jp: '風邪___んです。',
      choices: ['な', 'だ', 'の', 'は'],
      correct: 0,
      explanation: '風邪 is a noun. Nouns need な before んです in present affirmative → 風邪なんです. Not 風邪だんです.',
    },
    {
      id: 9,
      question: 'Explain it is NOT a cold. What goes before んです?',
      jp: '風邪___んです。',
      choices: ['くない', 'なじゃない', 'じゃない', 'じゃなかった'],
      correct: 2,
      explanation: 'Noun negatives use じゃない, not くない (that\'s for い-adjectives) → 風邪じゃないんです.',
    },
    {
      id: 10,
      question: "Explain that yesterday was your birthday. What goes before んです?",
      jp: 'きのうは誕生日___んです。',
      choices: ['なだった', 'だな', 'な', 'だった'],
      correct: 3,
      explanation: 'Past tense nouns use だった — no な → 誕生日だったんです. Don\'t add な before だった.',
    },
    // ── Verb ──────────────────────────────────────────────────
    {
      id: 11,
      question: 'Someone notices you look sad. Explain you broke up.',
      jp: '彼女と___んです。',
      choices: ['別れる', '別れた', '別れて', '別れない'],
      correct: 1,
      explanation: '別れる is a ru-verb. Past short form → 別れた. Verbs attach directly to んです → 別れたんです.',
    },
    {
      id: 12,
      question: 'Explain you did NOT pay the fee.',
      jp: '代を___んです。',
      choices: ['払わない', '払った', '払わなかった', '払う'],
      correct: 2,
      explanation: '払う → negative past short form → 払わなかった. Attach directly → 払わなかったんです.',
    },
    {
      id: 13,
      question: 'Explain you ARE worried about the match.',
      jp: '試合のことで___んです。',
      choices: ['心配する', '心配した', '心配していた', '心配している'],
      correct: 3,
      explanation: '心配している = currently worried (ongoing state). Use 〜ている for ongoing states → 心配しているんです. 心配した is past (already over).',
    },
    // ── Question form ──────────────────────────────────────────
    {
      id: 14,
      question: "Your classmate looks pale. Which asks 'What's wrong?' (seeking explanation)",
      choices: ['どうしたんですか', 'どうしましたか', 'どうするんですか', 'どうしてですか'],
      correct: 0,
      explanation: 'どうしたんですか invites an explanation — you\'ve noticed something and want to understand why. どうしましたか just asks what happened as a plain fact.',
    },
    {
      id: 15,
      question: 'Ask why your friend broke up with their boyfriend.',
      jp: 'どうして彼氏と___んですか。',
      choices: ['別れます', '別れた', '別れて', '別れない'],
      correct: 1,
      explanation: 'In a どうして question, use past short form + んですか → 別れたんですか. The polite form 別れます cannot combine with んです.',
    },
    // ── Verb present affirmative ───────────────────────────────
    {
      id: 16,
      question: "Your friend asks why you can't go out tonight. Explain you have an exam tomorrow.",
      jp: 'あした試験が___んです。',
      choices: ['あります', 'ある', 'あった', 'あって'],
      correct: 1,
      explanation: 'Verbs attach to んです in short form. Plain present of ある is ある → あるんです. The polite form あります cannot combine with んです.',
    },
    {
      id: 17,
      question: 'Explain that you lost your train ticket.',
      jp: '切符を___んです。',
      choices: ['なくします', 'なくした', 'なくして', 'なくさない'],
      correct: 1,
      explanation: 'なくす is a u-verb. Past short form → なくした. Attach directly to んです → なくしたんです.',
    },
  ],
}

export const ch12HougaiiQuiz = {
  id: 'ch12-hougaii',
  title: 'Ch.12 · ほうがいいです',
  topic: 'ほうがいいです',
  grammarPoint: '〜ほうがいいです',
  description: 'Give advice: verb (short PAST affirmative) + ほうがいいです = "you\'d better...". For negative advice: verb (short PRESENT negative) + ほうがいいです. Key mistake: using present instead of past for positive advice.',
  created: '2026-04-27',
  playCount: 0,
  bestScore: null,
  questions: [
    {
      id: 1,
      question: 'Your doctor says you should walk more. Which form goes before ほうがいいです?',
      jp: 'もっと___ほうがいいですよ。',
      choices: ['歩いた', '歩く', '歩かない', '歩いて'],
      correct: 0,
      explanation: 'Positive advice uses the short PAST form: 歩く → 歩いた + ほうがいいです. Using the present form 歩く is the most common mistake.',
    },
    {
      id: 2,
      question: 'The doctor says you shouldn\'t drink alcohol. Which form goes before ほうがいいです?',
      jp: 'お酒を___ほうがいいですよ。',
      choices: ['飲まない', '飲まなかった', '飲んだ', '飲む'],
      correct: 0,
      explanation: 'Negative advice uses the short PRESENT negative: 飲む → 飲まない + ほうがいいです. Never use past negative 飲まなかった for ongoing negative advice.',
    },
    {
      id: 3,
      question: 'Which correctly means "You\'d better eat more vegetables"? (Genki textbook example)',
      choices: [
        'もっと野菜を食べたほうがいいですよ。',
        'もっと野菜を食べるほうがいいですよ。',
        'もっと野菜を食べてほうがいいですよ。',
        'もっと野菜を食べないほうがいいですよ。',
      ],
      correct: 0,
      explanation: 'Positive advice → short past: 食べた + ほうがいいです. 食べる (present) is the most common error. 食べて cannot precede ほうが.',
    },
    {
      id: 4,
      question: 'Your friend has a cold. Tell them "You\'d better sleep a lot."',
      jp: 'たくさん___ほうがいいですよ。',
      choices: ['寝た', '寝る', '寝ない', '寝て'],
      correct: 0,
      explanation: '寝る is a ru-verb. Short past: drop る → 寝 + た → 寝た + ほうがいいです. Positive advice always uses the past form.',
    },
    {
      id: 5,
      question: 'Advise your friend not to skip class. Which form goes before ほうがいいです? (Genki textbook example)',
      jp: '授業を___ほうがいいですよ。',
      choices: ['休まない', '休んだ', '休まなかった', '休む'],
      correct: 0,
      explanation: 'Negative advice uses SHORT PRESENT NEGATIVE: 休む → 休まない + ほうがいいです. Textbook example: 授業を休まないほうがいいですよ。',
    },
    {
      id: 6,
      question: 'Tell your worried friend not to worry so much.',
      jp: 'そんなに___ほうがいいですよ。',
      choices: ['心配しない', '心配した', '心配する', '心配しなかった'],
      correct: 0,
      explanation: '心配する → present negative short: 心配しない + ほうがいいです. Irregular する verbs use し as the stem → しない for negative.',
    },
    {
      id: 7,
      question: 'Your friend looks unwell. Tell them "You\'d better rest."',
      jp: '___ほうがいいですよ。',
      choices: ['休んだ', '休む', '休まない', '休んで'],
      correct: 0,
      explanation: '休む is a u-verb (む→ん+だ for past). Short past: 休んだ + ほうがいいです. Positive advice → past form.',
    },
    {
      id: 8,
      question: 'How do you say "You\'d better go to the doctor"?',
      choices: [
        '医者に行ったほうがいいですよ。',
        '医者に行くほうがいいですよ。',
        '医者に行かないほうがいいですよ。',
        '医者に行ってほうがいいですよ。',
      ],
      correct: 0,
      explanation: '行く → short past: 行った + ほうがいいです → 医者に行ったほうがいいですよ。Past form marks positive advice.',
    },
    {
      id: 9,
      question: 'Advise someone to pay the fee. Which form goes before ほうがいいです?',
      jp: '代を___ほうがいいですよ。',
      choices: ['払った', '払う', '払わない', '払って'],
      correct: 0,
      explanation: '払う → u-verb → short past: 払った + ほうがいいです. Positive advice always uses the past form.',
    },
    {
      id: 10,
      question: 'Which statement about ほうがいいです is correct?',
      choices: [
        'Positive advice uses short past (e.g., 食べた); negative uses short present negative (e.g., 食べない).',
        'Both positive and negative advice use the short present form.',
        'Positive advice uses the te-form; negative uses the short present negative.',
        'Both positive and negative advice use the short past form.',
      ],
      correct: 0,
      explanation: 'Core rule: positive advice → PAST (食べたほうがいい), negative advice → PRESENT NEGATIVE (食べないほうがいい). Both use short/plain forms.',
    },
    {
      id: 11,
      question: 'What does 「切符をなくさないほうがいいですよ」 mean?',
      choices: [
        "You'd better not lose the ticket.",
        "You'd better buy a ticket.",
        "You shouldn't have lost the ticket.",
        "You'd better find the ticket.",
      ],
      correct: 0,
      explanation: 'なくす → short present negative: なくさない + ほうがいいです = "you\'d better not lose it." Present negative before ほうがいいです = negative advice.',
    },
    {
      id: 12,
      question: 'Your friend is stressing about grades. Combine すぎる + ほうがいいです to say "You\'d better not worry too much."',
      choices: [
        '心配しすぎないほうがいいですよ。',
        '心配しすぎたほうがいいですよ。',
        '心配しすぎなかったほうがいいですよ。',
        '心配しないすぎほうがいいですよ。',
      ],
      correct: 0,
      explanation: '心配しすぎる (worry too much) → present negative: 心配しすぎない + ほうがいいです. Negative advice uses the PRESENT negative of the entire predicate, including すぎる.',
    },
  ],
}

export const ch12NodeQuiz = {
  id: 'ch12-node',
  title: 'Ch.12 · ので',
  topic: 'ので',
  grammarPoint: '〜ので',
  description: 'Give reasons, more formal than から: short form + ので. KEY RULE: な-adjectives and nouns in present affirmative insert な before ので (素敵なので, 日曜日なので). Past and negative forms attach directly.',
  created: '2026-04-27',
  playCount: 0,
  bestScore: null,
  questions: [
    // ── Q1: U-verb, present affirmative ─────────────────────────
    {
      id: 1,
      question: 'Complete: "Because I\'m thirsty, I want to drink juice." (のどが渇く, present)',
      jp: '___、ジュースを飲みたいです。',
      choices: ['のどがかわくので', 'のどがかわいたので', 'のどがかわくなので', 'のどがかわかないので'],
      correct: 0,
      explanation: 'のどが渇く is a u-verb. Present short form → のどが渇く + ので (no な). Verbs NEVER need な before ので.',
    },
    // ── Q2: U-verb, past affirmative ────────────────────────────
    {
      id: 2,
      question: 'Complete: "Because I caught a cold, I skipped class." (風邪をひく, past)',
      jp: '___、授業を休みました。',
      choices: ['風邪をひいたので', '風邪をひくので', '風邪をひいてので', '風邪をひかなかったので'],
      correct: 0,
      explanation: '風邪をひく → u-verb past: ひいた (く→いた) + ので. Past verbs attach directly — no な.',
    },
    // ── Q3: Ru-verb, present affirmative ────────────────────────
    {
      id: 3,
      question: 'Complete: "Because I\'m coughing, my throat hurts." (せきが出る, present)',
      jp: '___、のどが痛いんです。',
      choices: ['せきが出るので', 'せきが出たので', 'せきが出るなので', 'せきが出てので'],
      correct: 0,
      explanation: '出る is a ru-verb. Present: 出る + ので (no な). て-form cannot precede ので — always use the short (plain) form.',
    },
    // ── Q4: Irregular する, past affirmative ─────────────────────
    {
      id: 4,
      question: 'Complete: "Because I got nervous, the exam didn\'t go well." (緊張する, past)',
      jp: '___、試験がうまくいきませんでした。',
      choices: ['緊張したので', '緊張するので', '緊張したなので', '緊張してので'],
      correct: 0,
      explanation: '緊張する → past short: 緊張した + ので. する verbs use した in the past. No な — verbs never need it.',
    },
    // ── Q5: い-adjective, present affirmative ───────────────────
    {
      id: 5,
      question: 'Complete: "Because my leg hurts, I can\'t walk." (足が痛い, present)',
      jp: '___、歩けません。',
      choices: ['足が痛いので', '足が痛なので', '足が痛かったので', '足が痛いなので'],
      correct: 0,
      explanation: 'い-adjectives attach directly to ので — no な needed. 痛い + ので → 痛いので. な is only for な-adjectives and nouns.',
    },
    // ── Q6: い-adjective, past affirmative ──────────────────────
    {
      id: 6,
      question: 'Complete: "Because my stomach hurt, I stayed home." (おなかが痛い, past)',
      jp: '___、うちにいました。',
      choices: ['おなかが痛かったので', 'おなかが痛いので', 'おなかが痛くないので', 'おなかが痛かったなので'],
      correct: 0,
      explanation: 'Past い-adj: 痛い → 痛かった + ので. Do NOT add な after 痛かった — the な rule only applies to な-adj/nouns in PRESENT affirmative.',
    },
    // ── Q7: Noun, present affirmative → な required ──────────────
    {
      id: 7,
      question: 'Complete: "Because I\'m homesick, I often call home." (ホームシック = noun, present)',
      jp: '___、よく家に電話します。',
      choices: ['ホームシックなので', 'ホームシックので', 'ホームシックだので', 'ホームシックだったので'],
      correct: 0,
      explanation: 'Nouns in PRESENT AFFIRMATIVE require な before ので → ホームシックなので. Without な (ホームシックので) is wrong. だのでは wrong — だ is から\'s pattern, not ので.',
    },
    // ── Q8: な-adjective, present affirmative → な required ──────
    {
      id: 8,
      question: 'Complete: "Because this present is so nice, I\'m happy." (素敵 = な-adj, present)',
      jp: '___、うれしいです。',
      choices: ['このプレゼントが素敵なので', 'このプレゼントが素敵ので', 'このプレゼントが素敵だので', 'このプレゼントが素敵だったので'],
      correct: 0,
      explanation: 'な-adjective present affirmative: 素敵 + な + ので → 素敵なので. 素敵だのでは wrong (だ = から\'s rule). 素敵ので (no connector) is also wrong.',
    },
    // ── Q9: Noun, past → だった, no な ───────────────────────────
    {
      id: 9,
      question: 'Complete: "Because I had a cold last week, I couldn\'t come." (風邪 = noun, past)',
      jp: '___、うちにいました。',
      choices: ['風邪だったので', '風邪なので', '風邪だなので', '風邪なだったので'],
      correct: 0,
      explanation: 'Noun PAST: use だった + ので → 風邪だったので. Do NOT use な before だった — な is only for PRESENT affirmative. なだった order is also wrong.',
    },
    // ── Q10: Noun, present negative → じゃない ──────────────────
    {
      id: 10,
      question: 'Complete: "Because it\'s not influenza, you don\'t need to rest." (インフルエンザ, present negative)',
      jp: '___、休まなくていいです。',
      choices: ['インフルエンザじゃないので', 'インフルエンザくないので', 'インフルエンザじゃなかったので', 'インフルエンザなので'],
      correct: 0,
      explanation: 'Noun present NEGATIVE: noun + じゃない + ので. Do NOT use くない (that\'s い-adjective negative). Last choice (なので) means "because it IS influenza" — wrong meaning.',
    },
    // ── Q11: U-verb, present negative ───────────────────────────
    {
      id: 11,
      question: 'Complete: "Because I don\'t drink alcohol, I feel fine." (お酒を飲む, present negative)',
      jp: '___、きぶんがいいです。',
      choices: ['お酒を飲まないので', 'お酒を飲まなかったので', 'お酒を飲まないなので', 'お酒を飲まなくて'],
      correct: 0,
      explanation: '飲む → present negative short: 飲まない + ので. Do NOT add な after 飲まない — verbs never need it. 飲まなくて is a て-form connective, not ので.',
    },
    // ── Q12: すぎる + ので (cross-pattern) ───────────────────────
    {
      id: 12,
      question: 'Complete your own sentence combining すぎる + ので: "Because I ran too much, I\'m tired." (走りすぎる, past)',
      jp: '___、疲れています。',
      choices: ['走りすぎたので', '走りすぎるので', '走りすぎたなので', '走りすぎてので'],
      correct: 0,
      explanation: '走る → 走りすぎる (u-verb) → past: 走りすぎた + ので. Your own sentence! Past verb attaches directly — no な, no て-form.',
    },
  ],
}
