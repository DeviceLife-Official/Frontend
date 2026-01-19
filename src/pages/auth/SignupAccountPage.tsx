import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupAccountSchema, type SignupAccountFormData } from '@/schemas/authSchema';
import PrimaryInput from '@/components/Input/PrimaryInput';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import InputLabel from '@/components/Auth/Label/InputLabel';
import StepIndicator from '@/components/Auth/Indicator/StepIndicator';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const SignupAccountPage = () => {
  const navigate = useNavigate();
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupAccountFormData>({
    resolver: zodResolver(signupAccountSchema),
    mode: 'onChange',
  });

  const watchEmail = watch('email');

  // 이메일이 변경되면 중복확인 초기화
  useEffect(() => {
    setIsEmailVerified(false);
  }, [watchEmail]);

  // 중복확인 핸들러
  const handleCheckDuplicate = async () => {
    // const email = getValues('email');

    // TODO: 이메일 중복확인 API 호출
    // try {
    //   const { isDuplicate } = await checkEmailDuplicate(email);
    //   if (isDuplicate) {
    //     alert('이미 사용 중인 이메일입니다');
    //     return;
    //   }
    //   setIsEmailVerified(true);
    //   alert('사용 가능한 이메일입니다');
    // } catch (error) {
    //   alert('중복확인에 실패했습니다');
    // }

    // 임시: 중복확인 성공 처리
    setIsEmailVerified(true);
    alert('사용 가능한 이메일입니다');
  };

  const onSubmit = (_data: SignupAccountFormData) => {
    // TODO: 데이터 저장 (localStorage or state management)
    navigate(ROUTES.auth.signup.profile);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 전체 컨테이너 */}
      <div className="flex flex-col items-center">
        {/* 페이지네이션 인디케이터 */}
        <StepIndicator currentStep={1} className="mb-24" />

        {/* 로고 */}
        <p className="font-service-name text-black mb-40">Device Life</p>

        {/* 폼 컨테이너 */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-40 items-center w-full">
          {/* 폼 필드 영역 */}
          <div className="flex flex-col gap-8">
            {/* 이메일 필드 */}
            <div className="flex flex-col gap-4">
              <div className="relative w-400">
                <InputLabel text="이메일(ID)" className="absolute right-full mr-95 top-1/2 -translate-y-1/2" />
                <PrimaryInput 
                  {...register('email')} 
                  type="email" 
                  placeholder="이메일"
                  disabled={isEmailVerified}
                />
                <SecondaryButton 
                  text="중복확인"
                  onClick={handleCheckDuplicate}
                  className="w-148 absolute top-1/2 -translate-y-1/2 left-[calc(100%+12px)]" 
                />
              </div>
              {errors.email && (
                <p className="font-body-3-r text-warning">{errors.email.message}</p>
              )}
            </div>

            {/* 비밀번호 입력창 */}
            <div className="flex flex-col gap-4">
              <div className="relative w-400">
                <InputLabel text="비밀번호" className="absolute right-full mr-96 top-1/2 -translate-y-1/2" />
                <PrimaryInput {...register('password')} type="password" placeholder="비밀번호" maxLength={20} />
              </div>
              {errors.password && (
                <p className="font-body-3-r text-warning">{errors.password.message}</p>
              )}
            </div>

            {/* 비밀번호 확인 입력창 */}
            <div className="flex flex-col gap-4">
              <div className="relative w-400">
                <InputLabel text="비밀번호확인" className="absolute right-full mr-95 top-1/2 -translate-y-1/2" />
                <PrimaryInput {...register('passwordConfirm')} type="password" placeholder="비밀번호확인" maxLength={20} />
              </div>
              {errors.passwordConfirm && (
                <p className="font-body-3-r text-warning">{errors.passwordConfirm.message}</p>
              )}
            </div>
          </div>

          {/* 다음 버튼 */}
          <PrimaryButton text="다음" className="w-280 bg-blue-500" disabled={!isValid || !isEmailVerified} />
        </form>
      </div>
    </div>
  );
};

export default SignupAccountPage;
