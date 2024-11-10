import { ImSpinner } from "react-icons/im";
import { useEffect, useRef, useState } from "react";

import style from "./index.module.css";
import useSessionState from "@/hooks/useSessionState";
import fetchDependency from "@/lib/package/fetchDependency";

import { useLocaleContext } from "@/contexts/locale";
import { usePackageContext } from "@/contexts/package";
import { DependencyType, RemoteDependencyType } from "@/types/package";

function DependencyRow({ dep }: { dep: DependencyType }) {
  const { updateDependencies } = usePackageContext();
  const [fetchStatus, setFetchStatus] = useState<"loading" | "error" | "idle">("loading");
  const [remoteDep, setRemoteDep] = useSessionState<RemoteDependencyType | null>("dep-" + dep.name, null);

  function handleToggleSelect() {
    updateDependencies([{ name: dep.name, data: { selected: !dep.selected } }]);
  }

  useEffect(() => {
    (async () => {
      let cacheDep = remoteDep;

      // Fetch dependency if not cached
      if (!cacheDep) {
        const res = await fetchDependency(dep.name);
        if (res.success) cacheDep = res.data;
        else cacheDep = null;
      }

      if (cacheDep) {
        setRemoteDep(cacheDep);
        setFetchStatus("idle");
        updateDependencies([{ name: dep.name, data: { latest: cacheDep.version } }]);
      } else {
        setRemoteDep(null);
        setFetchStatus("error");
        updateDependencies([{ name: dep.name, data: { latest: null } }]);
      }
    })();
  }, [dep.name, dep.latest]);

  return (
    <tr onClick={handleToggleSelect}>
      <td>
        <input type="checkbox" checked={dep.selected} onChange={() => {}} aria-label="select dependency" />
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
        {fetchStatus === "idle" && dep.latest && (
          <p data-status={dep.latest !== dep.version && "success"} className={style.chip}>
            {dep.latest}
          </p>
        )}
      </td>
    </tr>
  );
}

export default function Body() {
  const { t } = useLocaleContext();
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
              <input ref={checkboxRef} type="checkbox" onClick={handleClickCheckbox} aria-label="toggle selections" />
            </th>
            <th>{t("Name", "packageDetail")}</th>
            <th>{t("Type", "packageDetail")}</th>
            <th>{t("Version", "packageDetail")}</th>
            <th>{t("Latest Version", "packageDetail")}</th>
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
