// Illustrated icons for the Practice (games) side: one family drawn for the app — white + gold glyphs with
// dark outlines, so they read on the indigo (vocab) and vermilion (grammar) node circles alike.
// Cut from one AI-generated sheet; sources in src/assets/icons/.
import nouns from '../assets/icons/nouns.png'
import verbs from '../assets/icons/verbs.png'
import other from '../assets/icons/other.png'
import vocabReview from '../assets/icons/vocab-review.png'
import grammar from '../assets/icons/grammar.png'
import grammarReview from '../assets/icons/grammar-review.png'
import mastered from '../assets/icons/mastered.png'
import flashcards from '../assets/icons/flashcards.png'
import type from '../assets/icons/type.png'
import shuffle from '../assets/icons/shuffle.png'
import listen from '../assets/icons/listen.png'
import start from '../assets/icons/start.png'

const SRC = {
  nouns, verbs, other,
  'vocab-review': vocabReview,
  grammar,
  'grammar-review': grammarReview,
  mastered, flashcards, type, shuffle, listen, start,
}

export default function GameIcon({ name, size = 40, className = '', style }) {
  return (
    <img
      src={SRC[name]}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      draggable="false"
      className={`game-icon ${className}`}
      style={{ display: 'block', flexShrink: 0, ...style }}
    />
  )
}
