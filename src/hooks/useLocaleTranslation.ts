import { Locale } from "@/types/app";
import { translations } from "@/data/locales";
import { createContext, useContext } from "react";

const LocaleContext = createContext<Locale>("en");

export const LocaleContextProvider = LocaleContext.Provider;

interface Options {
  join?: string;
  truncate?: boolean;
}

const defaultOptions: Options = {
  join: " ",
  truncate: false
};

export default function t(labels: string | string[], options = defaultOptions): string {
  const locale = useContext(LocaleContext);

  options = Object.assign(defaultOptions, options);
  labels = Array.isArray(labels) ? labels : [labels];

  return labels
    .map((label) => {
      const translation = translations.find((t) => t.label === label)?.translations[locale];
      if (translation) return translation;
      else if (options.truncate) return "";
      else return translation || label;
    })
    .join(options.join);
}
