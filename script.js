const ball = document.getElementById("ball");

let ballY = 150;
let velocity = 0;

const gravity = 0.8;
const jumpPower = 12;

/* 🔥 ВОТ КЛЮЧ */
window.addEventListener("pointerdown", () => {
    velocity = jumpPower;
});

/* LOOP */
function loop() {
    velocity -= gravity;
    ballY += velocity;

    if (ballY < 0) {
        ballY = 0;
        velocity = 0;
    }

    ball.style.bottom = ballY + "px";

    requestAnimationFrame(loop);
}

loop();