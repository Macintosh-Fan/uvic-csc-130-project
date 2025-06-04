function logout() {
    document.cookie =
        "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.location.href = window.location.href;
}

/* From: https://www.w3schools.com/js/js_cookies.asp */
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let username = getCookie("username");

if (username) {
    document.querySelector("#loginB").textContent = "Log out of " + username;
    document.querySelector("#loginB").onclick = logout();
    document.querySelector("#createPostButton").textContent = "Create post";
} else {
    document.querySelector("#loginB").textContent = "Log in";
}
