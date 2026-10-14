import { getVocabForChapter } from './vocabQuizGen'

/**
 * Chapter mastery 0–100: share of vocab learned (2 correct answers in a row)
 * blended equally with the average best score across the chapter's grammar drills.
 * Returns null for chapters with nothing to master yet.
 */
export function getChapterMastery(chapter, quizzes, learnedBank) {
  const parts = []

  const vocab = getVocabForChapter(chapter.number)
  let vocabLearned = 0
  if (vocab.length > 0) {
    vocabLearned = learnedBank.filter((e) => e.chapterNum === chapter.number).length
    parts.push(Math.min(1, vocabLearned / vocab.length))
  }

  const grammar = (chapter.grammar || []).filter((g) => g.available)
  if (grammar.length > 0) {
    const scores = grammar.map((g) => {
      const q = quizzes.find((x) => x.id === g.quizId)
      return q && q.bestScore != null && q.questions?.length ? q.bestScore / q.questions.length : 0
    })
    parts.push(scores.reduce((a, b) => a + b, 0) / scores.length)
  }

  if (parts.length === 0) return null
  const pct = Math.round((parts.reduce((a, b) => a + b, 0) / parts.length) * 100)
  return { pct, vocabLearned, vocabTotal: vocab.length }
}
