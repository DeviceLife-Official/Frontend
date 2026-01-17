import { useMemo, useRef, useState } from 'react';

import PrimaryButton from '@/components/Button/PrimaryButton';
import Stage1Section from '@/components/Combination/Stage1Section';
import Stage2Section from '@/components/Combination/Stage2Section';
import Stage3Section from '@/components/Combination/Stage3Section';
import CombinationResultOverlay from '@/components/Combination/CombinationResultOverlay';
import CombinationStyleProbe from '@/components/Combination/CombinationStyleProbe';
import { useCombinationMotion } from '@/hooks/useCombinationMotion';
import { useCombinationNameInput } from '@/hooks/useCombinationNameInput';

type ResultPhase = 'idle' | 'shrink' | 'stack' | 'done';

// TODO: 나중에 API/상태에서 가져오기 (내가 만든 조합명 리스트)
const EXISTING_COMBO_NAMES = ['사무실 세팅'];

const CombinationCreatePage = () => {
  const [centerText, setCenterText] = useState<string>('');
  const [mode, setMode] = useState<'form' | 'result'>('form');
  const [bgOn, setBgOn] = useState(false);
  const [resultOn, setResultOn] = useState(false);
  const [phase, setPhase] = useState<ResultPhase>('idle');
  const [showDouble, setShowDouble] = useState(false);
  const [showExtras, setShowExtras] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const styleProbeRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const {
    value: name,
    onChange: onNameChange,
    onCompositionStart,
    onCompositionEnd,
    errorMessage,
    isValid,
    validate,
  } = useCombinationNameInput({
    inputRef,
    existingNames: EXISTING_COMBO_NAMES,
    maxLen: 20,
  });

  const { start } = useCombinationMotion({
    inputRef,
    styleProbeRef,
    targetRef,
    setCenterText,
    setMode,
    setResultOn,
    setPhase,
    setShowDouble,
    setShowExtras,
  });

  const handleCreate = () => {
    if (!isValid) return;
    if (validate(name) !== null) return;
    setBgOn(true);
    start(name.trim());
  };

  const helperText =
    errorMessage ??
    '회원의 경우 로그인 한 뒤 조합을 생성해야 마이페이지>내 조합 목록에 저장됩니다.';

  const buttonClass = useMemo(
    () => `w-280 ${isValid ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-300 cursor-not-allowed'}`,
    [isValid]
  );

  return (
    <div className="mt-160 flex flex-col gap-144">
      <CombinationStyleProbe ref={styleProbeRef} />
      <div
        className={`
          fixed left-0 right-0 bottom-0 top-108 z-800 bg-white pointer-events-none
          transition-opacity duration-900 ease-out
          ${bgOn ? 'opacity-100' : 'opacity-0'}
        `}
      />
      <CombinationResultOverlay
        centerText={centerText}
        resultOn={resultOn && mode === 'result'}
        phase={phase}
        showDouble={showDouble}
        showExtras={showExtras}
        targetRef={targetRef}
      />
      {mode === 'form' && (
        <>
          <div className="flex flex-row gap-20 justify-center">
            <div className="flex flex-col">
              <input
                ref={inputRef}
                type="text"
                placeholder="생성하고 싶은 조합명을 입력하세요"
                value={name}
                onChange={onNameChange}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isValid) handleCreate();
                }}
                className="w-600 h-72 px-20 py-20 rounded-button bg-blue-100 placeholder-gray-300 font-body-1-r outline-none"
              />
              <p className="pl-20 mt-16 font-body-4-r text-warning">{helperText}</p>
            </div>
            <PrimaryButton
              text="조합 생성하기"
              onClick={handleCreate}
              disabled={!isValid}
              className={buttonClass}
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
