// Toggle dark mode with localStorage persistence
const toggle = document.getElementById("darkToggle");

if (localStorage.theme === "light") {
  document.documentElement.classList.remove("dark");
}

toggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    localStorage.theme = "dark";
  } else {
    localStorage.theme = "light";
  }
});
