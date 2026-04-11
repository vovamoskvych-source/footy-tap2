console.log("JS OK");

const main = document.getElementById("main");
const gameScreen = document.getElementById("gameScreen");
const ball = document.getElementById("ball");

let ballY = 150;
let velocity = 0;

const gravity = 0.8;
const jumpPower = -10;

let playing = false;
let loopStarted = false;

/* открыть */
function openGame() {
    main.style.display = "none";
    gameScreen.style.display = "block";

    ballY = 150;
    velocity = 0;
    ball.style.bottom = ballY + "px";
}

/* закрыть */
function closeGame() {
    main.style.display = "block";
    gameScreen.style.display = "none";

    playing = false;
    loopStarted = false;
}

/* ПРЫЖОК */
function jump() {
    if (!playing) {
        playing = true;

        if (!loopStarted) {
            loopStarted = true;
            requestAnimationFrame(loop);
        }
    }

    velocity = jumpPower;
}

/* 🔥 ТОЛЬКО ОДНО СОБЫТИЕ */
document.addEventListener("touchstart", jump);

/* loop */
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