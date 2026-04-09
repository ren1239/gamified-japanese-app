import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Shuffle, Trash2, Plus, ChevronRight, AlertCircle, ChevronDown, Check } from 'lucide-react'
import { useStatsStore } from '../store/statsStore'
import { useQuizStore } from '../store/quizStore'
import ImportModal from '../components/ImportModal'

const COUNT_OPTIONS = [5, 10, 15, 20]

// Parse chapter number from quizId: "ch11-tai" → 11, "genki-g1c11" → 11
function getChapterNum(quizId) {
  const m = quizId.match(/^ch(\d+)/)
  if (m) return parseInt(m[1])
  const m2 = quizId.match(/c(\d+)/)
  if (m2) return parseInt(m2[1])
  return 0
}

// "Ch.11 · たい・たかった" → "たい・たかった" | "Ch.1 · Vocab" → "Vocab"
function getShortLabel(quizTitle) {
  const parts = quizTitle.split(' · ')
  return parts.length > 1 ? parts.slice(1).join(' · ') : quizTitle
}

// ── Chapter accordion filter ──────────────────────────────────────────
function ChapterFilter({ wrongBank, activeSourceIds, onToggleSource, onToggleChapter }) {
  const [expandedChapters, setExpandedChapters] = useState(() => {
    // Auto-expand if only one chapter
    const chs = new Set(wrongBank.map((e) => getChapterNum(e.quizId)))
    return chs.size === 1 ? chs : new Set()
  })

  const groups = useMemo(() => {
    const map = new Map()
    wrongBank.forEach((entry) => {
      const ch = getChapterNum(entry.quizId)
      if (!map.has(ch)) map.set(ch, { chapter: ch, sources: new Map(), total: 0 })
      const grp = map.get(ch)
      if (!grp.sources.has(entry.quizId)) {
        grp.sources.set(entry.quizId, { quizId: entry.quizId, label: getShortLabel(entry.quizTitle), count: 0 })
      }
      grp.sources.get(entry.quizId).count++
      grp.total++
    })
    return Array.from(map.values())
      .map((g) => ({ ...g, sources: Array.from(g.sources.values()).sort((a, b) => b.count - a.count) }))
      .sort((a, b) => a.chapter - b.chapter)
  }, [wrongBank])

  const toggleExpand = (ch) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev)
      next.has(ch) ? next.delete(ch) : next.add(ch)
      return next
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {groups.map((group) => {
        const isExpanded = expandedChapters.has(group.chapter)
        const activeInChapter = group.sources.filter((s) => activeSourceIds.has(s.quizId)).length
        const allActive = activeInChapter === group.sources.length
        const someActive = activeInChapter > 0 && !allActive
        const chapterState = allActive ? 'all' : someActive ? 'some' : 'none'

        const borderColor = allActive
          ? 'var(--primary)'
          : someActive
          ? 'rgba(124,58,237,0.4)'
          : 'var(--border-md)'

        return (
          <div key={group.chapter}>
            {/* ── Chapter row ── */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleExpand(group.chapter)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px',
                borderRadius: isExpanded ? '10px 10px 0 0' : 10,
                border: `1.5px solid ${borderColor}`,
                borderBottom: isExpanded ? '1px solid var(--border)' : `1.5px solid ${borderColor}`,
                background: allActive ? 'rgba(124,58,237,0.06)' : 'var(--surface)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {/* Chapter badge */}
              <div style={{
                width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                background: chapterState === 'all' ? 'var(--primary)' : chapterState === 'some' ? 'rgba(124,58,237,0.25)' : 'var(--border)',
                color: chapterState === 'none' ? 'var(--text-muted)' : chapterState === 'all' ? '#fff' : 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Nunito'", fontWeight: 900, fontSize: 15,
                transition: 'all 0.2s',
              }}>
                {group.chapter}
              </div>

              {/* Label */}
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 13, color: allActive ? 'var(--primary)' : 'var(--text)', transition: 'color 0.15s' }}>
                  Chapter {group.chapter}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>
                  {activeInChapter}/{group.sources.length} drills selected
                </div>
              </div>

              {/* Chapter total badge */}
              <div style={{
                minWidth: 28, height: 20, borderRadius: 10,
                background: allActive ? 'var(--primary)' : 'var(--border)',
                color: allActive ? '#fff' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Nunito'", fontWeight: 900, fontSize: 11,
                padding: '0 7px',
                transition: 'all 0.2s',
              }}>
                {group.total}
              </div>

              {/* "Select all / none" tap zone */}
              <div
                onClick={(e) => { e.stopPropagation(); onToggleChapter(group) }}
                style={{
                  width: 22, height: 22, borderRadius: 6,
                  border: allActive ? 'none' : someActive ? '1.5px solid var(--primary)' : '1.5px solid var(--border-md)',
                  background: allActive ? 'var(--primary)' : someActive ? 'rgba(124,58,237,0.1)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'all 0.15s', cursor: 'pointer',
                }}
              >
                {allActive && <Check size={12} color="#fff" strokeWidth={3} />}
                {someActive && <div style={{ width: 8, height: 2, background: 'var(--primary)', borderRadius: 1 }} />}
              </div>

              {/* Chevron */}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.18 }}
                style={{ color: 'var(--text-muted)', display: 'flex', flexShrink: 0 }}
              >
                <ChevronDown size={14} />
              </motion.div>
            </motion.button>

            {/* ── Expanded sub-rows ── */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  style={{
                    overflow: 'hidden',
                    border: `1.5px solid ${borderColor}`,
                    borderTop: 'none',
                    borderRadius: '0 0 10px 10px',
                  }}
                >
                  {group.sources.map((source, idx) => {
                    const active = activeSourceIds.has(source.quizId)
                    const maxCount = Math.max(...group.sources.map((s) => s.count))
                    const pct = Math.round((source.count / maxCount) * 100)
                    return (
                      <motion.button
                        key={source.quizId}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        onClick={() => onToggleSource(source.quizId)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                          padding: '9px 12px',
                          borderBottom: idx < group.sources.length - 1 ? '1px solid var(--border)' : 'none',
                          background: active ? 'rgba(124,58,237,0.04)' : 'var(--bg)',
                          border: 'none', cursor: 'pointer', textAlign: 'left',
                          transition: 'background 0.15s',
                        }}
                      >
                        {/* Checkbox */}
                        <div style={{
                          width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                          border: active ? 'none' : '1.5px solid var(--border-md)',
                          background: active ? 'var(--primary)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.15s',
                        }}>
                          {active && <Check size={11} color="#fff" strokeWidth={3} />}
                        </div>

                        {/* Label */}
                        <div style={{ flex: 1, fontFamily: "'Nunito'", fontWeight: 700, fontSize: 12.5, color: active ? 'var(--text)' : 'var(--text-muted)', lineHeight: 1.3 }}>
                          {source.label}
                        </div>

                        {/* Mini fill bar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
                            <div style={{ width: `${pct}%`, height: '100%', borderRadius: 2, background: active ? 'var(--primary)' : 'var(--text-muted)', opacity: active ? 1 : 0.4, transition: 'all 0.2s' }} />
                          </div>
                          <div style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 12, color: active ? 'var(--primary)' : 'var(--text-muted)', minWidth: 14, textAlign: 'right' }}>
                            {source.count}
                          </div>
                        </div>
                      </motion.button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ── Main screen ───────────────────────────────────────────────────────
export default function HomeScreen({ onStart, onReview }) {
  const wrongBank = useStatsStore((s) => s.wrongBank)
  const clearWrongBank = useStatsStore((s) => s.clearWrongBank)
  const quizzes = useQuizStore((s) => s.quizzes)
  const removeQuiz = useQuizStore((s) => s.removeQuiz)

  const [count, setCount] = useState(10)
  const [mode, setMode] = useState('missed')
  const [showImport, setShowImport] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)
  const [selectedSources, setSelectedSources] = useState(null) // null = all

  const customQuizzes = useMemo(
    () => quizzes.filter((q) => q.id.startsWith('quiz_')),
    [quizzes]
  )

  const allSourceIds = useMemo(() => new Set(wrongBank.map((e) => e.quizId)), [wrongBank])
  const activeSourceIds = selectedSources ?? allSourceIds

  const handleToggleSource = (quizId) => {
    const current = new Set(activeSourceIds)
    if (current.has(quizId) && current.size > 1) {
      current.delete(quizId)
    } else if (!current.has(quizId)) {
      current.add(quizId)
    }
    setSelectedSources(current.size === allSourceIds.size ? null : current)
  }

  const handleToggleChapter = (group) => {
    const chapterIds = group.sources.map((s) => s.quizId)
    const allActive = chapterIds.every((id) => activeSourceIds.has(id))
    const current = new Set(activeSourceIds)
    if (allActive) {
      // Deselect chapter — must keep at least one source
      const remaining = [...current].filter((id) => !chapterIds.includes(id))
      if (remaining.length === 0) return
      setSelectedSources(remaining.length === allSourceIds.size ? null : new Set(remaining))
    } else {
      chapterIds.forEach((id) => current.add(id))
      setSelectedSources(current.size === allSourceIds.size ? null : current)
    }
  }

  const filteredBank = useMemo(
    () => wrongBank.filter((e) => activeSourceIds.has(e.quizId)),
    [wrongBank, activeSourceIds]
  )

  const bankSize = filteredBank.length
  const totalBankSize = wrongBank.length
  const actualCount = Math.min(count, bankSize)

  const handleGenerate = () => {
    if (bankSize === 0) return
    const sorted = mode === 'missed'
      ? [...filteredBank].sort((a, b) => b.wrongCount - a.wrongCount)
      : [...filteredBank].sort(() => Math.random() - 0.5)

    const selected = sorted.slice(0, actualCount)
    const practiceQuiz = {
      id: `practice_${Date.now()}`,
      title: 'Mistakes Practice',
      topic: 'Wrong Answers',
      created: new Date().toISOString().slice(0, 10),
      playCount: 0,
      bestScore: null,
      // Embed _bankKey so updateStats can remove mastered questions
      questions: selected.map((entry) => ({ ...entry.question, _bankKey: entry.key })),
    }
    onStart(practiceQuiz, false)
  }

  return (
    <>
      <div className="page" style={{ paddingTop: 24, paddingBottom: 100 }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 8vw, 46px)', color: 'var(--text)', letterSpacing: '1px', lineHeight: 1 }}>
            PRACTICE
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, marginTop: 4 }}>
            Drill your weak spots, turn mistakes into mastery
          </div>
        </motion.div>

        {/* Bank card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="glass-card"
          style={{ padding: '20px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: totalBankSize > 0 ? 'linear-gradient(90deg, var(--primary), var(--accent))' : 'var(--border)',
          }} />

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: totalBankSize > 0 ? 18 : 0 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, flexShrink: 0,
              background: totalBankSize > 0 ? 'var(--primary-glow)' : 'var(--border)',
              color: totalBankSize > 0 ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Target size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 16, color: 'var(--text)', marginBottom: 2 }}>
                Wrong Answers Bank
              </div>
              {totalBankSize === 0 ? (
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, lineHeight: 1.5 }}>
                  Complete quizzes to start banking<br />your wrong answers here.
                </div>
              ) : (
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: 15 }}>{totalBankSize}</span>
                  {' '}question{totalBankSize !== 1 ? 's' : ''} banked
                  {selectedSources && bankSize !== totalBankSize && (
                    <span style={{ color: 'var(--accent)', fontWeight: 900 }}> · {bankSize} selected</span>
                  )}
                </div>
              )}
            </div>
            {totalBankSize > 0 && (
              <button
                onClick={() => {
                  if (confirmClear) { clearWrongBank(); setSelectedSources(null); setConfirmClear(false) }
                  else setConfirmClear(true)
                }}
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: confirmClear ? 'var(--error)' : 'var(--text-muted)',
                  fontSize: 11, fontFamily: "'Nunito'", fontWeight: 700,
                  padding: '4px 0', whiteSpace: 'nowrap', transition: 'color 0.2s',
                }}
                onBlur={() => setTimeout(() => setConfirmClear(false), 200)}
              >
                {confirmClear ? 'Confirm clear?' : <Trash2 size={16} />}
              </button>
            )}
          </div>

          {totalBankSize > 0 && (
            <>
              {/* Chapter accordion filter */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>
                  Filter by chapter
                </div>
                <ChapterFilter
                  wrongBank={wrongBank}
                  activeSourceIds={activeSourceIds}
                  onToggleSource={handleToggleSource}
                  onToggleChapter={handleToggleChapter}
                />
              </div>

              {/* Count selector */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>
                  Questions per session
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {COUNT_OPTIONS.map((n) => {
                    const disabled = n > bankSize
                    const active = count === n && !disabled
                    return (
                      <button key={n} onClick={() => !disabled && setCount(n)} style={{
                        flex: 1, padding: '9px 0', borderRadius: 10,
                        border: active ? '1.5px solid var(--primary)' : '1.5px solid var(--border-md)',
                        background: active ? 'var(--primary-glow)' : 'transparent',
                        color: disabled ? 'var(--border-md)' : active ? 'var(--primary)' : 'var(--text-muted)',
                        fontFamily: "'Nunito'", fontWeight: 900, fontSize: 15,
                        cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
                      }}>
                        {n}
                      </button>
                    )
                  })}
                  <button onClick={() => setCount(bankSize)} style={{
                    flex: 1.2, padding: '9px 0', borderRadius: 10,
                    border: count === bankSize && !COUNT_OPTIONS.includes(bankSize) ? '1.5px solid var(--primary)' : '1.5px solid var(--border-md)',
                    background: count === bankSize && !COUNT_OPTIONS.includes(bankSize) ? 'var(--primary-glow)' : 'transparent',
                    color: count === bankSize && !COUNT_OPTIONS.includes(bankSize) ? 'var(--primary)' : 'var(--text-muted)',
                    fontFamily: "'Nunito'", fontWeight: 900, fontSize: 13,
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}>
                    All{bankSize !== totalBankSize ? ` (${bankSize})` : ''}
                  </button>
                </div>
              </div>

              {/* Mode selector */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>
                  Order
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[{ key: 'missed', label: 'Most Missed First' }, { key: 'random', label: 'Shuffle' }].map(({ key, label }) => (
                    <button key={key} onClick={() => setMode(key)} style={{
                      flex: 1, padding: '9px 12px', borderRadius: 10,
                      border: mode === key ? '1.5px solid var(--primary)' : '1.5px solid var(--border-md)',
                      background: mode === key ? 'var(--primary-glow)' : 'transparent',
                      color: mode === key ? 'var(--primary)' : 'var(--text-muted)',
                      fontFamily: "'Nunito'", fontWeight: 800, fontSize: 12,
                      cursor: 'pointer', transition: 'all 0.15s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    }}>
                      {key === 'random' && <Shuffle size={12} />}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Start button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGenerate}
                disabled={bankSize === 0}
                className="btn btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 15, opacity: bankSize === 0 ? 0.4 : 1 }}
              >
                <Target size={16} />
                Start Practice · {actualCount} question{actualCount !== 1 ? 's' : ''}
                <ChevronRight size={16} />
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Empty state */}
        {totalBankSize === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'var(--border)', borderRadius: 12, padding: '12px 14px', marginBottom: 24 }}>
            <AlertCircle size={15} color="var(--text-muted)" style={{ marginTop: 1, flexShrink: 0 }} />
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, lineHeight: 1.5 }}>
              Complete chapter or grammar quizzes and any questions you get wrong will appear here automatically.
            </div>
          </motion.div>
        )}

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, marginTop: totalBankSize === 0 ? 0 : 8 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Custom Quizzes</div>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {/* Import button */}
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          onClick={() => setShowImport(true)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px', borderRadius: 12, marginBottom: 16,
            border: '1.5px dashed var(--border-md)', background: 'transparent',
            cursor: 'pointer', color: 'var(--text-muted)',
            fontFamily: "'Nunito'", fontWeight: 700, fontSize: 13,
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-md)'; e.currentTarget.style.color = 'var(--text-muted)' }}
        >
          <Plus size={16} />
          Import JSON Quiz
        </motion.button>

        {/* Custom quiz list */}
        {customQuizzes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '16px 0 32px', color: 'var(--text-muted)', fontSize: 12, fontWeight: 600 }}>
            No imported quizzes yet.<br />
            <span style={{ opacity: 0.6 }}>Ask Claude to generate a quiz and import above.</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <AnimatePresence>
              {customQuizzes.map((quiz, i) => (
                <CustomQuizRow key={quiz.id} quiz={quiz} index={i}
                  onPlay={() => onStart(quiz, false)}
                  onReview={() => onReview(quiz.id)}
                  onDelete={() => removeQuiz(quiz.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showImport && <ImportModal onClose={() => setShowImport(false)} />}
      </AnimatePresence>
    </>
  )
}

function CustomQuizRow({ quiz, index, onPlay, onReview, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const hasBest = quiz.bestScore !== null && quiz.bestScore !== undefined

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: index * 0.04 }}
      className="glass-card"
      style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {quiz.title}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
          {quiz.questions.length}q{quiz.playCount > 0 && ` · ${quiz.playCount}× played`}{hasBest && ` · Best ${quiz.bestScore}/${quiz.questions.length}`}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <button className="btn btn-primary btn-sm" onClick={onPlay} style={{ padding: '6px 12px', fontSize: 12 }}>Play</button>
        <button className="btn btn-ghost btn-sm" onClick={onReview} style={{ padding: '6px 10px', fontSize: 12 }}>Review</button>
        {confirmDelete ? (
          <>
            <button className="btn btn-danger btn-sm" onClick={onDelete} style={{ padding: '6px 10px', fontSize: 12 }}>✓</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDelete(false)} style={{ padding: '6px 10px', fontSize: 12 }}>✕</button>
          </>
        ) : (
          <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDelete(true)} style={{ padding: '6px 10px', fontSize: 12, color: 'var(--text-muted)' }}>
            <Trash2 size={13} />
          </button>
        )}
      </div>
    </motion.div>
  )
}
