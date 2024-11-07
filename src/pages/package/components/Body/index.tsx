import { useEffect } from "react";

import style from "./index.module.css";
import useSessionState from "@/hooks/useSessionState";
import fetchDependency from "@/lib/package/fetchDependency";

import { usePackageContext } from "@/contexts/package";
import { DependencyType, RemoteDependencyType } from "@/types/package";

function DependencyRow({ dep }: { dep: DependencyType }) {
  const [remoteDep, setRemoteDep] = useSessionState<RemoteDependencyType | null>("dep-" + dep.name, null);

  useEffect(() => {
    (async () => {
      if (remoteDep) return;
      const res = await fetchDependency(dep.name);
      if (res.success) setRemoteDep(res.data);
      else setRemoteDep(null);
    })();
  }, [dep.name]);

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{dep.name}</td>
      <td>{dep.type}</td>
      <td>{dep.version}</td>
      <td>{remoteDep?.version}</td>
    </tr>
  );
}

export default function Body() {
  const { pkg } = usePackageContext();

  if (!pkg.dependencies.length) return null;

  return (
    <div className={style.wrapper}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Package</th>
            <th>Type</th>
            <th>Version</th>
            <th>Latest</th>
          </tr>
        </thead>
        <tbody>
          {pkg.dependencies.map((dep) => (
            <DependencyRow key={dep.name} dep={dep} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
