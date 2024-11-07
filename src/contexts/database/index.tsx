"use client";

import { z } from "zod";
import uniqid from "uniqid";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import IDB from "@/lib/idb";
import { emptyPackage } from "@/data/app";
import { ApiResultType } from "@/types/app";
import { Package, PackageType, RawPackageType } from "@/types/package";

interface DatabaseContextProps {
  import: (data: any, options?: { packages: boolean; collections: boolean }) => void;
  ready: boolean;
  packages: {
    data: PackageType[];
    add: (pkg: RawPackageType) => PackageType;
    update: (id: string, pkg: Partial<RawPackageType>) => ApiResultType<PackageType>;
    remove: (id: string) => ApiResultType;
  };
}

const DatabaseContext = createContext<DatabaseContextProps>({
  import: () => {},
  ready: false,
  packages: {
    data: [],
    add: () => emptyPackage,
    update: () => ({ success: false, message: "" }),
    remove: () => ({ success: false, message: "" })
  }
});

export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const idb = useMemo(() => new IDB("packages-viewer"), []);

  const [ready, setReady] = useState(false);
  const [packages, setPackages] = useState<PackageType[]>([]);

  /* Import data */
  function importData(data: any, options = { packages: true }) {
    if (options.packages) {
      const parsed = z.array(Package).safeParse(data.packages);
      if (parsed.success) setPackages(parsed.data);
    }
  }

  /* Packages utils */
  function addPackage(pkg: RawPackageType): PackageType {
    const id = uniqid();
    const date = new Date().toISOString();
    const newPkg = { ...pkg, id, created: date, updated: date };
    setPackages((prev) => [...prev, newPkg]);
    return newPkg;
  }

  function updatePackage(id: string, pkg: Partial<RawPackageType>): ApiResultType<PackageType> {
    const found = packages.find((p) => p.id === id);
    if (!found) return { success: false, message: "Package not exists" };

    const date = new Date().toISOString();
    const newPkg = { ...found, ...pkg, updated: date };
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
        packages: { data: packages, add: addPackage, update: updatePackage, remove: removePackage }
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabaseContext = () => useContext(DatabaseContext);
