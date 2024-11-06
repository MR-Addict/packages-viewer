import { PackageType } from "@/types/package";

export const themes = ["light", "system", "dark"] as const;
export const packagesOrderBys = ["name", "created", "updated", "dependencies"] as const;

export const emptyPackage: PackageType = {
  id: "",
  name: "",
  dependencies: [],
  created: "",
  updated: ""
};
