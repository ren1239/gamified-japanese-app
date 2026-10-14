// Web-push handlers, imported into the Workbox-generated service worker (vite.config.js → workbox.importScripts).
self.addEventListener('push', (event) => {
  let data = {}
  try { data = event.data ? event.data.json() : {} } catch { data = { body: event.data && event.data.text() } }
  const title = data.title || '日本語ToGo'
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || 'Time for a quick Japanese lesson!',
      icon: '/icon-192.png',
      badge: '/favicon-32.png',
      tag: data.tag || 'nihongo',
      renotify: false,
      data: { url: data.url || '/' },
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = new URL((event.notification.data && event.notification.data.url) || '/', self.location.origin).href
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    for (const client of all) {
      if (new URL(client.url).origin === self.location.origin) {
        await client.focus()
        if ('navigate' in client) await client.navigate(url)
        return
      }
    }
    await self.clients.openWindow(url)
  })())
})
