import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function usePersistantState<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;

    const value = localStorage.getItem(key);
    if (typeof value === "string") return JSON.parse(value);
    return defaultValue;
  });

  useEffect(() => {
    const callback = () => localStorage.setItem(key, JSON.stringify(state));
    const timer = setTimeout(callback, 100);
    return () => clearTimeout(timer);
  }, [state]);

  return [state, setState];
}
