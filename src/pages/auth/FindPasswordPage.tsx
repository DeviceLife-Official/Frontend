import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import {
  type FindPasswordFormData,
  type ResetPasswordFormData,
} from '@/schemas/authSchema';
import {
  usePostSendMail,
  usePostVerifyCode,
  usePostResetPassword,
} from '@/apis/findCredential/postFindPassword';
import Step1Form from '@/components/Auth/FindPassword/Step1Form';
import Step2Verification from '@/components/Auth/FindPassword/Step2Verification';
import Step3Reset from '@/components/Auth/FindPassword/Step3Reset';

const TIMER_SECONDS = 180; // 3분

const FindPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [verifyToken, setVerifyToken] = useState<string>('');
  const [verifyError, setVerifyError] = useState<string>('');
  const [resetError, setResetError] = useState<string>('');

  const { mutateAsync: sendMail, isPending } = usePostSendMail();
  const { mutateAsync: verifyCode, isPending: isVerifyPending } = usePostVerifyCode();
  const { mutateAsync: resetPassword, isPending: isResetPending } = usePostResetPassword();

  // 타이머 포맷팅 (mm:ss) 함수
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // 타이머 시작 함수
  const startTimer = useCallback(() => {
    setTimeLeft(TIMER_SECONDS);
    setIsTimerRunning(true);
  }, []);

  // 타이머 useEffect
  useEffect(() => {
    // 타이머 실행 중이지 않거나 시간이 만료되었을 때
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

    // 타이머 설정 및 매 초마다 timeLeft 값 감소
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // 타이머 종료 시 타이머 정리
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, step]);

  // Step1: 인증번호 받기 제출 핸들러
  const handleStep1Submit = async (data: FindPasswordFormData) => {
    try {
      await sendMail({ email: data.email });
      setEmail(data.email);
      setStep(2);
      startTimer();
    } catch (error: unknown) {
      throw error; // Step1Form에서 에러 처리하도록 전달
    }
  };

  // Step1: 유효성 검사 실패 핸들러
  const handleStep1Invalid = () => {
    setHasSubmitted(true);
  };

  // Step2: 인증번호 재전송
  const handleResend = async () => {
    setVerifyError('');
    try {
      await sendMail({ email });
      startTimer();
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

  // Step2: 인증번호 변경 핸들러
  const handleVerificationCodeChange = (value: string) => {
    setVerificationCode(value);
    setVerifyError('');
  };

  // Step2: 인증번호 확인 API 연동
  const handleVerify = async () => {
    setVerifyError('');

    try {
      const response = await verifyCode({ code: verificationCode });

      if (response.result?.verifyToken) {
        setVerifyToken(response.result.verifyToken);
        setStep(3);
      }
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      if (axiosError.response) {
        setVerifyError(axiosError.response.data?.message ?? '인증에 실패했습니다. 다시 시도해 주세요.');
        return;
      }
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  // Step3: 비밀번호 변경 API 연동
  const handleResetPassword = async (data: ResetPasswordFormData) => {
    setResetError('');

    try {
      await resetPassword({
        verifiedToken: verifyToken,
        newPassword: data.newPassword,
      });

      navigate(ROUTES.auth.login);
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      if (axiosError.response) {
        setResetError(axiosError.response.data?.message ?? '비밀번호 변경에 실패했습니다. 다시 시도해 주세요.');
        return;
      }
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {step === 1 && (
        <Step1Form
          onSubmit={handleStep1Submit}
          onInvalid={handleStep1Invalid}
          isPending={isPending}
          hasSubmitted={hasSubmitted}
        />
      )}

      {step === 2 && (
        <Step2Verification
          verificationCode={verificationCode}
          onVerificationCodeChange={handleVerificationCodeChange}
          onVerify={handleVerify}
          onResend={handleResend}
          timeLeft={timeLeft}
          verifyError={verifyError}
          isVerifyPending={isVerifyPending}
          formatTime={formatTime}
        />
      )}

      {step === 3 && (
        <Step3Reset
          onSubmit={handleResetPassword}
          resetError={resetError}
          isResetPending={isResetPending}
          onResetErrorClear={() => setResetError('')}
        />
      )}
    </div>
  );
};

export default FindPasswordPage;
