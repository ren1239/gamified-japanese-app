// Push the app's content (vocab, grammar quizzes, teaching notes) to the `nihongo` schema in
// Supabase, for voice lessons in Claude chat (CLAUDE.md §16).
//
//   npm run content:push              → upload every chapter
//   npm run content:push -- 15 16     → only those chapters
//   npm run content:push -- --sql     → write supabase/content/chNN.sql instead (apply with psql / MCP)
//
// Each chapter is replaced as a whole by nihongo.load_chapter(). Uploading goes through the
// public.nihongo_load_content RPC, which needs NIHONGO_CONTENT_KEY from .env.local.
import { readdirSync, mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { chapters as CHAPTERS } from '../src/data/chapterData.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dataDir = join(root, 'src/data')
const notesDir = join(root, 'content/teaching')
const outDir = join(root, 'supabase/content')

const load = (file) => import(pathToFileURL(file).href)

// All quiz objects from the grammar files, by id
const quizzes = new Map()
for (const f of readdirSync(dataDir).filter((f) => /^ch\d+Grammar\.js$/.test(f))) {
  for (const value of Object.values(await load(join(dataDir, f)))) {
    if (value && typeof value === 'object' && value.id && Array.isArray(value.questions)) quizzes.set(value.id, value)
  }
}

async function vocabFor(n) {
  const file = join(dataDir, `ch${n === 0 ? '00' : n < 10 && n > 1 ? String(n).padStart(2, '0') : n}VocabData.js`)
  if (!existsSync(file)) return []
  const mod = await load(file)
  const list = Object.entries(mod).find(([name, v]) => /Vocab$/.test(name) && Array.isArray(v))?.[1] ?? []
  return list.map(({ id, kana, kanji, english, category }) => ({ id, kana, kanji: kanji ?? '', english, category }))
}

async function notesFor(n) {
  const file = join(notesDir, `ch${String(n).padStart(2, '0')}.js`)
  return existsSync(file) ? (await load(file)).default : []
}

const bookOf = (n) => (n === 0 ? 'Basics' : n <= 12 ? 'Genki I' : 'Genki II')
const stripTitle = (t = '') => t.replace(/^Ch\.\d+\s*·\s*/, '')

function questionsOf(quiz) {
  return (quiz?.questions ?? []).map((q) => ({
    id: q.id,
    prompt: q.question,
    jp: q.jp ?? null,
    answer: q.choices[q.correct],
    distractors: q.choices.filter((_, i) => i !== q.correct),
    explanation: q.explanation ?? null,
  }))
}

async function chapterDoc(ch) {
  const n = ch.number
  const notes = await notesFor(n)
  const noteFor = (key) => notes.find((x) => x.key === key)
  const points = []
  let section = 0

  for (const g of ch.grammar) {
    const quiz = quizzes.get(g.quizId)
    if (!quiz) throw new Error(`Ch.${n}: quiz ${g.quizId} not found`)
    const review = g.id === 'review'
    const note = noteFor(g.quizId)
    points.push({
      key: g.quizId,
      section: review ? null : ++section,
      kind: review ? 'review' : n === 0 ? 'drill' : 'grammar',
      label: g.label,
      title: note?.title ?? stripTitle(quiz.title),
      summary: note?.summary ?? g.desc,
      rule: quiz.description ?? quiz.grammarPoint ?? null,
      notes: note ? strip(note) : null,
      questions: questionsOf(quiz),
    })
  }

  // Chapters without quizzes (Genki I ch.2–10): sections come from the teaching notes alone
  for (const note of notes.filter((x) => !points.some((p) => p.key === x.key))) {
    if (!note.section) throw new Error(`Ch.${n}: note ${note.key} has no quiz and no section`)
    points.push({
      key: note.key, section: note.section, kind: 'grammar',
      label: note.label, title: note.title, summary: note.summary ?? null, rule: null,
      notes: strip(note), questions: [],
    })
  }
  points.sort((a, b) => (a.section ?? 99) - (b.section ?? 99))

  return { chapter: n, book: bookOf(n), title: ch.title, subtitle: ch.subtitle, vocab: await vocabFor(n), points }
}

// Teaching-note fields only (identity fields live on the point itself)
function strip({ key, section, label, title, summary, ...rest }) {
  return rest
}

function localEnv(name) {
  if (process.env[name]) return process.env[name]
  const file = join(root, '.env.local')
  const line = existsSync(file) && readFileSync(file, 'utf8').split('\n').find((l) => l.startsWith(`${name}=`))
  return line ? line.slice(name.length + 1).trim() : null
}

// Project URL + public anon key, as the app already ships them (src/utils/push.js)
function supabaseTarget() {
  const src = readFileSync(join(root, 'src/utils/push.js'), 'utf8')
  const url = src.match(/https:\/\/[a-z0-9]+\.supabase\.co/)?.[0]
  const anon = src.match(/ANON_KEY = '([^']+)'/)?.[1]
  if (!url || !anon) throw new Error('Supabase URL / anon key not found in src/utils/push.js')
  return { url, anon }
}

async function push(doc, target, key) {
  const res = await fetch(`${target.url}/rest/v1/rpc/nihongo_load_content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: target.anon, Authorization: `Bearer ${target.anon}` },
    body: JSON.stringify({ doc, content_key: key }),
  })
  const body = await res.json().catch(() => null)
  if (!res.ok) throw new Error(`Ch.${doc.chapter}: ${body?.message ?? res.status}`)
  return body
}

const args = process.argv.slice(2)
const asSql = args.includes('--sql')
const only = args.filter((a) => /^\d+$/.test(a)).map(Number)
const key = asSql ? null : localEnv('NIHONGO_CONTENT_KEY')
if (!asSql && !key) throw new Error('NIHONGO_CONTENT_KEY missing from .env.local')
const target = asSql ? null : supabaseTarget()

for (const ch of CHAPTERS.filter((c) => !only.length || only.includes(c.number))) {
  const doc = await chapterDoc(ch)
  const noted = doc.points.filter((p) => p.notes).length
  if (asSql) {
    const json = JSON.stringify(doc)
    if (json.includes('$nhg$')) throw new Error('content contains the SQL quote tag')
    mkdirSync(outDir, { recursive: true })
    const file = join(outDir, `ch${String(ch.number).padStart(2, '0')}.sql`)
    writeFileSync(file, `select nihongo.load_chapter($nhg$${json}$nhg$::jsonb);\n`)
    console.log(`ch${ch.number} → ${file.replace(root + '/', '')}`)
  } else {
    console.log(`${await push(doc, target, key)} (${noted} with notes)`)
  }
}
