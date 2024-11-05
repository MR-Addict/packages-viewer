import { Link } from "react-router-dom";

import style from "./index.module.css";
import timeInterval from "@/lib/utils/timeInterval";
import { PackageType } from "@/types/package";

export default function Body({ packages }: { packages: PackageType[] }) {
  return (
    <ul className={style.wrapper}>
      {packages.map((pkg) => (
        <li key={pkg.id}>
          <Link to={`/packages/${pkg.id}`} className={style.pkg}>
            <h2>{pkg.name}</h2>
            <p>
              <span>There're total </span>
              <strong>{pkg.dependencies.length}</strong>
              <span> dependencies</span>
            </p>
            <p className="text-sm">{`${timeInterval(pkg.created)}`}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
