import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/schemas/authSchema';
import PrimaryInput from '@/components/Input/PrimaryInput';
import PrimaryButton from '@/components/Button/PrimaryButton';
import InputEyeIcon from '@/assets/icons/input_eye.svg?react';

type Step3ResetProps = {
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
  resetError: string;
  isResetPending: boolean;
  onResetErrorClear?: () => void;
};

const Step3Reset = ({ onSubmit, resetError, isResetPending, onResetErrorClear }: Step3ResetProps) => {
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors, isValid: isResetValid },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  return (
    <div className="flex flex-col items-center gap-56">
      {/* 타이틀 */}
      <p className="font-body-1-sm text-blue-600 text-center">
        새로운 비밀번호를 설정해 주세요
      </p>

      {/* 입력 필드 + 버튼 영역 */}
      <form
        onSubmit={handleResetSubmit(onSubmit)}
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
                  onChange: () => {},
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
                onChange: () => {
                  onResetErrorClear?.();
                },
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
  );
};

export default Step3Reset;
