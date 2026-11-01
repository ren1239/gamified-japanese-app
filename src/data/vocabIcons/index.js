// Picture icons for vocab words, keyed by the app's word key ('ch15-n03').
// Style + palette: ./helpers.js. One file per chapter; add it to the spread below.
// Words without an icon (abstract nouns, grammar words) just show text.
import ch14 from './ch14.js'
import ch15 from './ch15.js'
import ch16 from './ch16.js'
import ch17 from './ch17.js'
import ch18 from './ch18.js'

const VOCAB_ICONS = { ...ch14, ...ch15, ...ch16, ...ch17, ...ch18 }

export default VOCAB_ICONS
export const iconFor = (wordKey) => VOCAB_ICONS[wordKey] ?? null
export const chapterHasIcons = (n) => Object.keys(VOCAB_ICONS).some((k) => k.startsWith(`ch${n}-`))
