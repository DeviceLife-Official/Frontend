import { useEffect, useRef, useState } from 'react';

type Options = {
  transitionMs: number;
};

export const useCrossfadeImage = (src: string, { transitionMs }: Options) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [nextSrc, setNextSrc] = useState<string | null>(null);
  const [isNextVisible, setIsNextVisible] = useState(false);

  const transitionTimerRef = useRef<number | null>(null);
  const loadSeqRef = useRef(0);

  useEffect(() => {
    if (src === currentSrc) return;

    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    const seq = ++loadSeqRef.current;

    const img = new Image();
    img.src = src;

    const start = () => {
      if (loadSeqRef.current !== seq) return;

      setNextSrc(src);
      setIsNextVisible(false);

      requestAnimationFrame(() => {
        if (loadSeqRef.current !== seq) return;
        setIsNextVisible(true);
      });

      transitionTimerRef.current = window.setTimeout(() => {
        if (loadSeqRef.current !== seq) return;
        setCurrentSrc(src);
        setNextSrc(null);
        setIsNextVisible(false);
      }, transitionMs);
    };

    if (img.complete) start();
    else img.onload = start;

    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
    };
  }, [src, currentSrc, transitionMs]);

  return { currentSrc, nextSrc, isNextVisible };
};
