import clsx from "clsx";
import { useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import style from "./index.module.css";
import useClickOutside from "@/hooks/useClickOutside";

import { appName } from "@/data/app";
import { sidebar } from "@/data/sidebar";
import { useAppContext } from "@/contexts/app";
import { useLocaleContext } from "@/contexts/locale";

function isLinkActive(link: string, root: string) {
  if (link === "/" && !sidebar.find((item) => item.to === root)) return true;
  return link === root;
}

export default function Sidebar() {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const root = useMemo(() => location.pathname.split("/").slice(0, 2).join("/"), [location.pathname]);

  const { tr } = useLocaleContext();
  const { windowWidth, openSidebar, setOpenSidebar } = useAppContext();

  useClickOutside(() => windowWidth < 1024 && setOpenSidebar(false), sidebarRef, [windowWidth]);

  return (
    <nav ref={sidebarRef} className={clsx(style.wrapper, { [style.active]: windowWidth >= 1024 || openSidebar })}>
      <h1 className={style.logo}>{tr(appName.id)}</h1>

      <ul className={style.links}>
        {sidebar.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              viewTransition
              onClick={() => setOpenSidebar(false)}
              className={clsx(style.link, { [style.active]: isLinkActive(link.to, root) })}
            >
              <div>
                <link.Icon size={20} />
              </div>
              <h2>{tr(link.title)}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
