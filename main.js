// // Apply stored theme on load
// function applyTheme(theme) {
//   if (theme === "dark") {
//     document.documentElement.classList.add("dark");
//   } else {
//     document.documentElement.classList.remove("dark");
//   }
// }

// // Load initial theme
// const saved = localStorage.getItem("theme");
// const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
// const initial = saved || (prefersDark ? "dark" : "light");
// applyTheme(initial);

// // Update toggle UI state
// function updateToggleUI() {
//   const isDark = document.documentElement.classList.contains("dark");
//   document.querySelectorAll("[data-dark-toggle] .toggle-thumb").forEach(th => {
//     th.style.transform = isDark ? "translateX(1.5rem)" : "translateX(0)";
//   });
// }

// // Attach event to toggle buttons
// document.querySelectorAll("[data-dark-toggle]").forEach(btn => {
//   btn.addEventListener("click", () => {
//     const nowDark = document.documentElement.classList.toggle("dark");
//     localStorage.setItem("theme", nowDark ? "dark" : "light");
//     updateToggleUI();
//   });
// });

// // Initialize thumb position
// updateToggleUI();

// // Debug
// console.log("Dark mode:", initial);

/***********************************************
 * Restore Theme on Page Load
 ***********************************************/
if (
  localStorage.getItem("theme") === "dark" ||
  (!localStorage.getItem("theme") &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
}

/***********************************************
 * Rotation State
 * (Always clockwise with 180° increments)
 ***********************************************/
let rotation = document.documentElement.classList.contains("dark") ? 180 : 0;

/***********************************************
 * Apply Rotation to Any Toggle Disc
 ***********************************************/
function applyRotation() {
  const disc = document.querySelector(".icon-disc");
  if (disc) {
    disc.style.transform = `rotate(${rotation}deg)`;
  }
}

/***********************************************
 * Apply Initial Rotation on Page Load
 ***********************************************/
document.addEventListener("DOMContentLoaded", () => {
  applyRotation();
  if (window.lucide) window.lucide.createIcons();
});

/***********************************************
 * Toggle Handler (always clockwise)
 ***********************************************/
document.addEventListener("click", event => {
  const btn = event.target.closest("[data-dark-toggle]");
  if (!btn) return;

  // Always rotate forward 180°
  rotation += 180;
  applyRotation();

  // Fade theme near end of animation
  setTimeout(() => {
    const nowDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", nowDark ? "dark" : "light");
  }, 450); // Matches CSS rotation timing
});

