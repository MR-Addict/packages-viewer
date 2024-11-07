import { z } from "zod";
import { ApiResultType } from "@/types/app";
import { DependencyType, RawPackageType } from "@/types/package";

const RawPackage = z.object({
  name: z.string(),
  devDependencies: z.record(z.string()).optional(),
  dependencies: z.record(z.string()).optional()
});

function parseVersion(version: string) {
  const methods = [">=", "<=", "^", "~", ">", "<"];
  for (const m of methods) {
    if (version.startsWith(m)) {
      return version.slice(m.length);
    }
  }
  return version;
}

export default function parsePackage(file: string): ApiResultType<RawPackageType> {
  const parsed = RawPackage.safeParse(JSON.parse(file));
  if (!parsed.success) return { success: false, message: "Unable to parse your package" };

  const dependencies: DependencyType[] = [];
  const commonOptions = { selected: false, latest: null };

  const prodDependencies = parsed.data.dependencies;
  if (prodDependencies) {
    Object.keys(prodDependencies).forEach((name) => {
      dependencies.push({ name, type: "prod", version: parseVersion(prodDependencies[name]), ...commonOptions });
    });
  }

  const devDependencies = parsed.data.devDependencies;
  if (devDependencies) {
    Object.keys(devDependencies).forEach((name) => {
      dependencies.push({ name, type: "dev", version: parseVersion(devDependencies[name]), ...commonOptions });
    });
  }

  if (!dependencies.length) return { success: false, message: "There is no dependencies in your package" };

  dependencies.sort((a, b) => b.type.localeCompare(a.type) || a.name.localeCompare(b.name));

  return { success: true, data: { name: parsed.data.name, dependencies } };
}
