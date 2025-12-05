// main.js - robust theme toggler

// helper to apply theme
function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

// initial theme: saved or system preference (default to light)
const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const initial = saved ? saved : (prefersDark ? "dark" : "light");
applyTheme(initial);

// find any toggle controls (use data attribute or id)
const toggles = document.querySelectorAll('[data-dark-toggle]');

// add click handlers
toggles.forEach(btn => {
  btn.addEventListener("click", () => {
    // flip
    const isNowDark = document.documentElement.classList.toggle("dark");
    const newTheme = isNowDark ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
  });
});

// debug helper: expose status in console
console.log("Theme initialized as:", document.documentElement.classList.contains("dark") ? "dark" : "light");
