import { useState, useEffect, useCallback } from 'react';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  findPasswordSchema,
  type FindPasswordFormData,
  resetPasswordSchema,
  type ResetPasswordFormData,
} from '@/schemas/authSchema';
import PrimaryInput from '@/components/Input/PrimaryInput';
import GoogleLoginButton from '@/components/Button/GoogleLoginButton';
import InputEyeIcon from '@/assets/icons/input_eye.svg?react';
import {
  usePostSendMail,
  usePostVerifyCode,
  usePostResetPassword,
} from '@/apis/findCredential/postFindPassword';

const TIMER_SECONDS = 180; // 3분

const FindPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [verifyToken, setVerifyToken] = useState<string>('');
  const [verifyError, setVerifyError] = useState<string>('');
  const [resetError, setResetError] = useState<string>('');
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  const { mutateAsync: sendMail, isPending } = usePostSendMail();
  const { mutateAsync: verifyCode, isPending: isVerifyPending } = usePostVerifyCode();
  const { mutateAsync: resetPassword, isPending: isResetPending } = usePostResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<FindPasswordFormData>({
    resolver: zodResolver(findPasswordSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange', // 한 번 제출 후에는 입력 시마다 재검사
  });

  // Step3: 비밀번호 재설정 폼
  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors, isValid: isResetValid },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // 타이머 포맷팅 (mm:ss)
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // 타이머 시작
  const startTimer = useCallback(() => {
    setTimeLeft(TIMER_SECONDS);
    setIsTimerRunning(true);
  }, []);

  // 타이머 useEffect
  useEffect(() => {
    if (!isTimerRunning || timeLeft <= 0) {
      if (timeLeft <= 0) {
        setIsTimerRunning(false);
        // 시간 만료 시 에러 메시지 표시
        if (step === 2) {
          setVerifyError('인증 시간이 만료되었어요. 인증번호를 다시 받아주세요.');
        }
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, step]);

  // Step1: 인증번호 받기 제출 핸들러 (유효할 때만 호출)
  const onSubmitValid = async (data: FindPasswordFormData) => {
    try {
      await sendMail({ email: data.email });

      // 성공 시 step2로 이동
      setStep(2);
      startTimer();
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      // response 있으면 서버 응답 에러, 없으면 네트워크/환경 에러
      if (axiosError.response) {
        setHasSubmitted(true);
        setError('email', {
          type: 'manual',
          message: axiosError.response.data?.message ?? '인증번호 발송에 실패했습니다. 다시 시도해 주세요.',
        });
        return;
      }
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  // 유효성 검사 실패 시 한 번이라도 제출했음을 표시 → 이후 실시간 검사
  const onSubmitInvalid = () => {
    setHasSubmitted(true);
  };

  // Step2: 인증번호 재전송 (step1 이메일 사용)
  const handleResend = async () => {
    setVerifyError(''); // 에러 초기화
    try {
      const email = getValues('email');
      await sendMail({ email });
      startTimer(); // 타이머 3분으로 리셋
      setVerificationCode('');
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      if (axiosError.response?.data?.message) {
        alert(axiosError.response.data.message);
      } else if (axiosError.response) {
        alert('인증번호 재전송에 실패했습니다. 다시 시도해 주세요.');
      } else {
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  // Step2: 인증번호 확인 API 연동
  const handleVerify = async () => {
    setVerifyError(''); // 에러 초기화

    try {
      const response = await verifyCode({ code: verificationCode });

      // 성공 시 verifyToken 저장하고 step3로 이동
      if (response.result?.verifyToken) {
        setVerifyToken(response.result.verifyToken);
        setStep(3);
      }
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      // response 있으면 서버 응답 에러, 없으면 네트워크/환경 에러
      if (axiosError.response) {
        setVerifyError(axiosError.response.data?.message ?? '인증에 실패했습니다. 다시 시도해 주세요.');
        return;
      }
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  // Step3: 비밀번호 변경 API 연동 (유효할 때만 호출)
  const onResetPasswordValid = async (data: ResetPasswordFormData) => {
    setResetError(''); // API 에러 초기화

    try {
      await resetPassword({
        verifiedToken: verifyToken,
        newPassword: data.newPassword,
      });

      // 성공 시 로그인 화면으로 이동
      navigate(ROUTES.auth.login);
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      // response 있으면 서버 응답 에러, 없으면 네트워크/환경 에러
      if (axiosError.response) {
        setResetError(axiosError.response.data?.message ?? '비밀번호 변경에 실패했습니다. 다시 시도해 주세요.');
        return;
      }
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  // Step3: 유효성 검사 실패 시 (실시간 검사이므로 별도 처리 불필요)
  const onResetPasswordInvalid = () => {
    // 실시간 검사로 에러가 이미 표시되므로 별도 처리 불필요
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* Step 1: 이메일 입력 */}
      {step === 1 && (
        <div className="flex flex-col items-center gap-12">
          {/* 메인 폼 영역 */}
          <div className="flex flex-col items-center gap-56">
            {/* 로고 */}
            <p className="font-service-name text-black">Device Life</p>

            {/* 폼 컨테이너 */}
            <form
              onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}
              noValidate
              className="flex flex-col items-center gap-20 w-400"
            >
              {/* 입력 영역 */}
              <div className="flex flex-col gap-8 w-full">
                <PrimaryInput {...register('email')} type="email" placeholder="이메일(ID)" />
                {hasSubmitted && errors.email && (
                  <p className="font-body-3-r text-warning">{errors.email.message}</p>
                )}
              </div>

              {/* 인증번호 받기 버튼 */}
              <PrimaryButton
                text={isPending ? '발송 중...' : '인증번호 받기'}
                className={`w-full bg-blue-600 ${!isPending ? 'hover:bg-blue-500' : ''}`}
                disabled={isPending}
              />
            </form>
          </div>

          {/* 아이디/비밀번호 찾기 + 소셜 로그인 + 회원가입 안내 */}
          <div className="flex flex-col items-center gap-32">
            {/* 아이디/비밀번호 찾기 */}
            <div className="flex items-center gap-16 font-body-2-r text-gray-400">
              <button
                type="button"
                className="cursor-pointer hover:opacity-80"
                onClick={() => navigate(ROUTES.auth.findId)}
              >
                아이디 찾기
              </button>
              <span>|</span>
              <button
                type="button"
                className="cursor-pointer hover:opacity-80"
                onClick={() => navigate(ROUTES.auth.findPassword)}
              >
                비밀번호 찾기
              </button>
            </div>

            {/* 소셜 로그인 */}
            <GoogleLoginButton className="w-200 h-46" />

            {/* 회원가입 안내 */}
            <div className="flex items-center gap-16 font-body-2-r text-gray-400">
              <span>아직 Device Life 회원이 아니신가요?</span>
              <button
                type="button"
                className="underline underline-offset-4 cursor-pointer hover:opacity-80"
                onClick={() => navigate(ROUTES.auth.signup.base)}
              >
                회원가입 하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: 인증번호 입력 */}
      {step === 2 && (
        <div className="flex flex-col items-center gap-56">
          {/* 타이틀 영역 */}
          <div className="flex flex-col items-center gap-28 text-center">
            {/* 메인 타이틀 */}
            <p className="font-body-1-sm text-blue-600">
              이메일로 발송된 인증번호 6자리를 입력해 주세요
            </p>
            {/* 남은 시간 */}
            <div className="flex items-center gap-12 font-body-1-sm">
              <span className="text-black">남은 시간</span>
              <span className="text-warning">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* 입력 + 버튼 영역 */}
          <div className="flex flex-col items-center gap-20">
            {/* 인증번호 입력 + 재전송 버튼 */}
            <div className="flex flex-col gap-8 w-400">
              <div className="relative">
                <PrimaryInput
                  type="text"
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                    setVerifyError(''); // 입력 시 에러 초기화
                  }}
                  maxLength={6}
                />
                <SecondaryButton
                  text="인증번호 재전송"
                  onClick={handleResend}
                  className="w-148 absolute top-1/2 -translate-y-1/2 left-[calc(100%+12px)]"
                />
              </div>
              {verifyError && (
                <p className="font-body-3-r text-warning">{verifyError}</p>
              )}
            </div>

            {/* 확인 버튼 */}
            <PrimaryButton
              text={isVerifyPending ? '확인 중...' : '확인'}
              onClick={handleVerify}
              disabled={
                verificationCode.length !== 6 ||
                timeLeft <= 0 ||
                isVerifyPending
              }
              className={`w-400 ${verificationCode.length === 6 && timeLeft > 0 && !isVerifyPending
                  ? 'bg-blue-600 hover:bg-blue-500'
                  : ''
                }`}
            />
          </div>
        </div>
      )}

      {/* Step 3: 새 비밀번호 설정 */}
      {step === 3 && (
        <div className="flex flex-col items-center gap-56">
          {/* 타이틀 */}
          <p className="font-body-1-sm text-blue-600 text-center">
            새로운 비밀번호를 설정해 주세요
          </p>

          {/* 입력 필드 + 버튼 영역 */}
          <form
            onSubmit={handleResetSubmit(onResetPasswordValid, onResetPasswordInvalid)}
            className="flex flex-col gap-40 w-400"
          >
            {/* 입력 필드들 */}
            <div className="flex flex-col gap-20">
              {/* 새 비밀번호 */}
              <div className="flex flex-col gap-10">
                <p className="font-body-3-sm text-black">새 비밀번호</p>
                <div className="relative">
                  <PrimaryInput
                    {...registerReset('newPassword', {
                      onChange: () => setResetError(''),
                    })}
                    type={isNewPasswordVisible ? 'text' : 'password'}
                    placeholder="영문+숫자 조합 *~20자"
                    maxLength={20}
                    onFocus={() => setIsNewPasswordFocused(true)}
                    onBlur={() => setIsNewPasswordFocused(false)}
                  />
                  {isNewPasswordFocused && (
                    <InputEyeIcon
                      className="absolute right-14 top-14 size-24 cursor-pointer"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setIsNewPasswordVisible((prev) => !prev);
                      }}
                    />
                  )}
                </div>
                {resetErrors.newPassword && (
                  <p className="font-body-3-r text-warning">
                    {resetErrors.newPassword.message}
                  </p>
                )}
              </div>

              {/* 새 비밀번호 확인 */}
              <div className="flex flex-col gap-10">
                <p className="font-body-3-sm text-black">새 비밀번호 확인</p>
                <PrimaryInput
                  {...registerReset('newPasswordConfirm', {
                    onChange: () => setResetError(''),
                  })}
                  type="password"
                  placeholder="비밀번호를 한 번 더 입력해 주세요"
                  maxLength={20}
                />
                {resetErrors.newPasswordConfirm && (
                  <p className="font-body-3-r text-warning">
                    {resetErrors.newPasswordConfirm.message}
                  </p>
                )}
                {resetError && (
                  <p className="font-body-3-r text-warning">{resetError}</p>
                )}
              </div>
            </div>

            {/* 비밀번호 변경하기 버튼 */}
            <div className="flex flex-col gap-8 w-full">
              <PrimaryButton
                text={isResetPending ? '변경 중...' : '비밀번호 변경하기'}
                disabled={!isResetValid || isResetPending}
                className={`w-full ${
                  isResetValid && !isResetPending
                    ? 'bg-blue-600 hover:bg-blue-500'
                    : ''
                }`}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FindPasswordPage;
