import { home } from "./pages/home.js";
import { details } from "./pages/details.js";

// route to component mapping
const routes = {
    "/": home,
    "/hero": details,
};

const root = document.querySelector("#router");

let oldRoute = null;
let oldUrl = "";

// soft route changes
export const updateRoute = async (route, params = "") => {
    if (oldUrl === route + params) return;
    oldUrl = route + params;

    // unmount old route before changing to a new one.
    // this makes it possible to cleanup listeners, etc
    if (oldRoute && oldRoute.onUnmount) oldRoute.onUnmount();

    let newRoute;
    // extract id from path params
    if (route.startsWith("/hero")) {
        const id = route.replace("/hero/", "");
        newRoute = await routes["/hero"](id);
    } else {
        newRoute = await routes[route]();
    }
    oldRoute = newRoute;
    // render the new route
    root.innerHTML = newRoute.render;
    // and trigger the new routes onMounted-function
    newRoute.onMounted && newRoute.onMounted();
};

// change route and push to history
export const pushRoute = async (route, params = "") => {
    if (oldUrl === route + params) return;
    history.pushState(null, null, route + params);
    updateRoute(route, params);
};

// kick off router by hijacking all <a>-links and
// do soft route changes based on href.
// also listen on popstate to handle soft route changes
// when user traverse the history
const initRouter = () => {
    updateRoute(location.pathname);

    window.addEventListener("popstate", (e) => {
        e.preventDefault();
        updateRoute(location.pathname, location.search);
    });

    document.body.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (a) {
            const link = a.href.replace(location.origin, "");
            if (!link.startsWith("/")) return;
            e.preventDefault();
            pushRoute(link);
        }
    });
};
initRouter();
