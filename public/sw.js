// sw.js

// Log a message when the service worker file is executed
console.log('Service Worker is executing...');

// Include Workbox directly using script tags
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.1.1/workbox-sw.js');

// Precache and route assets
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Cache assets using CacheFirst strategy
workbox.routing.registerRoute(
  /\.(js|css|html|png|jpg|jpeg|gif|svg|ico)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'app-assets',
  })
);

// Register a route for dynamic API requests using NetworkFirst strategy
workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://us-central1-questmap-mubas.cloudfunctions.net' && url.pathname.startsWith('/getIdsrElements'),
  new workbox.strategies.NetworkFirst({
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
workbox.routing.setCatchHandler(({ event }) => {
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
