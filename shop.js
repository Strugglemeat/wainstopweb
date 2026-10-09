const goods = document.querySelector(".goods");
const wares = Array.from(goods.children);

for (let n = wares.length - 1; n > 0; n--) {
    const pick = Math.floor(Math.random() * (n + 1));
    [wares[n], wares[pick]] = [wares[pick], wares[n]];
}

goods.append(...wares);

const medium = document.getElementById("medium");
const artist = document.getElementById("artist");
medium.value = "";
artist.value = "";

function sift() {
    for (const ware of wares) {
        const tags = ware.dataset.tags.split(" ");
        ware.hidden = (medium.value !== "" && !tags.includes(medium.value)) ||
            (artist.value !== "" && !tags.includes(artist.value));
    }
    goods.scrollTop = 0;
}

medium.addEventListener("change", sift);
artist.addEventListener("change", sift);
