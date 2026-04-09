import { motion } from 'framer-motion'
import { Trash2, AlertTriangle, Download, Info, Volume2, VolumeX, Palette } from 'lucide-react'
import { useStatsStore } from '../store/statsStore'
import { useQuizStore } from '../store/quizStore'

export default function SettingsScreen() {
  const resetStats = useStatsStore((s) => s.resetStats)
  const resetQuizzesProgress = useQuizStore((s) => s.resetQuizzesProgress)
  const soundEnabled = useStatsStore((s) => s.soundEnabled)
  const toggleSound = useStatsStore((s) => s.toggleSound)
  const theme = useStatsStore((s) => s.theme)
  const setTheme = useStatsStore((s) => s.setTheme)

  const toggleTheme = () => setTheme(theme === 'neon' ? 'default' : 'neon')

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
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 8vw, 46px)', color: 'var(--text)', letterSpacing: '1px', lineHeight: 1 }}>
          SETTINGS
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, marginTop: 4 }}>
          Manage your app data and preferences
        </div>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Preferences Section */}
        <section>
          <div className="section-label">Preferences</div>
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <button onClick={toggleSound} style={{
              display: 'flex', alignItems: 'center', gap: 14, width: '100%',
              padding: '16px 20px', background: 'transparent', border: 'none',
              borderBottom: '1px solid var(--border)',
              cursor: 'pointer', textAlign: 'left'
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: soundEnabled ? 'var(--success-dim)' : 'var(--border)', color: soundEnabled ? 'var(--success)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                 {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15, color: 'var(--text)', marginBottom: 2 }}>Sound Effects</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Play sound on answers</div>
                </div>
                <div style={{ width: 46, height: 26, background: soundEnabled ? 'var(--success)' : 'var(--border)', borderRadius: 13, position: 'relative', transition: 'background 0.3s' }}>
                   <div style={{ width: 22, height: 22, background: '#fff', borderRadius: 11, position: 'absolute', top: 2, left: soundEnabled ? 22 : 2, transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
            </button>

            <button onClick={toggleTheme} style={{
              display: 'flex', alignItems: 'center', gap: 14, width: '100%',
              padding: '16px 20px', background: 'transparent', border: 'none',
              cursor: 'pointer', textAlign: 'left'
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-glow)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                 <Palette size={20} />
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15, color: 'var(--text)', marginBottom: 2 }}>Neon Dark Mode</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Hot pink alternative theme</div>
                </div>
                <div style={{ width: 46, height: 26, background: theme === 'neon' ? 'var(--primary)' : 'var(--border)', borderRadius: 13, position: 'relative', transition: 'background 0.3s' }}>
                   <div style={{ width: 22, height: 22, background: '#fff', borderRadius: 11, position: 'absolute', top: 2, left: theme === 'neon' ? 22 : 2, transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
            </button>
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
          <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 16 }}>
             <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 24, paddingBottom: 2 }}>🇯🇵</span>
             </div>
             <div>
                <div style={{ fontFamily: "'Nunito'", fontWeight: 900, fontSize: 16, color: 'var(--text)' }}>Gamified Japanese</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>Version 1.0.0</div>
             </div>
          </div>
        </section>

      </div>
    </div>
  )
}
