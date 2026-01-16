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
  setCenterText,
  setMode,
  setResultOn,
  setPhase,
  setShowDouble,
  setShowExtras,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  styleProbeRef: React.RefObject<HTMLDivElement | null>;
} & Setters) => {
  const scheduleExtras = useCallback(() => {
    const extrasDelay = Math.round(M.LIFT_DELAY + M.LIFT_DURATION * M.EXTRAS_AT_LIFT_PROGRESS);
    window.setTimeout(() => setShowExtras(true), extrasDelay);
  }, [setShowExtras]);

  const start = useCallback(
    (text: string) => {
      const startEl = inputRef.current;

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

      const targetLeft = window.innerWidth / 2 - M.INNER_W / 2;
      const targetTop = M.HEADER_H + (window.innerHeight - M.HEADER_H) / 2 - M.INNER_H / 2;
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

        requestAnimationFrame(() => setResultOn(true));
        fadeOutAndRemove(floating, 240);

        window.setTimeout(() => setPhase('shrink'), 80);
        window.setTimeout(() => setPhase('stack'), 80 + M.T_SHRINK);
        window.setTimeout(() => setShowDouble(true), 80 + M.T_SHRINK + M.DOUBLE_DELAY);

        window.setTimeout(
          () => {
            setPhase('done');
            scheduleExtras();
          },
          80 + M.T_SHRINK + Math.max(M.T_STACK, 520)
        );
      }, M.DROP_DURATION);
    },
    [
      inputRef,
      styleProbeRef,
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
