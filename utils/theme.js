import { useEffect } from "react";
import { isClient } from "./tools";

const THEME_STORAGE_KEY = "theme";
const THEME_DOM_KEY = "data-theme";
const THEMES = {
  light: "light",
  dark: "dark",
};

export function setTheme(theme) {
  document.documentElement.setAttribute(THEME_DOM_KEY, theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  localStorage.setItem(THEME_DOM_KEY, theme);
}

export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute(THEME_DOM_KEY);
  const newTheme = currentTheme === THEMES.light ? THEMES.dark : THEMES.light;
  setTheme(newTheme);
}
export function getTheme() {
  if (!isClient) return;
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  console.log("Saved theme:", savedTheme);
  return savedTheme || THEMES.light;
}

function initializeTheme() {
  if (!isClient) return;
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? THEMES.dark : THEMES.light);
  }
}

export function useInitTheme() {
  useEffect(() => {
    initializeTheme();
  }, []);
}
