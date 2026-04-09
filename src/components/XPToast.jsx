import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStatsStore } from '../store/statsStore'
import { playXPCoin } from '../utils/audio'

export default function XPToast({ xp, show, onDone }) {
  const timerRef = useRef(null)
  const soundEnabled = useStatsStore((s) => s.soundEnabled)

  useEffect(() => {
    if (show) {
      if (soundEnabled) playXPCoin()
      timerRef.current = setTimeout(onDone, 2200)
      return () => clearTimeout(timerRef.current)
    }
  }, [show, onDone, soundEnabled])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          style={{
            position: 'fixed',
            bottom: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3000,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            color: '#fff',
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: 18,
            padding: '10px 24px',
            borderRadius: 999,
            boxShadow: 'var(--shadow-lg)',
            whiteSpace: 'nowrap',
            letterSpacing: '0.5px',
          }}>
            ⚡ +{xp} XP
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
