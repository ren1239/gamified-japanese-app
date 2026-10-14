# 日本語クイズ — Claude Reference Guide

This file explains exactly how quizzes, vocab data, and chapter structure should be created and registered. Chapter 11 is the reference implementation — follow its patterns for all future chapters.

---

## Project Structure

```
src/
├── data/
│   ├── chapterData.js          ← Chapter registry (all 23 chapters)
│   ├── ch11VocabData.js        ← Raw vocab words for Ch.11 (reference)
│   ├── ch11Grammar.js          ← Grammar quiz objects for Ch.11 (reference)
│   ├── ch12VocabData.js        ← Raw vocab words for Ch.12
│   └── genkiQuizzes.js         ← Static vocab quiz for Ch.11 only (legacy format)
├── utils/
│   └── vocabQuizGen.js         ← Dynamic vocab quiz generator
├── store/
│   ├── quizStore.js            ← Quiz store + game engine (Zustand)
│   └── statsStore.js           ← XP, streak, history (Zustand + persist)
└── screens/
    └── ChapterDetailScreen.jsx ← Vocab picker + grammar drill cards
```

### Chapter unlock logic
A chapter is **unlocked** (clickable in the chapter list) when `vocab.available: true` OR it has at least one grammar entry. This is controlled by `isLocked` in `ChapterListScreen.jsx`:
```js
const isLocked = !ch.vocab?.available && ch.grammar.length === 0
```
So to unlock a chapter: set `vocab: { available: true }` in `chapterData.js`.

---

## 1 — Raw Vocab Data (`src/data/chXXVocabData.js`)

Create one file per chapter with this exact shape:

```js
// Chapter NN Vocabulary — Genki I/II
export const chNNVocab = [
  // category: 'noun' | 'u-verb' | 'ru-verb' | 'irregular' | 'other'
  { id: 'n01', kana: 'がいこく',   kanji: '外国', english: 'foreign country', category: 'noun'      },
  { id: 'u01', kana: 'はしる',     kanji: '走る', english: 'to run',           category: 'u-verb'    },
  { id: 'r01', kana: 'つかれる',   kanji: '疲れる', english: 'to get tired',   category: 'ru-verb'   },
  { id: 'i01', kana: 'りゅうがくする', kanji: '留学する', english: 'to study abroad', category: 'irregular' },
  { id: 'o01', kana: 'もっと',     kanji: '',     english: 'more',             category: 'other'     },
]

export function getWordsForCategory(cat) {
  if (cat === 'noun')  return chNNVocab.filter(w => w.category === 'noun')
  if (cat === 'verb')  return chNNVocab.filter(w => ['u-verb','ru-verb','irregular'].includes(w.category))
  if (cat === 'other') return chNNVocab.filter(w => w.category === 'other')
  return chNNVocab // 'all'
}
```

**Rules:**
- IDs: prefix `n` = noun, `u` = u-verb, `r` = ru-verb, `i` = irregular, `o` = other. Zero-pad to 2 digits.
- Always include `kana` (hiragana/katakana reading). `kanji` is empty string `''` if none.
- `english` should be concise — match the Genki textbook exactly. All lowercase, no trailing punctuation.
- Categories map to the UI chips: **Nouns / Verbs / Other**.

---

## 2 — Grammar Quiz Objects (`src/data/chXXGrammar.js`)

Each grammar point is a named export. Use this shape:

```js
export const chNNMyGrammarQuiz = {
  id: 'chNN-mygrammar',            // e.g. 'ch12-potential' — must be globally unique
  title: 'Ch.NN · Grammar Name',   // e.g. 'Ch.12 · potential form'
  topic: 'Grammar Label',          // shown as a pill on the question card
  grammarPoint: 'られる・える',      // shown in the hint sheet header
  description: 'Express ability: ru-verb stem + られる, u-verb stem + える. Common mistake: using dictionary form instead of stem.',
  created: 'YYYY-MM-DD',
  playCount: 0,
  bestScore: null,
  questions: [
    {
      id: 1,
      question: 'Full question text — be specific about what conjugation is tested.',
      jp: '日本語で何ですか？',      // optional — the Japanese prompt shown large in purple
      choices: ['correct answer', 'wrong 1', 'wrong 2'],  // 3 choices minimum, 4 max
      correct: 0,                    // 0-indexed index into choices[]
    },
    // ... 10 questions total
  ],
}
```

**Rules:**
- **10–15 questions** per grammar point. Aim for 10 as the default; use up to 15 when a topic benefits from broader coverage.
- `id`: format `ch{NN}-{keyword}` — e.g. `ch12-potential`, `ch13-volitional`.
- `grammarPoint` and `description` are required — the hint button uses them.
- Questions should target common learner mistakes (wrong form, wrong conjugation, etc.). Mix question types: statement (affirmative), statement (negative), question formation ("how do you ask…?"), and interpretation.
- Use `jp` field for the Japanese word/sentence that is being tested — it displays large in purple.
- `choices` wrong answers: use plausible distractors — similar conjugations, not random words.
- Shuffle `correct` index across questions (don't always put the answer at index 0).

---

## 3 — Registering Grammar Quizzes in the Store

After creating the grammar quiz file, import and add to `src/store/quizStore.js`:

```js
// Add the import at the top of quizStore.js
import { chNNGrammar1, chNNGrammar2 } from '../data/chNNGrammar'

// Add to builtinQuizzes array (current state shown — append new ones here)
const builtinQuizzes = [
  ...genkiQuizzes,
  // Ch.11
  ch11TeformQuiz, ch11GivingQuiz, ch11TaiQuiz, ch11TariQuiz, ch11KotoQuiz, ch11YaQuiz,
  // Ch.NN (add here)
  chNNGrammar1, chNNGrammar2,
]
```

---

## 4 — Registering in `chapterData.js`

The chapter entry in `src/data/chapterData.js` controls what is shown and what is unlocked.

**Vocab-only (no grammar yet):**
```js
{
  number: 12,
  title: 'Chapter 12',
  subtitle: '病気',
  vocab: { available: true },   // no quizId needed for dynamic chapters
  grammar: [],
},
```

**Full chapter (vocab + grammar):**
```js
{
  number: 11,
  title: 'Chapter 11',
  subtitle: '友達とのトラブル',
  vocab: { quizId: 'genki-g1c11', available: true },
  grammar: [
    { id: 'tai',    label: 'たい・たかった',    desc: 'Want to do',              quizId: 'ch11-tai',    available: true },
    { id: 'tari',   label: 'たり〜たりする',    desc: 'Doing things like…',      quizId: 'ch11-tari',   available: true },
    { id: 'koto',   label: 'ことがある',        desc: 'Have done before',        quizId: 'ch11-koto',   available: true },
    { id: 'ya',     label: 'や（など）',        desc: 'Listing: and, among others', quizId: 'ch11-ya', available: true },
    { id: 'teform', label: '〜て forms',        desc: 'てしまう・ておく・てみる', quizId: 'ch11-teform', available: true },
    { id: 'giving', label: 'Giving & Receiving', desc: 'あげる・もらう・くれる', quizId: 'ch11-giving', available: true },
  ],
},
```

**Grammar entry fields:**
| Field       | Description |
|-------------|-------------|
| `id`        | Short slug (no spaces), unique within the chapter |
| `label`     | Japanese label shown on the card — use the grammar form itself |
| `desc`      | Short English description (4–6 words max) |
| `quizId`    | Must exactly match the `id` field in the quiz object |
| `available` | `true` if quiz exists, `false` or omit for "coming soon" |

---

## 5 — Enabling Dynamic Vocab for a New Chapter

To enable the **Category / Direction / Generate & Play** vocab UI for a new chapter:

1. Create `src/data/chNNVocabData.js` (see §1)
2. In `src/utils/vocabQuizGen.js`, import the file and add one entry to `VOCAB_BY_CHAPTER`:
   ```js
   import { chNNVocab, getWordsForCategory as chNNGetWords } from '../data/chNNVocabData'

   const VOCAB_BY_CHAPTER = {
     // ...
     NN: [chNNVocab, chNNGetWords],   // ← add this
   }
   ```
   `ChapterDetailScreen.jsx`, flashcards, mastery and the Continue card all read `DYNAMIC_VOCAB_CHAPTERS` from this map — nothing else to wire.
3. Set `vocab: { available: true }` in `chapterData.js` for the chapter (no `quizId` needed for dynamic chapters).

---

## 6 — Adding Grammar to an Existing Vocab-Only Chapter

When a chapter already has vocab but no grammar (e.g. Ch.12 after its initial vocab release), follow these steps **only** — the vocab wiring is already done:

1. **Create** `src/data/chNNGrammar.js` with one named export per grammar point (see §2).
2. **Import** the quiz objects in `src/store/quizStore.js` and add them to `builtinQuizzes` (see §3).
3. **Update** the chapter entry in `chapterData.js`: populate the `grammar` array with entries for each quiz (see §4). Set `available: true` for each quiz that exists.
4. **Do NOT** touch `vocabQuizGen.js` — vocab is already wired.
5. **Do NOT** change `vocab.available` — it is already `true`.

**Current chapters with vocab but no grammar yet:** Ch.2–10

---

## 7 — Grammar Question Coverage Spectrum

When writing grammar quizzes, spread your 10–15 questions across this spectrum **where applicable** to the grammar point:

| Dimension | Coverage to include |
|-----------|---------------------|
| **Tense** | Present affirmative, present negative, past affirmative, past negative |
| **Verb type** | U-verbs (e.g., 飲む, 歩く, 払う), ru-verbs (e.g., 食べる, 寝る, 別れる), irregular (する, くる) |
| **Adjective type** | い-adjectives (drop い before pattern), な-adjectives (drop な or add な depending on pattern) |
| **Noun** | Noun + grammar pattern (often requires な or だ connector — check the rule) |
| **Polite vs. plain** | Mix short/plain form questions with polite (〜ます/〜です) output where natural |
| **Te-form chains** | Cause-effect sentences using て-form, ので, or combined patterns like すぎる + ので |
| **Cross-pattern** | At least one question combining the new pattern with a previously learned pattern (e.g., すぎる + ほうがいいです, すぎる + ので) |

Not every dimension applies to every grammar point (e.g., ほうがいいです only works with verbs). Cover as many as naturally apply without forcing unnatural usage.

---

## 8 — Question Writing Guidelines

| Do | Don't |
|----|--------|
| Test a specific conjugation form | Ask vague "what does this mean" for grammar |
| Use plausible wrong answers (similar forms) | Use obviously wrong distractors |
| Include the Japanese in the `jp` field | Put Japanese inside `question` text only |
| Write 10 questions spread across use-cases | Repeat the same pattern 10 times |
| Reference Genki's example sentences | Invent non-standard usages |
| Catch common errors (て-form vs. stem, etc.) | Only test easy/obvious cases |
| **Use vocab from the chapter's vocab list** | **Use generic verbs like 食べる/飲む/行く** |
| Write translation questions ("How do you say…?") | Write "common mistake: X is…" questions |

**Vocab in sentences:** Grammar questions should use verbs, nouns, and expressions from the chapter's vocab list (`chNNVocabData.js`) as much as possible. This reinforces vocab alongside grammar. Generic standbys like 食べる, 飲む, 行く are acceptable only when no suitable chapter vocab exists.

**No "common mistake" questions:** Don't frame questions as "Common mistake: X is..." — instead test the same knowledge by asking the student to produce or identify the correct form directly (fill-in, translation, or "which is correct?").

**Example question (grammar — potential form):**

```js
{
  id: 1,
  question: 'How do you say "I can eat sushi"?',
  jp: 'すしを___。',
  choices: ['食べられます', '食べれます', '食べます'],
  correct: 0,
}
```

**Example question (vocab — EN→JP):**

```js
// Generated automatically by vocabQuizGen.js — no need to write these manually
```

---

## 9 — Checklist for Adding a New Chapter

### After writing grammar questions
- [ ] Romaji readings are derived automatically from every `chNNVocabData.js` (see `src/utils/kanjiReadings.js`). For kanji that appear in sentences but not in any vocab list, add them to `EXTRA_WORDS` there (whole words) or `ADJ_STEMS` (い-adjective stems)

### Vocab only (first pass)
- [ ] `src/data/chNNVocabData.js` created with all words, correct categories, lowercase english
- [ ] `vocabQuizGen.js` `VOCAB_BY_CHAPTER` entry added
- [ ] `chapterData.js` chapter entry set to `vocab: { available: true }`, `grammar: []`

### Grammar (second pass — can be done separately)
- [ ] `src/data/chNNGrammar.js` created with 1 named export per grammar point
- [ ] Each grammar quiz has 10–15 questions with `grammarPoint` and `description`
- [ ] All quiz `id`s are globally unique (format: `chNN-keyword`)
- [ ] Quizzes imported and added to `builtinQuizzes` in `quizStore.js`
- [ ] `chapterData.js` grammar array populated with all quiz entries

---

## 10 — Progress & Gamification Model

- **Dates** are local (`src/utils/dates.js`), never `toISOString()` — that's UTC and shifts evening sessions to the wrong day.
- **Wrong-answer bank = spaced repetition** (`applyAnswersToBank` in `statsStore.js`). Leitner boxes 1–5; correct on a *due* item moves it up (next review in 1/3/7/14 days), correct in box 5 = mastered. Wrong → box 1, due today. Every quiz feeds it, including practice runs.
- **Bank keys** come from `question._bankKey` when set. Generated vocab questions use per-word keys (`chNN-vocab-<wordId>-<dir>`) so repeat misses accumulate; never key by a timestamped quiz id.
- **Learned words** = 2 correct quiz answers in a row (`recordVocabAnswer`). Flashcards don't mark words learned.
- **Streak** advances the first time a day's XP reaches `dailyGoal`. Freezes (max 2, earned every 7 streak days) cover missed days.
- **XP** = 10/correct + 50 perfect + combo bonus (+5 at 3 in a row, +10 at 5+) + speed bonus (+3, speed mode only).
- If you add persisted fields to `statsStore`, add them to `partialize`; bump `version` + `migrate` when changing the shape of existing data.

---

## 11 — Compact Grammar Authoring (Ch.13+)

Genki II grammar files (`ch13Grammar.js` … `ch23Grammar.js`) use `makeQuiz` from `src/data/grammarHelpers.js`:

```js
import { makeQuiz } from './grammarHelpers.js'   // keep the .js — lets Node scripts import the file

export const ch13NaraQuiz = makeQuiz({ id: 'ch13-nara', title, topic, grammarPoint, description }, [
  // [question, jp | null, [correctAnswer, ...distractors], explanation]
  ['"If it\'s karate, I can do it."', '空手___、できます。', ['なら', 'ので', 'けど', 'し'], 'Noun + なら = "if it\'s X".'],
])
```

- `choices[0]` is always the answer; `makeQuiz` shuffles with a seeded shuffle so positions vary but never change between reloads (the wrong-answer bank stores question objects).
- Every chapter ends with a `chNN-review` quiz (label `まとめ`) mixing all its grammar points.
- Distractors must be *wrong*, not just different — avoid casual forms that are actually correct (〜っていう, bare 〜か in yes/no embedded questions, ら-less potentials, 〜ちゃう, etc.).
- Questions are written in our own words, modelled on the textbook's practice types — don't copy the book's sentences or exercises (the app is deployed publicly).


---

## 12 — UI System (Nihongo ToGo)

- **Theme tokens** live at the top of `src/index.css`: 藍 indigo (`--primary`) = brand/vocab track, 朱 vermilion (`--accent`) = streak/grammar track, 金 gold (`--gold`) = XP/mastered. Every pressable color has a `-deep` shade used as the 3D bottom edge. Light on `:root`; dark via `prefers-color-scheme` (theme = `system`) or `[data-theme="dark"]`, set by App from `statsStore.theme`. Use tokens, never hex literals, in components.
- **Buttons**: `.btn` + `.btn-primary | -accent | -success | -gold | -danger | -ghost | -white`. They collapse their `--depth` edge on press.
- **Mascots** (`src/components/Mascot.jsx`): **Nori** (triangle onigiri) for vocab and celebrations; **Mentai** (round, spicy mentaiko + chili) for grammar. Moods: `happy | think | cheer | oops | sleep`. `mascotForQuiz()` in `src/utils/mascot.js` picks one per quiz.
- **Icons**: `<Icon name="flame" />` from `src/components/Icon.jsx` (inline SVG, tinted via `color`).
- **Romaji**: one global persisted setting (`statsStore.showRomaji`). Put `<RomajiToggle />` in any screen header and render Japanese with `<Jp>` so it gets a romaji line automatically.
- **Learn tab** (`PathScreen.jsx`) has two tracks (`statsStore.learnTrack`): 単語 vocab (per chapter: Nouns · Verbs · Other · All words) and 文法 grammar (per chapter: each grammar point · まとめ). Nothing is locked; the first unfinished node in the most recently studied chapter gets START. Vocab node = mastered at 100% words learned; grammar node = mastered at best ≥ 80%.
- **Lesson flow** (`QuizScreen.jsx`): select → Check → green/red check bar with correction + rule → Continue (correct answers also auto-advance). Lesson complete (`ScoreScreen.jsx`) shows XP / accuracy / best combo, then a streak screen when the daily goal was just met.
- Keep `html, body, #root` and the App root on `overflow-x: clip` (not `hidden`) or sticky headers and the check bar stop sticking.
