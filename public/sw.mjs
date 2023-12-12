// sw.js

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

// Log a message when the service worker file is executed
console.log('Service Worker is executing...');

precacheAndRoute(self.__WB_MANIFEST);

// Cache assets using CacheFirst strategy
registerRoute(
  /\.(js|css|html|png|jpg|jpeg|gif|svg|ico)$/,
  new CacheFirst({
    cacheName: 'app-assets',
  })
);

// Register a route for your dynamic API request using NetworkFirst strategy
registerRoute(
  ({ url }) => url.origin === 'https://us-central1-questmap-mubas.cloudfunctions.net' && url.pathname.startsWith('/getIdsrElements'),
  new NetworkFirst({
    cacheName: 'api-data', // Name of the cache
    networkTimeoutSeconds: 5, // Timeout for network requests
    plugins: [
      // You can add plugins for more customization, if needed
      // For example, to cache responses with specific HTTP status codes:
      {
        cacheDidUpdate: async ({ cacheName, request, response }) => {
          if (response && response.status === 200) {
            // Cache successful responses with a status code of 200
            const cache = await caches.open(cacheName);
            cache.put(request, response.clone());
            console.log(`Cached: ${request.url}`);
          }
        },
      },
    ],
  })
);

// Fallback for offline pages
setCatchHandler(({ event }) => {
  if (event.request.mode === 'navigate') {
    console.log('Fallback for offline navigation:', event.request.url);
    return caches.match('/offline.html');
  }
  console.log('Fallback for other requests:', event.request.url);
  return Response.error();
});

// Log a message when the service worker has been installed
self.addEventListener('install', (event) => {
  console.log('Service Worker installed:', event);
});

// Log a message when the service worker has been activated
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated:', event);
});
