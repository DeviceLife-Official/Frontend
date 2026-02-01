import { useState, useCallback } from 'react';
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
import Step1Form from '@/components/Auth/FindPasswordStep/Step1Form';
import Step2Verification from '@/components/Auth/FindPasswordStep/Step2Verification';
import Step3Reset from '@/components/Auth/FindPasswordStep/Step3Reset';
import useTimer from '@/hooks/useTimer';
import { parseApiError } from '@/utils/error';

const TIMER_SECONDS = 180; // 3분
const RESEND_LIMIT_MESSAGE = '마지막 인증번호가 발송되었습니다. (재전송 횟수 초과)';

const FindPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verifyToken, setVerifyToken] = useState<string>('');
  const [verifyError, setVerifyError] = useState<string>('');
  const [resetError, setResetError] = useState<string>('');
  const [resendCount, setResendCount] = useState(0);

  const { mutateAsync: sendMail, isPending } = usePostSendMail();
  const { mutateAsync: verifyCode, isPending: isVerifyPending } = usePostVerifyCode();
  const { mutateAsync: resetPassword, isPending: isResetPending } = usePostResetPassword();

  // 타이머 만료 시 에러 메시지 표시 (useCallback으로 참조 안정화)
  const handleTimerExpire = useCallback(() => {
    setVerifyError('인증 시간이 만료되었어요. 인증번호를 다시 받아주세요.');
  }, []);

  // 타이머 훅 사용 (step이 2일 때만 활성화)
  const { timeLeft, start: startTimer } = useTimer({
    initialSeconds: TIMER_SECONDS,
    enabled: step === 2,
    onExpire: handleTimerExpire,
  });

  // Step1: 인증번호 받기 제출 핸들러
  const handleStep1Submit = async (data: FindPasswordFormData) => {
    try {
      await sendMail({ email: data.email });
      setEmail(data.email);
      setStep(2);
      startTimer(); // 타이머 시작
    } catch (error: unknown) {
      throw error; // Step1Form에서 에러 처리하도록 전달
    }
  };

  // Step1: 유효성 검사 실패 핸들러
  const handleStep1Invalid = () => {
    setHasSubmitted(true);
  };

  // Step2: 인증번호 재전송 (최대 3회)
  const handleResend = async () => {
    setVerifyError('');
    try {
      await sendMail({ email });
      setResendCount((prev) => {
        const next = prev + 1;
        if (next >= 3) {
          setVerifyError(RESEND_LIMIT_MESSAGE);
        }
        return next;
      });
      startTimer();
      setVerificationCode('');
    } catch (error: unknown) {
      const { hasResponse, message } = parseApiError(error);
      if (hasResponse && message) {
        alert(message);
      } else if (hasResponse) {
        alert('인증번호 재전송에 실패했습니다. 다시 시도해 주세요.');
      } else {
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  // Step2: 인증번호 변경 핸들러 (재전송 3회 초과 시 메시지는 입력해도 유지)
  const handleVerificationCodeChange = (value: string) => {
    setVerificationCode(value);
    if (resendCount < 3) setVerifyError('');
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
      const { hasResponse, message } = parseApiError(error);
      if (hasResponse) {
        setResetError(message ?? '비밀번호 변경에 실패했습니다. 다시 시도해 주세요.');
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
          isResendLimitReached={resendCount >= 3}
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
