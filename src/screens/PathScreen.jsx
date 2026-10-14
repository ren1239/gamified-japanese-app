import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { chapters } from '../data/chapterData'
import { useQuizStore } from '../store/quizStore'
import { useStatsStore, getStreakInfo, getDueEntries } from '../store/statsStore'
import { getVocabForChapter, generateVocabQuiz } from '../utils/vocabQuizGen'
import { toTypedQuiz } from '../utils/answerMatch'
import Icon from '../components/Icon'
import Mascot from '../components/Mascot'
import Jp from '../components/Jp'
import RomajiToggle from '../components/RomajiToggle'

// The Learn tab: two separate tracks over the same Genki chapters.
//   単語 (vocab, guided by Nori)  — per chapter: Nouns · Verbs · Other · All-words review
//   文法 (grammar, guided by Mentai) — per chapter: each grammar point · まとめ chest
// Nothing is locked. The recommended next node gets a START tag.

const ZIGZAG = [0, 46, 70, 46, 0, -46, -70, -46]
const VOCAB_GROUPS = [
  { id: 'noun',  label: 'Nouns', icon: 'book',  match: (w) => w.category === 'noun' },
  { id: 'verb',  label: 'Verbs', icon: 'bolt',  match: (w) => ['u-verb', 'ru-verb', 'irregular'].includes(w.category) },
  { id: 'other', label: 'Adjectives & expressions', short: 'Other', icon: 'star', match: (w) => w.category === 'other' },
]
const MASTERED_PCT = 80

function bookLabel(n) {
  if (n === 0) return 'Basics'
  return n <= 12 ? 'Genki I' : 'Genki II'
}

function buildVocabUnits(learnedSet) {
  return chapters
    .map((ch) => {
      const vocab = getVocabForChapter(ch.number)
      if (vocab.length === 0) return null
      const nodes = VOCAB_GROUPS.map((g) => {
        const words = vocab.filter(g.match)
        if (words.length === 0) return null
        const learned = words.filter((w) => learnedSet.has(`ch${ch.number}-${w.id}`)).length
        return { key: `v-${ch.number}-${g.id}`, kind: 'vocab', chapter: ch, group: g, total: words.length, learned, pct: learned / words.length }
      }).filter(Boolean)
      const learnedAll = vocab.filter((w) => learnedSet.has(`ch${ch.number}-${w.id}`)).length
      nodes.push({ key: `v-${ch.number}-all`, kind: 'vocab-review', chapter: ch, total: vocab.length, learned: learnedAll, pct: learnedAll / vocab.length })
      return { chapter: ch, nodes }
    })
    .filter(Boolean)
}

function buildGrammarUnits(quizMap) {
  return chapters
    .filter((ch) => ch.grammar.length > 0)
    .map((ch) => ({
      chapter: ch,
      nodes: ch.grammar.filter((g) => g.available).map((g) => {
        const quiz = quizMap[g.quizId]
        const best = quiz && quiz.bestScore != null && quiz.questions?.length ? quiz.bestScore / quiz.questions.length : 0
        return { key: `g-${g.quizId}`, kind: g.id === 'review' ? 'grammar-review' : 'grammar', chapter: ch, entry: g, quiz, pct: best, played: (quiz?.playCount ?? 0) > 0 }
      }),
    }))
}

function isDone(node) {
  return node.kind.startsWith('vocab') ? node.pct >= 1 : node.pct * 100 >= MASTERED_PCT
}

function NodeButton({ node, x, selected, current, accent, onClick }) {
  const done = isDone(node)
  const started = !done && (node.pct > 0 || node.played)
  const icon = node.kind === 'vocab' ? node.group.icon : node.kind.endsWith('review') ? 'chest' : 'brush'
  const cls = ['path-node', done ? 'done' : '', accent ? 'accent' : '', selected ? 'selected' : ''].join(' ')
  return (
    <div className="path-node-wrap" style={{ transform: `translateX(${x}px)` }}>
      {current && !selected && <span className="path-start-tag">START</span>}
      <span className="path-ring" style={{ '--p': `${Math.round((started ? node.pct : done ? 1 : 0) * 360)}deg` }}>
        <button type="button" className={cls} onClick={onClick} aria-expanded={selected} aria-label={nodeTitle(node)}>
          <Icon name={done ? 'crown' : icon} size={30} />
        </button>
      </span>
    </div>
  )
}

function nodeTitle(node) {
  const n = node.chapter.number
  if (node.kind === 'vocab') return `Ch.${n} · ${node.group.label}`
  if (node.kind === 'vocab-review') return `Ch.${n} · All words`
  return `Ch.${n} · ${node.entry.label}`
}

function NodePanel({ node, accent, onStartQuiz, onFlashcard }) {
  const ch = node.chapter
  const tone = accent ? 'accent' : 'primary'
  if (node.kind === 'vocab' || node.kind === 'vocab-review') {
    const category = node.kind === 'vocab' ? node.group.id : 'all'
    const start = (dir, mode, limit = 10) => onStartQuiz(generateVocabQuiz(category, dir, ch.number, limit, mode), true)
    return (
      <div className={`path-panel ${tone}`}>
        <div className="path-panel-head">
          <div>
            <strong>{nodeTitle(node)}</strong>
            <span>{node.learned}/{node.total} words learned · learned = 2 correct in a row</span>
          </div>
        </div>
        <div className="path-panel-actions">
          <button type="button" className="btn btn-white" onClick={() => onFlashcard({ chapter: ch, category, direction: 'jp-en' })}>
            <Icon name="cards" size={18} /> Flashcards
          </button>
          <button type="button" className="btn btn-white" onClick={() => start('mix', 'choice')}>
            <Icon name="target" size={18} /> Quiz
          </button>
          <button type="button" className="btn btn-white" onClick={() => start('en-jp', 'type')}>
            <Icon name="keyboard" size={18} /> Type it
          </button>
        </div>
      </div>
    )
  }
  const quiz = node.quiz
  const best = node.played ? Math.round(node.pct * 100) : null
  return (
    <div className={`path-panel ${tone}`}>
      <div className="path-panel-head">
        <div>
          <Jp className="path-panel-title">{node.entry.label}</Jp>
          <span>{node.entry.desc} · {quiz?.questions?.length ?? 0} questions{best != null ? ` · best ${best}%` : ''}</span>
        </div>
      </div>
      <div className="path-panel-actions">
        <button type="button" className="btn btn-white" onClick={() => onStartQuiz(quiz, false)}>Start</button>
        <button type="button" className="btn btn-white" onClick={() => onStartQuiz(quiz, true)}><Icon name="shuffle" size={18} /> Shuffle</button>
        {ch.number === 0 && (
          <button type="button" className="btn btn-white" onClick={() => onStartQuiz(toTypedQuiz(quiz), true)}><Icon name="keyboard" size={18} /> Type</button>
        )}
      </div>
    </div>
  )
}

export default function PathScreen({ onStartQuiz, onFlashcard, onOpenChapter, onNavigate }) {
  const stats = useStatsStore()
  const { totalXp, learnedBank, wrongBank, history, learnTrack, setLearnTrack } = stats
  const quizzes = useQuizStore((s) => s.quizzes)
  const [selected, setSelected] = useState(null)
  const currentRef = useRef(null)

  const streak = getStreakInfo(stats).current
  const due = getDueEntries(wrongBank).length
  const isGrammar = learnTrack === 'grammar'

  const units = useMemo(() => {
    if (isGrammar) return buildGrammarUnits(Object.fromEntries(quizzes.map((q) => [q.id, q])))
    return buildVocabUnits(new Set(learnedBank.map((e) => e.wordId)))
  }, [isGrammar, quizzes, learnedBank])

  // Recommended node: first unfinished node in the chapter you studied most recently (for this track)
  const currentKey = useMemo(() => {
    const recent = history.find((h) => isGrammar ? !/vocab/.test(h.quizId) && /^ch\d+/.test(h.quizId) : /vocab/.test(h.quizId))
    const recentCh = recent ? parseInt(recent.quizId.match(/^ch(\d+)/)?.[1] ?? '-1') : -1
    const ordered = [...units.filter((u) => u.chapter.number >= recentCh), ...units.filter((u) => u.chapter.number < recentCh)]
    for (const u of ordered) {
      const n = u.nodes.find((node) => !isDone(node))
      if (n) return n.key
    }
    return null
  }, [units, history, isGrammar])

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'center', behavior: 'auto' })
  }, [learnTrack])

  let zig = 0
  return (
    <div className="path-screen">
      <header className="path-status">
        <span className="path-stat streak" title="Day streak"><Icon name="flame" size={24} />{streak}</span>
        <span className="path-stat xp" title="Total XP"><Icon name="bolt" size={24} />{totalXp.toLocaleString()}</span>
        <button type="button" className="path-stat due" title="Reviews due" onClick={() => onNavigate('custom')}><Icon name="bell" size={24} />{due}</button>
        <RomajiToggle />
      </header>

      <div className="track-switch" role="tablist" aria-label="Study track">
        <button type="button" role="tab" aria-selected={!isGrammar} className={!isGrammar ? 'active' : ''} onClick={() => { setLearnTrack('vocab'); setSelected(null) }}>
          <Mascot who="nori" mood={!isGrammar ? 'happy' : 'sleep'} size={30} />
          <span><b className="jp">単語</b> Vocabulary</span>
        </button>
        <button type="button" role="tab" aria-selected={isGrammar} className={isGrammar ? 'active accent' : ''} onClick={() => { setLearnTrack('grammar'); setSelected(null) }}>
          <Mascot who="mentai" mood={isGrammar ? 'happy' : 'sleep'} size={30} />
          <span><b className="jp">文法</b> Grammar</span>
        </button>
      </div>

      <div className="path-units">
        {units.map((unit, ui) => {
          const ch = unit.chapter
          return (
            <section key={`${learnTrack}-${ch.number}`} className="path-unit">
              <button type="button" className={`path-unit-banner ${isGrammar ? 'accent' : ''}`} onClick={() => onOpenChapter(ch)}>
                <div>
                  <small>{bookLabel(ch.number)} · {ch.number === 0 ? 'Conjugation drills' : `Chapter ${ch.number}`}</small>
                  <Jp className="path-unit-title" romajiStyle={{ color: 'rgba(255,255,255,0.8)' }}>{ch.subtitle.replace(/^★\s*/, '')}</Jp>
                </div>
                <span className="path-unit-guide"><Icon name="guide" size={22} /></span>
              </button>
              <div className="path-nodes">
                {unit.nodes.map((node) => {
                  const x = ZIGZAG[zig++ % ZIGZAG.length]
                  const isCurrent = node.key === currentKey
                  const isSel = selected === node.key
                  return (
                    <div key={node.key} className="path-row" ref={isCurrent ? currentRef : undefined}>
                      <NodeButton node={node} x={x} selected={isSel} current={isCurrent} accent={isGrammar}
                        onClick={() => setSelected(isSel ? null : node.key)} />
                      <AnimatePresence>
                        {isSel && (
                          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }} style={{ width: '100%' }}>
                            <NodePanel node={node} accent={isGrammar} onStartQuiz={onStartQuiz} onFlashcard={onFlashcard} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
                <Mascot who={isGrammar ? 'mentai' : 'nori'} mood={['happy', 'think', 'cheer'][ui % 3]} size={72}
                  className="path-buddy" style={{ [ui % 2 ? 'left' : 'right']: 8 }} />
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
