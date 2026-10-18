import thumbNori from '../assets/lessons/thumb-nori.jpg'
import thumbMentai from '../assets/lessons/thumb-mentai.jpg'
import thumbShadowing from '../assets/lessons/thumb-shadowing.jpg'

// Genki lesson thumbnail: one shared artwork per mascot ("GENKI" + an empty "LESSON" pill),
// with the lesson number drawn on top so the same image serves all 23 lessons.
// Two pill layouts: Nori's art has a white number right after "LESSON"; the Mentai and shadowing art end the pill
// in a white slot that takes a dark number (class `slot`).
// Positions are percentages of the artwork (see .lesson-thumb in index.css), so it scales from a list icon to a hero card.
const ART = { nori: thumbNori, mentai: thumbMentai, shadowing: thumbShadowing }
const SLOT_LAYOUT = new Set(['mentai', 'shadowing'])

export default function LessonThumb({ lesson, mascot = 'nori', className = '', style }) {
  const who = ART[mascot] ? mascot : 'nori'
  return (
    <div className={`lesson-thumb ${who}${SLOT_LAYOUT.has(who) ? ' slot' : ''} ${className}`} style={style} role="img" aria-label={`Genki lesson ${lesson}`}>
      <img src={ART[who]} alt="" draggable="false" />
      <span className="lesson-thumb-num" aria-hidden="true">{lesson}</span>
    </div>
  )
}
