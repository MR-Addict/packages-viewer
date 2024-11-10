import toast from "react-hot-toast";

import style from "./index.module.css";
import Select from "@/components/Select";
import t from "@/hooks/useLocaleTranslation";
import copyToClipboard from "@/lib/utils/copyToClipboard";

import { useAppContext } from "@/contexts/app";
import { DependencyType } from "@/types/package";
import { usePackageContext } from "@/contexts/package";

type CopyOption = "latest" | "original";
type SelectOption = "clear" | "updatable" | "dev" | "prod";

function selectDep(deps: DependencyType[], selector: (d: DependencyType) => boolean) {
  return deps.map((d) => ({ name: d.name, data: { selected: selector(d) } }));
}

export default function Header() {
  const { pkg, updateDependencies } = usePackageContext();
  const { packageManager, fileInputRef } = useAppContext();

  const messages = {
    noDependencies: t("No dependencies selected"),
    copid: t("Copied to clipboard")
  };

  const copyOptions: { label: string; value: CopyOption }[] = [
    { label: t("Latest"), value: "latest" },
    { label: t("Original"), value: "original" }
  ];

  const selectOptions: { label: string; value: SelectOption }[] = [
    { label: t("Clear"), value: "clear" },
    { label: t("Updatable"), value: "updatable" },
    { label: t("Production"), value: "prod" },
    { label: t("Development"), value: "dev" }
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
    if (dependencies.length === 0) return toast.error(messages.noDependencies);

    const mapVersion = (d: DependencyType) => (option === "latest" ? d.latest || d.version : d.version);
    const text = dependencies.map((d) => `${d.name}@${mapVersion(d)}`).join(" ");

    let command = "";
    if (packageManager === "npm") command = `npm install ${text}`;
    else if (packageManager === "yarn") command = `yarn add ${text}`;
    else if (packageManager === "pnpm") command = `pnpm add ${text}`;

    const res = copyToClipboard(command);
    if (!res.success) toast.error(res.message);
    else toast.success(messages.copid);
  }

  return (
    <header className={style.wrapper}>
      <h1 style={{ viewTransitionName: "pkg-name-" + pkg.id }} className="text-lg font-semibold truncate">
        {pkg.name}
      </h1>

      <div className={style.btns}>
        <label className={style.btn}>
          {t("Upload")}
          <input type="file" id="reupload-package-file" className="hidden" onChange={handleUpload} />
        </label>

        <Select label={t("Select")} options={selectOptions} onChange={(value) => handleSelect(value)} />
        <Select label={t("Copy")} options={copyOptions} onChange={(value) => handleCopy(value)} inverseLabelStyle />
      </div>
    </header>
  );
}
