// init router
import "./router.js";

const backButton = document.querySelector("#back-button");
const upButton = document.querySelector("#up-button");

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

if ("serviceWorker" in navigator) {
    console.log("[PWA] register service worker");
    navigator.serviceWorker.register("/serviceWorker.js");
}
