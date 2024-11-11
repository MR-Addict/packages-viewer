import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { CgTrashEmpty } from "react-icons/cg";

import style from "./index.module.css";
import timeInterval from "@/lib/utils/timeInterval";
import startViewTransition from "@/lib/utils/startViewTransition";

import { PackageType } from "@/types/package";
import { useLocaleContext } from "@/contexts/locale";
import { useDatabaseContext } from "@/contexts/database";

export default function Body({ packages }: { packages: PackageType[] }) {
  const db = useDatabaseContext();
  const { translate } = useLocaleContext();
  const ta = (label: string) => translate(label, "api");
  const tps = (label: string) => translate(label, "packages");

  async function handleUpdate(pkg: PackageType) {
    const newName = prompt(tps("Enter new name for this package"), pkg.name);
    if (newName && newName.trim() !== pkg.name) {
      const res = await startViewTransition(() => db.packages.update(pkg.id, { name: newName }));
      if (!res.success) toast.error(ta(res.message));
    }
  }

  async function handleDelete(id: string) {
    if (confirm(tps("Are you sure you want to delete this package?"))) {
      const res = await startViewTransition(() => db.packages.remove(id));
      if (!res.success) toast.error(ta(res.message));
    }
  }

  return (
    <ul className={style.wrapper}>
      {packages.map((pkg) => (
        <li key={pkg.id} className={style.container} style={{ "--card-id": "card-" + pkg.id } as React.CSSProperties}>
          <Link viewTransition to={`/packages/${pkg.id}`} className={style.pkg}>
            <h2 style={{ viewTransitionName: "pkg-name-" + pkg.id }}>{pkg.name}</h2>
            <p className="c-text-800">
              <span>{tps("There're total")} </span>
              <strong>{pkg.dependencies.length}</strong>
              <span> {tps(" dependencies")}</span>
            </p>
            <p className="text-sm c-text-600">{timeInterval(pkg.uploaded)}</p>
          </Link>

          <div className={style.btns}>
            <button type="button" className={style.btn} title={tps("edit")} onClick={() => handleUpdate(pkg)}>
              <TbEdit />
            </button>

            <button type="button" className={style.btn} title={tps("delete")} onClick={() => handleDelete(pkg.id)}>
              <CgTrashEmpty />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
