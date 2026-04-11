let coins = 0;
let score = 0;

let ballY = 150;
let velocity = 0;
let gravity = 0.8;

let playing = false;
let gameRunning = false;

let obstacles = [];
let timer = 0;

const ball = document.getElementById("ball");
const scoreEl = document.getElementById("score");
const coinsEl = document.getElementById("coins");
const statusEl = document.getElementById("status");

const gameScreen = document.getElementById("gameScreen");
const main = document.getElementById("main");
const menu = document.getElementById("menu");
const startScreen = document.getElementById("startScreen");

/* OPEN */
function openGame() {
    main.style.display = "none";
    menu.style.display = "none";
    gameScreen.style.display = "block";

    resetGame();
}

/* CLOSE */
function closeGame() {
    main.style.display = "block";
    menu.style.display = "flex";
    gameScreen.style.display = "none";

    playing = false;
    gameRunning = false;
}

/* RESET */
function resetGame() {
    score = 0;
    ballY = 150;
    velocity = 0;
    timer = 0;

    obstacles.forEach(o => o.remove());
    obstacles = [];

    scoreEl.innerText = "0";
    statusEl.innerText = "";

    startScreen.style.display = "flex";

    // 🔥 ВАЖНО: принудительно ставим позицию
    ball.style.bottom = "150px";
}

/* START */
function startGame() {
    startScreen.style.display = "none";

    playing = true;

    if (!gameRunning) {
        gameRunning = true;
        requestAnimationFrame(loop);
    }
}

/* JUMP */
let canJump = true;

document.addEventListener("click", (e) => {
    if (!playing) return;
    if (!canJump) return;

    velocity = -11;
    canJump = false;

    setTimeout(() => {
        canJump = true;
    }, 160);
});

/* LOOP */
function loop() {
    if (!gameRunning) return;

    if (playing) {

        velocity += gravity;
        ballY += velocity;

        if (ballY < 0) {
            ballY = 0;
            velocity = 0;
        }

        // 🔥 ЖЁСТКИЙ ФИКС (главное)
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

            let hitX = x < 140 && x > 80;
            let hitY = ballY < 90;

            if (hitX && hitY) {
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
    statusEl.innerText = "❌ Game Over";
}