export default function getTheme() {
  const theme = localStorage.getItem("theme");
  if (!theme) return "system";
  return JSON.parse(theme);
}
