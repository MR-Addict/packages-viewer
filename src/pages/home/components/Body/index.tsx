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

  const { ta, th } = useLocaleContext();

  async function handleUpdate(pkg: PackageType) {
    const newName = prompt(th("label.package.update"), pkg.name);
    if (newName && newName.trim() !== pkg.name) {
      const res = await startViewTransition(() => db.packages.update(pkg.id, { name: newName }));
      if (!res.success) toast.error(ta(res.message));
    }
  }

  async function handleDelete(id: string) {
    if (confirm(th("label.package.delete"))) {
      const res = await startViewTransition(() => db.packages.remove(id));
      if (!res.success) toast.error(ta(res.message));
    }
  }

  if (!packages.length) {
    return <section className="flex-1 flex items-center justify-center">{th("label.package.empty")}</section>;
  }

  return (
    <section className={style.wrapper}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>{th("orderby.name")}</th>
            <th>{th("orderby.uploaded")}</th>
            <th>{th("orderby.dependencies")}</th>
            <th>{th("orderby.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id}>
              <td>
                <Link viewTransition style={{ viewTransitionName: `card-${pkg.id}` }} to={`/${pkg.id}`}>
                  {pkg.name}
                </Link>
              </td>
              <td>{timeInterval(pkg.uploaded)}</td>
              <td>{pkg.dependencies.length}</td>
              <td>
                <div className={style.btns}>
                  <button type="button" title={th("button.edit")} onClick={() => handleUpdate(pkg)}>
                    <TbEdit />
                  </button>
                  <button type="button" title={th("button.delete")} onClick={() => handleDelete(pkg.id)}>
                    <CgTrashEmpty />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
