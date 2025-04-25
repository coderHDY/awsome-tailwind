import { isClient } from "../tools";

export function setTheme(theme) {
  // 设置主题到 HTML 的 data-theme 属性
  document.documentElement.setAttribute("data-theme", theme);
  // 将主题存储到 localStorage
  localStorage.setItem("theme", theme);
}

export function toggleTheme() {
  // 获取当前主题
  const currentTheme = document.documentElement.getAttribute("data-theme");
  // 切换主题
  const newTheme = currentTheme === "light" ? "dark" : "light";
  // 设置新主题
  setTheme(newTheme);
}

function initializeTheme() {
  if (!isClient) return;
  // 从 localStorage 中获取保存的主题
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    // 如果有保存的主题，则使用保存的主题
    setTheme(savedTheme);
  } else {
    // 如果没有保存的主题，则根据系统偏好设置主题
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }
}

export const setInitialThemeScript = `
  (function () {
    if (typeof window === "undefined") return;
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        localStorage.setItem("theme", savedTheme);
      }
    } catch (e) {}
  })();
`;
