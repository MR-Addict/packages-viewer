import toast from "react-hot-toast";

import style from "./index.module.css";
import Select from "@/components/Select";
import copyToClipboard from "@/lib/utils/copyToClipboard";

import { useAppContext } from "@/contexts/app";
import { DependencyType } from "@/types/package";
import { useLocaleContext } from "@/contexts/locale";
import { usePackageContext } from "@/contexts/package";

type CopyOption = "latest" | "original";
type SelectOption = "clear" | "updatable" | "dev" | "prod";

function selectDep(deps: DependencyType[], selector: (d: DependencyType) => boolean) {
  return deps.map((d) => ({ name: d.name, data: { selected: selector(d) } }));
}

export default function Header() {
  const { translate } = useLocaleContext();
  const tp = (label: string) => translate(label, "package");

  const { pkg, updateDependencies } = usePackageContext();
  const { packageManager, fileInputRef } = useAppContext();

  const copyOptions: { label: string; value: CopyOption }[] = [
    { label: tp("Latest"), value: "latest" },
    { label: tp("Original"), value: "original" }
  ];

  const selectOptions: { label: string; value: SelectOption }[] = [
    { label: tp("Clear"), value: "clear" },
    { label: tp("Updatable"), value: "updatable" },
    { label: tp("Production"), value: "prod" },
    { label: tp("Development"), value: "dev" }
  ];

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!fileInputRef.current) return;
    fileInputRef.current.files = event.target.files;
    fileInputRef.current.setAttribute("data-pkg-id", pkg.id);
    fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    event.target.value = "";
  }

  function handleSelect(option: SelectOption) {
    const deps = pkg.dependencies;
    if (option === "clear") updateDependencies(selectDep(deps, () => false));
    else if (option === "updatable") updateDependencies(selectDep(deps, (d) => d.version !== d.latest));
    else if (option === "prod") updateDependencies(selectDep(deps, (d) => d.type === "prod"));
    else if (option === "dev") updateDependencies(selectDep(deps, (d) => d.type === "dev"));
  }

  function handleCopy(option: CopyOption) {
    const dependencies = pkg.dependencies.filter((d) => d.selected);
    if (dependencies.length === 0) return toast.error(tp("No dependencies selected"));

    const mapVersion = (d: DependencyType) => (option === "latest" ? d.latest || d.version : d.version);
    const text = dependencies.map((d) => `${d.name}@${mapVersion(d)}`).join(" ");

    let command = "";
    if (packageManager === "npm") command = `npm install ${text}`;
    else if (packageManager === "yarn") command = `yarn add ${text}`;
    else if (packageManager === "pnpm") command = `pnpm add ${text}`;

    const res = copyToClipboard(command);
    if (!res.success) toast.error(translate(res.message, "api"));
    else {
      toast.success(tp("Copied to clipboard"));
      updateDependencies(selectDep(pkg.dependencies, () => false));
    }
  }

  return (
    <header className={style.wrapper}>
      <h1 style={{ viewTransitionName: "pkg-name-" + pkg.id }} className="text-lg font-semibold truncate">
        {pkg.name}
      </h1>

      <div className={style.btns}>
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
