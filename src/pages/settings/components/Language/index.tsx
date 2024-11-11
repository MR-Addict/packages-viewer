import Tabs from "@/components/Tabs";
import pageStyle from "../../index.module.css";

import { locales } from "@/data/app";
import { useLocaleContext } from "@/contexts/locale";

function localeMap(locale: string): string {
  switch (locale) {
    case "zh":
      return "Chinese";
    case "ja":
      return "Japanese";
    default:
      return "English";
  }
}

export default function Language() {
  const { translate, locale, setLocale } = useLocaleContext();
  const ts = (label: string) => translate(label, "settings");

  const options = locales.map((locale) => ({ label: ts(localeMap(locale)), value: locale }));

  return (
    <section className={pageStyle.container}>
      <h1>{ts("Language")}</h1>

      <p>{ts("Change the language of the app")}</p>

      <Tabs value={locale} onChange={setLocale} options={options} />
    </section>
  );
}
