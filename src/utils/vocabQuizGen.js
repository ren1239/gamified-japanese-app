// Dynamic vocab quiz generator
// direction: 'jp-en' | 'en-jp' | 'mix'
// Returns a quiz object compatible with useGameStore.startGame

import { ch00Vocab, getWordsForCategory as ch00GetWords } from '../data/ch00VocabData'
import { ch1Vocab, getWordsForCategory as ch1GetWords } from '../data/ch1VocabData'
import { ch02Vocab, getWordsForCategory as ch02GetWords } from '../data/ch02VocabData'
import { ch03Vocab, getWordsForCategory as ch03GetWords } from '../data/ch03VocabData'
import { ch04Vocab, getWordsForCategory as ch04GetWords } from '../data/ch04VocabData'
import { ch05Vocab, getWordsForCategory as ch05GetWords } from '../data/ch05VocabData'
import { ch06Vocab, getWordsForCategory as ch06GetWords } from '../data/ch06VocabData'
import { ch07Vocab, getWordsForCategory as ch07GetWords } from '../data/ch07VocabData'
import { ch08Vocab, getWordsForCategory as ch08GetWords } from '../data/ch08VocabData'
import { ch09Vocab, getWordsForCategory as ch09GetWords } from '../data/ch09VocabData'
import { ch10Vocab, getWordsForCategory as ch10GetWords } from '../data/ch10VocabData'
import { ch11Vocab, getWordsForCategory as ch11GetWords } from '../data/ch11VocabData'
import { ch12Vocab, getWordsForCategory as ch12GetWords } from '../data/ch12VocabData'
import { ch13Vocab, getWordsForCategory as ch13GetWords } from '../data/ch13VocabData'
import { ch14Vocab, getWordsForCategory as ch14GetWords } from '../data/ch14VocabData'
import { ch15Vocab, getWordsForCategory as ch15GetWords } from '../data/ch15VocabData'
import { ch16Vocab, getWordsForCategory as ch16GetWords } from '../data/ch16VocabData'
import { ch17Vocab, getWordsForCategory as ch17GetWords } from '../data/ch17VocabData'
import { ch18Vocab, getWordsForCategory as ch18GetWords } from '../data/ch18VocabData'
import { ch19Vocab, getWordsForCategory as ch19GetWords } from '../data/ch19VocabData'
import { ch20Vocab, getWordsForCategory as ch20GetWords } from '../data/ch20VocabData'
import { ch21Vocab, getWordsForCategory as ch21GetWords } from '../data/ch21VocabData'
import { ch22Vocab, getWordsForCategory as ch22GetWords } from '../data/ch22VocabData'
import { ch23Vocab, getWordsForCategory as ch23GetWords } from '../data/ch23VocabData'

const VOCAB_BY_CHAPTER = {
  0: [ch00Vocab, ch00GetWords],
  1: [ch1Vocab, ch1GetWords],
  2: [ch02Vocab, ch02GetWords],
  3: [ch03Vocab, ch03GetWords],
  4: [ch04Vocab, ch04GetWords],
  5: [ch05Vocab, ch05GetWords],
  6: [ch06Vocab, ch06GetWords],
  7: [ch07Vocab, ch07GetWords],
  8: [ch08Vocab, ch08GetWords],
  9: [ch09Vocab, ch09GetWords],
  10: [ch10Vocab, ch10GetWords],
  11: [ch11Vocab, ch11GetWords],
  12: [ch12Vocab, ch12GetWords],
  13: [ch13Vocab, ch13GetWords],
  14: [ch14Vocab, ch14GetWords],
  15: [ch15Vocab, ch15GetWords],
  16: [ch16Vocab, ch16GetWords],
  17: [ch17Vocab, ch17GetWords],
  18: [ch18Vocab, ch18GetWords],
  19: [ch19Vocab, ch19GetWords],
  20: [ch20Vocab, ch20GetWords],
  21: [ch21Vocab, ch21GetWords],
  22: [ch22Vocab, ch22GetWords],
  23: [ch23Vocab, ch23GetWords],
}

export const DYNAMIC_VOCAB_CHAPTERS = Object.keys(VOCAB_BY_CHAPTER).map(Number)

export function getWordsForChapterAndCategory(chapterNum, category) {
  return VOCAB_BY_CHAPTER[chapterNum]?.[1](category) ?? []
}

export function getVocabForChapter(chapterNum) {
  return VOCAB_BY_CHAPTER[chapterNum]?.[0] ?? []
}

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

/** Build a single quiz question. Bank keys are per word so repeated misses accumulate. */
function buildQuestion(word, direction, pool, qIndex, chapterNum, answerMode) {
  const isJpEn = direction === 'jp-en' || (direction === 'mix' && Math.random() > 0.5)

  const distractors = pickDistractors(pool, word.id)
  const dir = isJpEn ? 'jp-en' : 'en-jp'
  const meta = {
    id: `${word.id}-${dir}`,
    _bankKey: `ch${chapterNum}-vocab-${word.id}-${dir}`,
    _sourceQuizId: `ch${chapterNum}-vocab`,
    _sourceQuizTitle: `Ch.${chapterNum} · Vocab`,
    _wordId: `ch${chapterNum}-${word.id}`,
    _chapterNum: chapterNum,
    _speak: word.kana.replace(/〜/g, ''),
  }

  if (isJpEn) {
    // Show Japanese → pick English
    const correctAnswer = word.english
    const wrongAnswers = distractors.map(w => w.english)
    const choices = shuffle([correctAnswer, ...wrongAnswers])
    return {
      ...meta,
      question: 'What does this mean?',
      jp: word.kanji ? `${word.kana}（${word.kanji}）` : word.kana,
      jpRomaji: word.kana, // kana-only for romaji conversion — no map needed
      choices,
      correct: choices.indexOf(correctAnswer),
    }
  } else {
    // Show English → pick (or type) Japanese
    const correctAnswer = word.kana
    const wrongAnswers = distractors.map(w => w.kana)
    const choices = shuffle([correctAnswer, ...wrongAnswers])
    return {
      ...meta,
      question: `How do you say "${word.english}" in Japanese?`,
      jp: null,
      choices,
      correct: choices.indexOf(correctAnswer),
      ...(answerMode === 'type' ? { inputMode: true, accept: [word.kana, word.kanji].filter(Boolean) } : {}),
    }
  }
}

/**
 * Generate a 10-question vocab quiz
 * @param {string} category — 'all' | 'noun' | 'verb' | 'other'
 * @param {string} direction — 'jp-en' | 'en-jp' | 'mix'
 * @param {string} chapterNum — used for quiz ID
 * @param {string} answerMode — 'choice' | 'type' (type applies to EN→JP questions)
 */
export function generateVocabQuiz(category, direction, chapterNum = 11, limit = 10, answerMode = 'choice') {
  const pool = getWordsForChapterAndCategory(chapterNum, category)

  if (pool.length < 4) {
    throw new Error('Not enough words to generate a quiz (need at least 4)')
  }

  // Pick up to limit random words
  const selected = shuffle(pool).slice(0, Math.min(limit, pool.length))

  const questions = selected.map((word, i) => buildQuestion(word, direction, pool, i, chapterNum, answerMode))

  const catLabel = { all: 'All', noun: 'Nouns', verb: 'Verbs', other: 'Other' }[category] ?? category
  const dirLabel = { 'jp-en': 'JP→EN', 'en-jp': 'EN→JP', mix: 'Mixed' }[direction] ?? direction

  return {
    id: `ch${chapterNum}-vocab-${category}-${direction}-${Date.now()}`,
    title: `Ch.${chapterNum} Vocab · ${catLabel} · ${dirLabel}${answerMode === 'type' ? ' · Typed' : ''}`,
    topic: 'Vocabulary',
    chapterNumber: chapterNum,
    isGenerated: true,
    playCount: 0,
    bestScore: null,
    questions,
  }
}
