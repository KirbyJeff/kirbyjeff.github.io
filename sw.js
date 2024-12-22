const CACHE_NAME = 'bitburner-android';

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = [
  '/dist/*/*/*/*/*/*',
  '/index.html',
  '/manifest.json',
  '/.well-known/*',
  '/sw.js'
]

// Listener for the install event - pre-caches our assets list on service worker install.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(PRECACHE_ASSETS);
    })());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
          return cachedResponse;
      } 
      return fetch(event.request);
  })());
});
