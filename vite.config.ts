import path from "path";
import { defineConfig } from "vite";
import stringHash from "string-hash";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
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
