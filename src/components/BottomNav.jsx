import { motion } from 'framer-motion'
import { BarChart2, BookOpen, Settings, FolderPlus } from 'lucide-react'

const TABS = [
  { id: 'dashboard', label: 'Stats',     Icon: BarChart2 },
  { id: 'chapters',  label: 'Chapters',  Icon: BookOpen  },
  { id: 'custom',    label: 'Custom',    Icon: FolderPlus },
  { id: 'settings',  label: 'Settings',  Icon: Settings  },
]

export default function BottomNav({ active, onChange }) {
  return (
    <div className="bottom-nav">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="bottom-nav-btn"
            aria-label={label}
          >
            {isActive && (
              <motion.div
                layoutId="nav-pip"
                className="nav-pip"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <motion.span
              animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -2 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                color={isActive ? 'var(--primary)' : 'var(--text-muted)'}
              />
            </motion.span>
            <span className={`nav-label ${isActive ? 'nav-label-active' : ''}`}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
