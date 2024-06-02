const ADDING_FX_DISAPPEARANCE_TIME_IN_SECONDS = 1.5;
const { x: ADDING_FX_MIN_X, y: ADDING_FX_MIN_Y, width: ADDING_FX_BIAS } = clicker.getBoundingClientRect();

function createAddingFX(value, coords, related) {
    let fx = document.createElement("p");
    fx.innerHTML = value.toString();
    fx.classList.add("number");
    fx.style.fontSize = "22px";
    fx.style.pointerEvents = "none";
    fx.style.position = "absolute";

    if (related) {
        fx.style.top = coords.y + ADDING_FX_MIN_Y - 350/2 + "px";
        fx.style.left = coords.x + ADDING_FX_MIN_X - 350/2 + "px";
    } else {
        fx.style.top = coords.y + "px";
        fx.style.left = coords.x + "px";
    }
    fx.style.animation = `adding__fx__animation ${ADDING_FX_DISAPPEARANCE_TIME_IN_SECONDS + 0.1}s`

    document.body.appendChild(fx);
    setTimeout(() => {
        document.body.removeChild(fx);
    }, ADDING_FX_DISAPPEARANCE_TIME_IN_SECONDS * 1000);
}