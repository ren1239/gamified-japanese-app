import { useEffect, useState } from 'react'
import { resolveMedia, useVideoSource } from '../utils/videoSource'
import { useStatsStore } from '../store/statsStore'
import { VIDEO_TYPES } from '../utils/lessons'
import LessonThumb from './LessonThumb'

// A real frame from the video (the .jpg the encoder writes next to each .mp4), so the five videos of a
// lesson look different. Falls back to the shared lesson artwork when the file isn't on this device.
export default function VideoPoster({ video, lesson, className = '' }) {
  const files = useVideoSource((s) => s.files)
  const mediaServer = useStatsStore((s) => s.mediaServer)
  const [src, setSrc] = useState(null)
  useEffect(() => {
    let alive = true
    resolveMedia(video, '.jpg').then((u) => alive && setSrc(u)).catch(() => {})
    return () => { alive = false }
  }, [video, files, mediaServer])
  if (!src) return <LessonThumb lesson={lesson} mascot={VIDEO_TYPES[video.type].mascot} className={className} />
  return (
    <span className={`video-poster ${className}`}>
      <img src={src} alt="" loading="lazy" onError={() => setSrc(null)} />
    </span>
  )
}
