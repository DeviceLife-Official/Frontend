import { useState, useEffect, useCallback } from 'react';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { findPasswordSchema, type FindPasswordFormData } from '@/schemas/authSchema';
import PrimaryInput from '@/components/Input/PrimaryInput';
import GoogleLoginButton from '@/components/Button/GoogleLoginButton';
import { usePostSendMail } from '@/apis/findCredential/postFindPassword';

const TIMER_SECONDS = 180; // 3분

const FindPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const { mutateAsync: sendMail, isPending } = usePostSendMail();

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
      if (timeLeft <= 0) setIsTimerRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  // Step1: 인증번호 받기 제출 핸들러 (유효할 때만 호출)
  const onSubmitValid = async (data: FindPasswordFormData) => {
    try {
      const response = await sendMail({ email: data.email });

      if (response.success) {
        setStep(2);
        startTimer();
      } else {
        setHasSubmitted(true);
        setError('email', {
          type: 'manual',
          message: response.message ?? '인증번호 발송에 실패했습니다. 다시 시도해주세요.',
        });
      }
    } catch {
      setHasSubmitted(true);
      setError('email', {
        type: 'manual',
        message: '오류가 발생했습니다. 다시 시도해주세요.',
      });
    }
  };

  // 유효성 검사 실패 시 한 번이라도 제출했음을 표시 → 이후 실시간 검사
  const onSubmitInvalid = () => {
    setHasSubmitted(true);
  };

  // Step2: 인증번호 재전송 핸들러
  const handleResend = async () => {
    try {
      const email = getValues('email');
      const response = await sendMail({ email });

      if (response.success) {
        startTimer();
        setVerificationCode('');
        alert('인증번호가 재전송되었습니다.');
      } else {
        alert('인증번호 재전송에 실패했습니다. 다시 시도해주세요.');
      }
    } catch {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // Step2: 인증번호 확인 핸들러
  const handleVerify = () => {
    // TODO: 인증번호 확인 API 호출
    console.log('인증번호 확인:', verificationCode);
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
            <div className="relative w-400">
              <PrimaryInput
                type="text"
                placeholder="인증번호 입력"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
              <SecondaryButton
                text="인증번호 재전송"
                onClick={handleResend}
                className="w-148 absolute top-1/2 -translate-y-1/2 left-[calc(100%+12px)]"
              />
            </div>

            {/* 확인 버튼 */}
            <PrimaryButton
              text="확인"
              onClick={handleVerify}
              disabled={verificationCode.length !== 6 || timeLeft <= 0}
              className={`w-400 ${verificationCode.length === 6 && timeLeft > 0
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
          <div className="flex flex-col gap-40 w-400">
            {/* 입력 필드들 */}
            <div className="flex flex-col gap-20">
              {/* 새 비밀번호 */}
              <div className="flex flex-col gap-10">
                <p className="font-body-3-sm text-black">새 비밀번호</p>
                <PrimaryInput
                  type="password"
                  placeholder="영문+숫자 조합 *~20자"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  maxLength={20}
                />
              </div>

              {/* 새 비밀번호 확인 */}
              <div className="flex flex-col gap-10">
                <p className="font-body-3-sm text-black">새 비밀번호 확인</p>
                <PrimaryInput
                  type="password"
                  placeholder="비밀번호를 한 번 더 입력해 주세요"
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  maxLength={20}
                />
              </div>
            </div>

            {/* 비밀번호 변경하기 버튼 */}
            <PrimaryButton
              text="비밀번호 변경하기"
              disabled={!newPassword || !newPasswordConfirm || newPassword !== newPasswordConfirm}
              className={`w-full ${newPassword && newPasswordConfirm && newPassword === newPasswordConfirm
                  ? 'bg-blue-600 hover:bg-blue-500'
                  : ''
                }`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FindPasswordPage;
