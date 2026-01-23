import { useEffect } from 'react';

type Options<T> = {
  enabled: boolean;
  intervalMs: number;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  getNext: (prev: T) => T;
};

export const useAutoRotate = <T>({ enabled, intervalMs, setValue, getNext }: Options<T>) => {
  useEffect(() => {
    if (!enabled) return;

    const id = window.setInterval(() => {
      setValue((prev) => getNext(prev));
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [enabled, intervalMs, setValue, getNext]);
};
