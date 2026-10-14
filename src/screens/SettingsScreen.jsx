import { motion } from 'framer-motion'
import { Trash2, AlertTriangle, Download, User, Volume2, VolumeX, Palette, Smartphone, Mic, Timer, Target } from 'lucide-react'
import ToggleRow from '../components/ToggleRow'
import ChipGroup from '../components/ChipGroup'

const THEME_OPTIONS = [
  { id: 'system', label: 'Match device' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
]

const GOAL_OPTIONS = [
  { id: 30,  label: 'Casual · 30' },
  { id: 50,  label: 'Regular · 50' },
  { id: 100, label: 'Serious · 100' },
  { id: 200, label: 'Intense · 200' },
]
import { useStatsStore } from '../store/statsStore'
import { useQuizStore } from '../store/quizStore'
import { usePWAInstall } from '../hooks/usePWAInstall'

export default function SettingsScreen() {
  const { canInstall, isIOS, install, installed } = usePWAInstall()
  const resetStats = useStatsStore((s) => s.resetStats)
  const resetQuizzesProgress = useQuizStore((s) => s.resetQuizzesProgress)
  const soundEnabled = useStatsStore((s) => s.soundEnabled)
  const toggleSound = useStatsStore((s) => s.toggleSound)
  const theme = useStatsStore((s) => s.theme)
  const setTheme = useStatsStore((s) => s.setTheme)
  const username = useStatsStore((s) => s.username)
  const setUsername = useStatsStore((s) => s.setUsername)
  const autoSpeak = useStatsStore((s) => s.autoSpeak)
  const toggleAutoSpeak = useStatsStore((s) => s.toggleAutoSpeak)
  const speedMode = useStatsStore((s) => s.speedMode)
  const toggleSpeedMode = useStatsStore((s) => s.toggleSpeedMode)
  const dailyGoal = useStatsStore((s) => s.dailyGoal)
  const setDailyGoal = useStatsStore((s) => s.setDailyGoal)

  const showRomaji = useStatsStore((s) => s.showRomaji)
  const toggleRomaji = useStatsStore((s) => s.toggleRomaji)

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset ALL your progress? This cannot be undone.")) {
      resetStats()
      resetQuizzesProgress()
      alert('Progress has been reset.')
    }
  }

  const exportData = () => {
    const stats = useStatsStore.getState()
    const quiz = useQuizStore.getState()
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ stats, quiz }))
    const dlAnchorElem = document.createElement('a')
    dlAnchorElem.setAttribute("href", dataStr)
    dlAnchorElem.setAttribute("download", "japanese_app_backup.json")
    dlAnchorElem.click()
  }

  return (
    <div className="page" style={{ paddingTop: 24, paddingBottom: 100 }}>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 32 }}
      >
        <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 8vw, 46px)', color: 'var(--text)', letterSpacing: '1px', lineHeight: 1 }}>
          Settings
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, marginTop: 4 }}>
          Manage your app data and preferences
        </div>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Profile Section */}
        <section>
          <div className="section-label">Profile</div>
          <div className="glass-card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-glow)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <User size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15, color: 'var(--text)', marginBottom: 6 }}>Your Name</div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Student"
                  maxLength={24}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 10,
                    border: '1.5px solid var(--border-md)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontFamily: "'Nunito'",
                    fontWeight: 700,
                    fontSize: 14,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-md)'}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Daily Goal Section */}
        <section>
          <div className="section-label">Daily Goal</div>
          <div className="glass-card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(249,115,22,0.15)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Target size={20} />
              </div>
              <div>
                <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15, color: 'var(--text)', marginBottom: 2 }}>XP per day</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Hitting it keeps your streak alive (~1 quiz ≈ 100 XP)</div>
              </div>
            </div>
            <ChipGroup options={GOAL_OPTIONS} value={dailyGoal} onChange={setDailyGoal} />
          </div>
        </section>

        {/* Preferences Section */}
        <section>
          <div className="section-label">Preferences</div>
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <ToggleRow icon={soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />} title="Sound Effects" subtitle="Play sound on answers" on={soundEnabled} onToggle={toggleSound} />
            <ToggleRow icon={<Mic size={20} />} title="Auto-play Pronunciation" subtitle="Read Japanese aloud on flashcards and vocab answers" on={autoSpeak} onToggle={toggleAutoSpeak} />
            <ToggleRow icon={<Timer size={20} />} title="Speed Mode" subtitle="Timed questions · +3 XP for fast answers, timeouts count as wrong" on={speedMode} onToggle={toggleSpeedMode} color="var(--accent)" dimColor="rgba(249,115,22,0.15)" />
            <ToggleRow icon={<span className="jp" style={{ fontWeight: 800, fontSize: 17 }}>あ</span>} title="Show Romaji" subtitle="Readings under Japanese everywhere. Also one tap from any lesson header." on={showRomaji} onToggle={toggleRomaji} color="var(--primary)" dimColor="var(--primary-tint)" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-tint)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Palette size={20} />
              </div>
              <div style={{ flex: 1, display: 'grid', gap: 8 }}>
                <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15, color: 'var(--text)' }}>Appearance</div>
                <ChipGroup options={THEME_OPTIONS} value={theme} onChange={setTheme} />
              </div>
            </div>
          </div>
        </section>

        {/* Data Section */}
        <section>
          <div className="section-label">Data Management</div>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            <button onClick={exportData} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 20px', background: 'transparent', border: 'none',
              borderBottom: '1px solid var(--border)', cursor: 'pointer', textAlign: 'left'
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-glow)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Download size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15, color: 'var(--text)', marginBottom: 2 }}>Export Backup</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Download your progress as JSON</div>
              </div>
            </button>

            <button onClick={handleReset} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 20px', background: 'transparent', border: 'none',
              cursor: 'pointer', textAlign: 'left'
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--error-dim)', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15, color: 'var(--error)', marginBottom: 2 }}>Reset Progress</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Permanently delete all XP and scores</div>
              </div>
            </button>

          </div>
        </section>

        {/* Info Section */}
        <section>
          <div className="section-label">About</div>
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 24, paddingBottom: 2 }}>🇯🇵</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 16, color: 'var(--text)' }}>日本語ToGo</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>Version 1.0.0</div>
              </div>
            </div>

            {canInstall && (
              <div style={{ borderTop: '1px solid var(--border)', padding: '14px 20px' }}>
                {isIOS ? (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <Smartphone size={15} color="var(--primary)" style={{ marginTop: 2, flexShrink: 0 }} />
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, lineHeight: 1.6 }}>
                      Tap <strong style={{ color: 'var(--text)' }}>Share</strong> then{' '}
                      <strong style={{ color: 'var(--text)' }}>Add to Home Screen</strong> to install.
                    </div>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={install}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      padding: '12px 0', borderRadius: 12,
                      background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                      border: 'none', cursor: 'pointer',
                      color: '#fff', fontFamily: "'Nunito'", fontWeight: 800, fontSize: 14,
                      boxShadow: '0 4px 16px var(--primary-glow)',
                    }}
                  >
                    <Smartphone size={16} />
                    Install App
                  </motion.button>
                )}
              </div>
            )}

            {installed && (
              <div style={{ borderTop: '1px solid var(--border)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Smartphone size={14} color="var(--success)" />
                <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 700 }}>Installed on this device</span>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  )
}
