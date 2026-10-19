import { useStatsStore, getDueEntries } from '../store/statsStore'
import Icon from './Icon'
import logoLight from '../assets/brand/logo-light.png'
import logoDark from '../assets/brand/logo-dark.png'

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
      {/* Desktop rail only. Two cut-outs (2×, 400 px) so dark mode gets lighter letters and a sticker edge round Nori. */}
      <span className="nav-brand" aria-hidden="true">
        <img className="nav-logo light" src={logoLight} alt="" width="200" height="56" draggable="false" />
        <img className="nav-logo dark" src={logoDark} alt="" width="200" height="56" draggable="false" />
      </span>
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
