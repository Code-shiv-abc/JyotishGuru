self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // A simple pass-through fetch handler for now to satisfy PWA requirements
  // In a real production scenario, you'd add caching logic here.
  event.respondWith(fetch(event.request));
});
