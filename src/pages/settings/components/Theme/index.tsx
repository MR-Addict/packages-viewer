import clsx from "clsx";

import pageStyle from "../../index.module.css";

import setTheme from "@/lib/theme/setTheme";
import usePersistantState from "@/hooks/usePersistantState";

import { themes } from "@/data/app";
import { ThemeType } from "@/types/app";

export default function Theme() {
  const [localTheme, setLocalTheme] = usePersistantState<ThemeType>("theme", "dark");

  function handleClick(t: ThemeType) {
    setTheme(t);
    setLocalTheme(t);
  }

  return (
    <section className={pageStyle.container}>
      <h1>Theme</h1>

      <p>Change the appearance of the application</p>

      <ul className={pageStyle.btns}>
        {themes.map((t) => (
          <li key={t}>
            <button
              onClick={() => handleClick(t)}
              className={clsx(pageStyle.btn, { [pageStyle.active]: localTheme === t })}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
