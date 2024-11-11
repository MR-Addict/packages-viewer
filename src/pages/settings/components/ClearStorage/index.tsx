import { appName } from "@/data/app";

import pageStyle from "../../index.module.css";
import { useLocaleContext } from "@/contexts/locale";

export default function ClearStorage() {
  const { translate } = useLocaleContext();
  const ts = (label: string) => translate(label, "settings");

  function handleClick() {
    if (confirm(ts("Are you sure you want to clear all the data?"))) {
      localStorage.clear();
      sessionStorage.clear();
      indexedDB.deleteDatabase(appName.id);
      window.location.href = window.location.pathname;
    }
  }

  return (
    <section className={pageStyle.container}>
      <h1>{ts("Clear Storage")}</h1>

      <p>{ts("Clear all the data stored in the app")}</p>

      <button data-type="inverse" className={pageStyle.btn} onClick={handleClick}>
        {ts("Clear")}
      </button>
    </section>
  );
}
