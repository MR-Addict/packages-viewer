import Tabs from "@/components/Tabs";
import pageStyle from "../../index.module.css";

import { themes } from "@/data/app";
import { useAppContext } from "@/contexts/app";

export default function Theme() {
  const { theme, setTheme } = useAppContext();

  return (
    <section className={pageStyle.container}>
      <h1>Theme</h1>

      <p>Change the appearance of the app</p>

      <Tabs value={theme} onChange={setTheme} options={themes.map((t) => ({ label: t, value: t }))} />
    </section>
  );
}
