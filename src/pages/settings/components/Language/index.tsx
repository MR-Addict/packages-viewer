import Tabs from "@/components/Tabs";
import pageStyle from "../../index.module.css";

import { langs } from "@/data/app";
import { useLocaleContext } from "@/contexts/locale";

export default function Language() {
  const { ts, lang, setLang } = useLocaleContext();

  const options = langs.map((lang) => ({ label: ts(`section.language.${lang}`), value: lang }));

  return (
    <section className={pageStyle.container}>
      <h1>{ts("section.language.title")}</h1>

      <p>{ts("section.language.description")}</p>

      <Tabs value={lang} onChange={setLang} options={options} />
    </section>
  );
}
