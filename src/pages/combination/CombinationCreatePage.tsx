import { useMemo, useRef, useState } from 'react';
import PrimaryButton from '@/components/Button/PrimaryButton';
import Stage1Section from '@/components/Combination/Stage1Section';
import Stage2Section from '@/components/Combination/Stage2Section';
import Stage3Section from '@/components/Combination/Stage3Section';
import CombinationResultOverlay from '@/components/Combination/CombinationResultOverlay';
import CombinationStyleProbe from '@/components/Combination/CombinationStyleProbe';
import { useCombinationMotion } from '@/hooks/useCombinationMotion';
import { useCombinationNameInput } from '@/hooks/useCombinationNameInput';
import { usePostCreateCombination } from '@/apis/combo/postCreateCombination';
import axios from 'axios';
import type { AxiosError } from 'axios';
import type { CommonResponse } from '@/types/common';

type ResultPhase = 'idle' | 'shrink' | 'stack' | 'done';

const CombinationCreatePage = () => {
  const [centerText, setCenterText] = useState<string>('');
  const [mode, setMode] = useState<'form' | 'result'>('form');
  const [bgOn, setBgOn] = useState(false);
  const [resultOn, setResultOn] = useState(false);
  const [phase, setPhase] = useState<ResultPhase>('idle');
  const [showDouble, setShowDouble] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const styleProbeRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const submitLockedRef = useRef(false);

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

  const { mutateAsync } = usePostCreateCombination();

  const handleCreate = async () => {
    if (submitLockedRef.current) return;
    if (!isValid) return;
    if (validate(name) !== null) return;
    submitLockedRef.current = true;
    try {
      setServerErrorMessage(null);
      const res = await mutateAsync({ comboName: name });
      if (res.success && res.result) {
        setBgOn(true);
        start(res.result.comboName);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<CommonResponse<null>>;
        const code = axiosErr.response?.data?.code;

        // 401 에러는 인터셉터에서 로그인 페이지로 리다이렉트 처리
        // (비로그인 유저의 경우 인터셉터가 이미 리다이렉트했으므로 여기서는 처리하지 않음)

        if (code === 'COMBO_4005') {
          setServerErrorMessage('이미 동일한 이름의 조합이 존재합니다.');
          return;
        }
      }
      setServerErrorMessage('조합 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      submitLockedRef.current = false;
    }
  };

  const helperText =
    serverErrorMessage ??
    errorMessage ??
    '회원의 경우 로그인 한 뒤 조합을 생성해야 마이페이지>내 조합 목록에 저장됩니다.';
  const buttonClass = useMemo(
    () => `w-280 ${isValid ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-300 cursor-not-allowed'}`,
    [isValid]
  );

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="flex flex-col gap-144">
        <CombinationStyleProbe ref={styleProbeRef} />
        <div
          className={`
            fixed left-0 right-0 bottom-0 top-80 z-800 bg-white pointer-events-none
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
                  onChange={(e) => {
                    setServerErrorMessage(null);
                    onNameChange(e);
                  }}
                  onCompositionStart={onCompositionStart}
                  onCompositionEnd={onCompositionEnd}
                  onKeyDown={(e) => {
                    if (e.key !== 'Enter') return;
                    if (submitLockedRef.current) return;
                    e.preventDefault();
                    if (isValid) handleCreate();
                  }}
                  className="w-500 h-52 px-20 py-20 rounded-button bg-blue-100 placeholder-gray-300 font-body-2-r outline-none"
                />
                <p className="pl-20 mt-16 font-body-4-r text-warning">{helperText}</p>
              </div>
              <PrimaryButton
                text={submitLockedRef.current ? '생성 중...' : '조합 생성하기'}
                onClick={handleCreate}
                disabled={!isValid || submitLockedRef.current}
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
    </div>
  );
};

export default CombinationCreatePage;
