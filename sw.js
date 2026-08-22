const CACHE_NAME = 'anamnese-celma-v1';
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './pdf.js',
  './manifest.json',
  './icons/logo-horizontal.svg',
  './icons/logo-icon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // A biblioteca jsPDF (CDN) segue direto para a rede; o restante do app shell usa cache-first.
  if (req.url.includes('cdnjs.cloudflare.com')) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone)).catch(() => {});
        return res;
      }).catch(() => cached);
    })
  );
});
