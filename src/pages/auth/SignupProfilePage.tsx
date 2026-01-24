import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupProfileSchema, type SignupProfileFormData } from '@/schemas/authSchema';
import PrimaryInput from '@/components/Input/PrimaryInput';
import PrimaryButton from '@/components/Button/PrimaryButton';
import InputLabel from '@/components/Auth/Label/InputLabel';
import StepIndicator from '@/components/Auth/Indicator/StepIndicator';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useSignupStore } from '@/stores/signupStore';
import { usePostJoin } from '@/apis/auth/postJoin';

const SignupProfilePage = () => {
  const navigate = useNavigate();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { account, setProfile } = useSignupStore();
  const { mutateAsync: signup } = usePostJoin();

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

    // 이메일 중복확인 여부 확인
    if (!account.isEmailVerified) {
      // 중복확인 안 했으면 계정 페이지로 이동
      navigate(ROUTES.auth.signup.account, { replace: true });
      return;
    }

    // zustand에 프로필 정보 저장
    setProfile({
      username: data.name,
      phoneNumber: data.phone,
    });

    // 회원가입 API 호출
    try {
      await signup({
        email: account.email,
        password: account.password,
        username: data.name,
        phoneNumber: data.phone,
      });
      // 성공 시 온보딩으로 이동
      navigate(ROUTES.auth.onboarding.lifestyle, { replace: true });
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
          <PrimaryButton text="가입하기" className="w-280 bg-blue-600 hover:bg-blue-500" />
        </form>
      </div>
    </div>
  );
};

export default SignupProfilePage;
