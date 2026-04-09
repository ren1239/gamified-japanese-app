import { motion } from 'framer-motion'
import { ChevronRight, BookOpen, CheckCircle, Circle, Lock } from 'lucide-react'
import { useQuizStore } from '../store/quizStore'
import { chapters } from '../data/chapterData'

function getChapterStatus(chapter, quizMap) {
  const vocab = chapter.vocab?.quizId ? quizMap[chapter.vocab.quizId] : null
  const vocabPlayed = vocab?.playCount > 0
  const vocabPerfect = vocab && vocab.bestScore === vocab.questions?.length

  const grammarTotal = chapter.grammar.length
  const grammarPlayed = chapter.grammar.filter((g) => {
    const q = quizMap[g.quizId]
    return q?.playCount > 0
  }).length

  if (vocabPerfect && grammarTotal > 0 && grammarPlayed === grammarTotal) return 'gold'
  if (vocabPlayed || grammarPlayed > 0) return 'active'
  return 'idle'
}

export default function ChapterListScreen({ onSelect }) {
  const quizzes = useQuizStore((s) => s.quizzes)
  const quizMap = Object.fromEntries(quizzes.map((q) => [q.id, q]))

  return (
    <div className="page" style={{ paddingTop: 24 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 24 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <BookOpen size={20} color="var(--primary)" strokeWidth={2.5} />
          <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 13, color: 'var(--primary)', letterSpacing: '3px', textTransform: 'uppercase' }}>
            Genki I &amp; II
          </div>
        </div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 8vw, 46px)', color: 'var(--text)', letterSpacing: '1px', lineHeight: 1 }}>
          CHAPTERS
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, marginTop: 4 }}>
          Tap a chapter to study vocabulary and grammar
        </div>
      </motion.div>

      {/* Chapter grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {chapters.map((ch, i) => {
          const isLocked = ch.number !== 11
          const status = isLocked ? 'locked' : getChapterStatus(ch, quizMap)
          const vocab = ch.vocab?.quizId ? quizMap[ch.vocab.quizId] : null
          const grammarCount = ch.grammar.length
          const grammarPlayed = ch.grammar.filter((g) => quizMap[g.quizId]?.playCount > 0).length

          return (
            <motion.button
              key={ch.number}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.025, duration: 0.3 }}
              whileHover={!isLocked ? { x: 4 } : {}}
              whileTap={!isLocked ? { scale: 0.98 } : {}}
              onClick={() => { if (!isLocked) onSelect(ch) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px',
                background: 'var(--surface)',
                border: `1.5px solid ${
                  status === 'gold' ? 'rgba(245,158,11,0.4)' :
                  status === 'active' ? 'var(--border-md)' :
                  isLocked ? 'var(--border)' :
                  'var(--border)'
                }`,
                borderRadius: 'var(--radius-md)',
                cursor: isLocked ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                width: '100%',
                opacity: isLocked ? 0.45 : 1,
                filter: isLocked ? 'grayscale(0.8)' : 'none',
                boxShadow: status === 'active' ? 'var(--shadow-sm)' : 'none',
                backdropFilter: 'blur(12px)',
                transition: 'border-color 0.2s',
              }}
            >
              {/* Chapter number badge */}
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 20,
                background: status === 'gold'
                  ? 'linear-gradient(135deg, #F59E0B, #F97316)'
                  : status === 'active'
                  ? 'linear-gradient(135deg, var(--primary), var(--primary-light))'
                  : status === 'locked'
                  ? 'transparent'
                  : 'var(--border)',
                color: (status === 'idle' || status === 'locked') ? 'var(--text-muted)' : '#fff',
                border: status === 'locked' ? '2px dashed var(--border-md)' : 'none',
                boxShadow: (status !== 'idle' && status !== 'locked') ? 'var(--shadow-sm)' : 'none',
              }}>
                {ch.number}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 15, color: 'var(--text)', marginBottom: 2 }}>
                  {ch.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {ch.subtitle}
                </div>
              </div>

              {/* Right: progress indicators */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                {isLocked ? (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '5px 10px', borderRadius: 8,
                    background: 'var(--bg)',
                    border: '1px solid var(--border-md)',
                  }}>
                    <Lock size={13} strokeWidth={2.5} color="var(--text-muted)" />
                    <span style={{ fontSize: 11, fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Locked</span>
                  </div>
                ) : (
                  <>
                    {/* Vocab pill */}
                    {vocab?.playCount > 0 ? (
                      <CheckCircle size={15} strokeWidth={2.5} color="var(--success)" />
                    ) : (
                      <Circle size={15} strokeWidth={2} color="var(--border-md)" />
                    )}

                    {/* Grammar pill — only show if chapter has grammar */}
                    {grammarCount > 0 && (
                      <div style={{
                        fontSize: 11, fontWeight: 800,
                        color: grammarPlayed === grammarCount ? 'var(--success)' : grammarPlayed > 0 ? 'var(--primary)' : 'var(--text-muted)',
                        background: grammarPlayed === grammarCount ? 'var(--success-dim)' : grammarPlayed > 0 ? 'var(--primary-glow)' : 'transparent',
                        padding: '2px 7px', borderRadius: 6,
                        border: '1px solid',
                        borderColor: grammarPlayed === grammarCount ? 'rgba(16,185,129,0.3)' : grammarPlayed > 0 ? 'var(--border-md)' : 'var(--border)',
                      }}>
                        {grammarPlayed}/{grammarCount} G
                      </div>
                    )}

                    <ChevronRight size={16} color="var(--text-muted)" />
                  </>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
