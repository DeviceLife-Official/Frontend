import { useCallback } from 'react';
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
  const scheduleExtras = useCallback(() => {
    const extrasDelay = Math.round(M.LIFT_DELAY + M.LIFT_DURATION * M.EXTRAS_AT_LIFT_PROGRESS);
    window.setTimeout(() => setShowExtras(true), extrasDelay);
  }, [setShowExtras]);

  const start = useCallback(
    (text: string) => {
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

      copyComputedStyle(floating, styleProbeRef.current);

      const dx = targetLeft - startLeft;
      const dy = targetTop - startTop;

      animateDrop({ el: floating, dx, dy, duration: M.DROP_DURATION, easing: M.DROP_EASING });

      window.setTimeout(() => {
        setCenterText(text);
        setMode('result');
        setResultOn(false);
        setPhase('idle');
        setShowDouble(false);
        setShowExtras(false);

        requestAnimationFrame(() => {
          setResultOn(true);
          setPhase('shrink');
          window.setTimeout(() => setPhase('stack'), M.T_SHRINK);
          window.setTimeout(() => setShowDouble(true), M.T_SHRINK + M.DOUBLE_DELAY);

          window.setTimeout(
            () => {
              setPhase('done');
              scheduleExtras();
            },
            M.T_SHRINK + Math.max(M.T_STACK, 520)
          );
        });
        fadeOutAndRemove(floating, 180);
      }, M.DROP_DURATION);
    },
    [
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
    ]
  );

  return { start };
};
