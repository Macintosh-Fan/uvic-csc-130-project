const BRIGHT = "white";
const DARK = "black";

function darkModeToggle() {
    let bodyStyle = document.getElementsByTagName("body")[0].style;

    let bgColor = bodyStyle.backgroundColor;
    if (bgColor === BRIGHT) {
        bodyStyle.backgroundColor = DARK;
        bodyStyle.color = BRIGHT;
    } else {
        bodyStyle.backgroundColor = BRIGHT;
        bodyStyle.color = DARK;
    }
}
// i didnt want to change your function so i just added an event listner to call ur function
window.addEventListener("DOMContentLoaded", function () {
    const mode = document.getElementById("toggle_dark");
    mode.addEventListener("change", darkModeToggle);
});
