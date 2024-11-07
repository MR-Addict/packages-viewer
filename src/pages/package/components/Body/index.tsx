import { useEffect, useRef, useState } from "react";
import { ImSpinner } from "react-icons/im";

import style from "./index.module.css";
import useSessionState from "@/hooks/useSessionState";
import fetchDependency from "@/lib/package/fetchDependency";

import { usePackageContext } from "@/contexts/package";
import { DependencyType, RemoteDependencyType } from "@/types/package";

function DependencyRow({ dep }: { dep: DependencyType }) {
  const { updateDependencies } = usePackageContext();
  const [fetchStatus, setFetchStatus] = useState<"loading" | "error" | "idle">("loading");
  const [remoteDep, setRemoteDep] = useSessionState<RemoteDependencyType | null>("dep-" + dep.name, null);

  function handleToggleSelect(event: React.ChangeEvent<HTMLInputElement>) {
    updateDependencies([{ name: dep.name, data: { selected: event.target.checked } }]);
  }

  useEffect(() => {
    (async () => {
      if (remoteDep) return setFetchStatus("idle");
      const res = await fetchDependency(dep.name);
      if (res.success) {
        setFetchStatus("idle");
        setRemoteDep(res.data);
        updateDependencies([{ name: dep.name, data: { latest: res.data.version } }]);
      } else setFetchStatus("error");
    })();
  }, [dep.name]);

  return (
    <tr>
      <td>
        <input type="checkbox" checked={dep.selected} onChange={handleToggleSelect} />
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
  const { pkg, updateDependencies } = usePackageContext();
  const checkboxRef = useRef<HTMLInputElement>(null);

  function handleClickCheckbox() {
    const selected = checkboxRef.current?.checked;
    if (selected !== undefined) updateDependencies(pkg.dependencies.map((d) => ({ name: d.name, data: { selected } })));
  }

  useEffect(() => {
    if (!checkboxRef.current) return;
    if (pkg.dependencies.every((dep) => dep.selected)) {
      checkboxRef.current.checked = true;
      checkboxRef.current.indeterminate = false;
    } else if (pkg.dependencies.every((dep) => !dep.selected)) {
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = false;
    } else if (pkg.dependencies.some((dep) => dep.selected)) {
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = true;
    }
  }, [pkg]);

  if (!pkg.dependencies.length) return null;

  return (
    <div className={style.wrapper}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>
              <input ref={checkboxRef} type="checkbox" onClick={handleClickCheckbox} />
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
