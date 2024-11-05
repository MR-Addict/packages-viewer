import clsx from "clsx";
import { useState } from "react";

import style from "./index.module.css";

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    const inputElement = document.getElementById("import-package-file") as HTMLInputElement;
    if (inputElement) {
      const dataTransfer = new DataTransfer();
      for (const file of event.dataTransfer.files) dataTransfer.items.add(file);
      inputElement.files = dataTransfer.files;
      inputElement.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  return (
    <label
      htmlFor="import-package-file"
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      className={clsx(style.wrapper, { [style.dragging]: isDragging })}
    >
      <p>
        Click or drag your <strong>package.json</strong> here to view its dependencies
      </p>
    </label>
  );
}
