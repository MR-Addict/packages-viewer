import style from "./index.module.css";
import { usePackageContext } from "@/contexts/package";

export default function Header() {
  const { pkg } = usePackageContext();

  return (
    <header className={style.wrapper}>
      <h1 className="text-lg font-semibold">{pkg?.name}</h1>
    </header>
  );
}
