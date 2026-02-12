import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import BackIcon from '@/assets/icons/back_gray.svg?react';
import OldPasswordInputSection from '@/components/Setting/OldPasswordInputSection';
import NewPasswordInputSection from '@/components/Setting/NewPasswordInputSection';
import PasswordConfirmInputSection from '@/components/Setting/PasswordConfirmInputSection';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { validateNewPassword, validatePasswordConfirm } from '@/utils/validatePassword';
import { usePutEditPassword } from '@/apis/mypage/putEditPassword';

const PasswordEditPage = () => {
  const navigate = useNavigate();
  const { mutate: putEditPassword, isPending } = usePutEditPassword();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPasswordServerError, setOldPasswordServerError] = useState<string>();
  const [newPasswordServerError, setNewPasswordServerError] = useState<string>();
  const [confirmServerError, setConfirmServerError] = useState<string>();
  const [confirmClientError, setConfirmClientError] = useState<string>();
  const newPasswordError = useMemo(() => validateNewPassword(newPassword), [newPassword]);
  const filled = useMemo(() => {
    return oldPassword.length > 0 && newPassword.length > 0 && confirmPassword.length > 0;
  }, [oldPassword, newPassword, confirmPassword]);
  const hasAnyVisibleError = useMemo(() => {
    const hasOld = !!oldPasswordServerError;
    const hasNew = !!newPasswordError || !!newPasswordServerError;
    const hasConfirm = !!confirmServerError || !!confirmClientError;
    return hasOld || hasNew || hasConfirm;
  }, [
    oldPasswordServerError,
    newPasswordError,
    newPasswordServerError,
    confirmServerError,
    confirmClientError,
  ]);

  const canSubmit = useMemo(() => {
    if (!filled) return false;
    if (newPasswordError) return false;
    if (hasAnyVisibleError) return false;
    return true;
  }, [filled, newPasswordError, hasAnyVisibleError]);

  const handleOldPasswordChange = (next: string) => {
    setOldPassword(next);
    if (oldPasswordServerError) setOldPasswordServerError(undefined);
  };

  const handleNewPasswordChange = (next: string) => {
    setNewPassword(next);
    if (newPasswordServerError) setNewPasswordServerError(undefined);
    if (confirmServerError) setConfirmServerError(undefined);
    if (confirmClientError) setConfirmClientError(undefined);
  };

  const handleConfirmChange = (next: string) => {
    setConfirmPassword(next);
    if (confirmServerError) setConfirmServerError(undefined);
    if (confirmClientError) setConfirmClientError(undefined);
  };

  const handleSave = () => {
    setOldPasswordServerError(undefined);
    setNewPasswordServerError(undefined);
    setConfirmServerError(undefined);
    const confirmErrNow = validatePasswordConfirm(newPassword, confirmPassword);
    setConfirmClientError(confirmErrNow);
    if (newPasswordError || confirmErrNow) return;

    putEditPassword(
      {
        oldPassword,
        newPassword,
        newPasswordConfirm: confirmPassword,
      },
      {
        onSuccess: () => {
          navigate('/my');
        },
        onError: (error) => {
          const axiosError = error as AxiosError<any>;
          const code: string | undefined = axiosError.response?.data?.code;
          const message: string | undefined = axiosError.response?.data?.message;

          if (code === 'USER_4006') {
            setOldPasswordServerError(message);
            return;
          }
          if (code === 'USER_4007') {
            setConfirmServerError(message);
            return;
          }
          if (code === 'USER_4008') {
            setNewPasswordServerError(message);
            return;
          }
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-72 mx-auto w-560 mt-92 mb-92">
      <div className="flex flex-row gap-20 h-40 items-center">
        <BackIcon
          className="w-34 h-34 cursor-pointer"
          onClick={() => navigate('/my/settings/profile')}
        />
        <p className="font-heading-2 text-black">비밀번호 수정</p>
      </div>
      <div className="flex flex-col gap-20 w-560">
        <OldPasswordInputSection
          value={oldPassword}
          onChange={handleOldPasswordChange}
          errorMessage={oldPasswordServerError}
        />
        <NewPasswordInputSection
          value={newPassword}
          onChange={handleNewPasswordChange}
          errorMessage={newPasswordServerError ?? newPasswordError}
        />
        <PasswordConfirmInputSection
          value={confirmPassword}
          onChange={handleConfirmChange}
          errorMessage={confirmServerError ?? confirmClientError}
        />
      </div>
      <div className="flex justify-center">
        <PrimaryButton
          className="w-400 bg-blue-600 hover:bg-blue-500 disabled:hover:bg-gray-300"
          text={isPending ? '저장 중...' : '저장하기'}
          onClick={handleSave}
          disabled={!canSubmit || isPending}
        />
      </div>
    </div>
  );
};

export default PasswordEditPage;
