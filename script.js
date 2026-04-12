const ball = document.getElementById("ball");
const btn = document.getElementById("btn");

let ballY = 150;
let velocity = 0;

const gravity = 0.8;
const jumpPower = 12;

/* ПРЫЖОК ЧЕРЕЗ КНОПКУ */
btn.onclick = () => {
    velocity = jumpPower;
    console.log("jump");
};

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