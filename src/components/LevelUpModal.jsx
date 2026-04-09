import { motion, AnimatePresence } from 'framer-motion'
import { useStatsStore } from '../store/statsStore'

const LEVEL_NAMES = [
  '', '入門者', '初心者', '基礎', '学習者', '中級者', '上級者', '達人', '師匠', '先生', '博士'
]

function getLevelName(level) {
  return LEVEL_NAMES[Math.min(level, LEVEL_NAMES.length - 1)] || `Lv.${level}`
}

export default function LevelUpModal({ fromLevel, toLevel, show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 5000,
            background: 'rgba(20, 10, 40, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(160deg, #4C1D95, #7C3AED)',
              borderRadius: 28,
              padding: '48px 32px',
              textAlign: 'center',
              width: '100%',
              maxWidth: 340,
              boxShadow: '0 24px 80px rgba(124,58,237,0.6)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {/* Spinning badge */}
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              style={{ fontSize: 80, marginBottom: 16 }}
            >
              🎖️
            </motion.div>

            <div style={{
              color: 'rgba(255,255,255,0.7)',
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              LEVEL UP!
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: 900,
                fontSize: 40,
                color: '#fff',
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              {getLevelName(toLevel)}
            </motion.div>

            <div style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: 'rgba(255,255,255,0.65)',
              marginBottom: 32,
            }}>
              Level {fromLevel} → <span style={{ color: '#FCD34D' }}>Level {toLevel}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1.5px solid rgba(255,255,255,0.4)',
                borderRadius: 12,
                color: '#fff',
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 15,
                padding: '12px 28px',
                cursor: 'pointer',
              }}
            >
              続ける → Keep Going
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
