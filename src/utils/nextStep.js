import { chapters } from '../data/chapterData'
import { getDueEntries } from '../store/statsStore'
import { buildPracticeQuiz } from './practiceQuiz'
import { generateVocabQuiz, getVocabForChapter } from './vocabQuizGen'

const isUnlocked = (ch) => ch.vocab?.available || ch.grammar.length > 0

/** Chapter of the most recent non-practice quiz, falling back to Ch.1 */
function currentChapterNum(history) {
  for (const h of history) {
    const m = h.quizId.match(/^ch(\d+)/) || h.quizId.match(/^genki-g\dc(\d+)/)
    if (m) return parseInt(m[1])
  }
  return 1
}

/**
 * The single best thing to do next: due reviews first, then work through the
 * current chapter (unplayed drills → weak drills → unlearned vocab), then move on.
 * Returns { kind, title, subtitle, makeQuiz } or null.
 */
export function getNextStep({ wrongBank, history, quizzes, learnedBank }) {
  const due = getDueEntries(wrongBank)
  if (due.length > 0) {
    const batch = [...due].sort((a, b) => (a.box ?? 1) - (b.box ?? 1) || b.wrongCount - a.wrongCount).slice(0, 20)
    return {
      kind: 'review',
      title: `${due.length} review${due.length !== 1 ? 's' : ''} due`,
      subtitle: due.length > 20 ? 'Spaced repetition · first 20 now' : 'Spaced repetition · clear them to stay sharp',
      makeQuiz: () => buildPracticeQuiz(batch, 'Daily Review'),
    }
  }

  const quizMap = Object.fromEntries(quizzes.map((q) => [q.id, q]))
  const startNum = currentChapterNum(history)
  const ordered = [
    ...chapters.filter((c) => c.number >= startNum),
    ...chapters.filter((c) => c.number < startNum && c.number > 0),
  ].filter(isUnlocked)

  for (const ch of ordered) {
    const drills = ch.grammar.filter((g) => g.available && quizMap[g.quizId])
    const unplayed = drills.find((g) => !quizMap[g.quizId].playCount)
    if (unplayed) {
      return {
        kind: 'grammar', chapter: ch,
        title: `Ch.${ch.number} · ${unplayed.label}`,
        subtitle: `New drill · ${unplayed.desc}`,
        makeQuiz: () => quizMap[unplayed.quizId],
      }
    }
    const weak = drills.find((g) => {
      const q = quizMap[g.quizId]
      return q.bestScore / q.questions.length < 0.8
    })
    if (weak) {
      const q = quizMap[weak.quizId]
      return {
        kind: 'grammar', chapter: ch,
        title: `Ch.${ch.number} · ${weak.label}`,
        subtitle: `Best ${Math.round((q.bestScore / q.questions.length) * 100)}% · aim for 80%+`,
        makeQuiz: () => q,
      }
    }
    const vocab = getVocabForChapter(ch.number)
    const learned = learnedBank.filter((e) => e.chapterNum === ch.number).length
    if (vocab.length > 0 && learned < vocab.length) {
      return {
        kind: 'vocab', chapter: ch,
        title: `Ch.${ch.number} vocab`,
        subtitle: `${learned}/${vocab.length} words learned · 10 mixed questions`,
        makeQuiz: () => generateVocabQuiz('all', 'mix', ch.number, 10),
      }
    }
  }
  return null
}
