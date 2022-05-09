// router variables
let globalRoutes;
let rootElement;
let oldRoute = null;
let oldUrl = "";
const regexMapping = new Map();

// map route to regex
const routeToRegex = (route) =>
    new RegExp("^" + route.replace(/:[-%\w]+/g, "([-%\\w]+)") + "$");

// map keys and values from matched route
const getParams = (match) => {
    const values = match.match.slice(1);
    const keys = Array.from(match.route.matchAll(/:([-%\w]+)/g)).map(
        (res) => res[1]
    );
    return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

// get match and original route from matching regex
const matchingRoute = (route) => {
    for (let [reg, r] of regexMapping.entries()) {
        const match = route.match(reg);
        if (match) {
            return { match, route: r };
        }
    }
};

// soft route changes
export const updateRoute = async (route, params = "") => {
    if (oldUrl === route + params) return;
    oldUrl = route + params;

    // unmount old route before changing to a new one.
    // this makes it possible to cleanup listeners, etc
    if (oldRoute && oldRoute.onUnmount) oldRoute.onUnmount();

    let newRoute;
    const match = matchingRoute(route);
    if (!match) {
        // render 404 route if non are matching
        newRoute = await globalRoutes[404]();
    } else {
        newRoute = await globalRoutes[match.route](getParams(match));
    }

    oldRoute = newRoute;
    // render the new route
    rootElement.innerHTML = newRoute.render;
    // and trigger the new route onMounted-function
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
export const initRouter = (routes, root) => {
    if (globalRoutes) throw new Error("Router already initialized!");
    globalRoutes = routes;

    // create regex patterns for each route
    Object.keys(routes).forEach((key) => {
        regexMapping.set(routeToRegex(key), key);
    });

    if (root) {
        rootElement = root;
    } else {
        rootElement = document.createElement("div");
        rootElement.id = "router";
        document.body.appendChild(rootElement);
    }

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
