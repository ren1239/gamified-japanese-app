import { chapters as CHAPTERS } from '../data/chapterData'
import VOCAB_ICONS from '../data/vocabIcons/index.js'

// Content sources: chapter registry, teaching notes, grammar quizzes (titles), per-chapter slide extras
const NOTES = import.meta.glob('../../content/teaching/ch*.js', { eager: true, import: 'default' })
const DECKS = import.meta.glob('./decks/ch*.js', { eager: true, import: 'default' })
const QUIZ_MODULES = import.meta.glob('../data/ch*Grammar.js', { eager: true })
const VOCAB_MODULES = import.meta.glob('../data/ch*VocabData.js', { eager: true })

const pad = (n) => String(n).padStart(2, '0')
const QUIZZES = Object.values(QUIZ_MODULES).flatMap((m) => Object.values(m)).filter((q) => q?.id)

// Kanji words of the chapter that have a picture, longest first, to decorate examples and drills
function iconMatcher(n) {
  const mod = VOCAB_MODULES[`../data/ch${pad(n)}VocabData.js`]
  const words = mod ? Object.values(mod).find(Array.isArray) : []
  const withIcons = words
    .map((w) => ({ key: `ch${n}-${w.id}`, text: (w.kanji || w.kana).replace(/[〜~（(].*$/, '') }))
    .filter((w) => VOCAB_ICONS[w.key] && w.text.length > 0 && !/^[ぁ-ん]$/.test(w.text))
    .sort((a, b) => b.text.length - a.text.length)
  return (sentence) => withIcons.find((w) => sentence.replace(/[[\]{}]/g, '').includes(w.text))?.key ?? null
}

// Slide types in use. 'pitfalls' (watch out), 'drills' (your turn) and 'talk' are built but hidden for now.
const SHOWN = new Set(['title', 'intro', 'build', 'examples', 'recap'])

/**
 * Slides for a chapter's grammar: title, then per point intro → how to make it → examples →
 * (watch out → your turn → talk), then a recap. `steps` = reveal clicks before moving on;
 * `start` = slide index of each point's intro.
 */
export function buildDeck(n) {
  const chapter = CHAPTERS.find((c) => c.number === n)
  if (!chapter) return null
  const notes = NOTES[`../../content/teaching/ch${pad(n)}.js`] ?? []
  const extras = DECKS[`./decks/ch${pad(n)}.js`] ?? {}
  const iconFor = iconMatcher(n)

  const points = chapter.grammar
    .filter((g) => g.id !== 'review' && g.quizId)
    .map((g, i) => {
      const note = notes.find((x) => x.key === g.quizId) ?? {}
      const quiz = QUIZZES.find((q) => q.id === g.quizId)
      const extra = extras[g.quizId] ?? {}
      return {
        key: g.quizId,
        index: i + 1,
        label: g.label,
        desc: g.desc,
        title: note.title ?? quiz?.title?.replace(/^Ch\.\d+ · /, '') ?? g.desc,
        summary: note.summary ?? g.desc,
        formation: note.formation ?? [],
        rows: extra.rows,
        equation: extra.equation,
        uses: extra.uses ?? [],
        examples: (extra.examples ?? (note.examples ?? []).map((e) => [e.jp, e.en])).map(([jp, en]) => ({ jp, en, icon: iconFor(jp) })),
        pitfalls: extra.pitfalls ?? (note.pitfalls ?? []).map((note) => ({ note })),
        drills: (note.drills ?? []).map((d) => ({ ...d, icon: iconFor(d.answer) })),
        conversation: note.conversation ?? [],
      }
    })

  const total = points.length
  const slides = [{ type: 'title', chapter, points }]
  for (const p of points) {
    const ctx = { point: p, total }
    slides.push({ type: 'intro', ...ctx })
    slides.push({ type: 'build', ...ctx })
    if (p.examples.length) slides.push({ type: 'examples', ...ctx, steps: p.examples.length })
    if (p.pitfalls.length) slides.push({ type: 'pitfalls', ...ctx })
    if (p.drills.length) slides.push({ type: 'drills', ...ctx, steps: p.drills.length })
    if (p.conversation.length) slides.push({ type: 'talk', ...ctx })
  }
  slides.push({ type: 'recap', chapter, points })
  const shown = slides.filter((s) => SHOWN.has(s.type))
  for (const p of points) p.start = shown.findIndex((s) => s.type === 'intro' && s.point === p)
  return { chapter, points, slides: shown }
}
