const names = document.getElementById("names");
const folks = Array.from(names.children);

for (let n = folks.length - 1; n > 0; n--) {
    const pick = Math.floor(Math.random() * (n + 1));
    [folks[n], folks[pick]] = [folks[pick], folks[n]];
}

names.append(...folks);
