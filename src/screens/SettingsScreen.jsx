import { motion } from 'framer-motion'
import { Trash2, AlertTriangle, Download, Info } from 'lucide-react'
import { useStatsStore } from '../store/statsStore'
import { useQuizStore } from '../store/quizStore'

export default function SettingsScreen() {
  const resetStats = useStatsStore((s) => s.resetStats)
  const resetQuizzesProgress = useQuizStore((s) => s.resetQuizzesProgress)

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
        
        {/* Data Section */}
        <section>
          <div className="section-label">Data Management</div>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            <button onClick={exportData} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 20px', background: 'transparent', border: 'none',
              borderBottom: '1px solid var(--border)', cursor: 'pointer', textAlign: 'left'
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(59,130,246,0.1)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(239,68,68,0.1)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Nunito'", fontWeight: 800, fontSize: 15, color: '#EF4444', marginBottom: 2 }}>Reset Progress</div>
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
