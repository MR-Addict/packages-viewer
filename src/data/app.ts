import { PackageType } from "../types/package";

export const locales = ["en", "zh"] as const;
export const fileInputID = "package-file-input";
export const themes = ["dark", "system", "light"] as const;
export const packageManagers = ["npm", "yarn", "pnpm"] as const;
export const packagesOrderBys = ["name", "uploaded", "dependencies"] as const;
export const emptyPackage: PackageType = { id: "", name: "", dependencies: [], uploaded: "" };
export const appName = { id: "packages-viewer", name: "Packages Viewer", nameZh: "依赖查看器" } as const;
