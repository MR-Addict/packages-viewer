"use client";

import { createContext, useContext, Dispatch, SetStateAction, useMemo } from "react";

import usePersistantState from "@/hooks/usePersistantState";

import { PackageType } from "@/types/package";
import { useDatabaseContext } from "@/contexts/database";
import { OrderType, PackagesOrderByType } from "@/types/app";

interface PackagesContextProps {
  packages: PackageType[];

  search: string;
  setSearch: Dispatch<SetStateAction<string>>;

  order: OrderType;
  setOrder: Dispatch<SetStateAction<OrderType>>;

  orderBy: PackagesOrderByType;
  setOrderBy: Dispatch<SetStateAction<PackagesOrderByType>>;
}

const PackagesContext = createContext<PackagesContextProps>({
  packages: [],

  search: "",
  setSearch: () => {},

  order: "asc",
  setOrder: () => {},

  orderBy: "uploaded",
  setOrderBy: () => {}
});

interface PackagesContextProviderProps {
  children: React.ReactNode;
}

export const PackagesContextProvider = ({ children }: PackagesContextProviderProps) => {
  const [search, setSearch] = usePersistantState<string>("packages-search", "");
  const [order, setOrder] = usePersistantState<OrderType>("packages-order", "asc");
  const [orderBy, setOrderBy] = usePersistantState<PackagesOrderByType>("packages-order-by", "uploaded");

  const db = useDatabaseContext();
  const packages = useMemo(() => {
    const data = db.packages.data;
    if (orderBy === "name") data.sort((a, b) => a.name.localeCompare(b.name));
    else if (orderBy === "dependencies") data.sort((a, b) => a.dependencies.length - b.dependencies.length);
    else data.sort((a, b) => new Date(b[orderBy]).getTime() - new Date(a[orderBy]).getTime());
    if (order === "desc") data.reverse();
    return data;
  }, [search, order, orderBy, db.packages.data]);

  return (
    <PackagesContext.Provider
      value={{
        packages,

        search,
        setSearch,

        order,
        setOrder,

        orderBy,
        setOrderBy
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
};

export const usePackagesContext = () => useContext(PackagesContext);
