import clsx from "clsx";
import { useRef, useState } from "react";

import style from "./index.module.css";
import useClickOutside from "@/hooks/useClickOutside";

import { DependencyType } from "@/types/package";
import { usePackageContext } from "@/contexts/package";

type SelectOption = "all" | "updatable" | "dev" | "prod";

const options: { label: string; value: SelectOption }[] = [
  { label: "All", value: "all" },
  { label: "Updatable", value: "updatable" },
  { label: "Production", value: "prod" },
  { label: "Developemnt", value: "dev" }
];

function selectDep(deps: DependencyType[], selector: (d: DependencyType) => boolean) {
  return deps.map((d) => ({ name: d.name, data: { selected: selector(d) } }));
}

export default function Header() {
  const { pkg, updateDependencies } = usePackageContext();

  const menuRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useClickOutside(() => setExpanded(false), menuRef);

  function handleClickSelect(option: SelectOption) {
    setExpanded(false);
    const deps = pkg.dependencies;
    if (option === "all") updateDependencies(selectDep(deps, () => true));
    else if (option === "updatable") updateDependencies(selectDep(deps, (d) => d.version !== d.latest));
    else if (option === "prod") updateDependencies(selectDep(deps, (d) => d.type === "prod"));
    else if (option === "dev") updateDependencies(selectDep(deps, (d) => d.type === "dev"));
  }

  return (
    <header className={style.wrapper}>
      <h1 className="text-lg font-semibold">{pkg.name}</h1>

      <div className={style.btns}>
        <div ref={menuRef} className={style.select}>
          <button type="button" className={style["toggle-menu"]} onClick={() => setExpanded((prev) => !prev)}>
            Select
          </button>

          <div className={clsx(style["select-menu"], { [style.expanded]: expanded })}>
            {options.map((option) => (
              <button key={option.value} type="button" onClick={() => handleClickSelect(option.value)}>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
