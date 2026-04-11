document.addEventListener("DOMContentLoaded", () => {

let coins = 0;
let score = 0;

let ballY = 150;
let velocity = 0;

const gravity = 0.8;
const jumpPower = -11;

let playing = false;
let loopStarted = false;

let obstacles = [];
let timer = 0;

/* элементы */
const ball = document.getElementById("ball");
const scoreEl = document.getElementById("score");
const coinsEl = document.getElementById("coins");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const main = document.getElementById("main");
const menu = document.getElementById("menu");

/* OPEN GAME */
window.openGame = function () {
    if (!gameScreen  !main  !menu) {
        console.log("❌ не найдены элементы");
        return;
    }

    main.style.display = "none";
    menu.style.display = "none";
    gameScreen.style.display = "block";
    resetGame();
};

/* CLOSE GAME */
window.closeGame = function () {
    main.style.display = "block";
    menu.style.display = "flex";
    gameScreen.style.display = "none";

    playing = false;
    loopStarted = false;
};

/* RESET */
function resetGame() {
    score = 0;
    ballY = 150;
    velocity = 0;
    timer = 0;

    obstacles.forEach(o => o.remove());
    obstacles = [];

    scoreEl.innerText = "0";
    startScreen.style.display = "flex";

    ball.style.bottom = ballY + "px";
}

/* START */
window.startGame = function () {
    startScreen.style.display = "none";
    playing = true;

    velocity = 0;

    if (!loopStarted) {
        loopStarted = true;
        requestAnimationFrame(loop);
    }
};

/* JUMP */
let canJump = true;

document.addEventListener("click", () => {
    if (!playing) return;
    if (!canJump) return;

    velocity = jumpPower;

    canJump = false;
    setTimeout(() => canJump = true, 150);
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
                coins++;

                scoreEl.innerText = score;
                coinsEl.innerText = coins + " FC";
            }
        }
    }

    requestAnimationFrame(loop);
}

/* SPAWN */
function spawnObstacle() {
    let obs = document.createElement("div");
    obs.className = "obstacle";
    obs.style.left = window.innerWidth + "px";
    gameScreen.appendChild(obs);
    obstacles.push(obs);
}

/* GAME OVER */
function gameOver() {
    playing = false;
    startScreen.style.display = "flex";
}

});