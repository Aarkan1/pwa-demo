const installButton = document.querySelector("#install-button");

// register service worker
const register = async () => {};
register();

// display install button instead of default install prompt
window.addEventListener("beforeinstallprompt", (evt) => {});

// display install prompt on install button click
installButton.addEventListener("click", async () => {
    console.log("Install PWA button clicked");

    installButton.classList.add("invisible");
});
