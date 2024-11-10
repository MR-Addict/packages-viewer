import { app } from "@/data/app";

import t from "@/hooks/useLocaleTranslation";
import pageStyle from "../../index.module.css";

export default function ClearStorage() {
  const clearMessage = t("Are you sure you want to clear all the data?");

  function handleClick() {
    if (confirm(clearMessage)) {
      localStorage.clear();
      sessionStorage.clear();
      indexedDB.deleteDatabase(app.id);
      window.location.href = window.location.pathname;
    }
  }

  return (
    <section className={pageStyle.container}>
      <h1>{t("Clear Storage")}</h1>

      <p>{t("Clear all the data stored in the app")}</p>

      <button data-type="inverse" className={pageStyle.btn} onClick={handleClick}>
        {t("Clear")}
      </button>
    </section>
  );
}
