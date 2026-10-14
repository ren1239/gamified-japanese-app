// Compact authoring helpers for grammar quizzes.
//
// Each question row is [question, jp, choices, explanation] where choices[0] is the
// correct answer. Choices are shuffled with a seeded (deterministic) shuffle so the
// answer position varies but stays stable across reloads — the wrong-answer bank
// stores question objects, so order must not change between sessions.

function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function seededShuffle(arr, seed) {
  const a = [...arr]
  let s = seed || 1
  for (let i = a.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0
    const j = s % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function makeQuiz(meta, rows) {
  return {
    created: '2026-10-14',
    playCount: 0,
    bestScore: null,
    ...meta,
    questions: rows.map(([question, jp, choices, explanation], i) => {
      const answer = choices[0]
      const shuffled = seededShuffle(choices, hash(`${meta.id}-${i}-${question}`))
      return {
        id: i + 1,
        question,
        ...(jp ? { jp } : {}),
        choices: shuffled,
        correct: shuffled.indexOf(answer),
        ...(explanation ? { explanation } : {}),
      }
    }),
  }
}
