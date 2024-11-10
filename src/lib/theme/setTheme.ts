import colors from "tailwindcss/colors";
import { ThemeType } from "@/types/app";

const lightThemeColor = colors.white;
const darkThemeColor = colors.neutral[900];

export default function setTheme(theme: ThemeType) {
  let darkMode = theme === "dark";
  if (theme === "system") darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", darkMode);

  // Set the theme-color meta tag
  const themeColor = darkMode ? darkThemeColor : lightThemeColor;
  const metaThemeColor = document.querySelector("meta[name=theme-color]");
  if (metaThemeColor) metaThemeColor.setAttribute("content", themeColor);
  else {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = themeColor;
    document.head.appendChild(meta);
  }
}
