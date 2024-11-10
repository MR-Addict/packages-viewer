import Tabs from "@/components/Tabs";
import t from "@/hooks/useLocaleTranslation";
import pageStyle from "../../index.module.css";

import { themes } from "@/data/app";
import { useAppContext } from "@/contexts/app";

export default function Theme() {
  const { theme, setTheme } = useAppContext();

  const options = themes.map((theme) => ({ label: t(theme), value: theme }));

  return (
    <section className={pageStyle.container}>
      <h1>{t("Theme")}</h1>

      <p>{t("Change the appearance of the app")}</p>

      <Tabs value={theme} onChange={setTheme} options={options} />
    </section>
  );
}
