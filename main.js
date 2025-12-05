// Apply stored theme on load
function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

// Load initial theme
const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initial = saved || (prefersDark ? "dark" : "light");
applyTheme(initial);

// Update toggle UI state
function updateToggleUI() {
  const isDark = document.documentElement.classList.contains("dark");
  document.querySelectorAll("[data-dark-toggle] .toggle-thumb").forEach(th => {
    th.style.transform = isDark ? "translateX(1.5rem)" : "translateX(0)";
  });
}

// Attach event to toggle buttons
document.querySelectorAll("[data-dark-toggle]").forEach(btn => {
  btn.addEventListener("click", () => {
    const nowDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", nowDark ? "dark" : "light");
    updateToggleUI();
  });
});

// Initialize thumb position
updateToggleUI();

// Debug
console.log("Dark mode:", initial);
