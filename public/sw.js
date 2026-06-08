const CACHE_NAME = 'vgm-v2'
const PRECACHE = [
  '/',
  '/manifest.json',
  '/favicon.svg',
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  // Delete ALL old caches (including vgm-v1 which cached bad JS files)
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Paths that should NEVER be cached by the service worker
function shouldSkip(url) {
  const p = url.pathname
  return (
    p.startsWith('/.vite/')       ||  // Vite pre-bundled deps
    p.startsWith('/node_modules/') ||  // raw node_modules
    p.startsWith('/src/')          ||  // source files (dev HMR)
    p.includes('?v=')              ||  // versioned Vite chunks
    p.includes('?t=')              ||  // Vite HMR timestamps
    p.endsWith('.map')                 // source maps
  )
}

self.addEventListener('fetch', (e) => {
  const { request } = e
  const url = new URL(request.url)

  // Skip non-GET
  if (request.method !== 'GET') return

  // Skip cross-origin except Google Fonts
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts.g')) return

  // Skip Vite internals and dev-only files — always go to network
  if (shouldSkip(url)) return

  // Navigation: network-first, fall back to cached shell
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request).catch(() => caches.match('/'))
    )
    return
  }

  // Static assets only (images, fonts, icons) — cache-first
  if (url.pathname.match(/\.(png|jpg|jpeg|webp|avif|svg|woff2?|ico)$/)) {
    e.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached
        return fetch(request).then(res => {
          const clone = res.clone()
          caches.open(CACHE_NAME).then(c => c.put(request, clone))
          return res
        })
      })
    )
  }
  // Everything else (JS, CSS from Vite) — always network, never cache in SW
})
