import z from "zod";

/* Dependency */
export const Dependency = z.object({
  name: z.string(),
  version: z.string(),
  selected: z.boolean(),
  latest: z.string().nullable(),
  type: z.enum(["prod", "dev"])
});
export type DependencyType = z.infer<typeof Dependency>;

/* Remote Dependency */
export const RemoteDependency = z.object({
  name: z.string(),
  version: z.string()
});
export type RemoteDependencyType = z.infer<typeof RemoteDependency>;

/* Package */
export const Package = z.object({
  id: z.string(),
  name: z.string(),
  created: z.string(),
  updated: z.string(),
  dependencies: z.array(Dependency)
});
export type PackageType = z.infer<typeof Package>;

/* Raw Package */
export const RawPackage = Package.omit({
  id: true,
  created: true,
  updated: true
});
export type RawPackageType = z.infer<typeof RawPackage>;
