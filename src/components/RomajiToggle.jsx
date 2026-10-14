import { useStatsStore } from '../store/statsStore'

// One-click romaji switch. The setting is global and persisted, so turning it on in a
// lesson also shows romaji on the path, flashcards and chapter pages (and vice versa).
export default function RomajiToggle({ onDark = false }) {
  const on = useStatsStore((s) => s.showRomaji)
  const toggle = useStatsStore((s) => s.toggleRomaji)
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      title={on ? 'Romaji on — click to hide' : 'Romaji off — click to show'}
      className={`romaji-toggle${on ? ' on' : ''}${onDark ? ' on-dark' : ''}`}
    >
      <span className="romaji-toggle-jp">あ</span>
      <span className="romaji-toggle-knob" />
      <span className="romaji-toggle-en">a</span>
    </button>
  )
}
