document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle_dark");
  if (!toggle) return;

  function darkModeToggle(e) {
    if (e.target.checked) {
      document.body.classList.remove("dark");
    } else {

      document.body.classList.add("dark");
    }
  }

  toggle.addEventListener("change", darkModeToggle);


  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  toggle.checked = !prefersDark;
  if (!toggle.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
})
