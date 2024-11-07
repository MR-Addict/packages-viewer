"use client";

import { useParams } from "react-router-dom";
import { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from "react";

import { emptyPackage } from "@/data/app";
import { useDatabaseContext } from "@/contexts/database";
import { DependencyType, PackageType } from "@/types/package";

interface PackageContextProps {
  found: boolean;
  pkg: PackageType;

  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;

  updateDependencies: (data: { name: string; data: Partial<DependencyType> }[]) => void;
}

const PackageContext = createContext<PackageContextProps>({
  found: true,
  pkg: emptyPackage,

  openDialog: false,
  setOpenDialog: () => {},

  updateDependencies: () => {}
});

interface PackageContextProviderProps {
  children: React.ReactNode;
}

export const PackageContextProvider = ({ children }: PackageContextProviderProps) => {
  const { id } = useParams();
  const db = useDatabaseContext();

  const [found, setFound] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [pkg, setPkg] = useState<PackageType>(emptyPackage);

  function updateDependencies(data: { name: string; data: Partial<DependencyType> }[]) {
    for (const d of data) {
      const found = pkg.dependencies.find((dep) => dep.name === d.name);
      if (found) Object.assign(found, d.data);
    }
    db.packages.update(pkg.id, pkg);
  }

  useEffect(() => {
    // if database is not redy, wait for it
    if (!db.ready) return;

    // database is ready, find package by id
    const pkg = db.packages.data.find((p) => p.id === id);

    // set package
    if (pkg) {
      setPkg(pkg);
      setFound(true);
    } else {
      setFound(false);
      setPkg(emptyPackage);
    }
  }, [id, db.ready, db.packages.data]);

  return (
    <PackageContext.Provider
      value={{
        pkg,
        found,

        openDialog,
        setOpenDialog,

        updateDependencies
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackageContext = () => useContext(PackageContext);
