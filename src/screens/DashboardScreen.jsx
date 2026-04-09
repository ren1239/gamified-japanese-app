import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Flame, Star, Target, FileText, Zap, Award, BookOpen } from 'lucide-react'
import { useStatsStore, computeLevel, xpInCurrentLevel, xpForLevel } from '../store/statsStore'
import { useQuizStore } from '../store/quizStore'
import { chapters } from '../data/chapterData'

const LEVEL_NAMES = ['', '入門者', '初心者', '基礎', '学習者', '中級者', '上級者', '達人', '師匠', '先生', '博士']
function getLevelName(l) { return LEVEL_NAMES[Math.min(l, LEVEL_NAMES.length - 1)] || `Lv.${l}` }

const ACHIEVEMENTS = [
  { id: 'first_play',   icon: Target,   color: '#3B82F6', label: 'First Quiz',    desc: 'Complete your first quiz',     check: (h) => h.length >= 1 },
  { id: 'streak3',      icon: Flame,    color: '#F97316', label: '3-Day Streak',  desc: 'Play 3 days in a row',          check: (_, s) => s >= 3 },
  { id: 'streak7',      icon: Zap,      color: '#EAB308', label: 'Week Warrior',  desc: '7 days in a row',               check: (_, s) => s >= 7 },
  { id: 'perfect',      icon: Award,    color: '#10B981', label: 'Perfect Score', desc: 'Get 100% on any quiz',          check: (h) => h.some((e) => e.score === e.total) },
  { id: 'ten_quizzes',  icon: BookOpen, color: '#8B5CF6', label: '10 Quizzes',    desc: 'Complete 10 quizzes',           check: (h) => h.length >= 10 },
  { id: 'xp500',        icon: Star,     color: '#F59E0B', label: 'XP Hoard',      desc: 'Earn 500 total XP',             check: (_, __, xp) => xp >= 500 },
]

function stagger(i) { return { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.06 + 0.1, duration: 0.35 } } }

export default function DashboardScreen({ onNavigate }) {
  const { totalXp, history, streak } = useStatsStore()
  const quizzes = useQuizStore((s) => s.quizzes)

  const level = computeLevel(totalXp)
  const xpProg = xpInCurrentLevel(totalXp)
  const accuracy = useMemo(() => {
    if (!history.length) return 0
    const tot = history.reduce((a, b) => a + b.total, 0)
    const cor = history.reduce((a, b) => a + b.score, 0)
    return tot ? Math.round((cor / tot) * 100) : 0
  }, [history])

  // 30-day heatmap
  const heatmap = useMemo(() => {
    const map = {}
    history.forEach((e) => { map[e.date] = (map[e.date] || 0) + 1 })
    const days = []
    for (let i = 29; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      days.push({ key, count: map[key] || 0 })
    }
    return days
  }, [history])

  // Chapter completion status
  const quizMap = useMemo(() => {
    const m = {}
    quizzes.forEach((q) => { m[q.id] = q })
    return m
  }, [quizzes])

  const achievements = ACHIEVEMENTS.map((a) => ({
    ...a,
    unlocked: a.check(history, streak, totalXp),
  }))

  const statCards = [
    { Icon: Flame,    val: streak,          label: 'Day Streak', color: '#F97316' },
    { Icon: Star,     val: totalXp,         label: 'Total XP',   color: '#7C3AED' },
    { Icon: Target,   val: `${accuracy}%`,  label: 'Accuracy',   color: '#10B981' },
    { Icon: FileText, val: history.length,  label: 'Quizzes',    color: '#3B82F6' },
  ]


  return (
    <div className="page" style={{ paddingTop: 0 }}>

      {/* ─── Hero ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{
          background: 'linear-gradient(160deg, var(--primary-dark) 0%, var(--primary) 60%, var(--primary-light) 100%)',
          borderRadius: '0 0 28px 28px',
          padding: '56px 24px 28px',
          marginBottom: 24,
          marginLeft: -16,
          marginRight: -16,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient orb */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,229,0,0.1)', filter: 'blur(40px)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Level badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 220 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}
          >
            <span className="level-badge">⚡ Lv. {level}</span>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Noto Sans JP'", fontWeight: 700, fontSize: 14 }}>
              {getLevelName(level)}
            </span>
          </motion.div>

          <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 13, color: 'rgba(255,255,255,0.6)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 4 }}>
            Your Progress
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(38px,9vw,58px)', color: '#fff', lineHeight: 1.1, letterSpacing: '1px', marginBottom: 20, display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#FCD34D', fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 900, fontSize: '0.9em', letterSpacing: '-1px' }}>日本語</span> 
            <span>JOURNEY</span>
          </div>

          {/* XP bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>
              <span>{totalXp} XP</span>
              <span>→ {xpForLevel(level + 1)} XP for Lv. {level + 1}</span>
            </div>
            <div className="xp-bar-track">
              <motion.div
                className="xp-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${xpProg.pct}%` }}
                transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4, textAlign: 'right' }}>
              {xpProg.earned} / {xpProg.needed} XP this level
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Stat Cards ─── */}
      <div className="section-label">Overview</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 28 }}>
        {statCards.map((s, i) => (
          <motion.div key={s.label} {...stagger(i)} className="stat-card glass-card"
            style={{ position: 'relative', overflow: 'hidden', padding: '16px 8px' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: '16px 16px 0 0' }} />
            <s.Icon size={16} strokeWidth={2.5} color={s.color} style={{ marginBottom: 6, opacity: 0.75 }} />
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: s.color, lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.8px', marginTop: 3, textAlign: 'center', textTransform: 'uppercase' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ─── Chapter Progress ─── */}
      <motion.div {...stagger(4)} style={{ marginBottom: 28 }}>
        <div className="section-label">Chapter Progress</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
          {chapters.slice(0, 23).map((ch, i) => {
            const isLocked = ch.number !== 11
            const quiz = ch.vocab?.quizId ? quizMap[ch.vocab.quizId] : null
            const played = quiz?.playCount > 0
            const perfect = quiz && quiz.bestScore === quiz.questions?.length
            const grammarTotal = ch.grammar?.length || 0
            const grammarDone = ch.grammar?.filter(g => quizMap[g.quizId]?.playCount > 0).length || 0
            const fillPct = perfect ? 100 : played
              ? Math.round(50 + (grammarTotal > 0 ? (grammarDone / grammarTotal) * 50 : 0))
              : grammarDone > 0 ? Math.round((grammarDone / grammarTotal) * 45) : 0

            const deg = fillPct * 3.6
            const borderFill = perfect ? 'var(--gold)' : 'var(--primary)'

            return (
              <motion.div
                key={ch.number}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.025 }}
                style={{ flexShrink: 0, opacity: isLocked ? 0.35 : 1 }}
              >
                {/* Conic-gradient outline wrapper — 2px "border" */}
                <div style={{
                  background: isLocked
                    ? 'var(--border)'
                    : deg > 0
                    ? `conic-gradient(from -90deg, ${borderFill} ${deg}deg, var(--border) 0)`
                    : 'var(--border)',
                  borderRadius: 16,
                  padding: '2px',
                  boxShadow: perfect
                    ? '0 0 14px rgba(245,158,11,0.45)'
                    : played && deg > 0
                    ? '0 0 8px rgba(124,58,237,0.25)'
                    : 'none',
                  transition: 'box-shadow 0.3s',
                }}>
                  <div style={{
                    width: 60, height: 68,
                    borderRadius: 14,
                    background: 'var(--surface)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
                  }}>
                    <div style={{ fontSize: 16 }}>
                      {perfect ? '⭐' : played ? '✓' : isLocked ? '🔒' : ch.number}
                    </div>
                    <div style={{
                      fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 10,
                      color: played || perfect ? 'var(--primary)' : 'var(--text-muted)',
                      letterSpacing: '0.5px',
                    }}>
                      Ch.{ch.number}
                    </div>
                    {fillPct > 0 && fillPct < 100 && (
                      <div style={{ fontSize: 8, color: 'var(--text-muted)', fontWeight: 700 }}>{fillPct}%</div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* ─── Activity Heatmap ─── */}
      <motion.div {...stagger(5)} style={{ marginBottom: 28 }}>
        <div className="section-label">30-Day Activity</div>
        <div className="glass-card" style={{ padding: '16px 16px 14px' }}>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {heatmap.map((day) => (
              <motion.div
                key={day.key}
                title={`${day.key}: ${day.count} quiz${day.count !== 1 ? 'zes' : ''}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: Math.random() * 0.3 }}
                style={{
                  width: 10, height: 10, borderRadius: 2,
                  background: day.count > 0 ? 'var(--primary)' : 'var(--border)',
                  opacity: day.count > 0 ? Math.min(0.35 + day.count * 0.22, 1) : 0.4,
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: 'var(--text-muted)', fontWeight: 700 }}>
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </div>
      </motion.div>

      {/* ─── Achievements ─── */}
      <motion.div {...stagger(6)} style={{ marginBottom: 16 }}>
        <div className="section-label">Achievements</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {achievements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 + 0.2 }}
              className={`glass-card${a.unlocked ? ' achievement-unlocked' : ''}`}
              style={{
                padding: '14px 8px',
                textAlign: 'center',
                filter: a.unlocked ? 'none' : 'grayscale(1)',
                opacity: a.unlocked ? 1 : 0.4,
                position: 'relative', overflow: 'hidden',
              }}
            >
              {a.unlocked && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: a.color, opacity: 0.7 }} />
              )}
              <div style={{
                marginBottom: 8, display: 'flex', justifyContent: 'center',
                ...(a.unlocked ? { filter: `drop-shadow(0 0 10px ${a.color}88)` } : {}),
              }}>
                <a.icon size={24} strokeWidth={2.5} color={a.unlocked ? a.color : 'var(--text-muted)'} />
              </div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 11, color: 'var(--text)', marginBottom: 2 }}>
                {a.label}
              </div>
              {a.unlocked
                ? <div style={{ fontSize: 9, color: '#F59E0B', fontWeight: 900, letterSpacing: '1px' }}>✦ UNLOCKED</div>
                : <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 700 }}>Locked</div>
              }
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* empty state */}
      {!history.length && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🎮</div>
          <p style={{ fontSize: 14, lineHeight: 1.6 }}>Complete a quiz to start tracking your progress!</p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate('chapters')}
            className="btn btn-primary btn-sm"
            style={{ marginTop: 16 }}
          >
            Browse Quizzes →
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
