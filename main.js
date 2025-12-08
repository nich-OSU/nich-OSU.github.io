
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


const moonFaviconMap = [
  "moon-new.png",
  "moon-waxing-crescent.png",
  "moon-first-quarter.png",
  "moon-waxing-gibbous.png",
  "moon-full.png",
  "moon-waning-gibbous.png",
  "moon-last-quarter.png",
  "moon-waning-crescent.png"
];

function updateFavicon() {
  const phase = getMoonPhase();
  const favicon = document.querySelector("link[rel~='icon']");
  
  if (favicon) {
    favicon.href = moonFaviconMap[phase];
  } else {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = moonFaviconMap[phase];
    document.head.appendChild(link);
  }
}

function getMoonPhase() {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1; // JS months 0-11
  let day = now.getDate();

  if (month < 3) {
    year--;
    month += 12;
  }

  const K1 = Math.floor(365.25 * (year + 4712));
  const K2 = Math.floor(30.6 * (month + 1));
  const K3 = Math.floor(Math.floor((year / 100) + 49) * 0.75) - 38;

  const jd = K1 + K2 + day + 59;   // Julian Day number (approx)
  const phase = ((jd - 2451550.1) / 29.53058867) % 1;

  const index = Math.floor(phase * 8 + 0.5) % 8;
  return index; // 0–7
}

console.log(getMoonPhase())
// updateFavicon();

