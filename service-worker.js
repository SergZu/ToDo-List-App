const cacheName = 'app-cache-v1';

const assetsUrls = [
    '/index.html',
    '/offline.html',
    '/562da37d6e67dc462463.png',
    '/a53e6c1ad8f07dfc3b85.png',
    '/b55ff10166658c2c2294.png',
    '/ba0cee2f4f5d87e2e775.png',
    '/bbf45acebb209809c712.png',
    '/main.bundle.js',
    '/runtime.bundle.js',
    '/vendors.bundle.js'
];

const takeFromCache = async (request) => {
    const cached = await caches.match(request);
    return cached ?? await fetch(request)
}

self.addEventListener('install', async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(assetsUrls);
});

self.addEventListener('fetch', (evt) => {
    evt.respondWith(
        caches.match(evt.request)
            .then(function(response) {
            if (response) {
                return response;     
            } else {
                return fetch(evt.request)     
                    .then(function(res) {
                        return caches.open(cacheName)
                    .then(function(cache) {
                  cache.put(evt.request.url, res.clone());    
                  return res;   
                })
            })
            .catch(function(err) {       
                console.log('Fetch error', err);
                return cache.match('/offline.html')
            });
        }
      })
        
    );
})

self.addEventListener('activate', async () => {
    const cachesNames = await caches.keys();
    await Promise.all(
        cachesNames
        .filter((item) => item !== cacheName)
        .map((item) => caches.delete(item))
    )
})