const ball = document.getElementById("ball");
const tapZone = document.getElementById("tapZone");

let ballY = 150;
let velocity = 0;

const gravity = 0.8;
const jumpPower = 12; // вверх

let playing = true;

/* ПРЫЖОК */
function jump() {
    velocity = jumpPower;
}

/* только одно событие */
tapZone.addEventListener("click", jump);

/* LOOP */
function loop() {

    velocity -= gravity;   // гравитация вниз
    ballY += velocity;

    // земля
    if (ballY < 0) {
        ballY = 0;
        velocity = 0;
    }

    ball.style.bottom = ballY + "px";

    requestAnimationFrame(loop);
}

loop();