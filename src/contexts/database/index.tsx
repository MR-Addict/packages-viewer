import uniqid from "uniqid";

import { z } from "zod";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import IDB from "@/lib/idb";
import mergeDependencies from "@/lib/package/mergeDependencies";

import { ApiResultType } from "@/types/app";
import { appName, emptyPackage } from "@/data/app";
import { Package, PackageType, RawPackageType } from "@/types/package";

interface DatabaseContextProps {
  import: (data: any, options?: { packages: boolean; collections: boolean }) => void;
  ready: boolean;
  packages: {
    data: PackageType[];
    get: (id: string) => PackageType | null;
    add: (pkg: RawPackageType) => PackageType;
    update: (id: string, data: Partial<RawPackageType>, updateDate?: boolean) => ApiResultType<PackageType>;
    remove: (id: string) => ApiResultType;
  };
}

const DatabaseContext = createContext<DatabaseContextProps>({
  import: () => {},
  ready: false,
  packages: {
    data: [],
    get: () => null,
    add: () => emptyPackage,
    update: () => ({ success: false, message: "" }),
    remove: () => ({ success: false, message: "" })
  }
});

export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const idb = useMemo(() => new IDB(appName.id), []);

  const [ready, setReady] = useState(false);
  const [packages, setPackages] = useState<PackageType[]>([]);

  /* Import data */
  function importData(data: any, options = { packages: true }) {
    if (options.packages) {
      const parsed = z.array(Package).safeParse(data.packages);
      if (parsed.success) {
        parsed.data.forEach((pkg) => pkg.dependencies.forEach((dep) => (dep.latest = null)));
        setPackages(parsed.data);
      }
    }
  }

  /* Packages utils */
  function getPackage(id: string): PackageType | null {
    return packages.find((p) => p.id === id) || null;
  }

  function addPackage(pkg: RawPackageType): PackageType {
    const id = uniqid();
    const uploaded = new Date().toISOString();
    const newPkg = { ...pkg, id, uploaded };
    setPackages((prev) => [...prev, newPkg]);
    return newPkg;
  }

  function updatePackage(id: string, data: Partial<RawPackageType>, updateDate = false): ApiResultType<PackageType> {
    const found = packages.find((p) => p.id === id);
    if (!found) return { success: false, message: "Package not exists" };

    let newPkg = { ...found, ...data };
    if (updateDate) newPkg.uploaded = new Date().toISOString();

    // Merge dependencies
    if (data.dependencies) newPkg.dependencies = mergeDependencies(found.dependencies, data.dependencies);

    setPackages((prev) => prev.map((p) => (p.id === id ? newPkg : p)));
    return { success: true, data: newPkg };
  }

  function removePackage(id: string): ApiResultType {
    if (!packages.find((p) => p.id === id)) return { success: false, message: "Package not exists" };
    setPackages((prev) => prev.filter((p) => p.id !== id));
    return { success: true };
  }

  /* Load data from IDB */
  useEffect(() => {
    (async () => {
      const packages = await idb.load("packages");
      importData({ packages });
      setReady(true);
    })();
  }, []);

  /* Save data to IDB */
  useEffect(() => {
    if (ready) idb.save("packages", packages);
  }, [packages]);

  return (
    <DatabaseContext.Provider
      value={{
        import: importData,
        ready,
        packages: { data: packages, get: getPackage, add: addPackage, update: updatePackage, remove: removePackage }
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabaseContext = () => useContext(DatabaseContext);
