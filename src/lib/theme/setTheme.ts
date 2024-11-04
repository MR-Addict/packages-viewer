import { ThemeType } from "@/types/app";

export default function setTheme(theme: ThemeType) {
  let darkMode = theme === "dark";
  if (theme === "system") darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", darkMode);
}
