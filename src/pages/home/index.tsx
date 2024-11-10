import clsx from "clsx";
import { useState } from "react";

import style from "./index.module.css";
import t from "@/hooks/useLocaleTranslation";

import { fileInputID } from "@/data/app";
import { useAppContext } from "@/contexts/app";

export default function Home() {
  const { fileInputRef } = useAppContext();
  const [isDragging, setIsDragging] = useState(false);

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      for (const file of event.dataTransfer.files) dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  return (
    <label
      htmlFor={fileInputID}
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      className={clsx(style.wrapper, { [style.dragging]: isDragging })}
    >
      <p>
        {t("Click or drag your")} <strong>package.json</strong> {t("here")}
      </p>
    </label>
  );
}
