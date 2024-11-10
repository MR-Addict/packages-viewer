import pageStyle from "../../index.module.css";
import { useLocaleContext } from "@/contexts/locale";

export default function AppVersion() {
  const { t } = useLocaleContext();

  return (
    <section className={pageStyle.container}>
      <h1>{t("App Version", "settings")}</h1>

      <p>{t("Current app version", "settings")}</p>

      <div className={pageStyle.btn}>{APP_VERSION}</div>
    </section>
  );
}
