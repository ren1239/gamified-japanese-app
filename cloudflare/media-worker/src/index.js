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
    const meta = await env.MEDIA.head(key) // size + metadata; needed to answer byte ranges exactly
    if (!meta) return new Response('Not found', { status: 404, headers: CORS })

    const headers = new Headers(CORS)
    meta.writeHttpMetadata(headers)
    headers.set('ETag', meta.httpEtag)
    headers.set('Accept-Ranges', 'bytes')
    headers.set('Cache-Control', 'private, max-age=604800')
    if (!headers.has('Content-Type')) headers.set('Content-Type', match[3] === 'mp4' ? 'video/mp4' : 'image/jpeg')

    if (request.method === 'HEAD') {
      headers.set('Content-Length', String(meta.size))
      return new Response(null, { headers })
    }
    if (request.headers.get('If-None-Match') === meta.httpEtag) return new Response(null, { status: 304, headers })

    // Range: bytes=start-end | start- | -suffix  (players ask for one range at a time)
    const range = (request.headers.get('Range') ?? '').match(/^bytes=(\d*)-(\d*)$/)
    if (range && (range[1] || range[2])) {
      const size = meta.size
      let start, end
      if (range[1] === '') { start = Math.max(0, size - Number(range[2])); end = size - 1 } // last N bytes
      else { start = Number(range[1]); end = range[2] === '' ? size - 1 : Math.min(Number(range[2]), size - 1) }
      if (start >= size || start > end) {
        headers.set('Content-Range', `bytes */${size}`)
        return new Response(null, { status: 416, headers })
      }
      const obj = await env.MEDIA.get(key, { range: { offset: start, length: end - start + 1 } })
      if (!obj) return new Response('Not found', { status: 404, headers: CORS })
      headers.set('Content-Range', `bytes ${start}-${end}/${size}`)
      headers.set('Content-Length', String(end - start + 1))
      return new Response(obj.body, { status: 206, headers })
    }

    const obj = await env.MEDIA.get(key)
    if (!obj) return new Response('Not found', { status: 404, headers: CORS })
    headers.set('Content-Length', String(meta.size))
    return new Response(obj.body, { headers })
  },
}
