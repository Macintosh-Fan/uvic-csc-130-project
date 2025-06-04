document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle_dark");

  function darkModeToggle(e) {
    if (e.target.checked) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
  toggle.addEventListener("change", darkModeToggle);


  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (!prefersDark) {
    toggle.click();
  }
})
