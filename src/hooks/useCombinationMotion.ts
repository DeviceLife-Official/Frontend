import { useCallback, useEffect, useRef } from 'react';
import { COMBO_MOTION as M } from '@/constants/combination';
import {
  animateDrop,
  copyComputedStyle,
  createFloating,
  fadeOutAndRemove,
} from '@/utils/combinationFloating';

type Setters = {
  setCenterText: (v: string) => void;
  setMode: (v: 'form' | 'result') => void;
  setResultOn: (v: boolean) => void;
  setPhase: (v: 'idle' | 'shrink' | 'stack' | 'done') => void;
  setShowDouble: (v: boolean) => void;
  setShowExtras: (v: boolean) => void;
};

export const useCombinationMotion = ({
  inputRef,
  styleProbeRef,
  targetRef,
  setCenterText,
  setMode,
  setResultOn,
  setPhase,
  setShowDouble,
  setShowExtras,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  styleProbeRef: React.RefObject<HTMLDivElement | null>;
  targetRef: React.RefObject<HTMLDivElement | null>;
} & Setters) => {
  const timeoutsRef = useRef<number[]>([]);
  const floatingRef = useRef<HTMLElement | null>(null);
  const dropAnimRef = useRef<Animation | null>(null);
  const mountedRef = useRef(true);

  const pushTimeout = useCallback((id: number) => {
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const safeSetTimeout = useCallback(
    (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (!mountedRef.current) return;
        fn();
      }, ms);
      return pushTimeout(id);
    },
    [pushTimeout]
  );

  const clearAll = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
    dropAnimRef.current?.cancel();
    dropAnimRef.current = null;

    if (floatingRef.current) {
      try {
        floatingRef.current.remove();
      } catch {
        // ignore
      }
      floatingRef.current = null;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearAll();
    };
  }, [clearAll]);

  const scheduleExtras = useCallback(() => {
    const extrasDelay = Math.round(M.LIFT_DELAY + M.LIFT_DURATION * M.EXTRAS_AT_LIFT_PROGRESS);
    safeSetTimeout(() => setShowExtras(true), extrasDelay);
  }, [safeSetTimeout, setShowExtras]);

  const start = useCallback(
    (text: string) => {
      clearAll();

      const startEl = inputRef.current;
      const targetRect = targetRef.current?.getBoundingClientRect();
      const targetLeft = targetRect
        ? targetRect.left + targetRect.width / 2 - M.INNER_W / 2
        : window.innerWidth / 2 - M.INNER_W / 2;
      const targetTop = targetRect
        ? targetRect.top + targetRect.height / 2 - M.INNER_H / 2
        : M.HEADER_H + (window.innerHeight - M.HEADER_H) / 2 - M.INNER_H / 2;

      if (!startEl) {
        setCenterText(text);
        setMode('result');
        setResultOn(true);
        setPhase('done');
        setShowDouble(true);
        scheduleExtras();
        return;
      }

      const startRect = startEl.getBoundingClientRect();
      const startLeft = startRect.left + startRect.width / 2 - M.INNER_W / 2;
      const startTop = startRect.top + startRect.height / 2 - M.INNER_H / 2;

      const floating = createFloating({
        text,
        startLeft,
        startTop,
        width: M.INNER_W,
        height: M.INNER_H,
        padding: 20,
      });

      floatingRef.current = floating;
      copyComputedStyle(floating, styleProbeRef.current);

      const dx = targetLeft - startLeft;
      const dy = targetTop - startTop;

      dropAnimRef.current = animateDrop({
        el: floating,
        dx,
        dy,
        duration: M.DROP_DURATION,
        easing: M.DROP_EASING,
      });

      safeSetTimeout(() => {
        setCenterText(text);
        setMode('result');
        setResultOn(false);
        setPhase('idle');
        setShowDouble(false);
        setShowExtras(false);

        requestAnimationFrame(() => {
          if (!mountedRef.current) return;

          setResultOn(true);
          setPhase('shrink');
          safeSetTimeout(() => setPhase('stack'), M.T_SHRINK);
          safeSetTimeout(() => setShowDouble(true), M.T_SHRINK + M.DOUBLE_DELAY);

          safeSetTimeout(
            () => {
              setPhase('done');
              scheduleExtras();
            },
            M.T_SHRINK + Math.max(M.T_STACK, 520)
          );
        });
        fadeOutAndRemove(floating, 180);
        floatingRef.current = floating;
      }, M.DROP_DURATION);
    },
    [
      clearAll,
      inputRef,
      styleProbeRef,
      targetRef,
      setCenterText,
      setMode,
      setResultOn,
      setPhase,
      setShowDouble,
      setShowExtras,
      scheduleExtras,
      safeSetTimeout,
    ]
  );

  return { start, cancelMotion: clearAll }; 
};
