import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  // 항상 최신 callback 유지
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // interval 설정/해제
  useEffect(() => {
    if (delay === null) return;

    const id = window.setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => window.clearInterval(id);
  }, [delay]);
};

export default useInterval;
