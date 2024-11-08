import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { CgTrashEmpty } from "react-icons/cg";

import style from "./index.module.css";
import timeInterval from "@/lib/utils/timeInterval";

import { PackageType } from "@/types/package";
import { useDatabaseContext } from "@/contexts/database";

export default function Body({ packages }: { packages: PackageType[] }) {
  const db = useDatabaseContext();

  function handleUpdate(pkg: PackageType) {
    const newName = prompt("Enter new name for this package", pkg.name);
    if (newName && newName.trim() !== pkg.name) {
      const res = db.packages.update(pkg.id, { name: newName });
      if (res.success) toast.success("Package successfully updated");
      else toast.error(res.message);
    }
  }

  function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this package?")) {
      const res = db.packages.remove(id);
      if (res.success) toast.success("Package successfully deleted");
      else toast.error(res.message);
    }
  }

  return (
    <ul className={style.wrapper}>
      {packages.map((pkg) => (
        <li key={pkg.id} className={style.container}>
          <Link to={`/packages/${pkg.id}`} className={style.pkg}>
            <h2>{pkg.name}</h2>
            <p className="c-text-800">
              <span>There're total </span>
              <strong>{pkg.dependencies.length}</strong>
              <span> dependencies</span>
            </p>
            <p className="text-sm c-text-600">{`${timeInterval(pkg.uploaded)}`}</p>
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
