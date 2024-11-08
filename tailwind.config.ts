import resolveConfig from "tailwindcss/resolveConfig";

import tw from "./src/plugins/tw";

export default resolveConfig({
  darkMode: "selector",
  content: ["./src/**/*.{css,tsx}"],
  plugins: tw
});
