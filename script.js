const THEME_KEY = "portfolio-theme";

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.dataset.theme = "light";
  } else {
    root.removeAttribute("data-theme");
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
  updateThemeToggleLabels();
}

function currentTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function toggleTheme() {
  applyTheme(currentTheme() === "dark" ? "light" : "dark");
}

function initTheme() {
  const stored = getStoredTheme();
  if (stored === "light") {
    document.documentElement.dataset.theme = "light";
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  updateThemeToggleLabels();
}

function updateThemeToggleLabels() {
  const isLight = document.documentElement.dataset.theme === "light";
  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
    if (btn.classList.contains("theme-toggle--menu")) {
      btn.textContent = isLight ? "Dark mode" : "Light mode";
    }
  });
}

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function wireThemeToggles() {
  document
    .getElementById("theme-toggle-desktop")
    ?.addEventListener("click", () => toggleTheme());
  document
    .getElementById("theme-toggle-mobile")
    ?.addEventListener("click", () => toggleTheme());
}

const yearEl = document.getElementById("footer-year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

initTheme();
wireThemeToggles();
