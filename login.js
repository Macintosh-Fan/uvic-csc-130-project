const MIN_USERNAME_LENGTH = 1;
const MAX_USERNAME_LENGTH = 64;

function login() {
    let username = document.getElementById("username").value;
    username.replaceAll("=", "");
    if (
        username.length >= MIN_USERNAME_LENGTH &&
        username.length <= MAX_USERNAME_LENGTH
    ) {
        document.cookie = "username=" + username;
        document.location.href = "index.html";
    } else {
        window.alert(
            "The username must have a length between " +
                MIN_USERNAME_LENGTH +
                " and " +
                MAX_USERNAME_LENGTH +
                " characters (inclusive)!",
        );
    }
}
