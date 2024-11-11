import clsx from "clsx";
import { useState } from "react";

import style from "./index.module.css";
import handleDrop from "@/lib/package/handleDrop";

import { fileInputID } from "@/data/app";
import { useAppContext } from "@/contexts/app";
import { useLocaleContext } from "@/contexts/locale";

export default function Home() {
  const { translate } = useLocaleContext();
  const th = (label: string) => translate(label, "home");

  const { fileInputRef } = useAppContext();

  const [isDragging, setIsDragging] = useState(false);

  return (
    <label
      htmlFor={fileInputID}
      onDrop={(event) => handleDrop(event, fileInputRef)}
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      className={clsx(style.wrapper, { [style.dragging]: isDragging })}
    >
      <p>
        {th("Click or drag your")} <strong>package.json</strong> {th("here")}
      </p>
    </label>
  );
}
