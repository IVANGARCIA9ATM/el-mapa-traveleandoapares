const CACHE_NAME = 'el-mapa-cache-v2';
const URLS_TO_CACHE = [
  './gemini-code-1785779511133.html',
  './manifest.json',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  './'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => { if (!cacheWhitelist.includes(key)) return caches.delete(key); })
    ))
  );
});
