const CACHE_NAME = 'cep-app-cache-v1';
 
// Lista de recursos a serem armazenados em cache
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'icon1.png',
];
 
// Evento de instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache)
          .catch((error) => {
            console.error('Failed to cache one or more resources:', error);
          });
      })
  );
});
 
 
// Evento de ativação do Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
 
// Evento fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});


// self.addEventListener('install', event => {
//     event.waitUntil(
//         caches.open('movie-app-cache').then(cache => {
//             return cache.addAll([
//                 '/',
//                 '/index.html',
//                 '/images/Icon.png',
//                 '/css/style.css',
//                 '/js/app.js',
//                 '/manifest.json',
//                 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
//             ]);
//         })
//     );
//  });
  
//  self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request).then(response => {
//             return response || fetch(event.request);
//         })
//     );
//  });