import clsx from "clsx";
import toast from "react-hot-toast";
import { useRef, useState } from "react";

import style from "./index.module.css";
import useClickOutside from "@/hooks/useClickOutside";
import copyToClipboard from "@/lib/utils/copyToClipboard";

import { useAppContext } from "@/contexts/app";
import { DependencyType } from "@/types/package";
import { usePackageContext } from "@/contexts/package";

type SelectOption = "all" | "updatable" | "dev" | "prod";
const selectOptions: { label: string; value: SelectOption }[] = [
  { label: "All", value: "all" },
  { label: "Updatable", value: "updatable" },
  { label: "Production", value: "prod" },
  { label: "Developemnt", value: "dev" }
];

type CopyOption = "latest" | "original";
const copyOptions: { label: string; value: CopyOption }[] = [
  { label: "Latest", value: "latest" },
  { label: "Original", value: "original" }
];

function selectDep(deps: DependencyType[], selector: (d: DependencyType) => boolean) {
  return deps.map((d) => ({ name: d.name, data: { selected: selector(d) } }));
}

export default function Header() {
  const { pkg, updateDependencies } = usePackageContext();
  const { packageManager, fileInputRef } = useAppContext();

  const copyMenuRef = useRef<HTMLDivElement>(null);
  const selectMenuRef = useRef<HTMLDivElement>(null);

  const [expanded, setExpanded] = useState({ select: false, copy: false });

  function handleToggleMenu(type: "select" | "copy") {
    setExpanded((prev) => ({ ...prev, [type]: !prev[type] }));
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!fileInputRef.current) return;
    fileInputRef.current.files = event.target.files;
    fileInputRef.current.setAttribute("data-pkg-id", pkg.id);
    fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    event.target.value = "";
  }

  function handleSelect(option: SelectOption) {
    const deps = pkg.dependencies;
    if (option === "all") updateDependencies(selectDep(deps, () => true));
    else if (option === "updatable") updateDependencies(selectDep(deps, (d) => d.version !== d.latest));
    else if (option === "prod") updateDependencies(selectDep(deps, (d) => d.type === "prod"));
    else if (option === "dev") updateDependencies(selectDep(deps, (d) => d.type === "dev"));
    setExpanded((prev) => ({ ...prev, select: false }));
  }

  function handleCopy(option: CopyOption) {
    setExpanded((prev) => ({ ...prev, copy: false }));
    const dependencies = pkg.dependencies.filter((d) => d.selected);
    if (dependencies.length === 0) return toast.error("No dependencies selected");

    const mapVersion = (d: DependencyType) => (option === "latest" ? d.latest || d.version : d.version);
    const text = dependencies.map((d) => `${d.name}@${mapVersion(d)}`).join(" ");

    let command = "";
    if (packageManager === "npm") command = `npm install ${text}`;
    else if (packageManager === "yarn") command = `yarn add ${text}`;
    else if (packageManager === "pnpm") command = `pnpm add ${text}`;

    const res = copyToClipboard(command);
    if (!res.success) toast.error(res.message);
    else toast.success("Copied to clipboard");
  }

  useClickOutside(() => setExpanded((prev) => ({ ...prev, copy: false })), copyMenuRef);
  useClickOutside(() => setExpanded((prev) => ({ ...prev, select: false })), selectMenuRef);

  return (
    <header className={style.wrapper}>
      <h1 className="text-lg font-semibold">{pkg.name}</h1>

      <div className={style.btns}>
        <label className={style.btn} title="reupload package file">
          Upload
          <input type="file" id="reupload-package-file" className="hidden" onChange={handleUpload} />
        </label>

        <div ref={selectMenuRef} className={style.select}>
          <button type="button" className={style.btn} onClick={() => handleToggleMenu("select")}>
            Select
          </button>

          <div className={clsx(style["select-menu"], { [style.expanded]: expanded.select })}>
            {selectOptions.map((option) => (
              <button key={option.value} type="button" onClick={() => handleSelect(option.value)}>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div ref={copyMenuRef} className={style.select}>
          <button type="button" className={style.btn} data-type="inverse" onClick={() => handleToggleMenu("copy")}>
            Copy
          </button>

          <div className={clsx(style["select-menu"], { [style.expanded]: expanded.copy })}>
            {copyOptions.map((option) => (
              <button key={option.value} type="button" onClick={() => handleCopy(option.value)}>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
