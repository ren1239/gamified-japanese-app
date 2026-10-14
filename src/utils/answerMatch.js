import { toKatakana } from 'wanakana'
import { kanjiToKana } from './romaji'

// Compare typed answers loosely: ignore punctuation/〜/spaces, and treat
// hiragana and katakana as equal (so "こーひー" matches "コーヒー").
function normalize(s) {
  return toKatakana((s || '').replace(/[〜~\s・。、！？!?()（）]/g, '')).toLowerCase()
}

export function isTypedCorrect(input, accept) {
  const typed = normalize(input)
  if (!typed) return false
  return accept.some((a) => normalize(a) === typed || normalize(kanjiToKana(a)) === typed)
}

/** Turn a multiple-choice quiz into a typed-answer quiz */
export function toTypedQuiz(quiz) {
  return {
    ...quiz,
    title: `${quiz.title} · Typed`,
    questions: quiz.questions.map((q) => ({ ...q, inputMode: true, accept: [q.choices[q.correct]] })),
  }
}
