let coins = 0;
let score = 0;

let ballY = 150;
let velocity = 0;
let gravity = 0.8;

let playing = false;
let loopStarted = false;

let obstacles = [];
let timer = 0;

const ball = document.getElementById("ball");
const scoreEl = document.getElementById("score");
const coinsEl = document.getElementById("coins");

const gameScreen = document.getElementById("gameScreen");
const main = document.getElementById("main");
const startScreen = document.getElementById("startScreen");

function openGame() {
    main.style.display = "none";
    gameScreen.style.display = "block";
    reset();
}

function closeGame() {
    main.style.display = "block";
    gameScreen.style.display = "none";
    playing = false;
    loopStarted = false;
}

function reset() {
    score = 0;
    ballY = 150;
    velocity = 0;
    timer = 0;

    obstacles.forEach(o => o.remove());
    obstacles = [];

    scoreEl.innerText = "0";
    startScreen.style.display = "flex";

    ball.style.bottom = "150px";
}

function startGame() {
    startScreen.style.display = "none";
    playing = true;

    velocity = 0;

    if (!loopStarted) {
        loopStarted = true;
        requestAnimationFrame(loop);
    }
}

let canJump = true;

document.addEventListener("click", () => {
    if (!playing) return;
    if (!canJump) return;

    velocity = -11;
    canJump = false;

    setTimeout(() => canJump = true, 150);
});

function loop() {
    if (!loopStarted) return;

    if (playing) {

        velocity += gravity;

        if (velocity > 12) velocity = 12;
        if (velocity < -12) velocity = -12;

        ballY += velocity;

        if (ballY < 0) {
            ballY = 0;
            velocity = 0;
        }

        if (ballY > 400) {
            ballY = 400;
            velocity = 0;
        }

        ball.style.bottom = ballY + "px";

        timer++;
        if (timer > 90) {
            spawnObstacle();
            timer = 0;
        }

        for (let i = obstacles.length - 1; i >= 0; i--) {
            let obs = obstacles[i];

            let x = parseInt(obs.style.left);
            x -= 6;
            obs.style.left = x + "px";

            if (x < 140 && x > 80 && ballY < 90) {
                gameOver();
            }

            if (x < -60) {
                obs.remove();
                obstacles.splice(i, 1);
                score++;
                scoreEl.innerText = score;
            }
        }
    }

    requestAnimationFrame(loop);
}

function spawnObstacle() {
    let obs = document.createElement("div");
    obs.className = "obstacle";
    obs.style.left = window.innerWidth + "px";
    gameScreen.appendChild(obs);
    obstacles.push(obs);
}

function gameOver() {
    playing = false;
    startScreen.style.display = "flex";
}