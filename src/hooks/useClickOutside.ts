import { DependencyList, useEffect } from "react";

export default function useClickOutside<T extends Element = HTMLDivElement>(
  handler: (event: MouseEvent) => void,
  ref: React.RefObject<T>,
  deps?: DependencyList
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!target || !target.isConnected) return;
      if (ref.current && !ref.current.contains(target)) handler(event);
    };

    document.addEventListener("mousedown", listener);

    return () => document.removeEventListener("mousedown", listener);
  }, [deps]);
}
