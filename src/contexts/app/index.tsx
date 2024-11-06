"use client";

import usePersistantState from "@/hooks/usePersistantState";
import { createContext, useContext, Dispatch, SetStateAction } from "react";

interface AppContextProps {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps>({
  openSidebar: false,
  setOpenSidebar: () => {}
});

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [openSidebar, setOpenSidebar] = usePersistantState("open-sidebar", true);

  return (
    <AppContext.Provider
      value={{
        openSidebar,
        setOpenSidebar
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
