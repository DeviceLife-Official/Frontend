import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '@/components/Button/PrimaryButton';
import StepIndicator from '@/components/Auth/Indicator/StepIndicator';
import {
  onboardingCombinationSchema,
  type OnboardingCombinationFormData,
} from '@/schemas/authSchema';
import { ROUTES } from '@/constants/routes';

const OnboardingCombinationPage = () => {
  const [step, setStep] = useState(1);
  const [combinationName, setCombinationName] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OnboardingCombinationFormData>({
    resolver: zodResolver(onboardingCombinationSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: OnboardingCombinationFormData) => {
    setCombinationName(data.combinationName.trim());
    setStep(2);
  };

  const handleSelectCombination = () => {
    // TODO: 조합명 저장 (Context/API)
    console.log('선택한 조합명:', combinationName);
    navigate(ROUTES.auth.onboarding.complete, { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* Step 1: 조합명 입력 */}
      {step === 1 && (
        <div className="flex flex-col items-center gap-68 w-900">
          {/* 상단 영역 (페이지네이션 + 텍스트) */}
          <div className="flex flex-col items-center gap-24 w-540">
            {/* 페이지네이션 인디케이터 */}
            <StepIndicator currentStep={4} totalSteps={4} />
            {/* 메인 타이틀 */}
            <p className="font-body-1-sm text-blue-600 text-center">
              나의 첫 기기 조합을 생성해 주세요.
            </p>
            {/* 조합명 예시 텍스트 */}
            <p className="font-body-2-r text-blue-600">
              조합명 예시: iPhone 15Pro 중심 조합 / 사무실 세팅
            </p>
          </div>

          {/* 입력창 + 버튼 영역 */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-8">
            <div className="flex flex-row gap-20 justify-center">
              <div className="flex flex-col">
                <input
                  {...register('combinationName')}
                  type="text"
                  placeholder="생성하고 싶은 조합명을 입력하세요"
                  className="w-500 h-52 px-20 py-20 rounded-button bg-blue-100 placeholder-gray-300 font-body-2-r outline-none"
                />
              </div>
              <PrimaryButton
                text="조합 생성하기"
                disabled={!isValid}
                className={`w-280 ${isValid ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-300 cursor-not-allowed'}`}
              />
            </div>
            {/* 에러 메시지 */}
            {errors.combinationName && (
              <p className="font-body-4-r text-warning pl-20 self-start">
                {errors.combinationName.message}
              </p>
            )}
          </form>
        </div>
      )}

      {/* Step 2: 조합명 확인 */}
      {step === 2 && (
        <div className="flex flex-col items-center gap-100">
          <div className="flex flex-col items-center gap-44">
            {/* 조합명 표시 박스 (double border) */}
            <div className="relative w-638 h-111">
              {/* Outer border */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-button border-shadow-blue-double w-638 h-111"
              />
              {/* Inner box */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-600 h-72 flex flex-col justify-center items-center gap-8 rounded-button bg-white border-shadow-blue font-heading-2 text-black whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ padding: '20px' }}
              >
                {combinationName}
              </div>
            </div>

            {/* 안내 문구 */}
            <p className="font-body-2-sm text-blue-600 text-center w-600">
              이제 기기검색 창에서 원하는 기기들을 골라 내가 만든 조합에 담아보세요!
            </p>
          </div>

          {/* 완료 버튼 */}
          <PrimaryButton
            text="완료"
            className="w-280 bg-blue-600  hover:bg-blue-500"
            onClick={handleSelectCombination}

          />
        </div>
      )}
    </div>
  );
};

export default OnboardingCombinationPage;
