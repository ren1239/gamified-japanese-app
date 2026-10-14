import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useQuizStore, useGameStore } from '../store/quizStore'
import { useStatsStore } from '../store/statsStore'
import Icon from '../components/Icon'
import Jp from '../components/Jp'
import RomajiToggle from '../components/RomajiToggle'
import ChipGroup from '../components/ChipGroup'

const HAS_JP = /[぀-ヿ一-鿿]/

// Answer review after a lesson (or a read-through of a quiz that hasn't been played).
// Uses the same answer cards as the lesson, frozen in their graded state.
export default function ReviewScreen({ quizId, onBack }) {
  const getQuiz = useQuizStore((s) => s.getQuiz)
  const activeQuiz = useGameStore((s) => s.activeQuiz)
  const gameQuestions = useGameStore((s) => s.questions)
  const answers = useGameStore((s) => s.answers)
  const quiz = activeQuiz || getQuiz(quizId)
  const [filter, setFilter] = useState('all')

  // Use the played (shuffled) order so answer.questionIdx lines up
  const questions = useMemo(() => (gameQuestions?.length > 0 ? gameQuestions : quiz?.questions ?? []), [gameQuestions, quiz])
  const rows = useMemo(() => questions.map((q, qi) => ({ q, qi, answer: answers.find((a) => a.questionIdx === qi) ?? null })), [questions, answers])

  if (!quiz) return null

  const hasAnswers = answers.length > 0
  const correct = rows.filter((r) => r.answer?.correct).length
  const wrong = rows.filter((r) => r.answer && !r.answer.correct).length
  const pct = hasAnswers ? Math.round((correct / questions.length) * 100) : null
  const shown = rows.filter((r) => filter === 'all' || (filter === 'wrong' ? r.answer && !r.answer.correct : r.answer?.correct))

  return (
    <div className="page answer-review">
      <header className="answer-review-top">
        <button type="button" className="lesson-icon-btn" onClick={onBack} aria-label="Back"><Icon name="back" size={22} /></button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="answer-review-title">{quiz.title}</div>
          <div className="answer-review-sub">{questions.length} questions{quiz.topic ? ` · ${quiz.topic}` : ''}</div>
        </div>
        <RomajiToggle />
      </header>

      {hasAnswers && (
        <section className="stats-card answer-summary">
          <div className="answer-summary-nums">
            <span><b style={{ color: 'var(--success-deep)' }}>{correct}</b> correct</span>
            <span><b style={{ color: 'var(--error-deep)' }}>{wrong}</b> wrong</span>
            <span className="answer-summary-pct">{pct}%</span>
          </div>
          <div className="meter"><i className="success" style={{ width: `${pct}%` }} /></div>
          <ChipGroup options={[{ id: 'all', label: 'All' }, { id: 'wrong', label: `Wrong (${wrong})` }, { id: 'correct', label: `Correct (${correct})` }]} value={filter} onChange={setFilter} />
        </section>
      )}

      <div className="answer-list">
        {shown.map(({ q, qi, answer }, i) => (
          <ReviewQuestion key={q.id ?? qi} q={q} qi={qi} index={i} answer={answer} quizId={quiz.id} quizTitle={quiz.title} />
        ))}
        {shown.length === 0 && <p className="tab-sub" style={{ textAlign: 'center' }}>Nothing here.</p>}
      </div>
    </div>
  )
}

function ReviewQuestion({ q, qi, index, answer, quizId, quizTitle }) {
  const flaggedBank = useStatsStore((s) => s.flaggedBank)
  const flagQuestion = useStatsStore((s) => s.flagQuestion)
  const unflagQuestion = useStatsStore((s) => s.unflagQuestion)
  const flagKey = q._bankKey ?? `${quizId}-${q.id ?? q.question.slice(0, 30)}`
  const isFlagged = flaggedBank.some((e) => e.key === flagKey)
  const toggleFlag = () => (isFlagged ? unflagQuestion(flagKey) : flagQuestion(q._sourceQuizId ?? quizId, q._sourceQuizTitle ?? quizTitle ?? 'Quiz', q))

  const right = answer?.correct
  const status = !answer ? 'unanswered' : right ? 'right' : 'wrong'

  return (
    <motion.article className={`stats-card answer-card ${status}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index, 10) * 0.035, duration: 0.22 }}>
      <div className="answer-card-head">
        <span className={`answer-status ${status}`}>
          {status === 'unanswered' ? qi + 1 : <Icon name={right ? 'check' : 'cross'} size={26} />}
        </span>
        <p className="lesson-question" style={{ flex: 1 }}>{q.question}</p>
        <button type="button" className={`lesson-icon-btn ${isFlagged ? 'flagged' : ''}`} onClick={toggleFlag} aria-label={isFlagged ? 'Unflag question' : 'Flag for re-test'}>
          <Icon name="flag" size={18} />
        </button>
      </div>
      {q.jp && <Jp className="lesson-jp" reading={q.jpRomaji} style={{ fontSize: 22 }}>{q.jp}</Jp>}

      {answer?.typed && <p className="answer-typed">You typed: <span className="jp">{answer.typed}</span></p>}

      <div className="lesson-choices">
        {q.choices.map((c, ci) => {
          const isCorrect = ci === q.correct
          const isPick = answer && answer.chosen === ci && !answer.typed
          const state = isCorrect ? 'correct' : isPick ? 'wrong' : 'dim'
          return (
            <div key={ci} className={`lesson-choice static ${state}`}>
              <span className="lesson-choice-key">{ci + 1}</span>
              {HAS_JP.test(c) ? <Jp className="lesson-choice-text">{c}</Jp> : <span className="lesson-choice-text">{c}</span>}
              {isPick && !isCorrect && <span className="answer-pick">Your pick</span>}
            </div>
          )
        })}
      </div>

      {status === 'wrong' && q.explanation && <p className="lesson-rule answer-why"><b>Why: </b>{q.explanation}</p>}
    </motion.article>
  )
}
