import { useStatsStore, getDueEntries } from '../store/statsStore'
import Icon from './Icon'

// Main navigation. Lessons (the videos) is home; Practice is free play with the quiz games.
// Phone: icon bar at the bottom. Desktop (≥ 900px, see .bottom-nav in index.css): labelled rail on the left.
const TABS = [
  { id: 'lessons',   label: 'Lessons',  icon: 'lesson',   color: 'var(--accent)' },
  { id: 'learn',     label: 'Practice', icon: 'target',   color: 'var(--primary)' },
  { id: 'custom',    label: 'Review',   icon: 'dumbbell', color: 'var(--error)' },
  { id: 'dashboard', label: 'Stats',    icon: 'trophy',   color: 'var(--gold-deep)' },
  { id: 'settings',  label: 'Settings', icon: 'gear',     color: 'var(--text-muted)' },
]

export default function BottomNav({ active, onChange }) {
  const wrongBank = useStatsStore((s) => s.wrongBank)
  const dueCount = getDueEntries(wrongBank).length
  return (
    <nav className="bottom-nav" aria-label="Main">
      <span className="nav-brand jp" aria-hidden="true">日本語<b>ToGo</b></span>
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
          <span className="nav-label">{label}</span>
          {id === 'custom' && dueCount > 0 && <span className="nav-badge">{dueCount > 99 ? '99+' : dueCount}</span>}
        </button>
      ))}
    </nav>
  )
}
