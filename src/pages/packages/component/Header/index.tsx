"use client";

import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";

import style from "./index.module.css";
import { packagesOrderBys } from "@/data/app";
import { usePackagesContext } from "@/contexts/packages";

export default function Header() {
  const { order, SetOrder, orderBy, setOrderBy } = usePackagesContext();

  function handleOrder() {
    SetOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }

  function handleOrderBy(event: React.ChangeEvent<HTMLSelectElement>) {
    setOrderBy(event.target.value as any);
  }

  return (
    <header className={style.wrapper}>
      <h1 className="text-lg font-semibold">Packages</h1>

      <div className={style.btns}>
        <select className={style.select} value={orderBy} onChange={handleOrderBy} aria-label="packages orderby">
          {packagesOrderBys.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button type="button" className={style.btn} onClick={handleOrder} aria-label="order packages">
          {order === "asc" ? <FaSortAmountDownAlt /> : <FaSortAmountUpAlt />}
        </button>
      </div>
    </header>
  );
}
