import clsx from "clsx";
import { useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import style from "./index.module.css";
import useClickOutside from "@/hooks/useClickOutside";

import { sidebar } from "@/data/sidebar";
import { useAppContext } from "@/contexts/app";

export default function Sidebar() {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { windowWidth, openSidebar, setOpenSidebar } = useAppContext();
  const root = useMemo(() => location.pathname.split("/").slice(0, 2).join("/"), [location.pathname]);

  useClickOutside(() => windowWidth < 1024 && setOpenSidebar(false), sidebarRef, [windowWidth]);

  return (
    <nav ref={sidebarRef} className={clsx(style.wrapper, { [style.active]: windowWidth >= 1024 || openSidebar })}>
      <h1 className={style.logo}>Packages Viewer</h1>

      <ul className={style.links}>
        {sidebar.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              onClick={() => setOpenSidebar(false)}
              className={clsx(style.link, { [style.active]: item.to === root })}
            >
              <div>
                <item.Icon size={20} />
              </div>
              <h2>{item.title}</h2>
            </Link>
          </li>
        ))}
      </ul>

      <footer className={style.footer}>
        <span>Created by </span>
        <a href="https://github.com/MR-Addict" target="_blank" className="underline">
          MR-Addict
        </a>
      </footer>
    </nav>
  );
}
