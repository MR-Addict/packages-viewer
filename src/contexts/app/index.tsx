"use client";

import { createContext, useContext, Dispatch, SetStateAction, useEffect, useRef } from "react";

import { PackageManagerType } from "@/types/app";
import usePersistantState from "@/hooks/usePersistantState";

interface AppContextProps {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;

  packageManager: PackageManagerType;
  setPackageManager: Dispatch<SetStateAction<PackageManagerType>>;

  fileInputRef: React.RefObject<HTMLInputElement>;
  windowWidth: number;
}

const AppContext = createContext<AppContextProps>({
  openSidebar: false,
  setOpenSidebar: () => {},

  packageManager: "npm",
  setPackageManager: () => {},

  fileInputRef: { current: null },
  windowWidth: 1024
});

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openSidebar, setOpenSidebar] = usePersistantState("open-sidebar", false);
  const [windowWidth, setWindowWidth] = usePersistantState("window-size", window.innerWidth);
  const [packageManager, setPackageManager] = usePersistantState<PackageManagerType>("package-manager", "npm");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppContext.Provider
      value={{
        openSidebar,
        setOpenSidebar,

        packageManager,
        setPackageManager,

        fileInputRef,
        windowWidth
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
