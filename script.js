const main = document.getElementById("main");
const gameScreen = document.getElementById("gameScreen");
const ball = document.getElementById("ball");
const scoreEl = document.getElementById("score");

let ballY = 150;
let velocity = 0;

const gravity = 0.8;
const jumpPower = -11;

let playing = false;
let loopStarted = false;

let score = 0;

/* OPEN */
function openGame() {
    main.style.display = "none";
    gameScreen.style.display = "block";

    reset();
}

/* START */
function startGame() {
    document.getElementById("startScreen").style.display = "none";
    playing = true;

    if (!loopStarted) {
        loopStarted = true;
        requestAnimationFrame(loop);
    }
}

/* RESET */
function reset() {
    ballY = 150;
    velocity = 0;
    score = 0;
    playing = false;

    ball.style.bottom = ballY + "px";
    scoreEl.innerText = "0";

    document.getElementById("startScreen").style.display = "flex";
}

/* JUMP */
document.addEventListener("click", () => {
    if (!playing) return;
    velocity = jumpPower;
});

/* LOOP */
function loop() {
    if (!loopStarted) return;

    if (playing) {

        velocity += gravity;
        ballY += velocity;

        // земля
        if (ballY < 0) {
            ballY = 0;
            velocity = 0;
        }

        ball.style.bottom = ballY + "px";

        score++;
        scoreEl.innerText = score;
    }

    requestAnimationFrame(loop);
}