import { LuGithub } from "react-icons/lu";
import style from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={style.wrapper}>
      <button type="button">Import</button>

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
