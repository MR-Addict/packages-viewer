import pageStyle from "../../index.module.css";
import { useLocaleContext } from "@/contexts/locale";

export default function AppVersion() {
  const { ts } = useLocaleContext();

  return (
    <section className={pageStyle.container}>
      <h1>{ts("section.version.title")}</h1>

      <p>{ts("section.version.description")}</p>

      <div className={pageStyle.btn}>{APP_VERSION}</div>
    </section>
  );
}
