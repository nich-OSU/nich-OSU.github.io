
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

/**
 * Calculates the current approximate phase of the moon (index 0-7).
 * Uses a more accurate Julian Day calculation and precise astronomical constants.
 */
function getMoonPhaseAccurate() {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1; // JS months 0-11
  let day = now.getDate();

  // --- 1. Calculate Accurate Julian Day (JD) at 00:00 UT ---
  let a = Math.floor((14 - month) / 12);
  let y = year + 4800 - a;
  let m = month + 12 * a - 3;

  const JD = day + Math.floor((153 * m + 2) / 5) + (365 * y) + 
             Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  // --- 2. Calculate Phase Fraction ---
  const referenceNewMoon = 2451550.09765; // Precise JD of New Moon Jan 6, 2000
  const synodicMonth = 29.530588853;     // Precise average lunar cycle length

  const daysSinceNewMoon = JD - referenceNewMoon;
  
  // Calculate phase fraction (0 to 1). The result might be negative, so we adjust.
  let phaseFraction = (daysSinceNewMoon / synodicMonth) % 1;

  // Normalize negative result (if daysSinceNewMoon was negative or % returned negative)
  if (phaseFraction < 0) {
    phaseFraction += 1;
  }

  // --- 3. Convert to 8-Step Index (0-7) ---
  const index = Math.floor(phaseFraction * 8 + 0.5) % 8;
  
  return index; // 0: New Moon, 4: Full Moon
}

// Example usage:
// const currentPhaseIndex = getMoonPhaseAccurate();
// console.log("Moon Phase Index:", currentPhaseIndex);

console.log(getMoonPhase())
// updateFavicon();

