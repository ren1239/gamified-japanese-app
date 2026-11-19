import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import Mascot from '../components/Mascot'
import Icon from '../components/Icon'
import VocabIcon from '../components/VocabIcon'
import { furiganaSegments } from '../utils/romaji'
import { buildDeck } from './buildDeck'
import './slides.css'

// Teaching slides for a chapter's grammar points, in the app's visual language.
// In the app: Lesson → Grammar points → Slides. Dev: /slides.html?ch=15#7 (chapter 15, slide 7).
// Keys: → / space / click = next (reveals first), ← = back, Home / End, F = furigana, Esc = close
// (T = light/dark on slides.html).
const W = 1600, H = 900

const MARKS = /\[([^\]]+)\]|\{([^}]+)\}/g

// Japanese (or mixed) text with [grammar] / {noun} highlights and optional furigana
function Furi({ text, furi }) {
  const runs = []
  let last = 0
  for (const m of text.matchAll(MARKS)) {
    if (m.index > last) runs.push([text.slice(last, m.index), null])
    runs.push(m[1] ? [m[1], 'hl'] : [m[2], 'noun'])
    last = m.index + m[0].length
  }
  if (last < text.length) runs.push([text.slice(last), null])
  return runs.map(([t, kind], i) => (
    <span key={i} className={kind ? `mk mk-${kind}` : undefined}>
      {furiganaSegments(t).map(([s, reading], j) =>
        reading && furi ? <ruby key={j}>{s}<rt>{reading}</rt></ruby> : <Fragment key={j}>{s}</Fragment>)}
    </span>
  ))
}

// from → to with the shared start plain and the changed ending highlighted
function Conversion({ from, to, furi }) {
  let k = 0
  while (k < from.length && from[k] === to[k]) k++
  return (
    <span className="conv">
      <span className="conv-from"><Furi text={`${from.slice(0, k)}${from.slice(k) ? `{${from.slice(k)}}` : ''}`} furi={furi} /></span>
      <span className="conv-arrow">→</span>
      <span className="conv-to"><Furi text={`${to.slice(0, k)}[${to.slice(k)}]`} furi={furi} /></span>
    </span>
  )
}

function Header({ point, total, kicker }) {
  return (
    <header className="sl-head">
      <span className="sl-pill">{point.index} / {total} · <span className="jp-inline">{point.label}</span></span>
      <span className="sl-kicker">{kicker}</span>
    </header>
  )
}

function TitleSlide({ slide }) {
  const { chapter, points } = slide
  return (
    <div className="sl sl-title">
      <div className="title-copy">
        <span className="eyebrow">{chapter.title} · Grammar</span>
        <h1 className="title-jp">第{chapter.number}課</h1>
        <p className="title-sub">{chapter.subtitle}</p>
        <ol className="title-points">
          {points.map((p) => (
            <li key={p.key}><span className="num">{p.index}</span><span className="jp-inline">{p.label}</span><span className="muted">{p.desc}</span></li>
          ))}
        </ol>
      </div>
      <div className="title-art">
        <div className="blob" />
        <Mascot who="nori" mood="happy" size={300} className="mascot-idle" />
        <Mascot who="mentai" mood="cheer" size={210} className="mascot-idle title-mentai" />
      </div>
    </div>
  )
}

function IntroSlide({ slide }) {
  const { point, total } = slide
  return (
    <div className="sl sl-intro">
      <div className="intro-num">{point.index}</div>
      <div className="intro-copy">
        <span className="eyebrow">Grammar point {point.index} of {total}</span>
        <h1 className="intro-label">{point.label}</h1>
        <h2 className="intro-title">{point.title}</h2>
        <p className="intro-summary">{point.summary}</p>
      </div>
      <Mascot who="mentai" mood="think" size={260} className="mascot-idle intro-mascot" />
    </div>
  )
}

function BuildSlide({ slide, furi }) {
  const { point, total } = slide
  const structured = point.rows || point.equation
  return (
    <div className="sl">
      <Header point={point} total={total} kicker="How to make it" />
      <div className="build">
        {point.rows && (
          <div className="rows">
            {point.rows.map(([label, rule, pairs]) => (
              <div className="row card" key={label}>
                <div className="row-label"><span className="tag">{label}</span>{rule && <span className="rule">{rule}</span>}</div>
                <div className="row-pairs">
                  {pairs.map((p) => (Array.isArray(p)
                    ? <Conversion key={p[0]} from={p[0]} to={p[1]} furi={furi} />
                    : <span key={p} className="conv"><Furi text={p} furi={furi} /></span>))}
                </div>
              </div>
            ))}
          </div>
        )}
        {point.equation && (
          <div className="equation card">
            <div className="eq-parts">
              {point.equation.parts.map((p, i) => (
                <Fragment key={i}>
                  {i > 0 && <span className="eq-plus">+</span>}
                  <span className={`eq-part ${p.kind ?? ''}`}>
                    <span className="eq-jp"><Furi text={p.jp} furi={furi} /></span>
                    <span className="eq-cap">{p.cap}</span>
                  </span>
                </Fragment>
              ))}
            </div>
            <p className="eq-en">“{point.equation.en}”</p>
          </div>
        )}
        {point.uses.length > 0 && (
          <div className="uses">
            {point.uses.map(([jp, en]) => (
              <div className="use" key={jp}><span className="use-jp"><Furi text={jp} furi={furi} /></span><span className="use-en">{en}</span></div>
            ))}
          </div>
        )}
        {!structured && (
          <ul className="formation">
            {point.formation.map((f) => <li key={f}><Furi text={f} furi={furi} /></li>)}
          </ul>
        )}
      </div>
    </div>
  )
}

function ExamplesSlide({ slide, step, furi }) {
  const { point, total } = slide
  return (
    <div className="sl">
      <Header point={point} total={total} kicker="Examples" />
      <div className="examples">
        {point.examples.map((e, i) => (
          <div className={`example card ${i < step ? 'shown' : ''}`} key={e.jp}>
            <div className="ex-text">
              <p className="ex-jp"><Furi text={e.jp} furi={furi} /></p>
              <p className="ex-en">{e.en}</p>
            </div>
            {e.icon && <VocabIcon wordKey={e.icon} size={72} />}
          </div>
        ))}
      </div>
    </div>
  )
}

function PitfallsSlide({ slide, furi }) {
  const { point, total } = slide
  return (
    <div className="sl">
      <Header point={point} total={total} kicker="Watch out" />
      <div className="pitfalls">
        {point.pitfalls.map((p, i) => (
          <div className="pitfall card" key={i}>
            {p.bad && (
              <div className="pf-pair">
                <span className="pf bad"><b>✗</b><Furi text={p.bad} furi={furi} /></span>
                <span className="pf good"><b>✓</b><Furi text={p.good} furi={furi} /></span>
              </div>
            )}
            <p className="pf-note"><Furi text={p.note} furi={furi} /></p>
          </div>
        ))}
      </div>
      <Mascot who="mentai" mood="oops" size={170} className="corner-mascot" />
    </div>
  )
}

function DrillsSlide({ slide, step, furi }) {
  const { point, total } = slide
  const many = point.drills.length > 6
  return (
    <div className="sl">
      <Header point={point} total={total} kicker="Your turn" />
      <div className={`drills ${many ? 'many' : ''}`}>
        {point.drills.map((d, i) => (
          <div className={`drill card ${i < step ? 'open' : ''} ${i === step ? 'next' : ''}`} key={d.cue}>
            {d.icon && <VocabIcon wordKey={d.icon} size={many ? 56 : 68} />}
            <div className="drill-text">
              <p className="drill-cue"><Furi text={d.cue} furi={furi} /></p>
              <p className="drill-answer">{i < step ? <Furi text={d.answer} furi={furi} /> : <span className="drill-hidden">？</span>}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TalkSlide({ slide, furi }) {
  const { point, total } = slide
  return (
    <div className="sl">
      <Header point={point} total={total} kicker="Let's talk" />
      <div className="talk">
        <Mascot who="nori" mood="cheer" size={200} className="mascot-idle talk-mascot" />
        <div className="bubbles">
          {point.conversation.map((c) => <div className="bubble" key={c}><Furi text={c} furi={furi} /></div>)}
        </div>
      </div>
    </div>
  )
}

function RecapSlide({ slide, furi }) {
  const { chapter, points } = slide
  return (
    <div className="sl">
      <header className="sl-head"><span className="sl-pill gold">まとめ</span><span className="sl-kicker">{chapter.title} recap</span></header>
      <div className="recap">
        {points.map((p) => (
          <div className="recap-row card" key={p.key}>
            <span className="num">{p.index}</span>
            <div className="recap-head"><span className="recap-label">{p.label}</span><span className="recap-title">{p.summary}</span></div>
            {p.examples[0] && <p className="recap-ex"><Furi text={p.examples[0].jp} furi={furi} /></p>}
          </div>
        ))}
      </div>
      <Mascot who="nori" mood="cheer" size={170} className="corner-mascot mascot-idle" />
    </div>
  )
}

const VIEWS = { title: TitleSlide, intro: IntroSlide, build: BuildSlide, examples: ExamplesSlide, pitfalls: PitfallsSlide, drills: DrillsSlide, talk: TalkSlide, recap: RecapSlide }

const chapterFromUrl = () => Number(new URLSearchParams(location.search).get('ch') ?? 15)
const slideFromHash = () => Number(location.hash.slice(1)) - 1 || 0

/**
 * Full-screen slide deck. In the app: <Slides chapter={15} point="ch15-teoku" onClose={…} /> (rendered in a
 * portal by the caller), opening at that point's intro. Standalone (slides.html, no onClose): chapter from
 * ?ch=, slide from #n, T toggles theme.
 */
export default function Slides({ chapter, point, onClose }) {
  const standalone = !onClose
  const deck = useMemo(() => buildDeck(chapter ?? chapterFromUrl()), [chapter])
  const count = deck?.slides.length ?? 0
  const [pos, setPos] = useState(() => {
    const start = standalone ? slideFromHash() : deck?.points.find((p) => p.key === point)?.start ?? 0
    return { i: Math.min(Math.max(start, 0), Math.max(count - 1, 0)), step: 0 }
  })
  const [furi, setFuri] = useState(true)
  const [scale, setScale] = useState(1)

  const slide = deck?.slides[pos.i]
  const steps = slide?.steps ?? 0

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  useEffect(() => { if (standalone) history.replaceState(null, '', `#${pos.i + 1}`) }, [pos.i, standalone])
  useEffect(() => { if (standalone && deck) document.title = `${deck.chapter.title} grammar · 日本語ToGo` }, [deck, standalone])

  // Freeze the page behind the deck while it's open in the app
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const next = useCallback(() => setPos(({ i, step }) => (step < steps ? { i, step: step + 1 } : i < count - 1 ? { i: i + 1, step: 0 } : { i, step })), [steps, count])
  // Going back lands on the previous slide fully revealed
  const prev = useCallback(() => setPos(({ i, step }) => (step > 0 ? { i, step: 0 } : i > 0 ? { i: i - 1, step: deck.slides[i - 1].steps ?? 0 } : { i, step })), [deck])

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); next() }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); prev() }
      else if (e.key === 'Home') setPos({ i: 0, step: 0 })
      else if (e.key === 'End') setPos({ i: count - 1, step: 0 })
      else if (e.key === 'Escape' && onClose) onClose()
      else if (e.key === 'f') setFuri((v) => !v)
      else if (e.key === 't' && standalone) {
        const root = document.documentElement
        const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
        root.dataset.theme = dark ? 'light' : 'dark'
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, count, onClose, standalone])

  if (!deck) return <p className="sl-missing">No grammar for that chapter — try <a href="?ch=15">?ch=15</a>.</p>

  const View = VIEWS[slide.type]
  const section = slide.point?.index ?? (slide.type === 'title' ? 0 : deck.points.length + 1)
  return (
    <div className={`sl-viewport${standalone ? '' : ' overlay'}`} onClick={(e) => { if (!e.target.closest('button, .sl-foot')) next() }}>
      <div className="sl-stage" style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})` }}>
        <View key={pos.i} slide={slide} step={pos.step} furi={furi} />
        <footer className="sl-foot">
          {onClose && <button type="button" className="sl-btn" onClick={onClose} aria-label="Close slides"><Icon name="x" size={26} /></button>}
          <div className="sl-progress">
            {deck.points.map((p) => (
              <button type="button" key={p.key} className={`seg ${p.index < section ? 'done' : p.index === section ? 'on' : ''}`}
                onClick={() => setPos({ i: p.start, step: 0 })}>
                <span className="jp-inline">{p.label}</span>
              </button>
            ))}
          </div>
          <div className="sl-tools">
            <button type="button" className={`sl-tool ${furi ? 'on' : ''}`} onClick={() => setFuri((v) => !v)} title="Furigana (F)">ふりがな</button>
            <button type="button" className="sl-btn" onClick={prev} disabled={pos.i === 0 && pos.step === 0} aria-label="Previous"><Icon name="back" size={26} /></button>
            <span className="sl-count">{pos.i + 1} / {count}</span>
            <button type="button" className="sl-btn" onClick={next} disabled={pos.i === count - 1 && pos.step >= steps} aria-label="Next"><Icon name="next" size={26} /></button>
          </div>
        </footer>
      </div>
    </div>
  )
}
