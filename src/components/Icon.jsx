// Nihongo ToGo icon set — filled, rounded shapes drawn as inline SVG.
// Usage: <Icon name="flame" size={22} color="var(--accent)" />
// Icons use currentColor, so `color` (or the parent's CSS color) tints them.

const PATHS = {
  flame: (
    <>
      <path fill="currentColor" d="M12 2c1 3.2 5.5 5.6 5.5 11a5.5 5.5 0 0 1-11 0c0-2.6 1.3-4.3 2.6-5.6.2 1.7 1 2.8 2.1 3.3C10.7 7.8 11 4.6 12 2Z" />
      <path fill="#FFD27A" d="M12 12.2c.6 1.5 2.4 2.4 2.4 4.4a2.4 2.4 0 0 1-4.8 0c0-1.4.9-2.4 1.6-3 .1.6.4 1 .8 1.2-.2-1 0-1.8 0-2.6Z" />
    </>
  ),
  bolt: <path fill="currentColor" d="M13.5 2 4.5 13.4c-.4.5 0 1.1.6 1.1H11l-1.4 7.1c-.1.6.6.9 1 .4l8.9-11.4c.4-.5 0-1.1-.6-1.1H13l1.5-7c.1-.6-.6-.9-1-.5Z" />,
  bell: (
    <>
      <path fill="currentColor" d="M12 2.5a6 6 0 0 0-6 6v3.6L4.3 15.4c-.4.7.1 1.6.9 1.6h13.6c.8 0 1.3-.9.9-1.6L18 12.1V8.5a6 6 0 0 0-6-6Z" />
      <circle cx="12" cy="19.6" r="2.3" fill="currentColor" />
    </>
  ),
  book: <path fill="currentColor" d="M3 5.5c3-1.4 6-1.4 8.2.3v13.4C9 17.6 6 17.6 3 19V5.5Zm18 0c-3-1.4-6-1.4-8.2.3v13.4c2.2-1.6 5.2-1.6 8.2-.2V5.5Z" />,
  brush: (
    <>
      <path fill="currentColor" d="M19.6 2.6c.7-.4 1.4.3 1 1l-7.3 10.8-2.7-2.7L19.6 2.6Z" />
      <path fill="currentColor" d="M9.6 13.6l2.8 2.8c-.4 3.4-3.6 5.4-8.6 5 1.7-1.3 1.4-3.2 2-4.6.6-1.7 2.1-3 3.8-3.2Z" />
    </>
  ),
  cards: (
    <>
      <rect x="7" y="3" width="13" height="16" rx="3" fill="currentColor" opacity=".5" />
      <rect x="4" y="6" width="13" height="16" rx="3" fill="currentColor" />
    </>
  ),
  chest: (
    <>
      <path fill="currentColor" d="M4 10h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z" />
      <path fill="currentColor" opacity=".7" d="M6 4h12a2 2 0 0 1 2 2v3H4V6a2 2 0 0 1 2-2Z" />
      <rect x="10.3" y="8" width="3.4" height="5" rx="1" fill="#FFD27A" />
    </>
  ),
  star: <path fill="currentColor" d="m12 2.8 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 2.8Z" />,
  crown: <path fill="currentColor" d="M3 8.5 7.5 12 12 5l4.5 7L21 8.5 19 19H5L3 8.5Z" />,
  home: <path fill="currentColor" d="M11.3 2.8a1 1 0 0 1 1.4 0l8.4 7.6c.6.6.2 1.6-.7 1.6H19v8a1 1 0 0 1-1 1h-3.5v-5.5h-5V21H6a1 1 0 0 1-1-1v-8H3.6c-.9 0-1.3-1-.7-1.6l8.4-7.6Z" />,
  dumbbell: (
    <>
      <rect x="2" y="9" width="3" height="6" rx="1" fill="currentColor" />
      <rect x="5" y="6.5" width="3.5" height="11" rx="1.2" fill="currentColor" />
      <rect x="8.5" y="10.6" width="7" height="2.8" fill="currentColor" />
      <rect x="15.5" y="6.5" width="3.5" height="11" rx="1.2" fill="currentColor" />
      <rect x="19" y="9" width="3" height="6" rx="1" fill="currentColor" />
    </>
  ),
  trophy: (
    <>
      <path fill="currentColor" d="M7 3h10v5a5 5 0 0 1-10 0V3Z" />
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M7 5H4a3 3 0 0 0 3 4.5M17 5h3a3 3 0 0 1-3 4.5" />
      <rect x="10.7" y="12.5" width="2.6" height="4.5" fill="currentColor" />
      <rect x="7.5" y="17" width="9" height="3.5" rx="1.2" fill="currentColor" />
    </>
  ),
  gear: <path fill="currentColor" d="M10.3 2h3.4l.5 2.6 1.6.7 2.2-1.5 2.4 2.4-1.5 2.2.7 1.6 2.6.5v3.4l-2.6.5-.7 1.6 1.5 2.2-2.4 2.4-2.2-1.5-1.6.7-.5 2.6h-3.4l-.5-2.6-1.6-.7-2.2 1.5-2.4-2.4 1.5-2.2-.7-1.6L2 13.7v-3.4l2.6-.5.7-1.6-1.5-2.2 2.4-2.4 2.2 1.5 1.6-.7L10.3 2Zm1.7 6.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />,
  x: <path stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />,
  check: (
    <>
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="m7 12.5 3.2 3.2L17 9" />
    </>
  ),
  cross: (
    <>
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path stroke="#fff" strokeWidth="3" strokeLinecap="round" d="M8.5 8.5l7 7M15.5 8.5l-7 7" />
    </>
  ),
  speaker: (
    <>
      <path fill="currentColor" d="M4 9h3.5L12 5v14l-4.5-4H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z" />
      <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
    </>
  ),
  snow: <path stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />,
  target: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </>
  ),
  guide: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" d="M9 8.5h6M9 12h6M9 15.5h4" />
    </>
  ),
  chart: (
    <>
      <rect x="3" y="12" width="4.5" height="9" rx="1.5" fill="currentColor" />
      <rect x="9.75" y="7" width="4.5" height="14" rx="1.5" fill="currentColor" />
      <rect x="16.5" y="3" width="4.5" height="18" rx="1.5" fill="currentColor" />
    </>
  ),
  bulb: (
    <>
      <path fill="currentColor" d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" />
      <rect x="8.5" y="18.5" width="7" height="3" rx="1.2" fill="currentColor" />
    </>
  ),
  flag: (
    <>
      <path fill="currentColor" d="M5 3h12.5l-2.5 4.5 2.5 4.5H5V3Z" />
      <rect x="4" y="2.5" width="2.4" height="19" rx="1.2" fill="currentColor" />
    </>
  ),
  back: <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />,
  next: <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />,
  shuffle: <path fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" d="M3 7h3.5c2 0 3 1 4.5 3.5l2 3c1.5 2.5 2.5 3.5 4.5 3.5H21M3 17h3.5c1.2 0 2-.4 2.8-1.2M14.7 8.2c.8-.8 1.6-1.2 2.8-1.2H21M18 4l3 3-3 3M18 14l3 3-3 3" />,
  // Lessons tab: a class whiteboard on its stand, with a play mark
  lesson: (
    <>
      <rect x="2.5" y="3" width="19" height="13.5" rx="3" fill="currentColor" />
      <path fill="var(--surface)" d="M10.2 6.9v5.7c0 .5.5.8.9.5l4.4-2.8c.4-.3.4-.8 0-1.1L11.1 6.4c-.4-.3-.9 0-.9.5Z" />
      <path fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" d="M8 21l2.6-4.5M16 21l-2.6-4.5" />
    </>
  ),
  // Lessons (video) — player controls
  film: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" />
      <path fill="var(--surface)" d="M10 9.2v5.6c0 .5.5.8.9.5l4.3-2.8c.4-.2.4-.8 0-1L10.9 8.7c-.4-.3-.9 0-.9.5Z" />
    </>
  ),
  play: <path fill="currentColor" d="M7 4.6v14.8c0 .9 1 1.4 1.7.9l11.2-7.4c.6-.4.6-1.4 0-1.8L8.7 3.7C8 3.2 7 3.7 7 4.6Z" />,
  pause: (
    <>
      <rect x="5.5" y="4" width="4.5" height="16" rx="1.6" fill="currentColor" />
      <rect x="14" y="4" width="4.5" height="16" rx="1.6" fill="currentColor" />
    </>
  ),
  prevPoint: <path fill="currentColor" d="M6 4.5c.8 0 1.5.7 1.5 1.5v4.3l9.8-6.1c.9-.6 2.2.1 2.2 1.2v13.2c0 1.1-1.3 1.8-2.2 1.2l-9.8-6.1V18A1.5 1.5 0 0 1 4.5 18V6c0-.8.7-1.5 1.5-1.5Z" />,
  nextPoint: <path fill="currentColor" d="M18 4.5c-.8 0-1.5.7-1.5 1.5v4.3L6.7 4.2c-.9-.6-2.2.1-2.2 1.2v13.2c0 1.1 1.3 1.8 2.2 1.2l9.8-6.1V18a1.5 1.5 0 0 0 3 0V6c0-.8-.7-1.5-1.5-1.5Z" />,
  loop: <path fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" d="M4 11.5A5.5 5.5 0 0 1 9.5 6H19m0 0-3-3m3 3-3 3M20 12.5a5.5 5.5 0 0 1-5.5 5.5H5m0 0 3 3m-3-3 3-3" />,
  expand: <path fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  folder: <path fill="currentColor" d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.6c.7 0 1.3.3 1.8.8L12.2 7h6.3A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-10Z" />,
  keyboard: (
    <>
      <rect x="2" y="6" width="20" height="13" rx="3" fill="currentColor" />
      <path stroke="var(--surface)" strokeWidth="2" strokeLinecap="round" d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 15h8" />
    </>
  ),
}

export default function Icon({ name, size = 22, color, style, title }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ display: 'block', flexShrink: 0, color, ...style }}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {PATHS[name] ?? PATHS.star}
    </svg>
  )
}
