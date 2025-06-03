const BRIGHT = "white";
const DARK = "black";

function darkModeToggle() {
    let bodyStyle = document.getElementsByTagName("body")[0].style;

    let bgColor = bodyStyle.backgroundColor;
    if (bgColor === BRIGHT) {
        bodyStyle.backgroundColor = DARK;
        bodyStyle.color = BRIGHT;
        bodyStyle.filter = "100%";
    } else {
        bodyStyle.backgroundColor = BRIGHT;
        bodyStyle.color = DARK;
        bodyStyle.filter = "75%";
    }
}
// i didnt want to change your function so i just added an event listner to call ur function
window.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("toggle_dark");
    const prefersLight = window.matchMedia(
        "(prefers-color-scheme: light)",
    ).matches;
    toggle.addEventListener("change", darkModeToggle);
    if (prefersLight) {
        toggle.click();
    }
});
