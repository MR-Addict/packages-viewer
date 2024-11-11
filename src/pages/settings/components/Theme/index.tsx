import Tabs from "@/components/Tabs";
import pageStyle from "../../index.module.css";

import { themes } from "@/data/app";
import { useAppContext } from "@/contexts/app";
import { useLocaleContext } from "@/contexts/locale";

export default function Theme() {
  const { translate } = useLocaleContext();
  const ts = (label: string) => translate(label, "settings");

  const { theme, setTheme } = useAppContext();

  const options = themes.map((theme) => ({ label: ts(theme), value: theme }));

  return (
    <section className={pageStyle.container}>
      <h1>{ts("Theme")}</h1>

      <p>{ts("Change the appearance of the app")}</p>

      <Tabs value={theme} onChange={setTheme} options={options} />
    </section>
  );
}
