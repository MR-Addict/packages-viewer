import Tabs from "@/components/Tabs";
import pageStyle from "../../index.module.css";

import { packageManagers } from "@/data/app";
import { useAppContext } from "@/contexts/app";
import { useLocaleContext } from "@/contexts/locale";

export default function PackageManager() {
  const { translate } = useLocaleContext();
  const ts = (label: string) => translate(label, "settings");

  const { packageManager, setPackageManager } = useAppContext();

  return (
    <section className={pageStyle.container}>
      <h1>{ts("Package Manager")}</h1>

      <p>{ts("Choose the package manager you use")}</p>

      <Tabs
        value={packageManager}
        onChange={setPackageManager}
        options={packageManagers.map((m) => ({ label: m, value: m }))}
      />
    </section>
  );
}
