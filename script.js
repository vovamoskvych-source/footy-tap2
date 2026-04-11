console.log("JS ЗАГРУЖЕН");

const main = document.getElementById("main");
const gameScreen = document.getElementById("gameScreen");

function openGame() {
    console.log("OPEN GAME");
    main.style.display = "none";
    gameScreen.style.display = "block";
}

function closeGame() {
    main.style.display = "block";
    gameScreen.style.display = "none";
}