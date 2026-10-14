import { todayStr } from './dates'

/** Build a playable quiz from wrong-bank / flagged-bank entries */
export function buildPracticeQuiz(entries, title = 'Mistakes Practice', topic = 'Wrong Answers') {
  return {
    id: `practice_${Date.now()}`,
    title,
    topic,
    created: todayStr(),
    playCount: 0,
    bestScore: null,
    questions: entries.map((entry) => ({
      ...entry.question,
      _bankKey: entry.key,
      _sourceQuizId: entry.quizId,
      _sourceQuizTitle: entry.quizTitle,
    })),
  }
}
