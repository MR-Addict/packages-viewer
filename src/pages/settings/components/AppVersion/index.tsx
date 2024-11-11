import pageStyle from "../../index.module.css";
import { useLocaleContext } from "@/contexts/locale";

export default function AppVersion() {
  const { translate } = useLocaleContext();
  const ts = (label: string) => translate(label, "settings");

  return (
    <section className={pageStyle.container}>
      <h1>{ts("App Version")}</h1>

      <p>{ts("Current app version")}</p>

      <div className={pageStyle.btn}>{APP_VERSION}</div>
    </section>
  );
}
