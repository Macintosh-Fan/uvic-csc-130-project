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
