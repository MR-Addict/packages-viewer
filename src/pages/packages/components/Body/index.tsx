import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { CgTrashEmpty } from "react-icons/cg";

import style from "./index.module.css";
import t from "@/hooks/useLocaleTranslation";
import timeInterval from "@/lib/utils/timeInterval";
import startViewTransition from "@/lib/utils/startViewTransition";

import { PackageType } from "@/types/package";
import { useDatabaseContext } from "@/contexts/database";

export default function Body({ packages }: { packages: PackageType[] }) {
  const db = useDatabaseContext();

  const promptMessage = t("Enter new name for this package");
  const confirmMessage = t("Are you sure you want to delete this package?");

  async function handleUpdate(pkg: PackageType) {
    const newName = prompt(promptMessage, pkg.name);
    if (newName && newName.trim() !== pkg.name) {
      const res = await startViewTransition(() => db.packages.update(pkg.id, { name: newName }));
      if (!res.success) toast.error(res.message);
    }
  }

  async function handleDelete(id: string) {
    if (confirm(confirmMessage)) {
      const res = await startViewTransition(() => db.packages.remove(id));
      if (!res.success) toast.error(res.message);
    }
  }

  return (
    <ul className={style.wrapper}>
      {packages.map((pkg) => (
        <li key={pkg.id} className={style.container} style={{ "--card-id": "card-" + pkg.id } as React.CSSProperties}>
          <Link viewTransition to={`/packages/${pkg.id}`} className={style.pkg}>
            <h2 style={{ viewTransitionName: "pkg-name-" + pkg.id }}>{pkg.name}</h2>
            <p className="c-text-800">
              <span>{t("There're total")} </span>
              <strong>{pkg.dependencies.length}</strong>
              <span> {t(" dependencies")}</span>
            </p>
            <p className="text-sm c-text-600">{t(timeInterval(pkg.uploaded).split(" "), { join: "" })}</p>
          </Link>

          <div className={style.btns}>
            <button type="button" className={style.btn} title="edit" onClick={() => handleUpdate(pkg)}>
              <TbEdit />
            </button>

            <button type="button" className={style.btn} title="delete" onClick={() => handleDelete(pkg.id)}>
              <CgTrashEmpty />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
