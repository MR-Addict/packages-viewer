import Tabs from "@/components/Tabs";
import pageStyle from "../../index.module.css";

import { packageManagers } from "@/data/app";
import { useAppContext } from "@/contexts/app";
import { useLocaleContext } from "@/contexts/locale";

export default function PackageManager() {
  const { ts } = useLocaleContext();

  const { packageManager, setPackageManager } = useAppContext();

  return (
    <section className={pageStyle.container}>
      <h1>{ts("section.packageManager.title")}</h1>

      <p>{ts("section.packageManager.description")}</p>

      <Tabs
        value={packageManager}
        onChange={setPackageManager}
        options={packageManagers.map((m) => ({ label: m, value: m }))}
      />
    </section>
  );
}
