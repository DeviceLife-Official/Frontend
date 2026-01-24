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
import { useSignupStore } from '@/stores/signupStore';
import { usePostJoinEmail } from '@/apis/auth/postJoinEmail';

const SignupAccountPage = () => {
  const navigate = useNavigate();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hasEmailSubmitted, setHasEmailSubmitted] = useState(false);

  const { setAccount, isEmailVerified, setIsEmailVerified } = useSignupStore();
  const { mutateAsync: checkEmailDuplicate, isPending: isCheckingEmail } = usePostJoinEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    trigger,
    getValues,
    watch,
  } = useForm<SignupAccountFormData>({
    resolver: zodResolver(signupAccountSchema),
    // 최초에는 에러를 숨기고, submit 이후에는 onChange로 실시간 갱신되도록
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const emailValue = watch('email');

  // 이메일이 비어있으면 중복확인 상태 초기화
  useEffect(() => {
    if (!emailValue && isEmailVerified) {
      setIsEmailVerified(false);
    }
  }, [emailValue, isEmailVerified, setIsEmailVerified]);

  // 이메일 중복확인 핸들러
  const handleCheckDuplicate = async () => {
    setHasEmailSubmitted(true);
    // 이메일 유효성 검사
    const isEmailValid = await trigger('email');
    if (!isEmailValid) return;

    // 이메일 값 가져오기
    const email = getValues('email');

    // 이메일 중복확인 요청
    try {
      const data = await checkEmailDuplicate({ email });
      console.log('이메일 중복확인 응답:', data);
      if (!data.result?.success) {
        setError('email', {
          type: 'manual',
          message: '이미 사용 중인 이메일입니다.',
        });
        return;
      }
      setIsEmailVerified(true);
      clearErrors('email');
      alert('사용 가능한 이메일입니다');
    } catch (error) {
      console.log('이메일 중복확인 에러:', error);
      setError('email', {
        type: 'manual',
        message: '이메일 중복확인에 실패했습니다. 잠시 후 다시 시도해주세요.',
      });
    }
  };

  // 계정 정보 제출 성공 핸들러
  const onSubmitValid = (data: SignupAccountFormData) => {
    setHasSubmitted(true);

    // 아직 중복확인이 완료되지 않은 경우
    if (!isEmailVerified) {
      setError('email', {
        type: 'manual',
        message: '이메일 중복확인을 확인해주세요.',
      });
      return;
    }

    // zustand에 계정 정보 + 중복확인 여부 저장 (API 호출 시 한 번에 사용)
    setAccount({
      email: data.email,
      password: data.password,
      isEmailVerified: true,
    });
    // 프로필 페이지로 이동
    navigate(ROUTES.auth.signup.profile);
  };

  // 계정 정보 제출 실패 핸들러
  const onSubmitInvalid = () => {
    // 최초 submit 이후부터 에러를 노출 + 실시간 갱신
    setHasSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 전체 컨테이너 */}
      <div className="flex flex-col items-center">
        {/* 페이지네이션 인디케이터 */}
        <StepIndicator currentStep={1} className="mb-24" />

        {/* 폼 컨테이너 */}
        <form
          onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}
          className="flex flex-col gap-40 items-center w-full"
        >
          {/* 로고 */}
          <p className="font-service-name text-black">Device Life</p>
          {/* 폼 필드 영역 */}
          <div className="flex flex-col gap-8">
            {/* 이메일 필드 */}
            <div className="flex flex-col gap-4">
              <div className="relative w-400">
                <InputLabel text="이메일(ID)" className="absolute right-full mr-95 top-1/2 -translate-y-1/2" />
                <PrimaryInput
                  {...register('email', {
                    onChange: () => {
                      setIsEmailVerified(false);
                    },
                  })}
                  type="email"
                  placeholder="이메일"
                  disabled={isEmailVerified}
                />
                <SecondaryButton
                  text="중복확인"
                  onClick={handleCheckDuplicate}
                  className={`w-148 absolute top-1/2 -translate-y-1/2 left-[calc(100%+12px)] ${isCheckingEmail && 'cursor-not-allowed'}`}
                />
              </div>
              {(hasSubmitted || hasEmailSubmitted) && errors.email && (
                <p className="font-body-3-r text-warning">{errors.email.message}</p>
              )}
            </div>

            {/* 비밀번호 입력창 */}
            <div className="flex flex-col gap-4">
              <div className="relative w-400">
                <InputLabel text="비밀번호" className="absolute right-full mr-96 top-1/2 -translate-y-1/2" />
                <PrimaryInput {...register('password')} type="password" placeholder="비밀번호" maxLength={20} />
              </div>
              {hasSubmitted && errors.password && (
                <p className="font-body-3-r text-warning">{errors.password.message}</p>
              )}
            </div>

            {/* 비밀번호 확인 입력창 */}
            <div className="flex flex-col gap-4">
              <div className="relative w-400">
                <InputLabel text="비밀번호확인" className="absolute right-full mr-95 top-1/2 -translate-y-1/2" />
                <PrimaryInput {...register('passwordConfirm')} type="password" placeholder="비밀번호확인" maxLength={20} />
              </div>
              {hasSubmitted && errors.passwordConfirm && (
                <p className="font-body-3-r text-warning">{errors.passwordConfirm.message}</p>
              )}
            </div>
          </div>

          {/* 다음 버튼 */}
          <PrimaryButton text="다음" className="w-280 bg-blue-600 hover:bg-blue-500" />
        </form>
      </div>
    </div>
  );
};

export default SignupAccountPage;
