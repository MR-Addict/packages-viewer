"use client";

import { z } from "zod";
import uniqid from "uniqid";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import IDB from "@/lib/idb";
import { ApiResultType } from "@/types/app";
import { Collection, CollectionType } from "@/types/collection";
import { Package, PackageType, RawPackageType } from "@/types/package";

const emptyPackage: PackageType = {
  id: "",
  name: "",
  dependencies: {},
  collection: null,
  created: "",
  updated: ""
};

const emptyCollection: CollectionType = {
  id: "",
  name: "",
  created: "",
  updated: ""
};

interface DatabaseContextProps {
  import: (data: any, options?: { packages: boolean; collections: boolean }) => void;
  packages: {
    data: PackageType[];
    add: (pkg: RawPackageType, collectionName?: string) => PackageType;
    update: (id: string, pkg: RawPackageType) => ApiResultType<PackageType>;
    remove: (id: string) => ApiResultType;
  };
  collections: {
    data: CollectionType[];
    add: (name: string) => CollectionType;
    update: (id: string, name: string) => ApiResultType<CollectionType>;
    remove: (id: string) => ApiResultType;
  };
}

const DatabaseContext = createContext<DatabaseContextProps>({
  import: () => {},
  packages: {
    data: [],
    add: () => emptyPackage,
    update: () => ({ success: false, message: "" }),
    remove: () => ({ success: false, message: "" })
  },
  collections: {
    data: [],
    add: () => emptyCollection,
    update: () => ({ success: false, message: "" }),
    remove: () => ({ success: false, message: "" })
  }
});

export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const idb = useMemo(() => new IDB("packages-viewer"), []);

  const [imported, setImported] = useState(false);

  const [packages, setPackages] = useState<PackageType[]>([]);
  const [collections, setCollections] = useState<CollectionType[]>([]);

  /* Import data */
  function importData(data: any, options = { packages: true, collections: true }) {
    if (options.packages) {
      const parsed = z.array(Package).safeParse(data.packages);
      if (parsed.success) setPackages(parsed.data);
    }

    if (options.collections) {
      const parsed = z.array(Collection).safeParse(data.collections);
      if (parsed.success) setCollections(parsed.data);
    }
  }

  /* Packages utils */
  function addPackage(pkg: RawPackageType, collectionName?: string): PackageType {
    // Add collection if collectionName is provided and not exists
    let collectionId = null;
    if (collectionName) {
      const found = collections.find((c) => c.name === collectionName);
      if (found) collectionId = found.id;
      else collectionId = addCollection(collectionName).id;
    }

    // Create new package
    const id = uniqid();
    const date = new Date().toISOString();
    const newPkg = { ...pkg, id, collection: collectionId, created: date, updated: date };
    setPackages((prev) => [...prev, newPkg]);

    return newPkg;
  }

  function updatePackage(id: string, pkg: RawPackageType): ApiResultType<PackageType> {
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

  /* Collections utils */
  function addCollection(name: string): CollectionType {
    const id = uniqid();
    const date = new Date().toISOString();
    const newCollection = { id, name, created: date, updated: date };
    setCollections((prev) => [...prev, newCollection]);
    return newCollection;
  }

  function updateCollection(id: string, name: string): ApiResultType<CollectionType> {
    const found = collections.find((c) => c.id === id);
    if (!found) return { success: false, message: "Collection not exists" };

    const date = new Date().toISOString();
    const newCollection = { ...found, name, updated: date };
    setCollections(collections.map((c) => (c.id === id ? newCollection : c)));
    return { success: true, data: newCollection };
  }

  function removeCollection(id: string): ApiResultType {
    if (packages.find((p) => p.collection === id)) return { success: false, message: "Collection is not empty" };
    setCollections(collections.filter((c) => c.id !== id));
    return { success: true };
  }

  /* Load data from IDB */
  useEffect(() => {
    (async () => {
      const packages = await idb.load("packages");
      const collections = await idb.load("collections");
      importData({ packages, collections });
      setTimeout(() => setImported(true), 1000);
    })();
  }, []);

  /* Save data to IDB */
  useEffect(() => {
    if (imported) idb.save("packages", packages);
  }, [packages]);

  useEffect(() => {
    if (imported) idb.save("collections", collections);
  }, [collections]);

  return (
    <DatabaseContext.Provider
      value={{
        import: importData,
        packages: { data: packages, add: addPackage, update: updatePackage, remove: removePackage },
        collections: { data: collections, add: addCollection, update: updateCollection, remove: removeCollection }
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabaseContext = () => useContext(DatabaseContext);
