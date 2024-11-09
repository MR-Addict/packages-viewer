import { app } from "@/data/app";
import pageStyle from "../../index.module.css";

export default function ClearStorage() {
  function handleClick() {
    if (confirm("Are you sure you want to clear all the data?")) {
      localStorage.clear();
      sessionStorage.clear();
      indexedDB.deleteDatabase(app.id);
      window.location.href = window.location.pathname;
    }
  }

  return (
    <section className={pageStyle.container}>
      <h1>Clear Storage</h1>

      <p>Clear all the data stored in the app</p>

      <button data-type="inverse" className={pageStyle.btn} onClick={handleClick}>
        Clear
      </button>
    </section>
  );
}
