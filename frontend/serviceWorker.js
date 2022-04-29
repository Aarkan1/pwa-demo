// A Service Workers lifecycle:
// 1. Service Worker gets registered and 'install'-event fires
// 2. The second time the user enters the page the 'activate'-event fires
// 3. The third time the user enters the page the 'fetch'-event starts working

// These steps are to prevent weird cache behavior.
// Steps gets reset when the Service Worker file changes.
// We can bypass the reload requirements by using 'skipWaiting()' and 'clients.claim()' like below

// listener mostly used for pre-caching assets
addEventListener("install", (e) => {
    console.log("[PWA] installing");
    // start 'activate'-event immediately
    skipWaiting();
});

// listener mostly used for cleaning up old cache
addEventListener("activate", (e) => {
    console.log("[PWA] activating");
    // start 'fetch'-event immediately
    clients.claim();
});
