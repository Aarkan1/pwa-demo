// init router
import "./router.js";

const backButton = document.querySelector("#back-button");
const upButton = document.querySelector("#up-button");
const installButton = document.querySelector("#install-button");
const offlineSnackbar = document.querySelector(".offline-snackbar");

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

backButton.addEventListener("click", () => {
    history.back();
});

window.addEventListener("scroll", () => {
    const toggle = window.scrollY >= 300;
    upButton.classList.toggle("opacity-100", toggle);
    upButton.classList.toggle("cursor-pointer", toggle);
});

upButton.addEventListener("click", () => {
    if (window.scrollY < 300) return;
    window.scrollTo(0, 0);
});

installButton.addEventListener("click", async () => {
    console.log("Install PWA button clicked");
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
    installButton.classList.add("invisible");
});

const registerServiceWorker = async () => {
    // the "Progressive" way to add PWA features
    // is to always check if the tech works in the browser
    if ("serviceWorker" in navigator) {
        try {
            // register service worker from frontend root
            await navigator.serviceWorker.register("/serviceWorker.js");
            console.log("[PWA] service worker registered");
        } catch (err) {
            console.log("[PWA] service worker not registered", err);
        }
    }
};
registerServiceWorker();

window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can install the PWA
    installButton.classList.remove("invisible");
    // Optionally, send analytics event that PWA install promo was shown.
    console.log(`'beforeinstallprompt' event was fired.`);
});

// display a snackbar if client is offline
const handleNetworkStatus = () => {
    if (navigator.onLine) {
        offlineSnackbar.classList.remove("opacity-100");
    } else {
        offlineSnackbar.classList.add("opacity-100");
    }
};

window.addEventListener("online", handleNetworkStatus);
window.addEventListener("offline", handleNetworkStatus);
