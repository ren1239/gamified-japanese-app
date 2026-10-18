import { create } from 'zustand'
import { LESSON_VIDEOS } from '../data/lessons.generated'
import { useStatsStore } from '../store/statsStore'

// Lesson videos are never deployed with the app. A video plays from the first source that has it:
//   1. A folder on this computer, picked in Settings → Lesson videos.
//      Chrome/Edge: the folder handle is kept in IndexedDB; after a browser restart one click re-grants access.
//      Other desktop browsers: <input webkitdirectory>, files kept for this session only.
//   2. The video server set in Settings (the nihongo-media Cloudflare Worker over the private R2 bucket):
//      <url>/<lesson>-<type>.mp4?k=<key>, for videos built with `hosted: true`. URL + key live on the device only.
//   3. A public media host: VITE_MEDIA_BASE (ending in "/"), serving <lesson>-<type>.mp4.
//   4. Dev only: /media/ (public/media → ~/Dev/genki-videos/videos/360p), for videos built with `encoded: true`.
// Folder files are matched by name: "15-stream.mp4", or any video whose name contains the YouTube id.

const HOST_BASE = import.meta.env.VITE_MEDIA_BASE || null
const DEV_BASE = import.meta.env.DEV ? '/media/' : null
const MEDIA_EXT = /\.(mp4|m4v|webm|mov|jpe?g)$/i

export const canPickFolder = typeof window !== 'undefined' && 'showDirectoryPicker' in window

export const useVideoSource = create(() => ({
  status: 'none', // 'none' | 'scanning' | 'ready' | 'reconnect'
  folderName: null,
  files: {}, // lower-cased file name → File | FileSystemFileHandle
}))

// ── Tiny IndexedDB key/value store (localStorage can't hold a folder handle) ──
function idb(mode, op) {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open('nihongo-video-folder', 1)
    open.onupgradeneeded = () => open.result.createObjectStore('kv')
    open.onerror = () => reject(open.error)
    open.onsuccess = () => {
      const tx = open.result.transaction('kv', mode)
      const req = op(tx.objectStore('kv'))
      tx.oncomplete = () => resolve(req.result)
      tx.onerror = () => reject(tx.error)
    }
  })
}

async function scanDirectory(dir, depth = 0, out = {}) {
  for await (const entry of dir.values()) {
    if (entry.kind === 'file' && MEDIA_EXT.test(entry.name)) out[entry.name.toLowerCase()] = entry
    else if (entry.kind === 'directory' && depth < 2 && !entry.name.startsWith('.')) await scanDirectory(entry, depth + 1, out)
  }
  return out
}

async function loadHandle(handle) {
  useVideoSource.setState({ status: 'scanning', folderName: handle.name })
  const files = await scanDirectory(handle)
  useVideoSource.setState({ status: 'ready', folderName: handle.name, files })
}

/** On app start: reopen the remembered folder if the browser still allows it. */
export async function restoreVideoFolder() {
  if (!canPickFolder) return
  const handle = await idb('readonly', (s) => s.get('dir')).catch(() => null)
  if (!handle) return
  if ((await handle.queryPermission({ mode: 'read' })) === 'granted') await loadHandle(handle)
  else useVideoSource.setState({ status: 'reconnect', folderName: handle.name })
}

/** Re-grant access to the remembered folder. Call from a click: the permission prompt needs one. */
export async function reconnectVideoFolder() {
  const handle = await idb('readonly', (s) => s.get('dir'))
  if (handle && (await handle.requestPermission({ mode: 'read' })) === 'granted') await loadHandle(handle)
}

/** Chrome/Edge folder picker. Throws AbortError if the user cancels. */
export async function pickVideoFolder() {
  const handle = await window.showDirectoryPicker({ id: 'genki-videos', mode: 'read' })
  await idb('readwrite', (s) => s.put(handle, 'dir'))
  await loadHandle(handle)
}

/** Fallback for browsers without showDirectoryPicker: the FileList from <input type="file" webkitdirectory>. */
export function loadFolderFiles(fileList) {
  const files = {}
  let folderName = null
  for (const f of fileList) {
    if (MEDIA_EXT.test(f.name)) files[f.name.toLowerCase()] = f
    folderName ??= f.webkitRelativePath?.split('/')[0] || 'Selected folder'
  }
  useVideoSource.setState({ status: 'ready', folderName, files })
}

export async function forgetVideoFolder() {
  await idb('readwrite', (s) => s.delete('dir')).catch(() => {})
  for (const url of urlCache.values()) URL.revokeObjectURL(url)
  urlCache.clear()
  useVideoSource.setState({ status: 'none', folderName: null, files: {} })
}

function findInFolder(files, video, ext) {
  const name = video.file.replace(/\.mp4$/, ext).toLowerCase()
  if (files[name]) return files[name]
  const id = video.youtube?.toLowerCase()
  const isWanted = ext === '.mp4' ? (n) => /\.(mp4|m4v|webm|mov)$/.test(n) : (n) => n.endsWith(ext)
  return id ? Object.entries(files).find(([n]) => n.includes(id) && isWanted(n))?.[1] ?? null : null
}

function server() {
  const s = useStatsStore.getState().mediaServer
  return s?.url && s?.key ? s : null
}

/** Is this video playable from any source right now? */
export function hasVideo(video, files = useVideoSource.getState().files) {
  if (!video?.file) return false
  return Boolean(findInFolder(files, video, '.mp4') || (server() && video.hosted) || HOST_BASE || (DEV_BASE && video.encoded))
}

/** Check a video server: 'ok' | 'forbidden' (wrong key) | 'unreachable'. */
export async function testMediaServer({ url, key }) {
  try {
    const res = await fetch(`${url.trim().replace(/\/+$/, '')}/15-vocab.jpg?k=${encodeURIComponent(key.trim())}`, { method: 'HEAD', cache: 'no-store' })
    return res.ok ? 'ok' : res.status === 403 ? 'forbidden' : res.status === 404 ? 'ok' : 'unreachable'
  } catch {
    return 'unreachable'
  }
}

export function countAvailable(files) {
  let n = 0
  for (const vs of Object.values(LESSON_VIDEOS)) for (const v of vs) if (findInFolder(files, v, '.mp4')) n++
  return n
}

// One object URL per file for the whole session, so reopening a video doesn't re-read it
const urlCache = new Map()

/** URL for a lesson video (ext '.mp4') or its poster ('.jpg'), or null if no source has it. */
export async function resolveMedia(video, ext = '.mp4') {
  if (!video?.file) return null
  const entry = findInFolder(useVideoSource.getState().files, video, ext)
  if (entry) {
    if (!urlCache.has(entry)) {
      const file = entry.getFile ? await entry.getFile() : entry
      urlCache.set(entry, URL.createObjectURL(file))
    }
    return urlCache.get(entry)
  }
  const name = video.file.replace(/\.mp4$/, ext)
  const srv = server()
  if (srv && video.hosted) return `${srv.url}/${name}?k=${encodeURIComponent(srv.key)}`
  if (HOST_BASE) return HOST_BASE + name
  if (DEV_BASE && video.encoded) return DEV_BASE + name
  return null
}
