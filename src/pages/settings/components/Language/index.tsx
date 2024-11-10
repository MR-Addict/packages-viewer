import Tabs from "@/components/Tabs";
import pageStyle from "../../index.module.css";
import t from "@/hooks/useLocaleTranslation";

import { locales } from "@/data/app";
import { useAppContext } from "@/contexts/app";

export default function Language() {
  const { locale, setLocale } = useAppContext();

  const options = locales.map((locale) => ({ label: t(locale === "en" ? "English" : "Chinese"), value: locale }));

  return (
    <section className={pageStyle.container}>
      <h1>{t("Language")}</h1>

      <p>{t("Change the language of the app")}</p>

      <Tabs value={locale} onChange={setLocale} options={options} />
    </section>
  );
}
