import { DependencyList, useEffect } from "react";

export default function useListenKeyDown(handler: (event: KeyboardEvent) => void, deps?: DependencyList) {
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      handler(event);
    }

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [deps]);
}
