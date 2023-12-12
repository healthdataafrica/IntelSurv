// sw.js

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { CacheFirst, NetworkOnly } from 'workbox-strategies';

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
            }
          },
        },
      ],
    })
  );

// Fallback for offline pages
setCatchHandler(({ event }) => {
  if (event.request.mode === 'navigate') {
    return caches.match('/offline.html');
  }
  return Response.error();
});
