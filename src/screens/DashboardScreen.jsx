import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Star, Target, FileText, Zap, Award, BookOpen, Lock, BarChart2, PlayCircle, Snowflake, Repeat, Trophy, Brain, Sparkles, Crown, ChevronRight } from 'lucide-react'
import { useStatsStore, computeLevel, xpInCurrentLevel, xpForLevel, getStreakInfo, xpOnDate } from '../store/statsStore'
import { localDateStr, todayStr } from '../utils/dates'
import { getChapterMastery } from '../utils/mastery'
import { getNextStep } from '../utils/nextStep'
import { useQuizStore } from '../store/quizStore'
import { chapters } from '../data/chapterData'

const LEVEL_NAMES = ['', '入門者', '初心者', '基礎', '学習者', '中級者', '上級者', '達人', '師匠', '先生', '博士']
function getLevelName(l) { return LEVEL_NAMES[Math.min(l, LEVEL_NAMES.length - 1)] || `Lv.${l}` }

// check(ctx) — ctx: { history, bestStreak, totalXp, bestCombo, reviewCount, bankCleared, learnedCount, masteredChapters }
const ACHIEVEMENTS = [
  { id: 'first_play',   icon: Target,   color: '#3B82F6', label: 'First Quiz',     desc: 'Complete your first quiz',      check: (c) => c.history.length >= 1 },
  { id: 'streak3',      icon: Flame,    color: '#F97316', label: '3-Day Streak',   desc: 'Hit your goal 3 days in a row', check: (c) => c.bestStreak >= 3 },
  { id: 'streak7',      icon: Zap,      color: '#EAB308', label: 'Week Warrior',   desc: '7 days in a row',               check: (c) => c.bestStreak >= 7 },
  { id: 'streak30',     icon: Crown,    color: '#DC2626', label: '30-Day Streak',  desc: '30 days in a row',              check: (c) => c.bestStreak >= 30 },
  { id: 'perfect',      icon: Award,    color: '#10B981', label: 'Perfect Score',  desc: 'Get 100% on any quiz',          check: (c) => c.history.some((e) => e.score === e.total) },
  { id: 'ten_quizzes',  icon: BookOpen, color: '#8B5CF6', label: '10 Quizzes',     desc: 'Complete 10 quizzes',           check: (c) => c.history.length >= 10 },
  { id: 'xp500',        icon: Star,     color: '#F59E0B', label: 'XP Hoard',       desc: 'Earn 500 total XP',             check: (c) => c.totalXp >= 500 },
  { id: 'combo10',      icon: Sparkles, color: '#EC4899', label: 'On Fire',        desc: '10 correct in a row',           check: (c) => c.bestCombo >= 10 },
  { id: 'reviews100',   icon: Repeat,   color: '#06B6D4', label: '100 Reviews',    desc: 'Complete 100 SRS reviews',      check: (c) => c.reviewCount >= 100 },
  { id: 'bank_clear',   icon: Snowflake, color: '#0EA5E9', label: 'Clean Slate',   desc: 'Empty the wrong-answer bank',   check: (c) => c.bankCleared },
  { id: 'words100',     icon: Brain,    color: '#14B8A6', label: '100 Words',      desc: 'Learn 100 vocab words',         check: (c) => c.learnedCount >= 100 },
  { id: 'chapter_master', icon: Trophy, color: '#D97706', label: 'Chapter Master', desc: 'Reach 100% mastery in a chapter', check: (c) => c.masteredChapters > 0 },
]

function stagger(i) { return { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.06 + 0.1, duration: 0.35 } } }

export default function DashboardScreen({ onNavigate, onStart }) {
  const stats = useStatsStore()
  const { totalXp, history, username, learnedBank, wrongBank, dailyGoal, streakFreezes } = stats
  const streakInfo = getStreakInfo(stats)
  const streak = streakInfo.current
  const todayXp = xpOnDate(history, todayStr())
  const goalPct = Math.min(100, Math.round((todayXp / dailyGoal) * 100))
  const quizzes = useQuizStore((s) => s.quizzes)

  const level = computeLevel(totalXp)
  const xpProg = xpInCurrentLevel(totalXp)
  const accuracy = useMemo(() => {
    if (!history.length) return 0
    const tot = history.reduce((a, b) => a + b.total, 0)
    const cor = history.reduce((a, b) => a + b.score, 0)
    return tot ? Math.round((cor / tot) * 100) : 0
  }, [history])

  const [activityWindow, setActivityWindow] = useState(7)
  const [activeBarIdx, setActiveBarIdx] = useState(null)

  const chartData = useMemo(() => {
    const days = []
    for (let i = activityWindow - 1; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = localDateStr(d)
      const entries = history.filter((e) => e.date === key)
      const correct = entries.reduce((s, e) => s + e.score, 0)
      const wrong = entries.reduce((s, e) => s + (e.total - e.score), 0)
      const learned = (learnedBank ?? []).filter((e) => e.date === key).length
      days.push({
        key,
        correct,
        wrong,
        learned,
        total: correct + wrong + learned,
        dow: ['S','M','T','W','T','F','S'][d.getDay()],
        shortDate: `${d.getMonth()+1}/${d.getDate()}`,
        fullLabel: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      })
    }
    return days
  }, [history, learnedBank, activityWindow])


  const masteryByChapter = useMemo(() => {
    const m = {}
    chapters.forEach((ch) => { m[ch.number] = getChapterMastery(ch, quizzes, learnedBank) })
    return m
  }, [quizzes, learnedBank])

  const nextStep = useMemo(
    () => getNextStep({ wrongBank, history, quizzes, learnedBank }),
    [wrongBank, history, quizzes, learnedBank]
  )

  const achievementCtx = {
    history,
    bestStreak: stats.bestStreak || 0,
    totalXp,
    bestCombo: stats.bestCombo || 0,
    reviewCount: stats.reviewCount || 0,
    bankCleared: !!stats.bankCleared,
    learnedCount: learnedBank.length,
    masteredChapters: Object.values(masteryByChapter).filter((m) => m?.pct === 100).length,
  }
  const achievements = ACHIEVEMENTS.map((a) => ({ ...a, unlocked: a.check(achievementCtx) }))

  const statCards = [
    { Icon: Flame,    val: streak,          label: 'Day Streak', color: '#F97316' },
    { Icon: Star,     val: totalXp,         label: 'Total XP',   color: 'var(--gold-deep)' },
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
            <span style={{ color: 'rgba(255,255,255,0.85)', fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15 }}>
              {username || 'Student'}
            </span>
          </motion.div>

          <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 13, color: 'rgba(255,255,255,0.6)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 4 }}>
            Your Progress
          </div>
          <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 'clamp(38px,9vw,58px)', color: '#fff', lineHeight: 1.1, letterSpacing: '1px', marginBottom: 20, display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#FCD34D', fontFamily: "'M PLUS Rounded 1c', sans-serif", fontWeight: 900, fontSize: '0.9em', letterSpacing: '-1px' }}>日本語</span> 
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

      {/* ─── Today: daily goal + continue ─── */}
      <motion.div {...stagger(0)} className="glass-card" style={{ padding: 18, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: `conic-gradient(${goalPct >= 100 ? 'var(--success)' : 'var(--accent)'} ${goalPct * 3.6}deg, var(--border) 0)`,
          }} />
          <div style={{ position: 'absolute', inset: 6, borderRadius: '50%', background: 'var(--surface-solid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {goalPct >= 100
              ? <span style={{ fontSize: 22 }}>✓</span>
              : <span style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 14, color: 'var(--text)' }}>{goalPct}%</span>}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 15, color: 'var(--text)' }}>
            Today · {todayXp} / {dailyGoal} XP
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginTop: 3, lineHeight: 1.4 }}>
            {streakInfo.doneToday
              ? `Goal met · 🔥 ${streak}-day streak`
              : streakInfo.atRisk
                ? streakInfo.freezesNeeded > 0
                  ? `🔥 ${streak}-day streak · ${streakInfo.freezesNeeded} freeze${streakInfo.freezesNeeded > 1 ? 's' : ''} will be used`
                  : `🔥 ${streak}-day streak · hit your goal to keep it`
                : 'Hit your goal to start a streak'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, fontSize: 11, fontWeight: 800, color: '#0EA5E9' }}>
            {Array.from({ length: 2 }).map((_, i) => (
              <Snowflake key={i} size={13} strokeWidth={2.5} style={{ opacity: i < (streakFreezes || 0) ? 1 : 0.2 }} />
            ))}
            <span style={{ marginLeft: 2 }}>Streak freezes · earn 1 every 7 days</span>
          </div>
        </div>
      </motion.div>

      {nextStep ? (
        <motion.button
          {...stagger(1)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onStart(nextStep.makeQuiz(), nextStep.kind !== 'grammar')}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
            padding: '18px 18px', marginBottom: 28, borderRadius: 'var(--radius-md)', cursor: 'pointer',
            background: nextStep.kind === 'review'
              ? 'linear-gradient(135deg, #F97316, #EF4444)'
              : 'linear-gradient(135deg, var(--primary), var(--primary-light))',
            border: 'none', boxShadow: '0 8px 28px var(--primary-glow)', color: '#fff',
          }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {nextStep.kind === 'review' ? <Repeat size={22} strokeWidth={2.5} /> : <PlayCircle size={22} strokeWidth={2.5} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8 }}>Continue</div>
            <div style={{ fontFamily: "'M PLUS Rounded 1c', 'Nunito', sans-serif", fontWeight: 900, fontSize: 17, lineHeight: 1.3 }}>{nextStep.title}</div>
            <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.85 }}>{nextStep.subtitle}</div>
          </div>
          <ChevronRight size={22} strokeWidth={2.5} />
        </motion.button>
      ) : <div style={{ marginBottom: 14 }} />}

      {/* ─── Stat Cards ─── */}
      <div className="section-label">Overview</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 28 }}>
        {statCards.map((s, i) => (
          <motion.div key={s.label} {...stagger(i)} className="stat-card glass-card"
            style={{ position: 'relative', overflow: 'hidden', padding: '16px 8px' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: '16px 16px 0 0' }} />
            <s.Icon size={16} strokeWidth={2.5} color={s.color} style={{ marginBottom: 6, opacity: 0.75 }} />
            <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 21, color: s.color, lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.8px', marginTop: 3, textAlign: 'center', textTransform: 'uppercase' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ─── Chapter Progress ─── */}
      <motion.div {...stagger(4)} style={{ marginBottom: 28 }}>
        <div className="section-label">Chapter Progress</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
          {chapters.map((ch, i) => {
            const isLocked = !ch.vocab?.available && ch.grammar.length === 0
            const mastery = masteryByChapter[ch.number]
            const fillPct = mastery?.pct ?? 0
            const perfect = fillPct === 100
            const played = fillPct > 0

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
                    ? '0 0 8px var(--primary-glow)'
                    : 'none',
                  transition: 'box-shadow 0.3s',
                }}>
                  <div style={{
                    width: 60, height: 68,
                    borderRadius: 14,
                    background: 'var(--surface)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
                  }}>
                    <div style={{ fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {perfect ? '⭐' : played ? '✓' : isLocked
                        ? <Lock size={14} strokeWidth={2.5} color="var(--text-muted)" />
                        : ch.number}
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

      {/* ─── Activity Chart ─── */}
      <motion.div {...stagger(5)} style={{ marginBottom: 28 }}>
        <div className="section-label">Daily Activity</div>
        <div className="glass-card" style={{ padding: '16px 16px 12px' }}>

          {/* Header: legend + toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ color: '#3B82F6', label: 'Learned' }, { color: '#10B981', label: 'Correct' }, { color: '#EF4444', label: 'Wrong' }].map(({ color, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', fontFamily: "'Nunito'" }}>{label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', background: 'var(--border)', borderRadius: 8, padding: 2, gap: 2 }}>
              {[7, 30].map((w) => (
                <button key={w} onClick={() => { setActivityWindow(w); setActiveBarIdx(null) }} style={{
                  padding: '4px 10px', borderRadius: 6, border: 'none',
                  background: activityWindow === w ? 'var(--primary)' : 'transparent',
                  color: activityWindow === w ? '#fff' : 'var(--text-muted)',
                  fontFamily: "'Nunito'", fontWeight: 800, fontSize: 11,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>{w}D</button>
              ))}
            </div>
          </div>

          {chartData.some((d) => d.total > 0) ? (() => {
            const maxTotal = Math.max(...chartData.map((d) => d.total), 1)
            return (
              <>
                {/* Chart area — fixed height, relative bars */}
                <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
                  {/* Y-axis labels */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 100, flexShrink: 0, paddingBottom: 1 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-muted)', fontFamily: "'Nunito'", lineHeight: 1 }}>{maxTotal}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-muted)', fontFamily: "'Nunito'", lineHeight: 1 }}>0</span>
                  </div>
                  {/* Bars */}
                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', height: 100, gap: activityWindow === 30 ? 2 : 6 }}>
                    {chartData.map((day, i) => {
                      const barH = (day.total / maxTotal) * 100
                      const wrongPct = day.total > 0 ? (day.wrong / day.total) * 100 : 0
                      const correctPct = day.total > 0 ? (day.correct / day.total) * 100 : 0
                      const isActive = activeBarIdx === i
                      return (
                        <div
                          key={day.key}
                          onClick={() => setActiveBarIdx(isActive ? null : i)}
                          style={{ flex: 1, height: '100%', position: 'relative', cursor: day.total > 0 ? 'pointer' : 'default' }}
                        >
                          {/* Ghost track */}
                          <div style={{
                            position: 'absolute', bottom: 0, width: '100%', height: '100%',
                            background: isActive ? 'var(--primary-glow)' : 'var(--border)',
                            borderRadius: '3px 3px 0 0', transition: 'background 0.15s',
                          }} />
                          {/* Stacked bar: wrong (top) → correct (middle) → learned (bottom) */}
                          {day.total > 0 && (
                            <motion.div
                              key={`${activityWindow}-${day.key}`}
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ delay: i * (activityWindow === 30 ? 0.012 : 0.05), duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                              style={{
                                position: 'absolute', bottom: 0, left: 0, right: 0,
                                height: `${barH}%`,
                                transformOrigin: 'bottom',
                                display: 'flex', flexDirection: 'column',
                                borderRadius: '3px 3px 0 0', overflow: 'hidden',
                                outline: isActive ? '1.5px solid var(--primary)' : 'none',
                              }}
                            >
                              <div style={{ height: `${wrongPct}%`, background: '#EF4444', flexShrink: 0, minHeight: wrongPct > 0 ? 1 : 0 }} />
                              <div style={{ height: `${correctPct}%`, background: '#10B981', flexShrink: 0, minHeight: correctPct > 0 ? 1 : 0 }} />
                              <div style={{ flex: 1, background: '#3B82F6' }} />
                            </motion.div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* X-axis labels */}
                <div style={{ display: 'flex', gap: activityWindow === 30 ? 2 : 6, marginTop: 5, paddingLeft: 20 }}>
                  {chartData.map((day, i) => {
                    const show = activityWindow === 7 || i % 7 === 0 || i === chartData.length - 1
                    return (
                      <div key={day.key} style={{ flex: 1, textAlign: 'center' }}>
                        {show && (
                          <span style={{ fontSize: 9, fontWeight: 700, fontFamily: "'Nunito'", color: activeBarIdx === i ? 'var(--primary)' : 'var(--text-muted)' }}>
                            {activityWindow === 7 ? day.dow : day.shortDate}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Detail strip — tap a bar to reveal */}
                <AnimatePresence>
                  {activeBarIdx !== null && chartData[activeBarIdx]?.total > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        marginTop: 8, padding: '7px 12px', borderRadius: 10,
                        background: 'var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', fontFamily: "'Nunito'" }}>
                          {chartData[activeBarIdx].fullLabel}
                        </span>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          {chartData[activeBarIdx].learned > 0 && (
                            <span style={{ fontSize: 12, fontWeight: 900, color: '#3B82F6', fontFamily: "'Nunito'" }}>
                              ★ {chartData[activeBarIdx].learned}
                            </span>
                          )}
                          <span style={{ fontSize: 12, fontWeight: 900, color: '#10B981', fontFamily: "'Nunito'" }}>✓ {chartData[activeBarIdx].correct}</span>
                          <span style={{ fontSize: 12, fontWeight: 900, color: '#EF4444', fontFamily: "'Nunito'" }}>✗ {chartData[activeBarIdx].wrong}</span>
                          {(chartData[activeBarIdx].correct + chartData[activeBarIdx].wrong) > 0 && (
                            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', fontFamily: "'Nunito'" }}>
                              {Math.round((chartData[activeBarIdx].correct / (chartData[activeBarIdx].correct + chartData[activeBarIdx].wrong)) * 100)}%
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )
          })() : (
            <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)' }}>
              <BarChart2 size={28} color="var(--text-muted)" strokeWidth={1.5} style={{ marginBottom: 6, opacity: 0.5 }} />
              <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "'Nunito'" }}>No activity yet</div>
              <div style={{ fontSize: 11, fontWeight: 600, marginTop: 2, opacity: 0.7, fontFamily: "'Nunito'" }}>Complete quizzes to see your progress</div>
            </div>
          )}
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
          <PlayCircle size={40} color="var(--text-muted)" strokeWidth={1.5} style={{ marginBottom: 8, opacity: 0.5 }} />
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
