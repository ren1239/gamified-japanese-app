/** Which friend fits a quiz: Nori for vocabulary, Mentai (the spicy one) for grammar. */
export function mascotForQuiz(quiz, question) {
  if (question?._wordId || quiz?.topic === 'Vocabulary' || /vocab/i.test(quiz?.id ?? '')) return 'nori'
  return 'mentai'
}
