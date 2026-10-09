const shows = document.querySelectorAll(".show");
const enlarged = document.getElementById("enlarged");
const picture = document.getElementById("picture");
const shades = ["#bdbdbd", "#a9a9a9", "#d0d0d0", "#969696"];
let turn;

for (const show of shows) {
    const large = show.querySelector(".large");
    const small = show.querySelectorAll(".small button");
    let slide = 0;
    let timer;

    function display(n) {
        slide = n;
        large.style.backgroundColor = shades[slide];
        large.setAttribute("aria-label", "Expand " + show.dataset.title + ", image " + (slide + 1));
        small.forEach(function (button, i) {
            button.setAttribute("aria-pressed", String(i === slide));
        });
    }

    function run() {
        clearInterval(timer);
        timer = setInterval(function () {
            if (!enlarged.open) display((slide + 1) % shades.length);
        }, 5000);
    }

    small.forEach(function (button, i) {
        button.style.backgroundColor = shades[i];
        button.addEventListener("click", function () {
            display(i);
            run();
        });
    });

    large.addEventListener("click", function () {
        turn = function (step) {
            display((slide + step + shades.length) % shades.length);
            picture.style.backgroundColor = shades[slide];
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
