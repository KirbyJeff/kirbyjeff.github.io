// Files to cache
const cacheName = 'bitburner-android';
const appShellFiles = [
  '/*/*/*/*/*/*/*',
];
const cache = caches.open(cacheName);

// Installing Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('`load`', () => {
  navigator.serviceWorker.register('sw.js', { scope:'./' })
      .then((registration) => {
          console.log('Registration completed successfully',registration);
          e.waitUntil((async () => {
          console.log('[Service Worker] Caching all: app shell and content');
          await cache.addAll(contentToCache);
          })());
      })
      .catch((error) => {
          console.log('Registration failed', error);
      });
})}

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
    // Cache http and https only, skip unsupported chrome-extension:// and file://...
    if (!(
       e.request.url.startsWith('http:') || e.request.url.startsWith('https:')
    )) {
        return; 
    }

  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});
