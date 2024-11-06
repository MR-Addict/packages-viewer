import resolveConfig from "tailwindcss/resolveConfig";

import custom from "./src/plugins/custom";

export default resolveConfig({
  darkMode: "selector",
  content: ["./src/**/*.{css,tsx}"],
  plugins: custom
});
