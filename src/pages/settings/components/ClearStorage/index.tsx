import { appName } from "@/data/app";

import pageStyle from "../../index.module.css";
import { useLocaleContext } from "@/contexts/locale";

export default function ClearStorage() {
  const { ts } = useLocaleContext();

  function handleClick() {
    if (confirm(ts("section.clearStorage.confirm"))) {
      localStorage.clear();
      sessionStorage.clear();
      indexedDB.deleteDatabase(appName.id);
      window.location.href = window.location.pathname;
    }
  }

  return (
    <section className={pageStyle.container}>
      <h1>{ts("section.clearStorage.title")}</h1>

      <p>{ts("section.clearStorage.description")}</p>

      <button data-type="inverse" className={pageStyle.btn} onClick={handleClick}>
        {ts("section.clearStorage.button")}
      </button>
    </section>
  );
}
