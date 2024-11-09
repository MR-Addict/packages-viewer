import Tabs from "@/components/Tabs";
import pageStyle from "../../index.module.css";
import { packageManagers } from "@/data/app";
import { useAppContext } from "@/contexts/app";

export default function PackageManager() {
  const { packageManager, setPackageManager } = useAppContext();

  return (
    <section className={pageStyle.container}>
      <h1>Package Manager</h1>

      <p>Choose the package manager you want to use</p>

      <Tabs
        value={packageManager}
        onChange={setPackageManager}
        options={packageManagers.map((m) => ({ label: m, value: m }))}
      />
    </section>
  );
}
