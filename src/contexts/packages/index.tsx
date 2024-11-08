"use client";

import { createContext, useContext, Dispatch, SetStateAction, useMemo } from "react";

import usePersistantState from "@/hooks/usePersistantState";

import { PackageType } from "@/types/package";
import { useDatabaseContext } from "@/contexts/database";
import { OrderType, PackagesOrderByType } from "@/types/app";

interface PackagesContextProps {
  packages: PackageType[];

  order: OrderType;
  SetOrder: Dispatch<SetStateAction<OrderType>>;

  orderBy: PackagesOrderByType;
  setOrderBy: Dispatch<SetStateAction<PackagesOrderByType>>;
}

const PackagesContext = createContext<PackagesContextProps>({
  packages: [],

  order: "asc",
  SetOrder: () => {},

  orderBy: "uploaded",
  setOrderBy: () => {}
});

interface PackagesContextProviderProps {
  children: React.ReactNode;
}

export const PackagesContextProvider = ({ children }: PackagesContextProviderProps) => {
  const [order, SetOrder] = usePersistantState<OrderType>("packages-order", "asc");
  const [orderBy, setOrderBy] = usePersistantState<PackagesOrderByType>("packages-order-by", "uploaded");

  const db = useDatabaseContext();
  const packages = useMemo(() => {
    const data = db.packages.data;
    if (orderBy === "name") data.sort((a, b) => a.name.localeCompare(b.name));
    else if (orderBy === "dependencies") data.sort((a, b) => a.dependencies.length - b.dependencies.length);
    else data.sort((a, b) => new Date(b[orderBy]).getTime() - new Date(a[orderBy]).getTime());
    if (order === "desc") data.reverse();
    return data;
  }, [db.packages.data, order, orderBy]);

  return (
    <PackagesContext.Provider
      value={{
        packages,

        order,
        SetOrder,

        orderBy,
        setOrderBy
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
};

export const usePackagesContext = () => useContext(PackagesContext);
