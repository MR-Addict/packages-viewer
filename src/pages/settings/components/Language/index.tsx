import Tabs from "@/components/Tabs";
import pageStyle from "../../index.module.css";

import { locales } from "@/data/app";
import { useLocaleContext } from "@/contexts/locale";

export default function Language() {
  const { translate, locale, setLocale } = useLocaleContext();
  const ts = (label: string) => translate(label, "settings");

  const options = locales.map((locale) => ({
    label: ts(locale === "en" ? "English" : "Chinese"),
    value: locale
  }));

  return (
    <section className={pageStyle.container}>
      <h1>{ts("Language")}</h1>

      <p>{ts("Change the language of the app")}</p>

      <Tabs value={locale} onChange={setLocale} options={options} />
    </section>
  );
}
