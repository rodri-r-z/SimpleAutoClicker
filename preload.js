const robot = require('@jitsi/robotjs');
const { GlobalKeyboardListener } = require("node-global-key-listener");

let isChangingActKey = false;
let actionKey = "q"
let isRunning = false;
let isClicking = false;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#key").innerHTML = actionKey;
    document.querySelector("#key").addEventListener("click", () => {
        if (isChangingActKey) return [document.querySelector("#key").innerHTML = actionKey, isChangingActKey = false];
        isChangingActKey = true;
        document.querySelector("#key").innerHTML = "...";
    });
    document.addEventListener("keydown", (e) => {
        if (isChangingActKey) {
            actionKey = e.key;
            isChangingActKey = false;
            document.querySelector("#key").innerHTML = actionKey;
            return;
        }
        if (e.key === actionKey) {
            isRunning = !isRunning;
            if (!isRunning) {
                isClicking = false;
                console.log("Stopped");
            } else {
                console.log("Started");
            }
        }
    });
});

new GlobalKeyboardListener().addListener(function (key) {
    if (key.state === "DOWN" && key.name && key.name.toLowerCase() === actionKey.toLowerCase()) {
        if (isRunning) {
            isClicking = false;
            console.log("Stopped");
        } else {
            isClicking = true;
            console.log("Started");
        }
    }
});

function performClick() {
    if (isRunning && isClicking) {
        robot.mouseClick();
    }
    requestAnimationFrame(performClick);
}

requestAnimationFrame(performClick);
