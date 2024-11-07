"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

import { emptyPackage } from "@/data/app";
import { DependencyType, PackageType } from "@/types/package";
import { useDatabaseContext } from "@/contexts/database";

interface PackageContextProps {
  pkg: PackageType;
  setPkg: Dispatch<SetStateAction<PackageType>>;
  updateDependencies: (data: { name: string; data: Partial<DependencyType> }[]) => void;
}

const PackageContext = createContext<PackageContextProps>({
  pkg: emptyPackage,
  setPkg: () => {},

  updateDependencies: () => {}
});

interface PackageContextProviderProps {
  children: React.ReactNode;
}

export const PackageContextProvider = ({ children }: PackageContextProviderProps) => {
  const db = useDatabaseContext();
  const [pkg, setPkg] = useState<PackageType>(emptyPackage);

  function updateDependencies(data: { name: string; data: Partial<DependencyType> }[]) {
    for (const d of data) {
      const found = pkg.dependencies.find((dep) => dep.name === d.name);
      if (found) Object.assign(found, d.data);
    }
    db.packages.update(pkg.id, pkg);
    setPkg(pkg);
  }

  return (
    <PackageContext.Provider
      value={{
        pkg,
        setPkg,

        updateDependencies
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackageContext = () => useContext(PackageContext);
