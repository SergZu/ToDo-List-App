const cacheName = 'app-cache-v5';

const assetsUrls = [
    './offline.html',
    './562da37d6e67dc462463.png',
    './a53e6c1ad8f07dfc3b85.png',
    './b55ff10166658c2c2294.png',
    './ba0cee2f4f5d87e2e775.png',
    './bbf45acebb209809c712.png',
    './main.bundle.js',
    './runtime.bundle.js',
    './vendors.bundle.js'
];

const takeFromCache = async (request) => {
    try {
        const cached = await caches.match(request);
        if (cached) {
            return cached;     
        } else {
            const response = await fetch(request);
            const cache = await caches.open(cacheName);
            await cache.put(request.url, response.clone());
            return response
        }
    }
    catch(err) {
        console.log('Fetch error', err);
        return caches?.match('./offline.html')
    }
}

self.addEventListener('install', async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(assetsUrls);
});

self.addEventListener('fetch', (evt) => {
    evt.respondWith( takeFromCache(evt.request) )
        
})

self.addEventListener('activate', async () => {
    const cachesNames = await caches.keys();
    await Promise.all(
        cachesNames
        .filter((item) => item !== cacheName)
        .map((item) => caches.delete(item))
    )
})
