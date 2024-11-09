import { flushSync } from "react-dom";

export default function startViewTransition<T>(handler: () => Promise<T> | T): Promise<T>;
export default function startViewTransition(handler?: () => void): Promise<void>;
export default function startViewTransition<T>(handler?: () => Promise<T> | T): Promise<T | void> {
  if (!document.startViewTransition) return Promise.resolve(handler?.());

  return new Promise((resolve, reject) => {
    document.startViewTransition(() => {
      try {
        const result = handler && flushSync(handler);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
}
