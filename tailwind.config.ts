import resolveConfig from "tailwindcss/resolveConfig";

export default resolveConfig({
  darkMode: "selector",
  content: ["./src/**/*.{css,tsx}"]
});
