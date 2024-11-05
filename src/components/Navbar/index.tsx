import { LuGithub } from "react-icons/lu";

import style from "./index.module.css";
import ImportButton from "@/components/ImportButton";

export default function Navbar() {
  return (
    <nav className={style.wrapper}>
      <ImportButton />

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
