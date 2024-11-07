import { PackageType } from "@/types/package";

export const themes = ["dark", "system", "light"] as const;
export const packageManagers = ["npm", "yarn", "pnpm"] as const;
export const packagesOrderBys = ["name", "created", "updated", "dependencies"] as const;
export const emptyPackage: PackageType = { id: "", name: "", dependencies: [], created: "", updated: "" };
