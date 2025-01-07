import clsx from "clsx";
import toast from "react-hot-toast";

import { useState } from "react";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { PiPlusBold } from "react-icons/pi";
import { CgTrashEmpty } from "react-icons/cg";

import style from "./index.module.css";
import handleDrop from "@/lib/package/handleDrop";
import timeInterval from "@/lib/utils/timeInterval";
import startViewTransition from "@/lib/utils/startViewTransition";

import { fileInputID } from "@/data/app";
import { PackageType } from "@/types/package";
import { useAppContext } from "@/contexts/app";
import { useLocaleContext } from "@/contexts/locale";
import { useDatabaseContext } from "@/contexts/database";

export default function Body({ packages }: { packages: PackageType[] }) {
  const db = useDatabaseContext();

  const { ta, th } = useLocaleContext();
  const { fileInputRef } = useAppContext();

  const [isDragging, setIsDragging] = useState(false);

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

  return (
    <ul className={style.wrapper}>
      {packages.map((pkg) => (
        <li key={pkg.id} className={style.container} style={{ "--card-id": "card-" + pkg.id } as React.CSSProperties}>
          <Link viewTransition to={`/${pkg.id}`} className={style.pkg}>
            <h2 style={{ viewTransitionName: "pkg-" + pkg.id }}>{pkg.name}</h2>
            <p className="c-text-700">
              {th("label.dependencies.total", { template: { total: pkg.dependencies.length } })}
            </p>
            <p className="text-sm c-text-600">{timeInterval(pkg.uploaded)}</p>
          </Link>

          <div className={style.btns}>
            <button type="button" className={style.btn} title={th("button.edit")} onClick={() => handleUpdate(pkg)}>
              <TbEdit />
            </button>

            <button
              type="button"
              className={style.btn}
              title={th("button.delete")}
              onClick={() => handleDelete(pkg.id)}
            >
              <CgTrashEmpty />
            </button>
          </div>
        </li>
      ))}

      <li className={style.container}>
        <label
          htmlFor={fileInputID}
          className={clsx(style.pkg, style.new, { [style.dragging]: isDragging })}
          onDragOver={(event) => event.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => handleDrop(event, fileInputRef)}
        >
          <div className={style.plus}>
            <PiPlusBold title={th("button.add")} />
          </div>
        </label>
      </li>
    </ul>
  );
}
