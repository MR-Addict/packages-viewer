"use client";

import usePersistantState from "@/hooks/usePersistantState";
import { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from "react";

interface AppContextProps {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;

  windowSize: { width: number; height: number };
}

const AppContext = createContext<AppContextProps>({
  openSidebar: false,
  setOpenSidebar: () => {},

  windowSize: { width: 768, height: 0 }
});

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 0 });
  const [openSidebar, setOpenSidebar] = usePersistantState("open-sidebar", false);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppContext.Provider
      value={{
        openSidebar,
        setOpenSidebar,

        windowSize
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
