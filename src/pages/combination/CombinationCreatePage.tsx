import { useMemo, useRef, useState } from 'react';

import PrimaryButton from '@/components/Button/PrimaryButton';
import Stage1Section from '@/components/Combination/Stage1Section';
import Stage2Section from '@/components/Combination/Stage2Section';
import Stage3Section from '@/components/Combination/Stage3Section';

type ResultPhase = 'idle' | 'shrink' | 'stack' | 'done';

const HEADER_H = 80;
const INNER_W = 600;
const INNER_H = 72;
const SHRINK_W = 558;
const SHRINK_H = 66;
const OUTER_W = 638;
const OUTER_H = 111;
const T_SHRINK = 420;
const T_STACK = 520;
const DROP_DURATION = 1600;
const DROP_EASING = 'cubic-bezier(0.12, 0.95, 0.18, 1)';
const LIFT_DISTANCE = 100;
const LIFT_DURATION = 1800;
const LIFT_DELAY = 180;
const LIFT_EASING = 'cubic-bezier(0.12, 0.9, 0.18, 1)';
const DOUBLE_DELAY = 160;
const EXTRAS_AT_LIFT_PROGRESS = 0.01;

const CombinationCreatePage = () => {
  const [name, setName] = useState('');
  const [centerText, setCenterText] = useState<string | null>(null);
  const [mode, setMode] = useState<'form' | 'result'>('form');
  const [bgOn, setBgOn] = useState(false);
  const [resultOn, setResultOn] = useState(false);
  const [phase, setPhase] = useState<ResultPhase>('idle');
  const [showDouble, setShowDouble] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const styleProbeRef = useRef<HTMLDivElement | null>(null);
  const isValid = useMemo(() => name.trim().length > 0, [name]);

  const dropToCenter = (text: string) => {
    const startEl = inputRef.current;

    if (!startEl) {
      setCenterText(text);
      setMode('result');
      setResultOn(true);
      setPhase('done');
      setShowDouble(true);

      const extrasDelay = Math.round(LIFT_DELAY + LIFT_DURATION * EXTRAS_AT_LIFT_PROGRESS);
      window.setTimeout(() => setShowExtras(true), extrasDelay);

      return;
    }

    const startRect = startEl.getBoundingClientRect();
    const targetLeft = window.innerWidth / 2 - INNER_W / 2;
    const targetTop = HEADER_H + (window.innerHeight - HEADER_H) / 2 - INNER_H / 2;
    const startLeft = startRect.left + startRect.width / 2 - INNER_W / 2;
    const startTop = startRect.top + startRect.height / 2 - INNER_H / 2;

    const floating = document.createElement('div');
    floating.textContent = text;
    floating.style.position = 'fixed';
    floating.style.left = `${startLeft}px`;
    floating.style.top = `${startTop}px`;
    floating.style.width = `${INNER_W}px`;
    floating.style.height = `${INNER_H}px`;
    floating.style.padding = '20px';

    floating.style.display = 'flex';
    floating.style.flexDirection = 'column';
    floating.style.justifyContent = 'center';
    floating.style.alignItems = 'center';
    floating.style.gap = '10px';

    const probe = styleProbeRef.current;
    if (probe) {
      const cs = window.getComputedStyle(probe);
      floating.style.borderRadius = cs.borderRadius;
      floating.style.boxShadow = cs.boxShadow;
      floating.style.backgroundColor = cs.backgroundColor;
      floating.style.border = cs.border;

      floating.style.fontFamily = cs.fontFamily;
      floating.style.fontSize = cs.fontSize;
      floating.style.fontWeight = cs.fontWeight;
      floating.style.lineHeight = cs.lineHeight;
      floating.style.letterSpacing = cs.letterSpacing;
      floating.style.color = cs.color;
      floating.style.textAlign = cs.textAlign;
    }

    floating.style.zIndex = '9999';
    floating.style.pointerEvents = 'none';
    floating.style.willChange = 'transform, opacity';
    floating.style.opacity = '1';

    document.body.appendChild(floating);

    const dx = targetLeft - startLeft;
    const dy = targetTop - startTop;

    floating.animate(
      [{ transform: 'translate3d(0,0,0)' }, { transform: `translate3d(${dx}px, ${dy}px, 0)` }],
      {
        duration: DROP_DURATION,
        easing: DROP_EASING,
        fill: 'forwards',
      }
    );

    window.setTimeout(() => {
      setCenterText(text);
      setMode('result');
      setResultOn(false);
      setPhase('idle');
      setShowDouble(false);
      setShowExtras(false);

      requestAnimationFrame(() => setResultOn(true));

      floating.style.transition = 'opacity 240ms ease-out';
      floating.style.opacity = '0';
      window.setTimeout(() => floating.remove(), 260);
      window.setTimeout(() => setPhase('shrink'), 80);
      window.setTimeout(() => setPhase('stack'), 80 + T_SHRINK);
      window.setTimeout(() => setShowDouble(true), 80 + T_SHRINK + DOUBLE_DELAY);
      window.setTimeout(
        () => {
          setPhase('done');

          const extrasDelay = Math.round(LIFT_DELAY + LIFT_DURATION * EXTRAS_AT_LIFT_PROGRESS);
          window.setTimeout(() => setShowExtras(true), extrasDelay);
        },
        80 + T_SHRINK + Math.max(T_STACK, 520)
      );
    }, DROP_DURATION);
  };

  const handleCreate = () => {
    if (!isValid) return;
    setBgOn(true);
    dropToCenter(name.trim());
  };

  const innerSize = phase === 'shrink' ? { w: SHRINK_W, h: SHRINK_H } : { w: INNER_W, h: INNER_H };
  const liftActive = phase === 'done';

  const liftStyle: React.CSSProperties = liftActive
    ? {
        transform: `translate3d(0, -${LIFT_DISTANCE}px, 0)`,
        transitionProperty: 'transform',
        transitionDuration: `${LIFT_DURATION}ms`,
        transitionDelay: `${LIFT_DELAY}ms`,
        transitionTimingFunction: LIFT_EASING,
        willChange: 'transform',
      }
    : {
        transform: 'translate3d(0, 0, 0)',
        transitionProperty: 'transform',
        transitionDuration: `260ms`,
        transitionTimingFunction: 'ease-out',
        willChange: 'transform',
      };

  return (
    <div className="mt-92 flex flex-col gap-143">
      <div
        ref={styleProbeRef}
        className="fixed -left-10000 -top-10000 flex flex-col justify-center items-center gap-10 w-600 h-72 p-20 rounded-button bg-white border-shadow-blue font-heading-2 text-black"
      >
        probe
      </div>
      <div
        className={`
          fixed left-0 right-0 bottom-0 top-108 z-800 bg-white pointer-events-none
          transition-opacity duration-900 ease-out
          ${bgOn ? 'opacity-100' : 'opacity-0'}
        `}
      />
      {mode === 'result' && centerText && (
        <div className="fixed left-0 right-0 bottom-0 top-108 z-900 flex items-center justify-center">
          <div className="relative w-800 h-520 flex items-center justify-center">
            <div
              className={`
                transition-opacity duration-260 ease-out
                ${resultOn ? 'opacity-100' : 'opacity-0'}
              `}
              style={liftStyle}
            >
              <div className="relative" style={{ width: `${OUTER_W}px`, height: `${OUTER_H}px` }}>
                <div
                  className={`
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    rounded-button border-shadow-blue-double pointer-events-none
                    transition-opacity duration-320 ease-out
                    ${showDouble ? 'opacity-100' : 'opacity-0'}
                  `}
                  style={{ width: `${OUTER_W}px`, height: `${OUTER_H}px` }}
                />
                <div
                  className={`
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    flex flex-col justify-center items-center gap-8
                    rounded-button bg-white border-shadow-blue font-heading-2 text-black
                  `}
                  style={{
                    width: `${innerSize.w}px`,
                    height: `${innerSize.h}px`,
                    padding: '20px',
                    transitionProperty: 'width, height',
                    transitionDuration: `${phase === 'shrink' ? T_SHRINK : T_STACK}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  {centerText}
                </div>
              </div>
            </div>
            <div
              className={`
                absolute left-1/2 -translate-x-1/2
                top-[calc(50%+4px)]
                flex flex-col items-center
                transition-all duration-420 ease-out
                ${showExtras ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}
              `}
            >
              <p className="w-600 text-center font-body-2-sm text-blue-600">
                이제 기기검색 창에서 원하는 기기들을 골라 내가 만든 조합에 담아보세요!
              </p>
              <div className="mt-120">
                <PrimaryButton text="완료" className="w-280 bg-blue-600 hover:bg-blue-500" />
              </div>
            </div>
          </div>
        </div>
      )}
      {mode === 'form' && (
        <>
          <div className="flex flex-row gap-20 justify-center">
            <div className="flex flex-col">
              <input
                ref={inputRef}
                type="text"
                placeholder="생성하고 싶은 조합명을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreate();
                }}
                className="w-600 h-72 px-20 py-20 rounded-button bg-blue-100 placeholder-gray-300 font-body-1-r outline-none"
              />
              <p className="pl-20 mt-16 text-warning font-body-4-r">
                *회원의 경우에는 로그인 한 뒤, 조합을 생성해야지 마이페이지&gt;내 조합 목록에
                저장됩니다.
              </p>
            </div>
            <PrimaryButton
              text="조합 생성하기"
              onClick={handleCreate}
              disabled={!isValid}
              className={`w-280 ${isValid ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-300 cursor-not-allowed'}`}
            />
          </div>
          <div className="flex flex-row gap-40 justify-center">
            <Stage1Section />
            <Stage2Section />
            <Stage3Section />
          </div>
        </>
      )}
    </div>
  );
};

export default CombinationCreatePage;
