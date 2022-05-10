// init app
import "./src/init.js";

// First check if the browser supports Service Workers
// and register the worker if it does
if ("serviceWorker" in navigator) {
    console.log("[PWA] registering service worker");
    navigator.serviceWorker.register("/serviceWorker.js");
}
