export const details = async (id) => {
    let hero;

    const fetchHero = async () => {
        let res = await fetch("/api/heroes/" + id);
        res = await res.json();
        hero = res;
    };

    const powerbar = (type, power) => {
        return /*html*/ `
        <div class="flex justify-between items-center">
            <span>${type}</span>
            <div class="rounded overflow-hidden w-60 h-3 bg-gray-200 right inline-block drop-shadow-md">
                <div class="w-[${power ? power : 0}%] h-full bg-teal-500"></div>
            </div>
        </div>
        `;
    };

    const renderHero = () => {
        const heroDiv = document.querySelector(".hero");

        heroDiv.innerHTML = /*html*/ `
        <div class="flex flex-wrap gap-5 justify-center">
            <image 
                class="w-full max-w-md md:w-80 max-h-96 object-cover rounded drop-shadow-lg mb-3" 
                src="${hero.image_url}" 
                alt="hero image"
                onerror="this.src='/src/hero-fallback.jpg'" 
            />
            <div class="w-96">
                <h1 class="text-2xl text-center md:text-left">${hero.name}</h1>

                <h2 class="text-xl pt-4">Powerstats</h2>
                ${powerbar("Intelligence", hero.intelligence)}
                ${powerbar("Strength", hero.strength)}
                ${powerbar("Speed", hero.speed)}
                ${powerbar("Durability", hero.durability)}
                ${powerbar("Power", hero.power)}
                ${powerbar("Combat", hero.combat)}

                <h2 class="text-xl pt-4">Biography</h2>
                <p>Real name: ${hero.real_name}</p>
                <p>Height: ${hero.height}</p>
                <p>Weight: ${hero.weight}</p>
                <p>Eye color: ${hero.eye_color}</p>
                <p>Hair color: ${hero.hair_color}</p>
                <p>Gender: ${hero.gender}</p>
                <p>Race: ${hero.race}</p>

                <h2 class="text-xl pt-4">First appearance</h2>
                <p>${hero.first_appearance}</p>

                <h2 class="text-xl pt-4">Group affiliation</h2>
                <p>${hero.group_affiliation}</p>

                <h2 class="text-xl pt-4">Publisher</h2>
                <p>${hero.publisher}</p>
            </div>
        </div>
        `;
    };

    const onMounted = async () => {
        await fetchHero();
        renderHero();
    };

    // start render with a loading spinner
    // to later replace with fetched hero
    const render = /*html*/ `
        <div class="hero">
            <div class='loader w-full text-center p-10'>
                <i class='bx bx-loader-alt animate-spin text-4xl leading-none font-bold text-teal-600'></i>
            </div>
        </div>
    `;

    return {
        render,
        onMounted,
    };
};
