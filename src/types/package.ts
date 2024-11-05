import z from "zod";

/* Dependency */
export const Dependency = z.object({
  name: z.string(),
  version: z.string(),
  type: z.enum(["prod", "dev"])
});
export type DependencyType = z.infer<typeof Dependency>;

/* Package */
export const Package = z.object({
  id: z.string(),
  name: z.string(),
  dependencies: z.array(Dependency),
  collection: z.string().nullable(),
  created: z.string(),
  updated: z.string()
});
export type PackageType = z.infer<typeof Package>;

/* Raw Package */
export const RawPackage = Package.omit({
  id: true,
  collection: true,
  created: true,
  updated: true
});
export type RawPackageType = z.infer<typeof RawPackage>;
