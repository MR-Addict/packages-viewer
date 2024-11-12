import { ImSpinner } from "react-icons/im";
import { useEffect, useMemo, useRef, useState } from "react";

import style from "./index.module.css";
import SessionState from "@/lib/utils/SessionState";
import fetchDependency from "@/lib/package/fetchDependency";

import { DependencyType } from "@/types/package";
import { useLocaleContext } from "@/contexts/locale";
import { usePackageContext } from "@/contexts/package";

type FetchStatus = "loading" | "error" | "idle";

function DependencyRow({ dep }: { dep: DependencyType }) {
  const { translate } = useLocaleContext();
  const tp = (label: string) => translate(label, "package");
  const sessionState = useMemo(() => new SessionState<string>(`dep-${dep.name}`), []);

  const { updateDependencies } = usePackageContext();
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(dep.latest ? "idle" : "loading");

  function handleToggleSelect() {
    updateDependencies([{ name: dep.name, data: { selected: !dep.selected } }]);
  }

  useEffect(() => {
    (async () => {
      // If the latest version is already fetched, return
      if (dep.latest) return;
      let cached = sessionState.get();

      // If the latest version is cached, update the state and return
      if (cached) {
        setFetchStatus("idle");
        updateDependencies([{ name: dep.name, data: { latest: cached } }]);
        return;
      }

      // Fetch the latest version of the dependency
      const res = await fetchDependency(dep.name);
      if (!res.success) setFetchStatus("error");
      else {
        setFetchStatus("idle");
        sessionState.set(res.data.version);
        updateDependencies([{ name: dep.name, data: { latest: res.data.version } }]);
      }
    })();
  }, []);

  return (
    <tr onClick={handleToggleSelect} style={{ viewTransitionName: "dep-" + dep.name }}>
      <td>
        <input type="checkbox" checked={dep.selected} onChange={() => {}} aria-label="select dependency" />
      </td>
      <td>{dep.name}</td>
      <td>{tp(dep.type)}</td>
      <td>{dep.version}</td>
      <td>
        {fetchStatus === "loading" && <ImSpinner className="animate-spin" />}
        {fetchStatus === "error" && (
          <p data-status="error" className={style.chip}>
            {tp("Error")}
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
  const { translate } = useLocaleContext();
  const tp = (label: string) => translate(label, "package");

  const checkboxRef = useRef<HTMLInputElement>(null);
  const { pkg, updateDependencies } = usePackageContext();

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
  }, [pkg.dependencies]);

  if (!pkg.dependencies.length) return null;

  return (
    <div className={style.wrapper}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>
              <input ref={checkboxRef} type="checkbox" onClick={handleClickCheckbox} aria-label="toggle selections" />
            </th>
            <th>{tp("Name")}</th>
            <th>{tp("Type")}</th>
            <th>{tp("Version")}</th>
            <th>{tp("Latest")}</th>
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
