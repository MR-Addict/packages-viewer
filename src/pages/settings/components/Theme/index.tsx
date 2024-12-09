import Tabs from "@/components/Tabs";
import pageStyle from "../../index.module.css";

import { themes } from "@/data/app";
import { useAppContext } from "@/contexts/app";
import { useLocaleContext } from "@/contexts/locale";

export default function Theme() {
  const { ts } = useLocaleContext();

  const { theme, setTheme } = useAppContext();

  const options = themes.map((theme) => ({ label: ts(`section.theme.${theme}`), value: theme }));

  return (
    <section className={pageStyle.container}>
      <h1>{ts("section.theme.title")}</h1>

      <p>{ts("section.theme.description")}</p>

      <Tabs value={theme} onChange={setTheme} options={options} />
    </section>
  );
}
