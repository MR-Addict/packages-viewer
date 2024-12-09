import { PackageType } from "../types/package";

export const langs = ["en", "zh", "ja"] as const;
export const fileInputID = "package-file-input";
export const themes = ["dark", "system", "light"] as const;
export const packageManagers = ["npm", "yarn", "pnpm"] as const;
export const packagesOrderBys = ["name", "uploaded", "dependencies"] as const;
export const emptyPackage: PackageType = { id: "", name: "", dependencies: [], uploaded: "" };

export const appName = {
  id: "packages-viewer",
  name: "Packages Viewer",
  description: "A web app that for better viewing your npm registry package dependencies"
} as const;
