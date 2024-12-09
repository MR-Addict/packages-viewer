import { createContext, useContext, Dispatch, SetStateAction, useEffect, useRef, useMemo } from "react";

import setTheme from "@/lib/theme/setTheme";
import usePersistantState from "@/hooks/usePersistantState";
import { PackageManagerType, ThemeType } from "@/types/app";

interface AppContextProps {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;

  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;

  packageManager: PackageManagerType;
  setPackageManager: Dispatch<SetStateAction<PackageManagerType>>;

  fileInputRef: React.RefObject<HTMLInputElement>;
  windowWidth: number;
  pwaInstalled: boolean;
}

const AppContext = createContext<AppContextProps>({
  theme: "dark",
  setTheme: () => {},

  openSidebar: false,
  setOpenSidebar: () => {},

  packageManager: "npm",
  setPackageManager: () => {},

  fileInputRef: { current: null },
  windowWidth: 1024,
  pwaInstalled: false
});

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pwaInstalled = useMemo(() => window.matchMedia("(display-mode: standalone)").matches, []);

  const [theme, _setTheme] = usePersistantState<ThemeType>("theme", "dark");
  const [openSidebar, setOpenSidebar] = usePersistantState("open-sidebar", false);
  const [windowWidth, setWindowWidth] = usePersistantState("window-size", window.innerWidth);
  const [packageManager, setPackageManager] = usePersistantState<PackageManagerType>("package-manager", "npm");

  useEffect(() => {
    if (!pwaInstalled) return;

    const disableContextMenu = (e: Event) => e.preventDefault();
    const disableDevtools = (e: KeyboardEvent) => e.key === "F12" && e.preventDefault();

    // disable context menu
    document.addEventListener("contextmenu", disableContextMenu);
    // prevent opening devtools
    document.addEventListener("keydown", disableDevtools);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("keydown", disableDevtools);
    };
  }, [pwaInstalled]);

  useEffect(() => {
    // listen manually local theme change
    const handleChange = () => setTheme(theme);
    handleChange();

    // listen system preference change
    if (theme !== "system") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme: _setTheme,

        openSidebar,
        setOpenSidebar,

        packageManager,
        setPackageManager,

        fileInputRef,
        windowWidth,
        pwaInstalled
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
