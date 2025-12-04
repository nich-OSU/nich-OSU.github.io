
// Determine initial mode
if (localStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const toggle = document.getElementById("darkToggle");

toggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.theme = isDark ? "dark" : "light";
});
