export default function getTheme() {
  const theme = localStorage.getItem("theme");
  if (!theme) return "dark";
  return JSON.parse(theme);
}
