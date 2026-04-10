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
│   └── genkiQuizzes.js         ← Legacy static quizzes (Chs.1–10)
├── utils/
│   └── vocabQuizGen.js         ← Dynamic vocab quiz generator
├── store/
│   ├── quizStore.js            ← Quiz store + game engine (Zustand)
│   └── statsStore.js           ← XP, streak, history (Zustand + persist)
└── screens/
    └── ChapterDetailScreen.jsx ← Vocab picker + grammar drill cards
```

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
- `english` should be concise — match the Genki textbook exactly.
- Categories map to the UI chips: **Nouns / Verbs / Other**.

---

## 2 — Grammar Quiz Objects (`src/data/chXXGrammar.js`)

Each grammar point is a named export. Use this shape:

```js
export const chNNMyGrammarQuiz = {
  id: 'chNN-mygrammar',            // e.g. 'ch11-tai' — must be globally unique
  title: 'Ch.NN · Grammar Name',   // e.g. 'Ch.11 · たい'
  topic: 'Grammar Label',          // shown as a pill on the question card
  grammarPoint: 'たい・たかった',     // shown in the hint sheet header
  description: 'Express wanting to do something: V-stem + たい (present), + たかった (past). Common mistake: using て-form instead of stem.',
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
- **10–15 questions** per grammar point. Aim for 10 as the default; use up to 15 when a topic benefits from broader coverage (e.g. mixing question forms, affirmative statements, negative statements, and interpretation in one quiz).
- `id`: format `ch{NN}-{keyword}` — e.g. `ch12-potential`, `ch13-volitional`.
- `grammarPoint` and `description` are required — the hint button uses them.
- Questions should target common learner mistakes (wrong form, wrong conjugation, etc.). Mix question types: statement (affirmative), statement (negative), question formation ("how do you ask…?"), and interpretation.
- Use `jp` field for the Japanese word/sentence that is being tested — it displays large in purple.
- `choices` in **wrong answers**: use plausible distractors — similar conjugations, not random words.
- Shuffle `correct` index across questions (don't always put the answer at index 0).

---

## 3 — Registering Grammar Quizzes in the Store

After creating the quiz objects, add them to `src/store/quizStore.js`:

```js
// Add the import at the top
import { chNNMyGrammarQuiz, chNNOtherQuiz } from '../data/chNNGrammar'

// Add to builtinQuizzes array
const builtinQuizzes = [
  ...genkiQuizzes,
  // Ch.11 (existing)
  ch11TeformQuiz, ch11GivingQuiz, ch11TaiQuiz, ch11TariQuiz, ch11KotoQuiz, ch11YaQuiz,
  // Ch.NN (add here)
  chNNMyGrammarQuiz, chNNOtherQuiz,
]
```

---

## 4 — Registering in `chapterData.js`

Add/update the chapter entry in `src/data/chapterData.js`:

```js
{
  number: 11,
  title: 'Chapter 11',
  subtitle: '友達とのトラブル',   // Japanese subtitle from Genki

  // For chapters with a raw vocab data file (dynamic quiz generation):
  // The quizId here is only used for legacy/fallback; dynamic chapters use
  // vocabQuizGen.js which reads directly from chXXVocabData.js
  vocab: { quizId: 'genki-g1c11', available: true },

  // Each grammar point in order of the Genki chapter
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
2. In `ChapterDetailScreen.jsx`, the `VocabSection` component checks `chapter.number === 11` — update this condition to also include the new chapter number:
   ```js
   const hasDynamic = [11, 12, 13].includes(chapter.number)
   ```
3. Update `CATEGORIES` counts at the top of `ChapterDetailScreen.jsx` — or make them dynamic by importing the new vocab file.

---

## 6 — Question Writing Guidelines

| Do | Don't |
|----|--------|
| Test a specific conjugation form | Ask vague "what does this mean" for grammar |
| Use plausible wrong answers (similar forms) | Use obviously wrong distractors |
| Include the Japanese in the `jp` field | Put Japanese inside `question` text only |
| Write 10 questions spread across use-cases | Repeat the same pattern 10 times |
| Reference Genki's example sentences | Invent non-standard usages |
| Catch common errors (て-form vs. stem, etc.) | Only test easy/obvious cases |

**Example question (grammar — たい):**

```js
{
  id: 1,
  question: 'How do you say "I want to eat sushi"?',
  jp: 'すしを___。',
  choices: ['食べたいです', '食べてたいです', '食べたかったです'],
  correct: 0,
}
```

**Example question (vocab — EN→JP):**

```js
// Generated automatically by vocabQuizGen.js — no need to write these manually
```

---

## 7 — Checklist for Adding a New Chapter

- [ ] `src/data/chNNVocabData.js` created with all words, correct categories
- [ ] `src/data/chNNGrammar.js` created with 1 export per grammar point
- [ ] Each grammar quiz has 10–15 questions with `grammarPoint` and `description`
- [ ] All quiz `id`s are globally unique
- [ ] Quizzes imported and added to `builtinQuizzes` in `quizStore.js`
- [ ] Chapter entry updated in `chapterData.js` with grammar array
- [ ] `ChapterDetailScreen.jsx` `hasDynamic` condition updated if adding dynamic vocab
