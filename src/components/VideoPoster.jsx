import { useEffect, useState } from 'react'
import { resolveMedia, useVideoSource } from '../utils/videoSource'
import { useStatsStore } from '../store/statsStore'
import { VIDEO_TYPES } from '../utils/lessons'
import LessonThumb from './LessonThumb'

// A video's thumbnail. Most videos use the Nori or Mentai lesson artwork (VIDEO_TYPES[type].art); the vocab
// video shows its own title card — the frame the encoder saves next to the .mp4 — when the file is reachable.
export default function VideoPoster({ video, lesson, className = '' }) {
  const art = VIDEO_TYPES[video.type].art
  const files = useVideoSource((s) => s.files)
  const mediaServer = useStatsStore((s) => s.mediaServer)
  const [src, setSrc] = useState(null)
  useEffect(() => {
    if (art !== 'poster') return undefined
    let alive = true
    resolveMedia(video, '.jpg').then((u) => alive && setSrc(u)).catch(() => {})
    return () => { alive = false }
  }, [art, video, files, mediaServer])
  if (art !== 'poster' || !src) return <LessonThumb lesson={lesson} mascot={art === 'poster' ? 'stream' : art} className={className} />
  return (
    <span className={`video-poster ${className}`}>
      <img src={src} alt="" loading="lazy" onError={() => setSrc(null)} />
    </span>
  )
}
