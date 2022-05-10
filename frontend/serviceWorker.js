// A Service Workers lifecycle:
// 1. Service Worker gets registered and 'install'-event fires
// 2. The second time the user enters the page the 'activate'-event fires
// 3. The third time the user enters the page the 'fetch'-event starts working

// These steps are to prevent weird cache behavior.
// Steps gets reset when the Service Worker file changes.
// We can bypass the reload requirements by using 'skipWaiting' and 'clients.claim' like below

// listener used for pre-caching assets
addEventListener("install", (e) => {
    console.log("[PWA] installing");
    // start 'activate'-event immediately
    skipWaiting();
});

// listener used for cleaning up old cache
addEventListener("activate", (e) => {
    console.log("[PWA] activated");
    // start 'fetch'-event immediately
    clients.claim();
});

// this cache-strategy is called Network-first, and does just that:
// it caches and returns a fresh response every time,
// but returns a cached version of the response when offline
const networkFirst = async (evt) => {
    try {
        // try to fetch response from network
        let response = await fetch(evt.request);
        let cache = await caches.open("cache");
        // save response to cache
        await cache.put(evt.request, response.clone());
        return response;
    } catch {
        // return cached response if offline
        return caches.match(evt.request);
    }
};

// listener for intercepting outgoing fetch requests,
// and here is were we handle dynamic caching
addEventListener("fetch", (evt) => {
    // we only want to cache GET responses, and let browser handle image caching
    if (
        evt.request.method !== "GET" ||
        (!evt.request.url.includes("fallback") &&
            evt.request.url.endsWith(".jpg"))
    )
        return;
    evt.respondWith(networkFirst(evt));
});

// NOTE: Even if we start fetching immediately by using 'clients.claim'
// the PWA won't work offline without at least one reload.
// This is because index.html gets fetched before Service Worker is registered
