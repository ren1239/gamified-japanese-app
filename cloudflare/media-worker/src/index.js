// Nihongo ToGo lesson videos — serves the private R2 bucket `nihongo-lessons` to the app.
//
//   GET/HEAD /<lesson>-<type>.mp4|jpg?k=<MEDIA_KEY>
//
// The key is a Worker secret (wrangler secret put MEDIA_KEY); the app keeps it on each device
// (Settings → Lesson videos → Video server), never in the deployed bundle. Range requests are
// passed through to R2, so the player can seek without downloading the whole file.
const FILE = /^\/(\d{1,2})-(vocab|stream|textbook|bonus|shadowing)\.(mp4|jpg)$/

const CORS = {
  'Access-Control-Allow-Origin': '*', // the key is the gate; media elements don't send Origin anyway
  'Access-Control-Allow-Headers': 'Range',
  'Access-Control-Expose-Headers': 'Content-Range, Content-Length, Accept-Ranges',
}

function sameSecret(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: { ...CORS, 'Access-Control-Allow-Methods': 'GET, HEAD' } })
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Method not allowed', { status: 405, headers: CORS })
    if (url.pathname === '/') return new Response('ok', { headers: CORS }) // health check, reveals nothing

    const match = url.pathname.match(FILE)
    if (!match) return new Response('Not found', { status: 404, headers: CORS })
    if (!sameSecret(url.searchParams.get('k') ?? '', env.MEDIA_KEY)) return new Response('Forbidden', { status: 403, headers: CORS })

    const key = url.pathname.slice(1)
    const respond = (obj, status, extra = {}) => {
      const headers = new Headers(CORS)
      obj.writeHttpMetadata(headers)
      headers.set('ETag', obj.httpEtag)
      headers.set('Accept-Ranges', 'bytes')
      headers.set('Cache-Control', 'private, max-age=604800')
      if (!headers.has('Content-Type')) headers.set('Content-Type', match[3] === 'mp4' ? 'video/mp4' : 'image/jpeg')
      for (const [k, v] of Object.entries(extra)) headers.set(k, v)
      return new Response(status === 200 || status === 206 ? obj.body ?? null : null, { status, headers })
    }

    if (request.method === 'HEAD') {
      const meta = await env.MEDIA.head(key)
      return meta ? respond(meta, 200, { 'Content-Length': String(meta.size) }) : new Response('Not found', { status: 404, headers: CORS })
    }

    // Range: bytes=start-end | start- | -suffix  (players ask for one range at a time).
    // One R2 call per request: the object's total size comes back with the ranged read.
    const m = (request.headers.get('Range') ?? '').match(/^bytes=(\d*)-(\d*)$/)
    if (m && (m[1] || m[2])) {
      const r = m[1] === '' ? { suffix: Number(m[2]) }
        : m[2] === '' ? { offset: Number(m[1]) }
          : { offset: Number(m[1]), length: Number(m[2]) - Number(m[1]) + 1 }
      let obj
      try { obj = await env.MEDIA.get(key, { range: r }) } catch { obj = undefined } // out-of-range read
      if (obj === null) return new Response('Not found', { status: 404, headers: CORS })
      if (!obj) {
        const meta = await env.MEDIA.head(key)
        if (!meta) return new Response('Not found', { status: 404, headers: CORS })
        return respond(meta, 416, { 'Content-Range': `bytes */${meta.size}` })
      }
      const size = obj.size
      const start = 'suffix' in r ? Math.max(0, size - r.suffix) : r.offset
      const end = 'length' in r ? Math.min(start + r.length, size) - 1 : size - 1
      if (start >= size || start > end) return respond(obj, 416, { 'Content-Range': `bytes */${size}` })
      return respond(obj, 206, { 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': String(end - start + 1) })
    }

    const obj = await env.MEDIA.get(key, { onlyIf: request.headers })
    if (!obj) return new Response('Not found', { status: 404, headers: CORS })
    if (!('body' in obj)) return respond(obj, 304) // If-None-Match matched
    return respond(obj, 200, { 'Content-Length': String(obj.size) })
  },
}
