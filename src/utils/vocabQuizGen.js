// Dynamic vocab quiz generator
// direction: 'jp-en' | 'en-jp' | 'mix'
// Returns a quiz object compatible with useGameStore.startGame

import { getWordsForCategory } from '../data/ch11VocabData'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Pick 3 distractor words from pool (excluding the correct word) */
function pickDistractors(pool, correctId, count = 3) {
  const others = pool.filter(w => w.id !== correctId)
  return shuffle(others).slice(0, count)
}

/** Build a single quiz question */
function buildQuestion(word, direction, pool, qIndex) {
  const isJpEn = direction === 'jp-en' || (direction === 'mix' && Math.random() > 0.5)

  const distractors = pickDistractors(pool, word.id)

  if (isJpEn) {
    // Show Japanese → pick English
    const correctAnswer = word.english
    const wrongAnswers = distractors.map(w => w.english)
    const choices = shuffle([correctAnswer, ...wrongAnswers])
    return {
      id: qIndex + 1,
      question: 'What does this mean?',
      jp: word.kanji ? `${word.kana}（${word.kanji}）` : word.kana,
      choices,
      correct: choices.indexOf(correctAnswer),
    }
  } else {
    // Show English → pick Japanese
    const correctAnswer = word.kana
    const wrongAnswers = distractors.map(w => w.kana)
    const choices = shuffle([correctAnswer, ...wrongAnswers])
    return {
      id: qIndex + 1,
      question: `How do you say "${word.english}" in Japanese?`,
      jp: null,
      choices,
      correct: choices.indexOf(correctAnswer),
    }
  }
}

/**
 * Generate a 10-question vocab quiz
 * @param {string} category — 'all' | 'noun' | 'verb' | 'other'
 * @param {string} direction — 'jp-en' | 'en-jp' | 'mix'
 * @param {string} chapterNum — used for quiz ID
 */
export function generateVocabQuiz(category, direction, chapterNum = 11, limit = 10) {
  const pool = getWordsForCategory(category)

  if (pool.length < 4) {
    throw new Error('Not enough words to generate a quiz (need at least 4)')
  }

  // Pick up to limit random words
  const selected = shuffle(pool).slice(0, Math.min(limit, pool.length))

  const questions = selected.map((word, i) => buildQuestion(word, direction, pool, i))

  const catLabel = { all: 'All', noun: 'Nouns', verb: 'Verbs', other: 'Other' }[category] ?? category
  const dirLabel = { 'jp-en': 'JP→EN', 'en-jp': 'EN→JP', mix: 'Mixed' }[direction] ?? direction

  return {
    id: `ch${chapterNum}-vocab-${category}-${direction}-${Date.now()}`,
    title: `Ch.${chapterNum} Vocab · ${catLabel} · ${dirLabel}`,
    topic: 'Vocabulary',
    chapterNumber: chapterNum,
    isGenerated: true,
    playCount: 0,
    bestScore: null,
    questions,
  }
}
