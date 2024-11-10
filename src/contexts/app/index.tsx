"use client";

import { createContext, useContext, Dispatch, SetStateAction, useEffect, useRef } from "react";

import setTheme from "@/lib/theme/setTheme";
import usePersistantState from "@/hooks/usePersistantState";
import { LocaleContextProvider } from "@/hooks/useLocaleTranslation";
import { Locale, PackageManagerType, ThemeType } from "@/types/app";

interface AppContextProps {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;

  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;

  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;

  packageManager: PackageManagerType;
  setPackageManager: Dispatch<SetStateAction<PackageManagerType>>;

  fileInputRef: React.RefObject<HTMLInputElement>;
  windowWidth: number;
}

const AppContext = createContext<AppContextProps>({
  locale: "zh",
  setLocale: () => {},

  theme: "dark",
  setTheme: () => {},

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

  const [locale, setLocale] = usePersistantState<Locale>("locale", "zh");
  const [theme, _setTheme] = usePersistantState<ThemeType>("theme", "dark");
  const [openSidebar, setOpenSidebar] = usePersistantState("open-sidebar", false);
  const [windowWidth, setWindowWidth] = usePersistantState("window-size", window.innerWidth);
  const [packageManager, setPackageManager] = usePersistantState<PackageManagerType>("package-manager", "npm");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

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
        locale,
        setLocale,

        theme,
        setTheme: _setTheme,

        openSidebar,
        setOpenSidebar,

        packageManager,
        setPackageManager,

        fileInputRef,
        windowWidth
      }}
    >
      <LocaleContextProvider value={locale}>{children}</LocaleContextProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
