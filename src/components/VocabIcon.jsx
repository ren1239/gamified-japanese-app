import { iconFor } from '../data/vocabIcons'

// Picture for a vocab word on its tinted tile; renders nothing for words without an icon.
export default function VocabIcon({ wordKey, size = 72, className = '' }) {
  const icon = iconFor(wordKey)
  if (!icon) return null
  return (
    <span className={`vocab-icon ${className}`} style={{ '--tint': icon.tint, '--size': `${size}px` }} aria-hidden="true">
      <svg viewBox="0 0 48 48" strokeLinecap="round" strokeLinejoin="round">
        {icon.shapes.map((s, i) => <path key={i} d={s.d} fill={s.f} stroke={s.s} strokeWidth={s.w} />)}
      </svg>
    </span>
  )
}
