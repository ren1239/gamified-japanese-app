// Generates pre-built chapter quizzes from genkiVocab
// Deterministic: uses chapter index as seed so same questions every load
// Run: node src/data/generateGenkiQuizzes.js > src/data/genkiQuizzes.js

import genkiVocab from './genkiVocab.js'

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function pickDistractors(pool, correctEn, rand, count = 2) {
  const others = pool.filter((w) => w.en !== correctEn)
  for (let i = others.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[others[i], others[j]] = [others[j], others[i]]
  }
  return others.slice(0, count).map((w) => w.en)
}

function generateChapterQuiz(chapter, chapterIdx, allWords) {
  const rand = seededRandom(chapterIdx * 31337 + 42)
  const words = [...chapter.words]

  // Shuffle words
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[words[i], words[j]] = [words[j], words[i]]
  }

  // Pick up to 10
  const selected = words.slice(0, 10)

  const questions = selected.map((word, qi) => {
    const distractors = pickDistractors(allWords, word.en, rand, 2)
    const choices = [word.en, ...distractors]
    // Shuffle choices
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1))
      ;[choices[i], choices[j]] = [choices[j], choices[i]]
    }
    const correct = choices.indexOf(word.en)
    return {
      id: qi + 1,
      question: 'What does this mean?',
      jp: word.jp,
      choices,
      correct,
    }
  })

  return {
    id: `genki-${chapter.chapterKey}`,
    title: chapter.chapter,
    topic: chapter.chapter,
    created: '2026-04-09',
    playCount: 0,
    bestScore: null,
    questions,
  }
}

const allWords = genkiVocab.flatMap((c) => c.words)
const quizzes = genkiVocab.map((chapter, idx) =>
  generateChapterQuiz(chapter, idx, allWords)
)

console.log('export const genkiQuizzes = ' + JSON.stringify(quizzes, null, 2))
