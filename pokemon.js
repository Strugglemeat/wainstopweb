const grid = document.getElementById("pokemon-grid");
const meter = document.getElementById("caught");
let caught = 0;

try {
    const saved = Number(localStorage.getItem("shinies-caught"));
    if (Number.isSafeInteger(saved) && saved >= 0) caught = saved;
} catch {}

meter.textContent = caught;

for (let n = 1; n <= 151; n++) {
    const sprite = document.createElement("img");
    sprite.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/" + n + ".png";
    sprite.alt = "Pokémon " + n;
    sprite.width = 96;
    sprite.height = 96;
    if (Math.random() < 1 / 8192) {
        sprite.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/shiny/" + n + ".png";
        sprite.alt = "Shiny Pokémon " + n;
        sprite.setAttribute("role", "button");
        sprite.setAttribute("aria-label", "Catch shiny Pokémon " + n);
        sprite.tabIndex = 0;
        let taken = false;

        function catchOne() {
            if (taken) return;
            taken = true;
            caught++;
            meter.textContent = caught;
            sprite.style.visibility = "hidden";
            sprite.tabIndex = -1;
            sprite.setAttribute("aria-hidden", "true");
            try {
                localStorage.setItem("shinies-caught", String(caught));
            } catch {}
        }

        sprite.addEventListener("click", catchOne);
        sprite.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                catchOne();
            }
        });
    }
    grid.append(sprite);
}
