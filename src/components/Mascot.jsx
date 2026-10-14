// Two onigiri friends:
//   Nori   — classic triangle onigiri. Guides vocabulary and celebrations.
//   Mentai — round onigiri with spicy mentaiko filling and a chili. Guides grammar (the spicy part).
// Moods: 'happy' | 'think' | 'cheer' | 'oops' | 'sleep'
// Colors come from theme tokens (--rice, --nori, --blush, --mentai, --chili) so both work in dark mode.

function Face({ mood, cx = 60, eyeY = 50, spicy = false }) {
  const l = cx - 13, r = cx + 13, ink = 'var(--nori)'
  const brows = spicy && (mood === 'happy' || mood === 'think') && (
    <path d={`M${l - 7} ${eyeY - 11}l9 3M${r + 7} ${eyeY - 11}l-9 3`} stroke={ink} strokeWidth="3.2" strokeLinecap="round" />
  )
  switch (mood) {
    case 'cheer':
      return (
        <g>
          <path d={`M${l - 6} ${eyeY + 2}q6-8 12 0M${r - 6} ${eyeY + 2}q6-8 12 0`} fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" />
          <path d={`M${cx - 8} ${eyeY + 9}q8 12 16 0Z`} fill={ink} />
          <path d={`M${cx - 4} ${eyeY + 14}q4 3 8 0`} fill="none" stroke="var(--chili)" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )
    case 'oops':
      return (
        <g>
          <path d={`M${l - 5} ${eyeY - 4}l9 6M${l - 5} ${eyeY + 2}l9-6M${r - 4} ${eyeY - 4}l9 6M${r - 4} ${eyeY + 2}l9-6`} stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx={cx} cy={eyeY + 12} rx="5" ry="4" fill={ink} />
          <path d={`M${r + 16} ${eyeY - 14}q4 6 0 9q-4-3 0-9Z`} fill="#8FD0F5" />
        </g>
      )
    case 'think':
      return (
        <g>
          {brows}
          <circle cx={l} cy={eyeY} r="6" fill={ink} />
          <circle cx={r} cy={eyeY} r="6" fill={ink} />
          <circle cx={l - 2} cy={eyeY - 2} r="2" fill="#fff" />
          <circle cx={r - 2} cy={eyeY - 2} r="2" fill="#fff" />
          <path d={`M${cx - 6} ${eyeY + 12}h12`} stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )
    case 'sparkle': {
      // Big round eyes with a four-point star glint (welcome screen)
      const star = (x, y, r) => `M${x} ${y - r}Q${x + r * 0.22} ${y - r * 0.22} ${x + r} ${y}Q${x + r * 0.22} ${y + r * 0.22} ${x} ${y + r}Q${x - r * 0.22} ${y + r * 0.22} ${x - r} ${y}Q${x - r * 0.22} ${y - r * 0.22} ${x} ${y - r}Z`
      return (
        <g>
          <circle cx={l} cy={eyeY} r="8.5" fill={ink} />
          <circle cx={r} cy={eyeY} r="8.5" fill={ink} />
          <path d={star(l, eyeY, 5.2)} fill="#fff" />
          <path d={star(r, eyeY, 5.2)} fill="#fff" />
          <path d={`M${cx - 6} ${eyeY + 13}q6 6 12 0`} fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )
    }
    case 'sleep':
      return (
        <g>
          <path d={`M${l - 5} ${eyeY}q5 4 10 0M${r - 5} ${eyeY}q5 4 10 0`} fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx={cx} cy={eyeY + 11} rx="3.5" ry="2.5" fill={ink} />
        </g>
      )
    default: // happy
      return (
        <g>
          {brows}
          <circle cx={l} cy={eyeY} r="6" fill={ink} />
          <circle cx={r} cy={eyeY} r="6" fill={ink} />
          <circle cx={l + 2} cy={eyeY - 2} r="2" fill="#fff" />
          <circle cx={r + 2} cy={eyeY - 2} r="2" fill="#fff" />
          <path d={`M${cx - 7} ${eyeY + 9}q7 7 14 0`} fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )
  }
}

function NoriBody() {
  return (
    <g>
      <path d="M60 5c8 0 13 5 18 13l30 50c9 15 1 37-20 37H32C11 105 3 83 12 68L42 18c5-8 10-13 18-13Z" fill="var(--rice)" stroke="var(--nori)" strokeWidth="4" />
      <path d="M36 72h48v33H36z" fill="var(--nori)" />
      <path d="M36 105h48" stroke="var(--nori)" strokeWidth="4" />
      <ellipse cx="37" cy="61" rx="7" ry="4" fill="var(--blush)" />
      <ellipse cx="83" cy="61" rx="7" ry="4" fill="var(--blush)" />
      <circle cx="54" cy="25" r="2.4" fill="var(--nori)" opacity=".2" />
      <circle cx="66" cy="33" r="2" fill="var(--nori)" opacity=".16" />
    </g>
  )
}

function MentaiBody() {
  return (
    <g>
      {/* chili tucked behind, top right */}
      <path d="M86 12c8-3 14 2 12 9-2 9-12 17-22 19 6-8 9-16 10-28Z" fill="var(--chili)" stroke="var(--nori)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M86 12c0-4 3-7 7-7" fill="none" stroke="#3E9B42" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="60" r="44" fill="var(--rice)" stroke="var(--nori)" strokeWidth="4" />
      {/* mentaiko filling peeking out of the top */}
      <path d="M44 20q16-10 32 0q-4 9-16 9t-16-9Z" fill="var(--mentai)" stroke="var(--nori)" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="54" cy="21" r="1.6" fill="#fff" opacity=".8" />
      <circle cx="62" cy="19" r="1.6" fill="#fff" opacity=".8" />
      <circle cx="68" cy="22" r="1.4" fill="#fff" opacity=".8" />
      {/* nori: a rectangular band wrapped over the bottom, so rice shows on both sides */}
      <rect x="41" y="76" width="38" height="34" rx="5" fill="var(--nori)" stroke="var(--nori)" strokeWidth="2" />
      <path d="M45 82h30" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="34" cy="63" rx="7" ry="4" fill="var(--chili)" opacity=".55" />
      <ellipse cx="86" cy="63" rx="7" ry="4" fill="var(--chili)" opacity=".55" />
    </g>
  )
}

export default function Mascot({ who = 'nori', mood = 'happy', size = 96, style, className, title }) {
  const isMentai = who === 'mentai'
  return (
    <svg
      viewBox="0 0 120 112"
      width={size}
      height={size * (112 / 120)}
      className={className}
      style={{ display: 'block', flexShrink: 0, overflow: 'visible', ...style }}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {isMentai ? <MentaiBody /> : <NoriBody />}
      <Face mood={mood} eyeY={isMentai ? 54 : 50} spicy={isMentai} />
    </svg>
  )
}

