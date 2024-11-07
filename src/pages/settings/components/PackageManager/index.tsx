import clsx from "clsx";

import pageStyle from "../../index.module.css";
import { packageManagers } from "@/data/app";
import { useAppContext } from "@/contexts/app";

export default function PackageManager() {
  const { packageManager, setPackageManager } = useAppContext();

  return (
    <section className={pageStyle.container}>
      <h1>Package Manager</h1>

      <p>Choose the package manager you want to use</p>

      <ul className={pageStyle.btns}>
        {packageManagers.map((m) => (
          <li key={m}>
            <button
              onClick={() => setPackageManager(m)}
              className={clsx(pageStyle.btn, { [pageStyle.active]: packageManager === m })}
            >
              {m}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
