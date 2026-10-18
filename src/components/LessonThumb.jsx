import thumbNori from '../assets/lessons/thumb-nori.jpg'
import thumbMentai from '../assets/lessons/thumb-mentai.jpg'

// Genki lesson thumbnail: one shared artwork per mascot ("GENKI" + an empty "LESSON" pill),
// with the lesson number drawn on top so the same image serves all 23 lessons.
// Nori (vocab, shadowing): white number after "LESSON". Mentai (grammar videos): dark number in the pill's white slot.
// Positions are percentages of the artwork (see .lesson-thumb in index.css), so it scales from a list icon to a hero card.
const ART = { nori: thumbNori, mentai: thumbMentai }

export default function LessonThumb({ lesson, mascot = 'nori', className = '', style }) {
  const who = ART[mascot] ? mascot : 'nori'
  return (
    <div className={`lesson-thumb ${who} ${className}`} style={style} role="img" aria-label={`Genki lesson ${lesson}`}>
      <img src={ART[who]} alt="" draggable="false" />
      <span className="lesson-thumb-num" aria-hidden="true">{lesson}</span>
    </div>
  )
}
