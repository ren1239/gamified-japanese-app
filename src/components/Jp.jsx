import { useStatsStore } from '../store/statsStore'
import { toRomajiSafe } from '../utils/romaji'

// Japanese text that shows a romaji line underneath when the global romaji toggle is on.
// `reading` lets callers pass a kana-only string for a more accurate conversion.
export default function Jp({ children, reading, as: Tag = 'span', className = '', romajiClassName = '', style, romajiStyle, block = true }) {
  const on = useStatsStore((s) => s.showRomaji)
  const text = typeof children === 'string' ? children : ''
  const romaji = on ? toRomajiSafe(reading ?? text) : null
  return (
    <Tag className={`jp ${className}`} style={{ display: block ? 'block' : 'inline-block', ...style }}>
      <span>{children}</span>
      {romaji && <span className={`romaji ${romajiClassName}`} style={romajiStyle}>{romaji}</span>}
    </Tag>
  )
}
