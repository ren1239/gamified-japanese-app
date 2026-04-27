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
2. In `src/utils/vocabQuizGen.js`, add two cases for the new chapter:
   ```js
   import { chNNVocab, getWordsForCategory as chNNGetWords } from '../data/chNNVocabData'

   export function getWordsForChapterAndCategory(chapterNum, category) {
     if (chapterNum === 11) return ch11GetWords(category)
     if (chapterNum === 12) return ch12GetWords(category)
     if (chapterNum === NN) return chNNGetWords(category)   // ← add this
     return []
   }

   export function getVocabForChapter(chapterNum) {
     if (chapterNum === 11) return ch11Vocab
     if (chapterNum === 12) return ch12Vocab
     if (chapterNum === NN) return chNNVocab                // ← add this
     return []
   }
   ```
3. In `src/screens/ChapterDetailScreen.jsx`, add the chapter number to `hasDynamic`:
   ```js
   const hasDynamic = [11, 12, NN].includes(chapter.number)
   ```
4. Set `vocab: { available: true }` in `chapterData.js` for the chapter (no `quizId` needed for dynamic chapters).

---

## 6 — Adding Grammar to an Existing Vocab-Only Chapter

When a chapter already has vocab but no grammar (e.g. Ch.12 after its initial vocab release), follow these steps **only** — the vocab wiring is already done:

1. **Create** `src/data/chNNGrammar.js` with one named export per grammar point (see §2).
2. **Import** the quiz objects in `src/store/quizStore.js` and add them to `builtinQuizzes` (see §3).
3. **Update** the chapter entry in `chapterData.js`: populate the `grammar` array with entries for each quiz (see §4). Set `available: true` for each quiz that exists.
4. **Do NOT** touch `vocabQuizGen.js` or `ChapterDetailScreen.jsx` — those are already wired.
5. **Do NOT** change `vocab.available` — it is already `true`.

**Current chapters with vocab but no grammar yet:** Ch.12

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
- [ ] Check every kanji in every `jp` field against `src/utils/romaji.js` KANJI_MAP
- [ ] Add any missing kanji/words (longest forms first) so romaji toggle works correctly

### Vocab only (first pass)
- [ ] `src/data/chNNVocabData.js` created with all words, correct categories, lowercase english
- [ ] `vocabQuizGen.js` updated with new chapter cases in both functions
- [ ] `ChapterDetailScreen.jsx` `hasDynamic` array updated to include new chapter number
- [ ] `chapterData.js` chapter entry set to `vocab: { available: true }`, `grammar: []`

### Grammar (second pass — can be done separately)
- [ ] `src/data/chNNGrammar.js` created with 1 named export per grammar point
- [ ] Each grammar quiz has 10–15 questions with `grammarPoint` and `description`
- [ ] All quiz `id`s are globally unique (format: `chNN-keyword`)
- [ ] Quizzes imported and added to `builtinQuizzes` in `quizStore.js`
- [ ] `chapterData.js` grammar array populated with all quiz entries
