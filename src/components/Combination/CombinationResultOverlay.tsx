import PrimaryButton from '@/components/Button/PrimaryButton';
import { COMBO_MOTION as M } from '@/constants/combination';
import { useNavigate } from 'react-router-dom';

type Props = {
  centerText: string;
  resultOn: boolean;
  phase: 'idle' | 'shrink' | 'stack' | 'done';
  showDouble: boolean;
  showExtras: boolean;
};

const CombinationResultOverlay = ({
  centerText,
  resultOn,
  phase,
  showDouble,
  showExtras,
}: Props) => {
  const innerSize =
    phase === 'shrink' ? { w: M.SHRINK_W, h: M.SHRINK_H } : { w: M.INNER_W, h: M.INNER_H };

  const liftActive = phase === 'done';

  const liftStyle: React.CSSProperties = liftActive
    ? {
        transform: `translate3d(0, -${M.LIFT_DISTANCE}px, 0)`,
        transitionProperty: 'transform',
        transitionDuration: `${M.LIFT_DURATION}ms`,
        transitionDelay: `${M.LIFT_DELAY}ms`,
        transitionTimingFunction: M.LIFT_EASING,
        willChange: 'transform',
      }
    : {
        transform: 'translate3d(0, 0, 0)',
        transitionProperty: 'transform',
        transitionDuration: `260ms`,
        transitionTimingFunction: 'ease-out',
        willChange: undefined,
      };

  const navigate = useNavigate();

  return (
    <div className="fixed left-0 right-0 bottom-0 top-80 z-900 flex items-center justify-center">
      <div className="relative w-800 h-520 flex items-center justify-center">
        <div
          className={`
            transition-opacity duration-260 ease-out
            ${resultOn ? 'opacity-100' : 'opacity-0'}
          `}
          style={liftStyle}
        >
          <div className="relative" style={{ width: `${M.OUTER_W}px`, height: `${M.OUTER_H}px` }}>
            <div
              className={`
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                rounded-button border-shadow-blue-double pointer-events-none
                transition-opacity duration-320 ease-out
                ${showDouble ? 'opacity-100' : 'opacity-0'}
              `}
              style={{ width: `${M.OUTER_W}px`, height: `${M.OUTER_H}px` }}
            />
            <div
              className={`
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                flex flex-col justify-center items-center gap-8
                rounded-button bg-white border-shadow-blue font-heading-2 text-black
                whitespace-nowrap overflow-hidden text-ellipsis
                transition-all
              `}
              style={{
                width: `${innerSize.w}px`,
                height: `${innerSize.h}px`,
                padding: '20px',
                fontSize: phase === 'shrink' ? '30px' : undefined,
                transitionDuration: `${phase === 'shrink' ? M.T_SHRINK : M.T_STACK}ms`,
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
            <PrimaryButton
              text="완료"
              className="w-280 bg-blue-600 hover:bg-blue-500"
              onClick={() => navigate('/devices')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinationResultOverlay;
