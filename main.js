// Apply stored theme on load
if (localStorage.theme === "dark") {
document.documentElement.classList.add("dark");
} else {
document.documentElement.classList.remove("dark");
}


// Toggle
const toggle = document.getElementById("darkToggle");
if (toggle) {
toggle.addEventListener("click", () => {
const isDark = document.documentElement.classList.toggle("dark");
localStorage.theme = isDark ? "dark" : "light";
});
}
