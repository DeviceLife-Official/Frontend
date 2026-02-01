import PrimaryInput from '@/components/Input/PrimaryInput';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { formatTime } from '@/utils/format';

type Step2VerificationProps = {
  verificationCode: string;
  onVerificationCodeChange: (value: string) => void;
  onVerify: () => void;
  onResend: () => void;
  timeLeft: number;
  verifyError: string;
  isVerifyPending: boolean;
  isResendLimitReached?: boolean;
};

const Step2Verification = ({
  verificationCode,
  onVerificationCodeChange,
  onVerify,
  onResend,
  timeLeft,
  verifyError,
  isVerifyPending,
  isResendLimitReached = false,
}: Step2VerificationProps) => {
  return (
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
                onVerificationCodeChange(e.target.value);
              }}
              maxLength={6}
            />
            <SecondaryButton
              text="인증번호 재전송"
              onClick={onResend}
              disabled={isResendLimitReached}
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
          onClick={onVerify}
          disabled={verificationCode.length !== 6 || timeLeft <= 0 || isVerifyPending}
          className={`w-400 ${
            verificationCode.length === 6 && timeLeft > 0 && !isVerifyPending
              ? 'bg-blue-600 hover:bg-blue-500'
              : ''
          }`}
        />
      </div>
    </div>
  );
};

export default Step2Verification;
