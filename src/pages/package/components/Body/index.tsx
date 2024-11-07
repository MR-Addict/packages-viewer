import { useEffect } from "react";
import { ImSpinner } from "react-icons/im";

import style from "./index.module.css";
import useSessionState from "@/hooks/useSessionState";
import fetchDependency from "@/lib/package/fetchDependency";

import { usePackageContext } from "@/contexts/package";
import { DependencyType, RemoteDependencyType } from "@/types/package";

function DependencyRow({ dep }: { dep: DependencyType }) {
  const [remoteDep, setRemoteDep] = useSessionState<RemoteDependencyType | null>("dep-" + dep.name, null);
  const [fetchStatus, setFetchStatus] = useSessionState<"loading" | "error" | "idle">("fetch-" + dep.name, "loading");

  useEffect(() => {
    (async () => {
      if (remoteDep) return setFetchStatus("idle");
      const res = await fetchDependency(dep.name);
      if (res.success) {
        setFetchStatus("idle");
        setRemoteDep(res.data);
      } else setFetchStatus("error");
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
      <td>
        {fetchStatus === "loading" && <ImSpinner className="animate-spin" />}
        {fetchStatus === "error" && (
          <p data-status="error" className={style.chip}>
            Error
          </p>
        )}
        {fetchStatus === "idle" && remoteDep && (
          <p data-status={remoteDep.version !== dep.version && "success"} className={style.chip}>
            {remoteDep.version}
          </p>
        )}
      </td>
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
