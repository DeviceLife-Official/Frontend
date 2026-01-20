import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackIcon from '@/assets/icons/back_gray.svg?react';

import OldPasswordInputSection from '@/components/Setting/OldPasswordInputSection';
import NewPasswordInputSection from '@/components/Setting/NewPasswordInputSection';
import PasswordConfirmInputSection from '@/components/Setting/PasswordConfirmInputSection';
import PrimaryButton from '@/components/Button/PrimaryButton';

import { validateNewPassword, validatePasswordConfirm } from '@/utils/validatePassword';

const PasswordEditPage = () => {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const newPasswordError = useMemo(() => validateNewPassword(newPassword), [newPassword]);
  const confirmPasswordError = useMemo(
    () => validatePasswordConfirm(newPassword, confirmPassword),
    [newPassword, confirmPassword]
  );

  const canSubmit = useMemo(() => {
    const filled = oldPassword.length > 0 && newPassword.length > 0 && confirmPassword.length > 0;
    if (!filled) return false;
    if (newPasswordError || confirmPasswordError) return false;
    return true;
  }, [oldPassword, newPassword, confirmPassword, newPasswordError, confirmPasswordError]);

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
        <OldPasswordInputSection value={oldPassword} onChange={setOldPassword} />
        <NewPasswordInputSection
          value={newPassword}
          onChange={setNewPassword}
          errorMessage={newPasswordError}
        />
        <PasswordConfirmInputSection
          value={confirmPassword}
          onChange={setConfirmPassword}
          errorMessage={confirmPasswordError}
        />
      </div>
      <div className="flex justify-center">
        <PrimaryButton
          className="w-400 bg-blue-600 hover:bg-blue-500 disabled:hover:bg-gray-300"
          text="저장하기"
          disabled={!canSubmit}
        />
      </div>
    </div>
  );
};

export default PasswordEditPage;
