"use client";

import { createContext, useContext, Dispatch, SetStateAction, useMemo } from "react";

import usePersistantState from "@/hooks/usePersistantState";

import { PackageType } from "@/types/package";
import { useDatabaseContext } from "@/contexts/database";
import { OrderType, PackagesOrderByType } from "@/types/app";

interface PackagesContextProps {
  packages: PackageType[];

  packagesOrder: OrderType;
  setPackagesOrder: Dispatch<SetStateAction<OrderType>>;

  packagesOrderBy: PackagesOrderByType;
  setPackagesOrderBy: Dispatch<SetStateAction<PackagesOrderByType>>;
}

const PackagesContext = createContext<PackagesContextProps>({
  packages: [],

  packagesOrder: "asc",
  setPackagesOrder: () => {},

  packagesOrderBy: "updated",
  setPackagesOrderBy: () => {}
});

interface PackagesContextProviderProps {
  children: React.ReactNode;
}

export const PackagesContextProvider = ({ children }: PackagesContextProviderProps) => {
  const [packagesOrder, setPackagesOrder] = usePersistantState<OrderType>("packages-order", "asc");
  const [packagesOrderBy, setPackagesOrderBy] = usePersistantState<PackagesOrderByType>("packages-order-by", "updated");

  const db = useDatabaseContext();
  const packages = useMemo(() => {
    const data = db.packages.data;
    if (packagesOrderBy === "name") data.sort((a, b) => a.name.localeCompare(b.name));
    else if (packagesOrderBy === "dependencies") data.sort((a, b) => a.dependencies.length - b.dependencies.length);
    else data.sort((a, b) => new Date(b[packagesOrderBy]).getTime() - new Date(a[packagesOrderBy]).getTime());
    if (packagesOrder === "desc") data.reverse();
    return data;
  }, [db.packages.data, packagesOrder, packagesOrderBy]);

  return (
    <PackagesContext.Provider
      value={{
        packages,

        packagesOrder,
        setPackagesOrder,

        packagesOrderBy,
        setPackagesOrderBy
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
};

export const usePackagesContext = () => useContext(PackagesContext);
