import { useMemo } from 'react'
import { useStatsStore } from '../store/statsStore'
import { useQuizStore } from '../store/quizStore'
import { useVideoSource, hasVideo } from '../utils/videoSource'
import { VIDEO_TYPES, lessonInfo, lessonVideos, videoStatus, videoKey, countedPoints, fmtTime, fmtDuration, lessonWatchTime, nextUp } from '../utils/lessons'
import VideoPoster from '../components/VideoPoster'
import Mascot from '../components/Mascot'
import Icon from '../components/Icon'
import Jp from '../components/Jp'
import RomajiToggle from '../components/RomajiToggle'

// One Genki lesson. Two views of the same material:
//   Videos (the course path, in Andy's order: vocab → grammar stream → textbook → bonus → shadowing)
//   Grammar points (each point is taught three times — explained, practised, bonus — so one row per point
//   gathers its three clips and its one quiz, instead of repeating the point under every video)
// Desktop: header + grammar points on the left, videos on the right. Phone: header, videos, points, まとめ.

const CLIP_NAMES = { stream: 'Explained', textbook: 'Practice', bonus: 'Bonus' }

function Rail({ state, n }) {
  return (
    <span className="lesson-rail">
      <span className={`lesson-rail-dot ${state}`}>
        {state === 'done' ? <Icon name="check" size={18} /> : state === 'started' ? <Icon name="play" size={16} /> : n}
      </span>
      <span className="lesson-rail-line" />
    </span>
  )
}

function bestOf(quiz) {
  if (!quiz?.questions?.length || quiz.bestScore == null) return null
  return { text: `${quiz.bestScore}/${quiz.questions.length}`, mastered: quiz.bestScore / quiz.questions.length >= 0.8 }
}

/** Grammar points of the lesson, each with its clips in the stream / textbook / bonus videos. */
function buildGrammarRows(info, lesson, videos, videoProgress, quizMap) {
  const entries = (info.chapter?.grammar ?? []).filter((g) => g.available && g.id !== 'review')
  return entries.map((g) => {
    const clips = ['stream', 'textbook', 'bonus'].map((type) => {
      const v = videos.find((x) => x.type === type)
      const parts = countedPoints(v).filter((p) => p.quiz === g.quizId)
      if (!parts.length) return null
      const vp = videoProgress[videoKey(lesson, type)]
      return {
        type,
        start: parts[0].index,
        length: parts.reduce((a, p) => a + (p.end - p.start), 0),
        state: parts.every((p) => vp?.done?.[p.index]) ? 'done' : parts.some((p) => vp?.sec?.[p.index]) ? 'started' : '',
      }
    }).filter(Boolean)
    return { ...g, quiz: quizMap[g.quizId], clips }
  })
}

export default function LessonScreen({ lesson, onBack, onPlay, onStartQuiz, onFlashcard }) {
  const info = lessonInfo(lesson)
  const videoProgress = useStatsStore((s) => s.videoProgress)
  const quizzes = useQuizStore((s) => s.quizzes)
  const quizMap = useMemo(() => Object.fromEntries(quizzes.map((q) => [q.id, q])), [quizzes])
  const files = useVideoSource((s) => s.files)
  const videos = lessonVideos(lesson)
  const withVideo = videos.filter((v) => v.youtube)
  const { watched, total: totalSec } = lessonWatchTime(lesson, videoProgress)
  const next = nextUp(lesson, videoProgress)
  const allDone = withVideo.length > 0 && withVideo.every((v) => videoStatus(v, videoProgress, lesson).complete)
  const grammar = buildGrammarRows(info, lesson, videos, videoProgress, quizMap)
  const review = quizMap[`ch${lesson}-review`]
  const hasVocab = info.chapter?.vocab?.available
  const vocabCards = () => onFlashcard({ chapter: info.chapter, category: 'all', direction: 'jp-en' })

  return (
    <div className="lesson-page">
      <div className="lesson-side">
        <aside className="lesson-hero">
          <div className="lesson-hero-top">
            <button type="button" className="hero-btn" onClick={onBack} aria-label="Back to lessons"><Icon name="back" size={22} /></button>
            <RomajiToggle onDark />
          </div>
          <div className="lesson-hero-main">
            <div>
              <small>{info.book.toUpperCase()} · LESSON {lesson}</small>
              <Jp className="lesson-hero-title" romajiStyle={{ color: 'rgba(255,255,255,0.8)' }}>{info.subtitle}</Jp>
            </div>
            <Mascot who="nori" mood={allDone ? 'cheer' : 'happy'} size={76} className="mascot-idle" />
          </div>
          {totalSec > 0 && (
            <div className="lesson-hero-progress">
              <span className="bar"><i style={{ width: `${(watched / totalSec) * 100}%` }} /></span>
              <b>{fmtDuration(watched) || '0 min'} of {fmtDuration(totalSec)} watched</b>
            </div>
          )}
          {next && (
            <button type="button" className="lesson-next" onClick={() => onPlay({ lesson, type: next.video.type, point: next.point.index })}>
              <span className="lesson-next-play"><Icon name="play" size={22} /></span>
              <span className="lesson-next-text">
                <small>{watched > 0 ? 'UP NEXT' : 'START HERE'} · {VIDEO_TYPES[next.video.type].label.toUpperCase()}</small>
                <Jp className="lesson-next-label">{next.point.label}</Jp>
              </span>
            </button>
          )}
          {allDone && <p className="lesson-hero-done">Every video watched. Finish with the まとめ quiz.</p>}
        </aside>

        {grammar.length > 0 && (
          <section className="grammar-points" aria-label="Grammar points">
            <h2 className="side-h">GRAMMAR POINTS</h2>
            {grammar.map((g) => {
              const best = bestOf(g.quiz)
              return (
                <div key={g.id} className={`gp-row${best?.mastered ? ' mastered' : ''}`}>
                  <div className="gp-head">
                    <span className="gp-text">
                      <Jp className="gp-label">{g.label}</Jp>
                      <small>{g.desc}</small>
                    </span>
                    {g.quiz && (
                      <button type="button" className={`quiz-pill${best?.mastered ? ' gold' : ''}`} onClick={() => onStartQuiz(g.quiz)}>
                        {best ? <>{best.mastered && <Icon name="crown" size={14} />}{best.text}</> : 'Quiz'}
                      </button>
                    )}
                  </div>
                  {g.clips.length > 0 && (
                    <div className="gp-clips">
                      {g.clips.map((c) => (
                        <button key={c.type} type="button" className={`gp-clip ${c.state}`} onClick={() => onPlay({ lesson, type: c.type, point: c.start })}>
                          <Icon name={c.state === 'done' ? 'check' : 'play'} size={12} />
                          {CLIP_NAMES[c.type]}<small>{fmtTime(c.length)}</small>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </section>
        )}
      </div>

      <div className="lesson-main">
        <div className="lesson-flow">
          <h2 className="side-h lesson-flow-h">VIDEOS · IN COURSE ORDER</h2>
          {videos.map((v, i) => {
            const t = VIDEO_TYPES[v.type]
            // Genki I vocabulary posts have no video: practise the words in the games instead
            if (!v.youtube) {
              return (
                <div key={v.type} className={`lesson-step tone-${t.tone}`}>
                  <Rail state="" n={i + 1} />
                  <div className="lesson-step-body">
                    <div className="vid-card no-video">
                      <span className="icon-chip"><Icon name="cards" size={24} /></span>
                      <span className="vid-card-text">
                        <span className="lesson-kicker"><span className="jp">{t.kanji}</span> · {t.label.toUpperCase()}</span>
                        <b>Learn this lesson&apos;s words</b>
                        <small>No video for this one: practise with flashcards.</small>
                      </span>
                    </div>
                    {hasVocab && <div className="lesson-chips"><button type="button" className="chip-btn" onClick={vocabCards}><Icon name="cards" size={16} />Flashcards</button></div>}
                  </div>
                </div>
              )
            }

            const st = videoStatus(v, videoProgress, lesson)
            const pts = countedPoints(v)
            const playable = hasVideo(v, files)
            const state = st.complete ? 'done' : st.started ? 'started' : ''
            const dialogues = v.type === 'shadowing' ? [...new Set(pts.map((p) => p.dialogue).filter(Boolean))] : []
            return (
              <div key={v.type} className={`lesson-step tone-${t.tone}`}>
                <Rail state={state} n={i + 1} />
                <div className="lesson-step-body">
                  <div className={`vid-card${state === 'started' ? ' active' : ''}`}>
                    <button type="button" className="vid-card-main" onClick={() => onPlay({ lesson, type: v.type })}>
                      <VideoPoster video={v} lesson={lesson} className="vid-card-thumb" />
                      <span className="vid-card-text">
                        <span className="lesson-kicker"><span className="jp">{t.kanji}</span> · {t.label.toUpperCase()}</span>
                        <b>{t.label}</b>
                        <small>
                          {v.duration ? fmtTime(v.duration) : 'Not downloaded yet'}
                          {pts.length > 1 ? ` · ${dialogues.length ? `${dialogues.length} dialogues` : `${pts.length} parts`}` : ''}
                          {st.complete ? ' · watched' : ''}
                          {!playable ? ' · YouTube only for now' : ''}
                        </small>
                      </span>
                    </button>
                    {st.started && !st.complete && <span className="vid-card-bar"><i style={{ width: `${Math.round(st.pct * 100)}%` }} /></span>}
                  </div>

                  {v.type === 'vocab' && hasVocab && (
                    <div className="lesson-chips"><button type="button" className="chip-btn" onClick={vocabCards}><Icon name="cards" size={16} />Flashcards</button></div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {review && (
          <button type="button" className="lesson-review" onClick={() => onStartQuiz(review)}>
            <span className="lesson-review-chest"><Icon name="chest" size={22} /></span>
            <span><Jp className="lesson-review-title">まとめ</Jp><small>Lesson {lesson} review quiz · mixes every grammar point</small></span>
            <Icon name="next" size={20} />
          </button>
        )}
      </div>
    </div>
  )
}
