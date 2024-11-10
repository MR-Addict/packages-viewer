import Tabs from "@/components/Tabs";
import pageStyle from "../../index.module.css";

import { packageManagers } from "@/data/app";
import { useAppContext } from "@/contexts/app";
import { useLocaleContext } from "@/contexts/locale";

export default function PackageManager() {
  const { t } = useLocaleContext();
  const { packageManager, setPackageManager } = useAppContext();

  return (
    <section className={pageStyle.container}>
      <h1>{t("Package Manager", "settings")}</h1>

      <p>{t("Choose the package manager you use", "settings")}</p>

      <Tabs
        value={packageManager}
        onChange={setPackageManager}
        options={packageManagers.map((m) => ({ label: m, value: m }))}
      />
    </section>
  );
}
