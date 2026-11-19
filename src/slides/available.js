// Which chapters have grammar slides (a deck file). Lazy glob: keeps the slides out of the main bundle.
const DECKS = import.meta.glob('./decks/ch*.js')

export const hasSlides = (n) => `./decks/ch${String(n).padStart(2, '0')}.js` in DECKS
