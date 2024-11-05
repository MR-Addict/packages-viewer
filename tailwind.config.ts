import resolveConfig from "tailwindcss/resolveConfig";

import { gradient, border } from "./src/plugins/custom";

export default resolveConfig({
  darkMode: "selector",
  content: ["./src/**/*.{css,tsx}"],
  plugins: [gradient, border]
});
