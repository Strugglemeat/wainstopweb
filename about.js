const names = document.getElementById("names");
const folks = Array.from(names.children);

for (let n = folks.length - 1; n > 0; n--) {
    const pick = Math.floor(Math.random() * (n + 1));
    [folks[n], folks[pick]] = [folks[pick], folks[n]];
}

names.append(...folks);

const featured = document.querySelector(".featured");
const places = Array.from(featured.children).slice(1);

for (let n = places.length - 1; n > 0; n--) {
    const pick = Math.floor(Math.random() * (n + 1));
    [places[n], places[pick]] = [places[pick], places[n]];
}

featured.append(...places);
