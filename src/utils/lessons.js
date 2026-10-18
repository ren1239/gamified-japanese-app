import { LESSON_VIDEOS } from '../data/lessons.generated'
import { chapters } from '../data/chapterData'

// 授業 Lessons: the video half of the app. Each Genki lesson has up to 5 ToKini Andy videos;
// YouTube chapters become "points" (virtual clips) that link into the existing games.

export const WATCHED_PCT = 0.9 // a point counts as watched once 90% of it has actually played

// Track colours follow the app: indigo = vocab, vermilion = grammar, purple = listening/shadowing.
// mascot = who guides it in the player; art = its thumbnail: the Nori or Mentai lesson artwork, or 'poster'
// (a real frame from the video — the vocab video's own title card).
export const VIDEO_TYPES = {
  vocab:     { kanji: '単語', label: 'Vocabulary',         short: 'Vocab',     tone: 'primary', mascot: 'nori',   art: 'poster' },
  stream:    { kanji: '文法', label: 'Grammar stream',     short: 'Grammar',   tone: 'accent',  mascot: 'mentai', art: 'nori' },
  textbook:  { kanji: '練習', label: 'Textbook practice',  short: 'Practice',  tone: 'accent',  mascot: 'mentai', art: 'mentai' },
  bonus:     { kanji: '例文', label: 'Bonus sentences',    short: 'Bonus',     tone: 'accent',  mascot: 'mentai', art: 'mentai' },
  shadowing: { kanji: 'シャドー', label: 'Listen & shadow', short: 'Shadowing', tone: 'listen',  mascot: 'nori',   art: 'shadowing' },
}

export const videoKey = (lesson, type) => `${lesson}-${type}`

export function lessonVideos(n) {
  return LESSON_VIDEOS[n] ?? []
}

export function getVideo(n, type) {
  return lessonVideos(n).find((v) => v.type === type) ?? null
}

export function lessonInfo(n) {
  const ch = chapters.find((c) => c.number === n)
  return { number: n, subtitle: ch?.subtitle?.replace(/^★\s*/, '') ?? '', book: n <= 12 ? 'Genki I' : 'Genki II', chapter: ch }
}

export const LESSON_NUMBERS = Object.keys(LESSON_VIDEOS).map(Number).sort((a, b) => a - b)

/** Points that count toward completion (the intro doesn't). */
export function countedPoints(video) {
  return (video?.points ?? []).map((p, i) => ({ ...p, index: i })).filter((p) => p.kind !== 'intro')
}

/** { done, total, pct, started } for one video, from statsStore.videoProgress */
export function videoStatus(video, videoProgress, lesson) {
  const vp = videoProgress[videoKey(lesson, video.type)]
  const pts = countedPoints(video)
  const done = pts.filter((p) => vp?.done?.[p.index]).length
  const total = pts.length
  return { done, total, pct: total ? done / total : 0, started: Boolean(vp?.pos || done), complete: total > 0 && done === total }
}

/** Videos of a lesson that exist (Genki I vocab posts have no video) and how many are complete. */
export function lessonStatus(n, videoProgress) {
  const vids = lessonVideos(n).filter((v) => v.youtube)
  const statuses = vids.map((v) => ({ video: v, ...videoStatus(v, videoProgress, n) }))
  return { videos: statuses, complete: statuses.filter((s) => s.complete).length, total: vids.length, started: statuses.some((s) => s.started) }
}

/** Minutes actually watched vs total, across a lesson's videos (each part's played seconds capped at its length). */
export function lessonWatchTime(n, videoProgress) {
  let watched = 0
  let total = 0
  for (const v of lessonVideos(n)) {
    if (!v.youtube || !v.duration) continue
    total += v.duration
    const sec = videoProgress[videoKey(n, v.type)]?.sec ?? {}
    ;(v.points ?? []).forEach((p, i) => { watched += Math.min(sec[i] ?? 0, p.end - p.start) })
  }
  return { watched, total }
}

/** First unwatched part in course order (vocab → stream → textbook → bonus → shadowing), or null when all done. */
export function nextUp(n, videoProgress) {
  for (const v of lessonVideos(n)) {
    if (!v.youtube || !v.points?.length) continue
    const done = videoProgress[videoKey(n, v.type)]?.done ?? {}
    const p = countedPoints(v).find((x) => !done[x.index])
    if (p) return { video: v, point: p }
  }
  return null
}

/** Index of the point playing at time t */
export function pointAt(points, t) {
  let i = 0
  for (let k = 0; k < points.length; k++) if (points[k].start <= t + 0.05) i = k
  return i
}

export function fmtTime(sec) {
  const s = Math.max(0, Math.round(sec || 0))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const r = String(s % 60).padStart(2, '0')
  return h ? `${h}:${String(m).padStart(2, '0')}:${r}` : `${m}:${r}`
}

export function fmtDuration(sec) {
  if (!sec) return ''
  const m = Math.round(sec / 60)
  return m >= 60 ? `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')} m` : `${m} min`
}

/** Shadowing stage labels are long ("Medium Read Out Loud"); shorten for the stepper. */
export function stageShort(label) {
  return label.replace(/Read Out Loud/i, 'Read aloud').replace(/Shadowing/i, 'Shadow').replace(/^(Medium|Normal)\s+/i, '')
}
export function stageSpeed(label) {
  return /^medium/i.test(label) ? 'medium' : /^normal/i.test(label) ? 'normal' : null
}
