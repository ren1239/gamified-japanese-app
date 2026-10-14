import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStatsStore, computeLevel, xpInCurrentLevel, xpForLevel, getStreakInfo, xpOnDate } from '../store/statsStore'
import { localDateStr, todayStr } from '../utils/dates'
import { getChapterMastery } from '../utils/mastery'
import { getVocabForChapter } from '../utils/vocabQuizGen'
import { useQuizStore } from '../store/quizStore'
import { chapters } from '../data/chapterData'
import Icon from '../components/Icon'
import Mascot from '../components/Mascot'

const LEVEL_NAMES = ['入門者', '入門者', '初心者', '基礎', '学習者', '中級者', '上級者', '達人', '師匠', '先生', '博士']
const levelName = (l) => LEVEL_NAMES[Math.min(l, LEVEL_NAMES.length - 1)]
const GRAMMAR_MASTERED = 0.8

// progress(ctx) → [current, target]; unlocked when current >= target
const ACHIEVEMENTS = [
  // Lessons
  { id: 'first_play',     icon: 'target', tone: 'primary', label: 'First Lesson',    progress: (c) => [c.lessons, 1] },
  { id: 'ten_quizzes',    icon: 'book',   tone: 'primary', label: '10 Lessons',      progress: (c) => [c.lessons, 10] },
  { id: 'lessons50',      icon: 'book',   tone: 'primary', label: '50 Lessons',      progress: (c) => [c.lessons, 50] },
  { id: 'lessons200',     icon: 'book',   tone: 'gold',    label: '200 Lessons',     progress: (c) => [c.lessons, 200] },
  // Streaks
  { id: 'streak3',        icon: 'flame',  tone: 'accent',  label: '3-Day Streak',    progress: (c) => [c.bestStreak, 3] },
  { id: 'streak7',        icon: 'flame',  tone: 'accent',  label: 'Week Warrior',    progress: (c) => [c.bestStreak, 7] },
  { id: 'streak14',       icon: 'flame',  tone: 'accent',  label: 'Two Weeks Strong', progress: (c) => [c.bestStreak, 14] },
  { id: 'streak30',       icon: 'crown',  tone: 'accent',  label: '30-Day Streak',   progress: (c) => [c.bestStreak, 30] },
  { id: 'streak100',      icon: 'crown',  tone: 'gold',    label: '100-Day Streak',  progress: (c) => [c.bestStreak, 100] },
  // Accuracy & combos
  { id: 'perfect',        icon: 'star',   tone: 'gold',    label: 'Perfect Score',   progress: (c) => [c.perfects, 1] },
  { id: 'perfect10',      icon: 'star',   tone: 'gold',    label: 'Perfectionist',   progress: (c) => [c.perfects, 10] },
  { id: 'combo10',        icon: 'flame',  tone: 'accent',  label: 'On Fire',         progress: (c) => [c.bestCombo, 10] },
  { id: 'combo25',        icon: 'bolt',   tone: 'accent',  label: 'Unstoppable',     progress: (c) => [c.bestCombo, 25] },
  // XP
  { id: 'xp500',          icon: 'bolt',   tone: 'gold',    label: 'XP Hoard',        progress: (c) => [c.totalXp, 500] },
  { id: 'xp2500',         icon: 'bolt',   tone: 'gold',    label: 'XP Mountain',     progress: (c) => [c.totalXp, 2500] },
  { id: 'xp10000',        icon: 'bolt',   tone: 'gold',    label: 'XP Legend',       progress: (c) => [c.totalXp, 10000] },
  // Vocabulary (Nori)
  { id: 'words10',        icon: 'cards',  tone: 'success', label: 'First 10 Words',  progress: (c) => [c.learnedCount, 10] },
  { id: 'words100',       icon: 'cards',  tone: 'success', label: '100 Words',       progress: (c) => [c.learnedCount, 100] },
  { id: 'words500',       icon: 'cards',  tone: 'success', label: '500 Words',       progress: (c) => [c.learnedCount, 500] },
  // Grammar (Mentai)
  { id: 'grammar5',       icon: 'brush',  tone: 'accent',  label: 'Grammar Rookie',  progress: (c) => [c.grammarMastered, 5] },
  { id: 'grammar25',      icon: 'brush',  tone: 'accent',  label: 'Grammar Pro',     progress: (c) => [c.grammarMastered, 25] },
  { id: 'chapter_master', icon: 'trophy', tone: 'gold',    label: 'Chapter Master',  progress: (c) => [c.masteredChapters, 1] },
  // Reviews
  { id: 'reviews100',     icon: 'bell',   tone: 'primary', label: '100 Reviews',     progress: (c) => [c.reviewCount, 100] },
  { id: 'reviews500',     icon: 'bell',   tone: 'primary', label: '500 Reviews',     progress: (c) => [c.reviewCount, 500] },
  { id: 'bank_clear',     icon: 'snow',   tone: 'primary', label: 'Clean Slate',     progress: (c) => [c.bankCleared ? 1 : 0, 1] },
]
const COLLAPSED_COUNT = 6

function MasteryCard({ who, title, jp, done, total, rows, tone }) {
  const pct = total ? Math.round((done / total) * 100) : 0
  return (
    <div className="stats-card mastery-card">
      <div className="mastery-head">
        <Mascot who={who} mood={pct >= 50 ? 'cheer' : 'happy'} size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mastery-title"><span className="jp">{jp}</span> {title}</div>
          <div className="mastery-sub">{done} / {total} {who === 'nori' ? 'words learned' : 'drills mastered'}</div>
        </div>
        <span className={`mastery-pct ${tone}`}>{pct}%</span>
      </div>
      <div className="meter"><i className={tone} style={{ width: `${pct}%` }} /></div>
      <div className="mastery-rows">
        {rows.map((r) => (
          <div key={r.label} className="mastery-row">
            <span>{r.label}</span>
            <div className="meter thin"><i className={tone} style={{ width: `${r.total ? (r.done / r.total) * 100 : 0}%` }} /></div>
            <b>{r.done}/{r.total}</b>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DashboardScreen({ onNavigate }) {
  const stats = useStatsStore()
  const { totalXp, history, username, learnedBank, dailyGoal, streakFreezes } = stats
  const quizzes = useQuizStore((s) => s.quizzes)
  const streakInfo = getStreakInfo(stats)
  const streak = streakInfo.current
  const todayXp = xpOnDate(history, todayStr())
  const goalPct = Math.min(100, Math.round((todayXp / dailyGoal) * 100))

  const level = computeLevel(totalXp)
  const xpProg = xpInCurrentLevel(totalXp)
  const accuracy = useMemo(() => {
    const tot = history.reduce((a, b) => a + b.total, 0)
    const cor = history.reduce((a, b) => a + b.score, 0)
    return tot ? Math.round((cor / tot) * 100) : 0
  }, [history])

  // ── Mastery split by track and book ─────────────────────────────
  const mastery = useMemo(() => {
    const learned = new Set(learnedBank.map((e) => e.wordId))
    const quizMap = Object.fromEntries(quizzes.map((q) => [q.id, q]))
    const books = [
      { label: 'Basics', match: (n) => n === 0 },
      { label: 'Genki I', match: (n) => n >= 1 && n <= 12 },
      { label: 'Genki II', match: (n) => n >= 13 },
    ]
    const vocab = books.map((b) => {
      let done = 0, total = 0
      chapters.filter((c) => b.match(c.number)).forEach((c) => {
        const words = getVocabForChapter(c.number)
        total += words.length
        done += words.filter((w) => learned.has(`ch${c.number}-${w.id}`)).length
      })
      return { label: b.label, done, total }
    }).filter((r) => r.total > 0)
    const grammar = books.map((b) => {
      let done = 0, total = 0
      chapters.filter((c) => b.match(c.number)).forEach((c) => {
        c.grammar.filter((g) => g.available).forEach((g) => {
          const q = quizMap[g.quizId]
          total++
          if (q?.bestScore != null && q.questions?.length && q.bestScore / q.questions.length >= GRAMMAR_MASTERED) done++
        })
      })
      return { label: b.label, done, total }
    }).filter((r) => r.total > 0)
    const sum = (rows, k) => rows.reduce((a, r) => a + r[k], 0)
    return {
      vocab, grammar,
      vocabDone: sum(vocab, 'done'), vocabTotal: sum(vocab, 'total'),
      grammarDone: sum(grammar, 'done'), grammarTotal: sum(grammar, 'total'),
      masteredChapters: chapters.filter((c) => getChapterMastery(c, quizzes, learnedBank)?.pct === 100).length,
    }
  }, [quizzes, learnedBank])

  // ── Activity chart ──────────────────────────────────────────────
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
      const learned = learnedBank.filter((e) => e.date === key).length
      days.push({
        key, correct, wrong, learned, total: correct + wrong + learned,
        dow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][d.getDay()],
        shortDate: `${d.getMonth() + 1}/${d.getDate()}`,
        fullLabel: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      })
    }
    return days
  }, [history, learnedBank, activityWindow])
  const maxTotal = Math.max(...chartData.map((d) => d.total), 1)
  const hasActivity = chartData.some((d) => d.total > 0)
  const active = activeBarIdx != null ? chartData[activeBarIdx] : null

  // ── Achievements ────────────────────────────────────────────────
  const ctx = {
    lessons: history.length,
    perfects: history.filter((e) => e.total > 0 && e.score === e.total).length,
    bestStreak: stats.bestStreak || 0,
    totalXp,
    bestCombo: stats.bestCombo || 0,
    reviewCount: stats.reviewCount || 0,
    bankCleared: !!stats.bankCleared,
    learnedCount: learnedBank.length,
    grammarMastered: mastery.grammarDone,
    masteredChapters: mastery.masteredChapters,
  }
  const achievements = ACHIEVEMENTS.map((a) => {
    const [cur, target] = a.progress(ctx)
    return { ...a, cur: Math.min(cur, target), target, unlocked: cur >= target }
  })
  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const [showAllMedals, setShowAllMedals] = useState(false)
  const ratio = (a) => a.cur / a.target
  // Collapsed: the six closest to unlocking (then recent unlocks). Expanded: unlocked first, then by progress.
  const medalsShown = showAllMedals
    ? [...achievements].sort((a, b) => (b.unlocked - a.unlocked) || ratio(b) - ratio(a))
    : [...achievements.filter((a) => !a.unlocked).sort((a, b) => ratio(b) - ratio(a)), ...achievements.filter((a) => a.unlocked).reverse()].slice(0, COLLAPSED_COUNT)

  return (
    <div className="page stats-page">
      {/* ── Profile ── */}
      <header className="stats-profile">
        <div className="stats-avatar"><Mascot who="nori" mood="happy" size={58} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="stats-name">{username || 'Student'}</div>
          <div className="stats-level">Lv.{level} · <span className="jp">{levelName(level)}</span></div>
          <div className="meter" style={{ marginTop: 8 }}><i className="gold" style={{ width: `${xpProg.pct}%` }} /></div>
          <div className="stats-xp-line">{xpProg.earned} / {xpProg.needed} XP to Lv.{level + 1} <span>· {xpForLevel(level + 1).toLocaleString()} total</span></div>
        </div>
      </header>

      {/* ── Today ── */}
      <section className="stats-card today-card">
        <div className="goal-ring" style={{ '--p': `${goalPct * 3.6}deg`, '--c': goalPct >= 100 ? 'var(--success)' : 'var(--accent)' }}>
          <span>{goalPct >= 100 ? <Icon name="check" size={26} color="var(--success)" /> : `${goalPct}%`}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="today-title">Today · {todayXp} / {dailyGoal} XP</div>
          <div className="today-sub">
            {streakInfo.doneToday ? `Goal met · ${streak}-day streak`
              : streakInfo.atRisk ? (streakInfo.freezesNeeded > 0 ? `${streak}-day streak · ${streakInfo.freezesNeeded} freeze will be used` : `${streak}-day streak · hit your goal to keep it`)
                : 'Hit your goal to start a streak'}
          </div>
          <div className="today-freezes">
            {[0, 1].map((i) => <Icon key={i} name="snow" size={14} color="var(--freeze)" style={{ opacity: i < (streakFreezes || 0) ? 1 : 0.25 }} />)}
            <span>{streakFreezes || 0}/2 streak freezes</span>
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <h2 className="stats-h">Overview</h2>
      <div className="stats-grid">
        {[
          { icon: 'flame', val: streak, label: 'Day streak', tone: 'accent' },
          { icon: 'bolt', val: totalXp.toLocaleString(), label: 'Total XP', tone: 'gold' },
          { icon: 'target', val: `${accuracy}%`, label: 'Accuracy', tone: 'success' },
          { icon: 'book', val: history.length, label: 'Lessons', tone: 'primary' },
        ].map((s) => (
          <div key={s.label} className="stats-card stat-box">
            <Icon name={s.icon} size={26} color={`var(--${s.tone === 'gold' ? 'gold-deep' : s.tone})`} />
            <div>
              <div className="stat-box-val">{s.val}</div>
              <div className="stat-box-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Mastery ── */}
      <h2 className="stats-h">Mastery</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        <MasteryCard who="nori" jp="単語" title="Vocabulary" done={mastery.vocabDone} total={mastery.vocabTotal} rows={mastery.vocab} tone="primary" />
        <MasteryCard who="mentai" jp="文法" title="Grammar" done={mastery.grammarDone} total={mastery.grammarTotal} rows={mastery.grammar} tone="accent" />
      </div>

      {/* ── Activity ── */}
      <div className="stats-h-row">
        <h2 className="stats-h">Activity</h2>
        <div className="seg" role="tablist" aria-label="Activity range">
          {[7, 30].map((w) => (
            <button key={w} type="button" role="tab" aria-selected={activityWindow === w} className={activityWindow === w ? 'on' : ''}
              onClick={() => { setActivityWindow(w); setActiveBarIdx(null) }}>{w} days</button>
          ))}
        </div>
      </div>
      <section className="stats-card chart-card">
        <div className="chart-legend">
          <span><i style={{ background: 'var(--primary)' }} />Learned</span>
          <span><i style={{ background: 'var(--success)' }} />Correct</span>
          <span><i style={{ background: 'var(--error)' }} />Wrong</span>
        </div>
        {hasActivity ? (
          <>
            <div className="chart-plot">
              <div className="chart-y"><span>{maxTotal}</span><span>{Math.round(maxTotal / 2)}</span><span>0</span></div>
              <div className="chart-bars" style={{ gap: activityWindow === 30 ? 2 : 8 }}>
                {chartData.map((day, i) => {
                  const isActive = activeBarIdx === i
                  return (
                    <button key={day.key} type="button" className={`chart-col ${isActive ? 'on' : ''}`} onClick={() => setActiveBarIdx(isActive ? null : i)}
                      aria-label={`${day.fullLabel}: ${day.learned} learned, ${day.correct} correct, ${day.wrong} wrong`}>
                      {day.total > 0 && (
                        <motion.span className="chart-stack" style={{ height: `${(day.total / maxTotal) * 100}%` }}
                          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * (activityWindow === 30 ? 0.01 : 0.04), duration: 0.4 }}>
                          <i style={{ flexGrow: day.wrong, background: 'var(--error)' }} />
                          <i style={{ flexGrow: day.correct, background: 'var(--success)' }} />
                          <i style={{ flexGrow: day.learned, background: 'var(--primary)' }} />
                        </motion.span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="chart-x" style={{ gap: activityWindow === 30 ? 2 : 8 }}>
              {chartData.map((day, i) => (
                <span key={day.key} className={activeBarIdx === i ? 'on' : ''}>
                  {activityWindow === 7 ? day.dow : (i % 7 === 0 || i === chartData.length - 1) ? day.shortDate : ''}
                </span>
              ))}
            </div>
            <AnimatePresence>
              {active && active.total > 0 && (
                <motion.div className="chart-detail" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <span>{active.fullLabel}</span>
                  <span className="chart-detail-nums">
                    <b style={{ color: 'var(--primary)' }}>{active.learned} learned</b>
                    <b style={{ color: 'var(--success-deep)' }}>{active.correct} ✓</b>
                    <b style={{ color: 'var(--error-deep)' }}>{active.wrong} ✗</b>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="stats-empty">
            <Mascot who="nori" mood="sleep" size={64} />
            <p>No lessons in the last {activityWindow} days.</p>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => onNavigate('learn')}>Start a lesson</button>
          </div>
        )}
      </section>

      {/* ── Achievements ── */}
      <div className="stats-h-row">
        <h2 className="stats-h">Achievements</h2>
        <span className="stats-h-meta">{unlockedCount} / {achievements.length} unlocked</span>
      </div>
      {!showAllMedals && <p className="stats-h-note">Closest to unlocking</p>}
      <div className="medals">
        {medalsShown.map((a) => (
          <div key={a.id} className={`medal ${a.unlocked ? 'unlocked' : ''} ${a.tone}`} title={a.label}>
            <span className="medal-ring" style={{ '--p': `${(a.cur / a.target) * 360}deg` }}>
              <span className="medal-face"><Icon name={a.icon} size={28} /></span>
            </span>
            <span className="medal-label">{a.label}</span>
            <span className="medal-progress">{a.unlocked ? 'Unlocked' : `${a.cur.toLocaleString()} / ${a.target.toLocaleString()}`}</span>
          </div>
        ))}
      </div>
      <button type="button" className="btn btn-ghost" onClick={() => setShowAllMedals((v) => !v)} aria-expanded={showAllMedals}>
        {showAllMedals ? 'Show fewer' : `Show all ${achievements.length} achievements`}
      </button>
    </div>
  )
}
