const shows = document.querySelectorAll(".show");
const enlarged = document.getElementById("enlarged");
const picture = document.getElementById("picture");
const shades = ["#bdbdbd", "#a9a9a9", "#d0d0d0", "#969696"];
let turn;

for (const show of shows) {
    const large = show.querySelector(".large");
    const photos = show.dataset.photos ? Array.from({ length: Number(show.dataset.count) }, function (_, n) {
        return "images/exhibit/" + show.dataset.photos + "/photo-" + (n + Number(show.dataset.start || 1)) + ".webp";
    }) : [];
    if (photos.length) {
        const strip = show.querySelector(".small");
        strip.replaceChildren();
        photos.forEach(function (_, n) {
            const button = document.createElement("button");
            button.type = "button";
            button.setAttribute("aria-label", "Show image " + (n + 1));
            strip.append(button);
        });
        show.classList.add("photographs");
    }
    const small = show.querySelectorAll(".small button");
    const count = photos.length || shades.length;
    let slide = 0;
    let timer;

    function display(n) {
        slide = n;
        large.style.backgroundColor = photos.length ? "transparent" : shades[slide];
        large.style.backgroundImage = photos.length ? "url('" + photos[slide] + "')" : "none";
        large.setAttribute("aria-label", "Expand " + show.dataset.title + ", image " + (slide + 1));
        small.forEach(function (button, i) {
            button.setAttribute("aria-pressed", String(i === slide));
        });
    }

    function run() {
        clearInterval(timer);
        timer = setInterval(function () {
            if (!enlarged.open) display((slide + 1) % count);
        }, 5000);
    }

    small.forEach(function (button, i) {
        button.style.backgroundColor = photos.length ? "transparent" : shades[i];
        button.style.backgroundImage = photos.length ? "url('" + photos[i] + "')" : "none";
        button.addEventListener("click", function () {
            display(i);
            run();
        });
    });

    large.addEventListener("click", function () {
        document.getElementById("show-title").textContent = show.dataset.title;
        turn = function (step) {
            display((slide + step + count) % count);
            picture.style.backgroundColor = photos.length ? "transparent" : shades[slide];
            picture.style.backgroundImage = photos.length ? "url('" + photos[slide] + "')" : "none";
            picture.setAttribute("aria-label", show.dataset.title + ", image " + (slide + 1));
            run();
        };
        turn(0);
        enlarged.showModal();
    });

    display(0);
    run();
}

document.getElementById("previous").addEventListener("click", function () {
    turn(-1);
});

document.getElementById("next").addEventListener("click", function () {
    turn(1);
});

enlarged.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        turn(event.key === "ArrowLeft" ? -1 : 1);
    }
});

document.getElementById("close").addEventListener("click", function () {
    enlarged.close();
});

enlarged.addEventListener("click", function (event) {
    if (event.target === enlarged) enlarged.close();
});
