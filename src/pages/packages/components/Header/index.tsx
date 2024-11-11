"use client";

import { useRef, useState } from "react";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";

import style from "./index.module.css";
import Select from "@/components/Select";
import startViewTransition from "@/lib/utils/startViewTransition";

import { packagesOrderBys } from "@/data/app";
import { useLocaleContext } from "@/contexts/locale";
import { usePackagesContext } from "@/contexts/packages";

export default function Header() {
  const { translate } = useLocaleContext();
  const tps = (label: string) => translate(label, "packages");

  const { search, setSearch, order, setOrder, orderBy, setOrderBy } = usePackagesContext();

  const intervalRef = useRef<NodeJS.Timeout>();
  const [localSearch, setLocalSearch] = useState(search);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setLocalSearch(event.target.value);
    if (intervalRef.current) clearTimeout(intervalRef.current);
    intervalRef.current = setTimeout(() => startViewTransition(() => setSearch(event.target.value)), 500);
  }

  function handleOrder() {
    startViewTransition(() => setOrder((prev) => (prev === "asc" ? "desc" : "asc")));
  }

  return (
    <header className={style.wrapper}>
      <h1 className="text-lg font-semibold">{translate("Packages", "app")}</h1>

      <div className={style.btns}>
        <input
          size={10}
          type="text"
          placeholder={`${tps("Search")}...`}
          className={style.searchbox}
          value={localSearch}
          onChange={handleSearch}
        />

        <Select
          label={tps(orderBy)}
          options={packagesOrderBys.map((o) => ({ label: tps(o), value: o }))}
          onChange={(value) => setOrderBy(value)}
        />

        <button type="button" className={style.btn} onClick={handleOrder} aria-label="order packages">
          {order === "asc" ? <FaSortAmountDownAlt /> : <FaSortAmountUpAlt />}
        </button>
      </div>
    </header>
  );
}
