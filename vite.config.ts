import path from "path";
import stringHash from "string-hash";
import react from "@vitejs/plugin-react";

import pwa from "./src/plugins/pwa";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_REPOSITORY?.split("/").pop() || "/",
  plugins: [pwa, react()],
  resolve: { alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }] },
  css: {
    modules: {
      generateScopedName: (name, _, css) => {
        if (name === "dark") return "dark";
        const i = css.indexOf(`.${name}`);
        const lineNumber = css.slice(0, i).split(/[\r\n]/).length;
        const hash = stringHash(css).toString(36).slice(0, 5);

        return `_${name}_${hash}_${lineNumber}`;
      }
    }
  }
});
