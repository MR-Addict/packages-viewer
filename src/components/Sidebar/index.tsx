import clsx from "clsx";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import style from "./index.module.css";
import { sidebar } from "@/data/sidebar";

export default function Sidebar() {
  const location = useLocation();

  const root = useMemo(() => location.pathname.split("/").slice(0, 2).join("/"), [location.pathname]);

  return (
    <nav className={style.wrapper}>
      <h1 className={style.logo}>Packages Viewer</h1>

      <ul className={style.links}>
        {sidebar.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className={clsx(style.link, { [style.active]: item.to === root })}>
              <item.Icon size={20} />
              <h2>{item.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
