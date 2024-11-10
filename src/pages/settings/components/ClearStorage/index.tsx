import { appName } from "@/data/app";

import pageStyle from "../../index.module.css";
import { useLocaleContext } from "@/contexts/locale";

export default function ClearStorage() {
  const { t } = useLocaleContext();

  function handleClick() {
    if (confirm(t("Are you sure you want to clear all the data?", "settings"))) {
      localStorage.clear();
      sessionStorage.clear();
      indexedDB.deleteDatabase(appName.id);
      window.location.href = window.location.pathname;
    }
  }

  return (
    <section className={pageStyle.container}>
      <h1>{t("Clear Storage", "settings")}</h1>

      <p>{t("Clear all the data stored in the app", "settings")}</p>

      <button data-type="inverse" className={pageStyle.btn} onClick={handleClick}>
        {t("Clear", "settings")}
      </button>
    </section>
  );
}
