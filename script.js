alert("JS ЗАПУЩЕН");

const ball = document.getElementById("ball");

let ballY = 150;
let velocity = 0;

const gravity = 0.8;
const jumpPower = -10;

let playing = true;

/* 🔥 ПРЫЖОК */
function jump() {
    alert("ПРЫЖОК СРАБОТАЛ"); // <--- ВАЖНО

    velocity = jumpPower;
}

/* 🔥 СОБЫТИЕ НА ВСЮ СТРАНИЦУ */
document.body.addEventListener("click", jump);
document.body.addEventListener("touchstart", jump);

/* LOOP */
function loop() {

    velocity += gravity;
    ballY += velocity;

    if (ballY < 0) {
        ballY = 0;
        velocity = 0;
    }

    ball.style.bottom = ballY + "px";

    requestAnimationFrame(loop);
}

loop();