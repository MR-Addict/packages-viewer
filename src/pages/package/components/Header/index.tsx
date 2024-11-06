import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";

import style from "./index.module.css";
import { usePackageContext } from "@/contexts/package";

export default function Header() {
  const { pkg, packageOrder, setPackageOrder } = usePackageContext();

  function handleOrder() {
    setPackageOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }

  return (
    <header className={style.wrapper}>
      <h1 className="text-lg font-semibold">{pkg?.name}</h1>

      <div className={style.btns}>
        <button type="button" className={style.btn} onClick={handleOrder} aria-label="order package">
          {packageOrder === "asc" ? <FaSortAmountDownAlt /> : <FaSortAmountUpAlt />}
        </button>
      </div>
    </header>
  );
}
