"use client";

import { useRef, useState } from "react";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";

import style from "./index.module.css";
import { packagesOrderBys } from "@/data/app";
import { usePackagesContext } from "@/contexts/packages";

export default function Header() {
  const { search, setSearch, order, SetOrder, orderBy, setOrderBy } = usePackagesContext();

  const intervalRef = useRef<NodeJS.Timeout>();
  const [localSearch, setLocalSearch] = useState(search);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setLocalSearch(event.target.value);
    if (intervalRef.current) clearTimeout(intervalRef.current);
    intervalRef.current = setTimeout(() => setSearch(event.target.value), 500);
  }

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
        <input
          type="text"
          placeholder="Search..."
          className={style.searchbox}
          value={localSearch}
          onChange={handleSearch}
        />

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
