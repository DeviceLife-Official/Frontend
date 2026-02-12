import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupProfileSchema, type SignupProfileFormData } from '@/schemas/authSchema';
import PrimaryInput from '@/components/Input/PrimaryInput';
import PrimaryButton from '@/components/Button/PrimaryButton';
import InputLabel from '@/components/Auth/Label/InputLabel';
import StepIndicator from '@/components/Auth/Indicator/StepIndicator';
import { useNavigate, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useSignupStore } from '@/stores/signupStore';
import { usePostJoin } from '@/apis/auth/postJoin';
import { useLogin } from '@/hooks/useLogin';
import { useAuth } from '@/hooks/useAuth';

const SignupProfilePage = () => {
  const navigate = useNavigate();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { account, isEmailVerified, resetSignup } = useSignupStore();
  const { mutateAsync: signup } = usePostJoin();
  const { loginAndFinalize } = useLogin();
  const { isLoggedIn } = useAuth();

  // 로그인된 상태에서 회원가입 페이지 접근 시 홈으로 리다이렉트
  if (isLoggedIn) {
    return <Navigate to={ROUTES.home} replace />;
  }

  // 이메일, 비밀번호, 중복확인이 모두 완료되었는지 확인
  const isAccountComplete = account.email && account.password && isEmailVerified;

  // 하나라도 빠지면 계정 페이지로 리다이렉트
  if (!isAccountComplete) {
    return <Navigate to={ROUTES.auth.signup.account} replace />;
  }

  // 프로필 정보 입력 폼 상태 관리
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProfileFormData>({
    resolver: zodResolver(signupProfileSchema),
    // 최초에는 에러를 숨기고, submit 이후에는 onChange로 실시간 갱신되도록
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // 프로필 정보 제출 성공 핸들러
  const onSubmitValid = async (data: SignupProfileFormData) => {
    setHasSubmitted(true);

    // 회원가입 API 호출
    try {
      await signup({
        email: account.email,
        password: account.password,
        username: data.name,
        phoneNumber: data.phone,
      });

      // 회원가입 성공 후 자동 로그인
      try {
        await loginAndFinalize({
          email: account.email,
          password: account.password,
          keepLogin: false,
        });

        // 회원가입 성공 → zustand 초기화 (이메일/비밀번호 메모리 정리)
        resetSignup();

        // 로그인 성공 시 온보딩으로 이동
        navigate(ROUTES.onboarding.lifestyle, { replace: true });
      } catch (loginError) {
        // 자동 로그인 실패해도 회원가입은 완료 → zustand 초기화
        resetSignup();
        alert('회원가입은 완료되었지만 자동 로그인에 실패했습니다. 로그인 페이지에서 다시 시도해주세요.');
        navigate(ROUTES.auth.login, { replace: true });
      }
    } catch (error) {
      alert('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  // 프로필 정보 제출 실패 핸들러
  const onSubmitInvalid = () => {
    // 최초 submit 이후부터 에러를 노출 + 실시간 갱신
    setHasSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 전체 컨테이너 */}
      <div className="flex flex-col items-center">
        {/* 페이지네이션 인디케이터 */}
        <StepIndicator currentStep={2} className="mb-24" />


        {/* 폼 컨테이너 */}
        <form
          onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}
          className="flex flex-col gap-40 items-center w-full"
        >
          {/* 로고 */}
          <p className="font-service-name text-black ">Device Life</p>
          {/* 폼 필드 영역 */}
          <div className="flex flex-col gap-8">
            {/* 이름 필드 */}
            <div className="flex flex-col gap-4">
              <div className="relative w-400">
                <InputLabel text="이름" className="absolute right-full mr-96 top-1/2 -translate-y-1/2" />
                <PrimaryInput {...register('name')} type="text" placeholder="이름" />
              </div>
              {hasSubmitted && errors.name && (
                <p className="font-body-3-r text-warning">{errors.name.message}</p>
              )}
            </div>

            {/* 휴대폰 번호 필드 */}
            <div className="flex flex-col gap-4">
              <div className="relative w-400">
                <InputLabel text="휴대폰 번호" className="absolute right-full mr-96 top-1/2 -translate-y-1/2" />
                <PrimaryInput {...register('phone')} type="tel" placeholder="휴대폰 번호" maxLength={11} />
              </div>
              {hasSubmitted && errors.phone && (
                <p className="font-body-3-r text-warning">{errors.phone.message}</p>
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

export default SignupProfilePage;
