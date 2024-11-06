"use client";

import { useParams } from "react-router-dom";
import { createContext, useContext, Dispatch, SetStateAction, useMemo } from "react";

import usePersistantState from "@/hooks/usePersistantState";

import { OrderType } from "@/types/app";
import { emptyPackage } from "@/data/app";
import { PackageType } from "@/types/package";
import { useDatabaseContext } from "@/contexts/database";

interface PackageContextProps {
  pkg: PackageType | null;

  packageOrder: OrderType;
  setPackageOrder: Dispatch<SetStateAction<OrderType>>;
}

const PackageContext = createContext<PackageContextProps>({
  pkg: emptyPackage,

  packageOrder: "asc",
  setPackageOrder: () => {}
});

interface PackageContextProviderProps {
  children: React.ReactNode;
}

export const PackageContextProvider = ({ children }: PackageContextProviderProps) => {
  const [packageOrder, setPackageOrder] = usePersistantState<OrderType>("package-order", "asc");

  const { id } = useParams();
  const db = useDatabaseContext();

  const pkg = useMemo(() => {
    const pkg = db.packages.data.find((p) => p.id === id);
    if (!pkg) return null;

    const dependencies = pkg.dependencies;
    dependencies.sort((a, b) => a.name.localeCompare(b.name));
    if (packageOrder === "desc") dependencies.reverse();
    pkg.dependencies = dependencies;
    return pkg;
  }, [id, packageOrder, db.packages.data]);

  return (
    <PackageContext.Provider
      value={{
        pkg,

        packageOrder,
        setPackageOrder
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackageContext = () => useContext(PackageContext);
