import t from "@/hooks/useLocaleTranslation";
import pageStyle from "../../index.module.css";

export default function AppVersion() {
  return (
    <section className={pageStyle.container}>
      <h1>{t("App Version")}</h1>

      <p>{t("Current app version")}</p>

      <div className={pageStyle.btn}>{APP_VERSION}</div>
    </section>
  );
}
