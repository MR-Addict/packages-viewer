import clsx from "clsx";
import { useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";

import style from "./index.module.css";
import useClickOutside from "@/hooks/useClickOutside";
import startViewTransition from "@/lib/utils/startViewTransition";

export default function Select<T>(props: {
  label: string;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
  inverseLabelStyle?: boolean;
}) {
  const selectRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useClickOutside(() => setExpanded(false), selectRef);

  function handleClick(value: T) {
    props.onChange(value);
    setExpanded(false);
  }

  return (
    <div ref={selectRef} className={style.select}>
      <button
        type="button"
        className={clsx(style["label-btn"], { [style.expanded]: expanded })}
        data-type={props.inverseLabelStyle && "inverse"}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <span>{props.label}</span>
        <LuChevronDown />
      </button>

      <ul className={clsx(style["select-menu"], { [style.expanded]: expanded })}>
        {props.options.map((option) => (
          <li key={option.label}>
            <button
              type="button"
              className={style["option-btn"]}
              onClick={() => startViewTransition(() => handleClick(option.value))}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
