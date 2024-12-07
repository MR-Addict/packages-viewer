import toast from "react-hot-toast";
import { useRef, useState } from "react";

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
  const { translate } = useLocaleContext();
  const tp = (label: string) => translate(label, "package");

  const inputRef = useRef<HTMLInputElement>(null);
  const { packageManager, fileInputRef } = useAppContext();
  const { pkg, setSearch, updateDependencies } = usePackageContext();

  const intervalRef = useRef<NodeJS.Timeout>();
  const [localSearch, setLocalSearch] = useState("");

  const copyOptions: { label: string; value: CopyOption }[] = [
    { label: tp("Latest"), value: "latest" },
    { label: tp("Original"), value: "original" },
    { label: tp("Uninstall"), value: "uninstall" }
  ];

  const selectOptions: { label: string; value: SelectOption }[] = [
    { label: tp("Clear"), value: "clear" },
    { label: tp("Updatable"), value: "updatable" },
    { label: tp("Production"), value: "prod" },
    { label: tp("Development"), value: "dev" }
  ];

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
    if (selected.length === 0) return toast.error(tp("No dependencies selected"));

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
      toast.success(tp("Copied to clipboard"));
      updateDependencies(selectDep(pkg.dependencies, () => false));
    } else toast.error(translate(res.message, "api"));
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
      <h1 style={{ viewTransitionName: "pkg-" + pkg.id }} className="text-lg font-semibold truncate">
        {pkg.name}
      </h1>

      <div className={style.btns}>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            size={8}
            type="text"
            placeholder={`${tp("Search")}...`}
            className={style.searchbox}
            value={localSearch}
            onChange={handleSearch}
          />
        </form>

        <label className={style.btn}>
          {tp("Upload")}
          <input
            type="file"
            accept="application/json"
            id="reupload-package-file"
            className="hidden"
            onChange={handleUpload}
          />
        </label>

        <Select label={tp("Select")} options={selectOptions} onChange={(value) => handleSelect(value)} />

        <Select label={tp("Copy")} options={copyOptions} onChange={(value) => handleCopy(value)} inverseLabelStyle />
      </div>
    </header>
  );
}
