import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupProfileSchema, type SignupProfileFormData } from '@/schemas/authSchema';
import PrimaryInput from '@/components/Input/PrimaryInput';
import PrimaryButton from '@/components/Button/PrimaryButton';
import InputLabel from '@/components/Auth/Label/InputLabel';
import StepIndicator from '@/components/Auth/Indicator/StepIndicator';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const SignupProfilePage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupProfileFormData>({
    resolver: zodResolver(signupProfileSchema),
    mode: 'onChange',
  });

  const onSubmit = (_data: SignupProfileFormData) => {
    // TODO: 회원가입 API 호출
    // TODO: 온보딩으로 이동
    navigate(ROUTES.auth.onboarding.lifestyle);
  };

  const handleStepClick = (step: number) => {
    if (step === 1) {
      navigate(ROUTES.auth.signup.account);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 전체 컨테이너 */}
      <div className="flex flex-col items-center">
        {/* 페이지네이션 인디케이터 */}
        <StepIndicator currentStep={2} onStepClick={handleStepClick} className="mb-24" />

        {/* 로고 */}
        <p className="font-service-name text-black mb-40">Device Life</p>

        {/* 폼 컨테이너 */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-40 items-center w-full">
          {/* 폼 필드 영역 */}
          <div className="flex flex-col gap-8">
            {/* 이름 필드 */}
            <div className="flex flex-col gap-4">
              <div className="relative w-400">
                <InputLabel text="이름" className="absolute right-full mr-96 top-1/2 -translate-y-1/2" />
                <PrimaryInput {...register('name')} type="text" placeholder="이름" />
              </div>
              {errors.name && (
                <p className="font-body-3-r text-warning">{errors.name.message}</p>
              )}
            </div>

            {/* 전화번호 필드 */}
            <div className="flex flex-col gap-4">
              <div className="relative w-400">
                <InputLabel text="전화번호" className="absolute right-full mr-96 top-1/2 -translate-y-1/2" />
                <PrimaryInput {...register('phone')} type="tel" placeholder="전화번호" maxLength={11} />
              </div>
              {errors.phone && (
                <p className="font-body-3-r text-warning">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* 다음 버튼 */}
          <PrimaryButton text="다음" className="w-280 bg-blue-500" disabled={!isValid} />
        </form>
      </div>
    </div>
  );
};

export default SignupProfilePage;
