const floor = document.getElementById("tiles");
const pictures = ["tiles/favicon.png"];
const giant = Math.random() < 0.15;
floor.classList.toggle("giant", giant);

function lay() {
    const across = Math.ceil(window.innerWidth / 40);
    const down = Math.ceil(window.innerHeight / 40);
    floor.style.gridTemplateColumns = "repeat(" + across + ", 1fr)";
    floor.style.gridTemplateRows = "repeat(" + down + ", 1fr)";
    const squares = document.createDocumentFragment();

    for (let n = 0; n < across * down; n++) {
        const square = document.createElement("div");
        const picture = document.createElement("img");
        picture.src = pictures[Math.floor(Math.random() * pictures.length)];
        picture.alt = "";
        if (giant) {
            picture.style.height = window.innerHeight + "px";
            picture.style.left = window.innerWidth / 2 - (n % across) * window.innerWidth / across + "px";
            picture.style.top = -Math.floor(n / across) * window.innerHeight / down + "px";
        }
        square.addEventListener("pointerenter", function () {
            square.classList.add("seen");
        });
        square.append(picture);
        squares.append(square);
    }

    floor.replaceChildren(squares);
}

lay();
window.addEventListener("resize", lay);

let trail = null;

function reveal(x, y) {
    const square = document.elementFromPoint(x, y);
    if (square && square.parentElement === floor) {
        square.classList.add("seen");
    }
}

floor.addEventListener("pointerdown", function (event) {
    trail = { x: event.clientX, y: event.clientY };
    reveal(trail.x, trail.y);
});

floor.addEventListener("pointermove", function (event) {
    if (!trail) return;
    const x = event.clientX;
    const y = event.clientY;
    const steps = Math.max(1, Math.ceil(Math.hypot(x - trail.x, y - trail.y) / 10));

    for (let n = 1; n <= steps; n++) {
        reveal(trail.x + (x - trail.x) * n / steps, trail.y + (y - trail.y) * n / steps);
    }

    trail = { x, y };
});

function stop() {
    trail = null;
}

window.addEventListener("pointerup", stop);
window.addEventListener("pointercancel", stop);
