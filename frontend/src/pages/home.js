import { pushRoute } from "../router.js";

const heroCard = (hero) => /*html*/ `
    <div 
        class="card md:mx-2 mb-4 shadow-lg rounded max-w-sm w-full cursor-pointer text-center overflow-hidden" 
        data-id="${hero.id}">
        <image 
            class="w-full h-60 object-cover" 
            src="${hero.image_url}" 
            alt="hero image"
            onerror="this.src='/assets/hero-fallback.jpg'" 
        />
        <h2 class="text-xl p-2">${hero.name}</h2>
    </div>
`;

export const home = async () => {
    let page = 0;
    let heroesList = [];
    let list;
    let observer;
    let searchForm;
    let searchInput;
    let loader;

    const toggleLoader = (toggle) => {
        loader.classList.toggle("hidden", !toggle);
    };

    const fetchHeroes = async () => {
        if (searchInput) return;
        toggleLoader(true);
        let heroes = await fetch("/api/heroes?page=" + page++);
        heroes = await heroes.json();
        toggleLoader(false);
        // append fetched heroes to the DOM
        list.insertAdjacentHTML("beforeEnd", heroes.map(heroCard).join(""));
        heroesList = heroesList.concat(heroes);
    };

    const searchHeroes = async (name) => {
        toggleLoader(true);
        let heroes = await fetch("/api/heroes/search/" + name);
        heroes = await heroes.json();
        toggleLoader(false);

        list.innerHTML = heroes.map(heroCard).join("");
        heroesList = heroes;
    };

    const clickedHero = (e) => {
        const card = e.target.closest(".card");
        if (!card) return;

        const id = card.dataset.id;
        pushRoute("/hero/" + id);
    };

    const searchHero = (e) => {
        e.preventDefault();
        // blur to exit mobile keyboard
        e.target[0].blur();
        searchInput = e.target[0].value;
        if (searchInput) {
            // add new search to URL history
            pushRoute("/", "?search=" + searchInput);
            searchHeroes(searchInput);
        } else {
            // reset page and DOM list before fetching heroes again
            pushRoute("/");
            page = 0;
            list.innerHTML = "";
            fetchHeroes();
        }
    };

    // must start listeners after route gets mounted,
    // else the render won't be injected in the DOM in time
    const onMounted = async () => {
        // observe if the last div gets intersected,
        // and fetch next page of heroes if it does
        observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    fetchHeroes();
                }
            },
            {
                rootMargin: "300px",
            }
        );

        // start listeners
        loader = document.querySelector(".loader");
        list = document.querySelector("#heroes-list");
        searchForm = document.querySelector(".search-form");
        list.addEventListener("click", clickedHero);
        searchForm.addEventListener("submit", searchHero);

        // see if there's an ongoing search in URL params
        const searchParams = new URLSearchParams(location.search).get("search");
        if (searchParams) {
            searchInput = searchParams;
            document.querySelector("#search").value = searchParams;
            await searchHeroes(searchParams);
        } else {
            await fetchHeroes();
        }

        // wait to observe next page 'til heroes been fetched
        // to prevent triggering to early
        observer.observe(document.querySelector("#next-page"));
    };

    // cleanup listeners
    const onUnmount = () => {
        observer.disconnect();
        list.removeEventListener("click", clickedHero);
        searchForm.removeEventListener("submit", searchHero);
    };

    const render = /*html*/ `
        <div class="flex justify-center flex-col">
            <form class='search-form border-2 rounded max-w-md w-full mx-auto flex items-center pr-2'>
                <input id="search"
                    placeholder="search hero" 
                    autocomplete='off'
                    class="p-2 flex-1 focus:outline-none">
                <button>
                    <i class='bx bx-search text-2xl cursor-pointer text-gray-500 hover:text-teal-600'></i>
                </button>
            </form>
            <div id="heroes-list" class="flex flex-wrap justify-center pt-4"></div>
            <div class='loader w-full text-center p-5 hidden'>
                <i class='bx bx-loader-alt animate-spin text-4xl leading-none font-bold text-teal-600'></i>
            </div>
            <div id="next-page"></div>
        </div>
    `;

    return {
        render,
        onMounted,
        onUnmount,
    };
};
