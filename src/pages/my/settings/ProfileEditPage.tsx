import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import NicknameEditSection from '@/components/Setting/NicknameEditSection';
import EmailSection from '@/components/Setting/EmailSection';
import PasswordSettingSection from '@/components/Setting/PasswordSettingSection';
import LifestyleSelectSection from '@/components/Setting/LifestyleSelectSection';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { validateNickname } from '@/utils/validateNickname';
import BackIcon from '@/assets/icons/back_gray.svg?react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { LIFESTYLE_TAGS, type LifestyleLabel } from '@/constants/lifestyle';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { user, isAuthLoading } = useAuth();
  const serverLifestyleLabel = useMemo((): LifestyleLabel | null => {
    const raw = user?.lifestyleList?.[0];
    if (!raw) return null;
    const normalized = raw.replace(/^#\s*/, '') as LifestyleLabel;
    return LIFESTYLE_TAGS.includes(normalized) ? normalized : null;
  }, [user]);
  const initialNickname = user?.username ?? '000';
  const initialEmail = user?.email ?? 'example@devicelife.com';
  const initialLifestyles = serverLifestyleLabel ? [serverLifestyleLabel] : [];
  const authProvider = user?.authProvider ?? 'GENERAL';
  const [nickname, setNickname] = useState(initialNickname);
  const [lifestyles, setLifestyles] = useState<LifestyleLabel[]>(initialLifestyles);

  useEffect(() => {
    if (!user) return;
    setNickname(user.username ?? '000');
    setLifestyles(serverLifestyleLabel ? [serverLifestyleLabel] : []);
  }, [user, serverLifestyleLabel]);

  const nicknameError = validateNickname(nickname);
  const isLifestyleValid = lifestyles.length === 1;
  const isDirty = useMemo(() => {
    if (nickname !== initialNickname) return true;
    if (lifestyles.join(',') !== initialLifestyles.join(',')) return true;
    return false;
  }, [nickname, lifestyles, initialNickname, initialLifestyles]);

  if (isAuthLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-72 mx-auto w-560 mt-92 mb-92">
      <div className="flex flex-row gap-20 h-40 items-center">
        <BackIcon className="w-34 h-34 cursor-pointer" onClick={() => navigate('/my')} />
        <p className="font-heading-2 text-black">프로필 수정</p>
      </div>
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
