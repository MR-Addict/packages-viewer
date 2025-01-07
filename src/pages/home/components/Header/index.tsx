import { useEffect, useRef, useState } from "react";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";

import style from "./index.module.css";
import Select from "@/components/Select";
import useListenKeyDown from "@/hooks/useListenKeyDown";
import startViewTransition from "@/lib/utils/startViewTransition";

import { packagesOrderBys } from "@/data/app";
import { useLocaleContext } from "@/contexts/locale";
import { usePackagesContext } from "@/contexts/packages";

export default function Header() {
  const { th, tr } = useLocaleContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const { search, setSearch, order, setOrder, orderBy, setOrderBy } = usePackagesContext();

  const intervalRef = useRef<NodeJS.Timeout>();
  const [localSearch, setLocalSearch] = useState(search);

  const orderByLabels = packagesOrderBys.map((item) => ({ label: th(`orderby.${item}`), value: item }));

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setLocalSearch(event.target.value);
    if (intervalRef.current) clearTimeout(intervalRef.current);
    intervalRef.current = setTimeout(() => startViewTransition(() => setSearch(event.target.value)), 500);
  }

  function handleOrder() {
    startViewTransition(() => setOrder((prev) => (prev === "asc" ? "desc" : "asc")));
  }

  function selectInput() {
    inputRef.current?.select();
    inputRef.current?.focus();
  }

  useListenKeyDown((event) => {
    if (event.ctrlKey && event.key.toLocaleLowerCase() === "l") {
      event.preventDefault();
      selectInput();
    }
  }, []);

  useEffect(() => {
    if (localSearch) setTimeout(() => selectInput());
  }, []);

  return (
    <header className={style.wrapper}>
      <h1 className="text-lg font-semibold">{tr("packages")}</h1>

      <div className={style.btns}>
        <input
          ref={inputRef}
          size={8}
          type="text"
          value={localSearch}
          onChange={handleSearch}
          className={style.searchbox}
          placeholder={`${th("input.search")}...`}
        />

        <Select
          options={orderByLabels}
          onChange={(value) => setOrderBy(value)}
          label={orderByLabels.find((o) => o.value === orderBy)?.label!}
        />

        <button type="button" className={style.btn} onClick={handleOrder} aria-label={order}>
          {order === "asc" ? <FaSortAmountDownAlt /> : <FaSortAmountUpAlt />}
        </button>
      </div>
    </header>
  );
}
