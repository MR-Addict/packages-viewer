import { LuGithub } from "react-icons/lu";
import { HiMenuAlt1 } from "react-icons/hi";

import style from "./index.module.css";
import { useAppContext } from "@/contexts/app";

export default function Navbar() {
  const { setOpenSidebar } = useAppContext();

  function handleClick() {
    setOpenSidebar((prev) => !prev);
  }

  return (
    <nav className={style.wrapper}>
      <button type="button" className={style.menu} onClick={handleClick} aria-label="toggle sidebar">
        <HiMenuAlt1 size={20} />
      </button>

      <a
        target="_blank"
        aria-label="github link"
        href="https://github.com/MR-Addict/packages-viewer"
        className={style.github}
      >
        <LuGithub size={16} />
      </a>
    </nav>
  );
}
