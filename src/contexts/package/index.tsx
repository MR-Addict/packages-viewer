"use client";

import { useNavigate, useParams } from "react-router-dom";
import { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from "react";

import { emptyPackage } from "@/data/app";
import { useDatabaseContext } from "@/contexts/database";
import { DependencyType, PackageType } from "@/types/package";

interface PackageContextProps {
  pkg: PackageType;

  setSearch: Dispatch<SetStateAction<string>>;

  updateDependencies: (data: { name: string; data: Partial<DependencyType> }[]) => void;
}

const PackageContext = createContext<PackageContextProps>({
  pkg: emptyPackage,

  setSearch: () => {},

  updateDependencies: () => {}
});

interface PackageContextProviderProps {
  children: React.ReactNode;
}

export const PackageContextProvider = ({ children }: PackageContextProviderProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const db = useDatabaseContext();

  const [search, setSearch] = useState<string>("");
  const [pkg, setPkg] = useState<PackageType>(emptyPackage);

  function updateDependencies(data: { name: string; data: Partial<DependencyType> }[]) {
    const dbPkg = db.packages.data.find((p) => p.id === id);
    if (!dbPkg) return;
    for (const d of data) {
      const found = dbPkg.dependencies.find((dep) => dep.name === d.name);
      if (found) Object.assign(found, d.data);
    }
    db.packages.update(dbPkg.id, dbPkg);
  }

  useEffect(() => {
    // if database is not redy, wait for it
    if (!db.ready) return;

    // database is ready, find package by id
    const dbPkg = db.packages.data.find((p) => p.id === id);

    // set package
    if (dbPkg) {
      let dependencies = Array.from(dbPkg.dependencies);
      dependencies = dependencies.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));
      dependencies = dependencies.sort((a, b) => b.type.localeCompare(a.type) || a.name.localeCompare(b.name));
      setPkg({ ...dbPkg, dependencies });
    } else navigate("/packages");
  }, [id, search, db.ready, db.packages.data]);

  return (
    <PackageContext.Provider
      value={{
        pkg,

        setSearch,

        updateDependencies
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackageContext = () => useContext(PackageContext);
