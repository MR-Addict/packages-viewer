import Tabs from "@/components/Tabs";
import pageStyle from "../../index.module.css";

import { locales } from "@/data/app";
import { useLocaleContext } from "@/contexts/locale";

export default function Language() {
  const { t, locale, setLocale } = useLocaleContext();

  const options = locales.map((locale) => ({
    label: t(locale === "en" ? "English" : "Chinese", "settings"),
    value: locale
  }));

  return (
    <section className={pageStyle.container}>
      <h1>{t("Language", "settings")}</h1>

      <p>{t("Change the language of the app", "settings")}</p>

      <Tabs value={locale} onChange={setLocale} options={options} />
    </section>
  );
}
