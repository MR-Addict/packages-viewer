import locales from "@/locales";
import { createContext, useContext, Dispatch, SetStateAction, useEffect } from "react";

import { Locale } from "@/types/app";
import { appName } from "@/data/app";
import { LocaleScopeType } from "@/types/locale";

import usePersistantState from "@/hooks/usePersistantState";

interface Options {
  truncate?: boolean;
}

const defaultOptions: Options = {
  truncate: false
};

interface LocaleContextProps {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;

  translate: (labels: string | string[], scope: LocaleScopeType, options?: Options) => string;
}

const LocaleContext = createContext<LocaleContextProps>({
  locale: "en",
  setLocale: () => {},

  translate: () => ""
});

interface LocaleContextProviderProps {
  children: React.ReactNode;
}

export const LocaleContextProvider = ({ children }: LocaleContextProviderProps) => {
  const [locale, setLocale] = usePersistantState<Locale>("locale", "en");

  function translate(labels: string | string[], scope: LocaleScopeType, options = defaultOptions): string {
    const join = locale === "en" ? " " : "";

    options = Object.assign(defaultOptions, options);
    labels = Array.isArray(labels) ? labels : [labels];

    return labels
      .map((label) => {
        const translation = locales[scope].find((t) => t.label === label)?.data[locale];
        if (translation) return translation;
        else if (options.truncate) return "";
        else return translation || label;
      })
      .join(join);
  }

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = translate(appName.name, "app");
  }, [locale]);

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,

        translate
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocaleContext = () => useContext(LocaleContext);
