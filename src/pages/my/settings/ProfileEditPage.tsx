import { useMemo, useState } from 'react';
import NicknameEditSection from '@/components/Setting/NicknameEditSection';
import EmailSection from '@/components/Setting/EmailSection';
import PasswordSettingSection from '@/components/Setting/PasswordSettingSection';
import LifestyleSelectSection from '@/components/Setting/LifestyleSelectSection';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { validateNickname } from '@/utils/validateNickname';

type AuthProvider = 'GENERAL' | 'HYBRID' | 'GOOGLE';

const ProfileEditPage = () => {
  // TODO: API 연동
  const initialNickname = '000';
  const initialEmail = 'example@devicelife.com';
  const initialLifestyles: string[] = [];

  const [authProvider] = useState<AuthProvider>('GENERAL');

  const TAGS = [
    'Office',
    'Study',
    'Tour/portability',
    'Developer',
    'Game',
    'Video-editing',
  ] as const;
  type Tag = (typeof TAGS)[number];

  const [nickname, setNickname] = useState(initialNickname);
  const [lifestyles, setLifestyles] = useState<Tag[]>([]);

  const isDirty = useMemo(() => {
    if (nickname !== initialNickname) return true;
    if (lifestyles.join(',') !== initialLifestyles.join(',')) return true;
    return false;
  }, [nickname, lifestyles]);

  const nicknameError = validateNickname(nickname);
  const isLifestyleValid = lifestyles.length === 1;

  return (
    <div className="flex flex-col gap-72 mx-auto w-560 mt-92 mb-92">
      <p className="font-heading-2 text-black">프로필 수정</p>
      <div className="flex flex-col gap-20 w-560">
        <NicknameEditSection value={nickname} onChange={setNickname} errorMessage={nicknameError} />
        <EmailSection value={initialEmail} />
        {(authProvider === 'GENERAL' || authProvider === 'HYBRID') && <PasswordSettingSection />}
        <LifestyleSelectSection value={lifestyles} onChange={setLifestyles} />
      </div>
      <div className="flex justify-center">
        <PrimaryButton
          className="w-400 bg-blue-600 hover:bg-blue-500 disabled:hover:bg-gray-300"
          text="저장하기"
          disabled={!isDirty || !!nicknameError || !isLifestyleValid}
        />
      </div>
    </div>
  );
};

export default ProfileEditPage;
