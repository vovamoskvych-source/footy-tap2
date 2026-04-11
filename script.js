let coins = 0;
let score = 0;

let ballY = 150;
let velocity = 0;
let gravity = 0.8;

let playing = false;
let loopStarted = false;

const ball = document.getElementById("ball");
const scoreEl = document.getElementById("score");
const coinsEl = document.getElementById("coins");
const statusEl = document.getElementById("status");

const gameScreen = document.getElementById("gameScreen");
const main = document.getElementById("main");
const startScreen = document.getElementById("start");

/* OPEN */
function openGame() {
    main.style.display = "none";
    gameScreen.style.display = "block";
    reset();
}

/* CLOSE */
function closeGame() {
    main.style.display = "block";
    gameScreen.style.display = "none";
    playing = false;
    loopStarted = false;
}

/* RESET */
function reset() {
    score = 0;
    ballY = 150;
    velocity = 0;

    scoreEl.innerText = "0";
    statusEl.innerText = "";

    startScreen.style.display = "flex";

    ball.style.bottom = "150px";
}

/* START */
function startGame() {
    startScreen.style.display = "none";
    playing = true;

    if (!loopStarted) {
        loopStarted = true;
        requestAnimationFrame(loop);
    }
}

/* JUMP (СТАБИЛЬНЫЙ) */
let canJump = true;

document.addEventListener("click", () => {
    if (!playing) return;
    if (!canJump) return;

    velocity = -11;
    canJump = false;

    setTimeout(() => {
        canJump = true;
    }, 150);
});

/* LOOP */
function loop() {
    if (!loopStarted) return;

    if (playing) {
        velocity += gravity;
        ballY += velocity;

        if (ballY < 0) {
            ballY = 0;
            velocity = 0;
        }

        ball.style.bottom = ballY + "px";
    }

    requestAnimationFrame(loop);
}