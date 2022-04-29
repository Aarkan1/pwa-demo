// A Service Workers lifecycle:
// 1. Service Worker gets registered and 'install'-event fires
// 2. The second time the user enters the page the 'activate'-event fires
// 3. The third time the user enters the page the 'fetch'-event starts working

// These steps are to prevent weird cache behavior.
// Steps gets reset when the Service Worker file changes.
// We can bypass the reload requirements by using 'skipWaiting' and 'clients.claim' like below

// 'self' is used instead of 'this' in Workers.

// listener used for pre-caching assets
self.addEventListener("install", (e) => {
    console.log("[PWA] installing");
    // start 'activate'-event immediately
    self.skipWaiting();
});

const cleanUp = async () => {
    await caches.delete("cache");
};

// listener used for cleaning up old cache
self.addEventListener("activate", (e) => {
    console.log("[PWA] activated");
    // the service workers behavior is to sleep when not working.
    // it can start sleeping in the middle of an async process.
    // waitUntil() makes sure the worker is awake until async process gets finished.
    e.waitUntil(cleanUp());
    // start 'fetch'-event immediately
    self.clients.claim();
});

// this cache-strategy is called Network-first, and does just that:
// it caches and returns a fresh response every time,
// but returns a cached version of the response when offline
const networkFirst = async (e) => {
    // fetch and cache response if online
    try {
        let res = await fetch(e.request);
        let cache = await caches.open("cache");
        // save response to cache
        await cache.put(e.request, res.clone());
        return res;
    } catch {
        // return cached response if offline
        return await caches.match(e.request);
    }
};

// listener for intercepting outgoing fetch requests,
// and here is were we handle dynamic caching
self.addEventListener("fetch", (e) => {
    // we only want to cache GET responses
    if (e.request.method !== "GET") return;
    // respondWith() works like waitUntil(), but returns something to the client
    e.respondWith(networkFirst(e));
});

// NOTE: Even if we start fetching immediately by using 'clients.claim'
// the PWA won't work offline without at least one reload.
// This is because index.html gets fetched before Service Worker is registered
