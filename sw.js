/* sw.js — cache-first, so the installed app opens without the network.
   Bump VERSION (and APP_VERSION in index.html) on every ship; a stale worker
   would keep serving the old app otherwise. */
const VERSION = '6';
const CACHE = 'filler-v' + VERSION;
/* Pinned CDN files never change, so they live in their own cache that survives a ship. */
const CDN_CACHE = 'filler-cdn';
const FILES = ['./', './index.html', './manifest.webmanifest',
  './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];
/* The libraries and handwriting fonts come from CDNs; they are cached the first time they load. */
const CDN = /^https:\/\/(cdnjs\.cloudflare\.com|unpkg\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;

/* Every file is fetched past the browser's own cache: GitHub Pages lets a
   file live there for ten minutes. */
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE)
    .then((c) => Promise.all(FILES.map((f) => fetch(f, { cache: 'reload' }).then((r) => {
      if (!r.ok) throw new Error(f + ' ' + r.status);
      return c.put(f, r);
    }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    /* Only Filler's own old caches: Tally, Slate and the others share this site and its cache storage. */
    .then((keys) => Promise.all(keys.filter((k) => /^(pdf-)?filler-v/.test(k) && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;
  if (CDN.test(url)) {
    // Pinned versions never change: cache first, network once.
    e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((r) => {
      if (r && (r.ok || r.type === 'opaque')) { const copy = r.clone(); caches.open(CDN_CACHE).then((c) => c.put(e.request, copy)); }
      return r;
    })));
    return;
  }
  if (!url.startsWith(self.location.origin)) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => {
    if (hit) {
      e.waitUntil(fetch(e.request)
        .then((r) => (r && r.ok ? caches.open(CACHE).then((c) => c.put(e.request, r)) : null))
        .catch(() => {}));
      return hit;
    }
    return fetch(e.request).catch(() => caches.match('./index.html'));
  }));
});
