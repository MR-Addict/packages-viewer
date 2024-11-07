"use client";

import usePersistantState from "@/hooks/usePersistantState";
import { createContext, useContext, Dispatch, SetStateAction, useEffect } from "react";

const defaultWindowSize = { width: 1024, height: 0 };

interface AppContextProps {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;

  windowSize: { width: number; height: number };
}

const AppContext = createContext<AppContextProps>({
  openSidebar: false,
  setOpenSidebar: () => {},

  windowSize: defaultWindowSize
});

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [openSidebar, setOpenSidebar] = usePersistantState("open-sidebar", false);
  const [windowSize, setWindowSize] = usePersistantState("window-size", defaultWindowSize);

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
