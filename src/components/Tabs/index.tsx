import clsx from "clsx";
import uniqid from "uniqid";
import { useMemo } from "react";

import style from "./index.module.css";
import startViewTransition from "@/lib/utils/startViewTransition";

export default function Tabs<T>(props: {
  value: T;
  onChange: (value: T) => void;
  options: { label: string; value: T }[];
}) {
  const id = useMemo(() => uniqid(), []);

  return (
    <ul className={style.tabs} style={{ "--id": id } as React.CSSProperties}>
      {props.options.map((option) => (
        <li key={option.label}>
          <button
            type="button"
            onClick={() => startViewTransition(() => props.onChange(option.value))}
            className={clsx(style.tab, { [style.active]: props.value === option.value })}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
