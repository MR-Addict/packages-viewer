import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

import style from "./index.module.css";
import { sidebar } from "@/data/sidebar";

export default function Sidebar() {
  const location = useLocation();

  return (
    <nav className={style.wrapper}>
      <h1 className={style.logo}>Packages Viewer</h1>

      <ul className={style.links}>
        {sidebar.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className={clsx(style.link, { [style.active]: location.pathname === item.to })}>
              <item.Icon size={20} />
              <h2>{item.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
