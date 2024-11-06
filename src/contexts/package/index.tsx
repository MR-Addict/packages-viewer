"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState, useMemo } from "react";

import { emptyPackage } from "@/data/app";
import { PackageType } from "@/types/package";

interface PackageContextProps {
  pkg: PackageType;
  setPkg: Dispatch<SetStateAction<PackageType>>;
}

const PackageContext = createContext<PackageContextProps>({
  pkg: emptyPackage,
  setPkg: () => {}
});

interface PackageContextProviderProps {
  children: React.ReactNode;
}

export const PackageContextProvider = ({ children }: PackageContextProviderProps) => {
  const [_pkg, setPkg] = useState<PackageType>(emptyPackage);

  const pkg = useMemo(() => {
    const dependencies = _pkg.dependencies;
    dependencies.sort((a, b) => b.type.localeCompare(a.type) || a.name.localeCompare(b.name));
    return { ..._pkg, dependencies };
  }, [_pkg]);

  return (
    <PackageContext.Provider
      value={{
        pkg,
        setPkg
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackageContext = () => useContext(PackageContext);
