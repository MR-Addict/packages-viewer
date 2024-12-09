import format from "string-template";
import { createContext, useContext, Dispatch, SetStateAction, useEffect } from "react";

import { Lang } from "@/types/locale";
import { appName } from "@/data/app";
import { LocaleScopeType } from "@/types/locale";

import locales from "@/locales";
import usePersistantState from "@/hooks/usePersistantState";

interface Options {
  omitNoLocale?: boolean;
  template?: any;
}

const defaultOptions: Options = {
  omitNoLocale: false
};

interface LocaleContextProps {
  lang: Lang;
  setLang: Dispatch<SetStateAction<Lang>>;

  translate: (labels: string | string[], scope: LocaleScopeType, options?: Options) => string;
  tr: (labels: string | string[], options?: Options) => string;
  ta: (labels: string | string[], options?: Options) => string;
  th: (labels: string | string[], options?: Options) => string;
  ts: (labels: string | string[], options?: Options) => string;
  tp: (labels: string | string[], options?: Options) => string;
  tt: (labels: string | string[], options?: Options) => string;
}

const LocaleContext = createContext<LocaleContextProps>({
  lang: "en",
  setLang: () => {},

  translate: () => "",
  tr: () => "",
  ta: () => "",
  th: () => "",
  ts: () => "",
  tp: () => "",
  tt: () => ""
});

interface LocaleContextProviderProps {
  children: React.ReactNode;
}

export const LocaleContextProvider = ({ children }: LocaleContextProviderProps) => {
  const [lang, setLang] = usePersistantState<Lang>("lang", () => {
    const lang = navigator.language.slice(0, 2);
    return lang === "en" ? "en" : "zh";
  });

  function translate(labels: string | string[], scope: LocaleScopeType, options = defaultOptions): string {
    const join = lang === "en" ? " " : "";

    options = Object.assign({}, defaultOptions, options);
    labels = Array.isArray(labels) ? labels : [labels];

    const translatedLabels = labels.map((label) => {
      const translation = locales[scope].find((t) => t.label === label)?.data[lang];
      if (!translation) return options.omitNoLocale ? "" : label;
      return format(translation, options.template);
    });

    return translatedLabels.join(join);
  }

  const macros = {
    tr: (labels: string | string[], options = defaultOptions) => translate(labels, "root", options),
    ta: (labels: string | string[], options = defaultOptions) => translate(labels, "api", options),
    th: (labels: string | string[], options = defaultOptions) => translate(labels, "home", options),
    ts: (labels: string | string[], options = defaultOptions) => translate(labels, "settings", options),
    tp: (labels: string | string[], options = defaultOptions) => translate(labels, "package", options),
    tt: (labels: string | string[], options = defaultOptions) => translate(labels, "time", options)
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = macros.tr(appName.id);
  }, [lang]);

  return (
    <LocaleContext.Provider
      value={{
        lang,
        setLang,

        translate,
        ...macros
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocaleContext = () => useContext(LocaleContext);
