let coins = 0;
let pos = 0;
let direction = 1;

const slider = document.getElementById("slider");
const coinText = document.getElementById("coins");
const player = document.querySelector("#player img");

setInterval(() => {
    pos += direction * 2;

    if (pos >= 95) direction = -1;
    if (pos <= 0) direction = 1;

    slider.style.left = pos + "%";
}, 10);

function hit() {
    player.classList.add("kick");

    setTimeout(() => {
        player.classList.remove("kick");
    }, 200);

    if (pos >= 45 && pos <= 55) {
        coins += 1;
    } else if (pos >= 35 && pos <= 65) {
        coins += 0.3;
    }

    coinText.innerText = coins.toFixed(1);
}
