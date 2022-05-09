import { initRouter } from "./router.js";
// init Progressive Web App features
import "./initPWA.js";

import { home } from "./pages/home.js";
import { details } from "./pages/details.js";

// init router with route to component mapping
initRouter(
    {
        "/": home,
        "/hero/:id": details,
        "/hero/:id/search/:name": details,
        404: () => ({ render: "Page missing" }),
    },
    document.querySelector("#router")
);

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
