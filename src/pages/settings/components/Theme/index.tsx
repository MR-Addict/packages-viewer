import Tabs from "@/components/Tabs";
import setTheme from "@/lib/theme/setTheme";
import pageStyle from "../../index.module.css";
import usePersistantState from "@/hooks/usePersistantState";

import { themes } from "@/data/app";
import { ThemeType } from "@/types/app";

export default function Theme() {
  const [localTheme, setLocalTheme] = usePersistantState<ThemeType>("theme", "dark");

  function handleOnChange(t: ThemeType) {
    setTheme(t);
    setLocalTheme(t);
  }

  return (
    <section className={pageStyle.container}>
      <h1>Theme</h1>

      <p>Change the appearance of the app</p>

      <Tabs value={localTheme} onChange={handleOnChange} options={themes.map((t) => ({ label: t, value: t }))} />
    </section>
  );
}
