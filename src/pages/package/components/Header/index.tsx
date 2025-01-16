import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { PiUploadSimple } from "react-icons/pi";

import style from "./index.module.css";
import Select from "@/components/Select";
import useCookieState from "@/hooks/useCookieState";
import useListenKeyDown from "@/hooks/useListenKeyDown";
import copyToClipboard from "@/lib/utils/copyToClipboard";

import { useAppContext } from "@/contexts/app";
import { DependencyType } from "@/types/package";
import { useLocaleContext } from "@/contexts/locale";
import { usePackageContext } from "@/contexts/package";

type CopyOption = "latest" | "original" | "uninstall";
type SelectOption = "all" | "clear" | "updatable" | "dev" | "prod";

function selectDep(deps: DependencyType[], selector: (d: DependencyType) => boolean) {
  return deps.map((d) => ({ name: d.name, data: { selected: selector(d) } }));
}

export default function Header() {
  const { ta, tp } = useLocaleContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const { packageManager, fileInputRef } = useAppContext();
  const { pkg, setSearch, updateDependencies } = usePackageContext();

  const intervalRef = useRef<NodeJS.Timeout>(null);
  const [localSearch, setLocalSearch] = useState("");

  const copyOptions: { label: string; value: CopyOption }[] = (["latest", "original", "uninstall"] as const).map(
    (value) => ({ label: tp(`button.copy.${value}`), value })
  );

  const selectOptions: { label: string; value: SelectOption }[] = (["clear", "updatable", "prod", "dev"] as const).map(
    (value) => ({ label: tp(`button.select.${value}`), value })
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSelect("all");
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setLocalSearch(event.target.value);
    if (intervalRef.current) clearTimeout(intervalRef.current);
    intervalRef.current = setTimeout(() => setSearch(event.target.value), 500);
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!fileInputRef.current) return;
    fileInputRef.current.files = event.target.files;
    fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    useCookieState.set("update-package", pkg.id);
    event.target.value = "";
  }

  function handleSelect(option: SelectOption) {
    const deps = pkg.dependencies;
    if (option === "all") updateDependencies(selectDep(deps, () => true));
    else if (option === "clear") updateDependencies(selectDep(deps, () => false));
    else if (option === "updatable") updateDependencies(selectDep(deps, (d) => d.version !== d.latest));
    else if (option === "prod") updateDependencies(selectDep(deps, (d) => d.type === "prod"));
    else if (option === "dev") updateDependencies(selectDep(deps, (d) => d.type === "dev"));
  }

  function handleCopy(option: CopyOption) {
    // Filter selected dependencies
    const selected = pkg.dependencies.filter((d) => d.selected);
    if (selected.length === 0) return toast.error(tp("copy.dependencies.none"));

    // Generate dependencies string
    const mapVersion = (d: DependencyType) => (option === "latest" ? d.latest || d.version : d.version);
    let dependencies = selected.map((d) => d.name).join(" ");
    if (option !== "uninstall") dependencies = selected.map((d) => `${d.name}@${mapVersion(d)}`).join(" ");

    // Generate sub command
    let subCommand = "";
    const isUninstall = option === "uninstall";
    const isAllDevDeps = selected.every((d) => d.type === "dev") ? " -D" : "";

    if (packageManager === "npm") subCommand = isUninstall ? "uninstall" : "install" + isAllDevDeps;
    else if (packageManager === "yarn") subCommand = isUninstall ? "remove" : "add" + isAllDevDeps;
    else if (packageManager === "pnpm") subCommand = isUninstall ? "remove" : "add" + isAllDevDeps;

    // Generate command
    const command = `${packageManager} ${subCommand} ${dependencies}`;

    // Copy to clipboard
    const res = copyToClipboard(command);
    if (res.success) {
      toast.success(tp("copy.success"));
      updateDependencies(selectDep(pkg.dependencies, () => false));
    } else toast.error(ta(res.message));
  }

  useListenKeyDown(
    (event) => {
      if (event.ctrlKey && event.key.toLocaleLowerCase() === "a") {
        if (document.activeElement === inputRef.current) return;
        event.preventDefault();
        handleSelect("all");
      } else if (event.ctrlKey && event.key.toLocaleLowerCase() === "c") {
        event.preventDefault();
        handleCopy("latest");
      } else if (event.ctrlKey && event.key.toLocaleLowerCase() === "l") {
        event.preventDefault();
        // select input text
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    },
    [pkg]
  );

  return (
    <header className={style.wrapper}>
      <h1 style={{ viewTransitionName: `card-${pkg.id}` }} className="text-lg font-semibold truncate">
        {pkg.name}
      </h1>

      <div className={style.btns}>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            size={8}
            type="text"
            placeholder={`${tp("input.search")}...`}
            className={style.searchbox}
            value={localSearch}
            onChange={handleSearch}
          />
        </form>

        <label className={style.btn}>
          <span>{tp("button.reupload")}</span>
          <input
            type="file"
            className="hidden"
            accept="application/json"
            id="reupload-package-file"
            onChange={handleUpload}
          />
          <PiUploadSimple size={14} />
        </label>

        <Select label={tp("button.select")} options={selectOptions} onChange={(value) => handleSelect(value)} />

        <Select
          label={tp("button.copy")}
          options={copyOptions}
          onChange={(value) => handleCopy(value)}
          inverseLabelStyle
        />
      </div>
    </header>
  );
}
