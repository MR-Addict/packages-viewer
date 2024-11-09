import { useEffect } from "react";

import Tabs from "@/components/Tabs";
import setTheme from "@/lib/theme/setTheme";
import pageStyle from "../../index.module.css";
import usePersistantState from "@/hooks/usePersistantState";

import { themes } from "@/data/app";
import { ThemeType } from "@/types/app";

export default function Theme() {
  const [localTheme, setLocalTheme] = usePersistantState<ThemeType>("theme", "dark");

  useEffect(() => {
    // listen manually local theme change
    const handleChange = () => setTheme(localTheme);
    handleChange();

    // listen system preference change
    if (localTheme !== "system") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [localTheme]);

  return (
    <section className={pageStyle.container}>
      <h1>Theme</h1>

      <p>Change the appearance of the app</p>

      <Tabs value={localTheme} onChange={setLocalTheme} options={themes.map((t) => ({ label: t, value: t }))} />
    </section>
  );
}
