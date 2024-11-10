import Tabs from "@/components/Tabs";
import pageStyle from "../../index.module.css";

import { themes } from "@/data/app";
import { useAppContext } from "@/contexts/app";
import { useLocaleContext } from "@/contexts/locale";

export default function Theme() {
  const { t } = useLocaleContext();
  const { theme, setTheme } = useAppContext();

  const options = themes.map((theme) => ({ label: t(theme, "settings"), value: theme }));

  return (
    <section className={pageStyle.container}>
      <h1>{t("Theme", "settings")}</h1>

      <p>{t("Change the appearance of the app", "settings")}</p>

      <Tabs value={theme} onChange={setTheme} options={options} />
    </section>
  );
}
