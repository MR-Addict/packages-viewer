"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState, useMemo } from "react";

import { OrderType } from "@/types/app";
import { emptyPackage } from "@/data/app";
import { PackageType } from "@/types/package";

import usePersistantState from "@/hooks/usePersistantState";

interface PackageContextProps {
  pkg: PackageType;
  setPkg: Dispatch<SetStateAction<PackageType>>;

  packageOrder: OrderType;
  setPackageOrder: Dispatch<SetStateAction<OrderType>>;
}

const PackageContext = createContext<PackageContextProps>({
  pkg: emptyPackage,
  setPkg: () => {},

  packageOrder: "asc",
  setPackageOrder: () => {}
});

interface PackageContextProviderProps {
  children: React.ReactNode;
}

export const PackageContextProvider = ({ children }: PackageContextProviderProps) => {
  const [_pkg, setPkg] = useState<PackageType>(emptyPackage);
  const [packageOrder, setPackageOrder] = usePersistantState<OrderType>("package-order", "asc");

  const pkg = useMemo(() => {
    const dependencies = _pkg.dependencies;
    dependencies.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));

    dependencies.sort((a, b) => a.name.localeCompare(b.name));
    if (packageOrder === "desc") dependencies.reverse();
    return { ..._pkg, dependencies };
  }, [_pkg, packageOrder]);

  return (
    <PackageContext.Provider
      value={{
        pkg,
        setPkg,

        packageOrder,
        setPackageOrder
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackageContext = () => useContext(PackageContext);
