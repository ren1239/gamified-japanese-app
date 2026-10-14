import { useStatsStore, getDueEntries } from '../store/statsStore'
import Icon from './Icon'

const TABS = [
  { id: 'learn',     label: 'Learn',    icon: 'home',     color: 'var(--primary)' },
  { id: 'custom',    label: 'Review',   icon: 'dumbbell', color: 'var(--error)' },
  { id: 'dashboard', label: 'Stats',    icon: 'trophy',   color: 'var(--gold-deep)' },
  { id: 'settings',  label: 'Settings', icon: 'gear',     color: 'var(--text-muted)' },
]

export default function BottomNav({ active, onChange }) {
  const wrongBank = useStatsStore((s) => s.wrongBank)
  const dueCount = getDueEntries(wrongBank).length
  return (
    <nav className="bottom-nav" aria-label="Main">
      {TABS.map(({ id, label, icon, color }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`bottom-nav-btn${active === id ? ' active' : ''}`}
          aria-label={label}
          aria-current={active === id ? 'page' : undefined}
          title={label}
        >
          <Icon name={icon} size={28} color={color} />
          {id === 'custom' && dueCount > 0 && <span className="nav-badge">{dueCount > 99 ? '99+' : dueCount}</span>}
        </button>
      ))}
    </nav>
  )
}
