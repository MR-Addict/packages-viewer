import { DependencyList, useEffect } from "react";

export default function useClickOutside<T extends Element = HTMLDivElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  ref: React.RefObject<T>,
  deps?: DependencyList
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || (ref.current && !ref.current.contains(event.target as Node))) handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, deps]);
}
