/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

// Precache all assets injected by vite-plugin-pwa
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// Navigation requests: serve app shell from cache or offline page on failure
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match('/offline.html').then(
          (cached) => cached ?? new Response('Offline', { status: 503 })
        )
      )
    );
  }
});
