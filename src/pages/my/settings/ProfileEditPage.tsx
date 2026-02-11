import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { usePatchEditProfile } from '@/apis/mypage/patchEditProfile';
import NicknameEditSection from '@/components/Setting/NicknameEditSection';
import EmailSection from '@/components/Setting/EmailSection';
import PasswordSettingSection from '@/components/Setting/PasswordSettingSection';
import LifestyleSelectSection from '@/components/Setting/LifestyleSelectSection';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { validateNickname } from '@/utils/validateNickname';
import BackIcon from '@/assets/icons/back_gray.svg?react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { LIFESTYLE_DISPLAY_TAGS, type LifestyleDisplayTag } from '@/constants/lifestyle';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { user, isAuthLoading, refetchUserProfile } = useAuth();
  const { mutate: patchProfile, isPending } = usePatchEditProfile();
  const serverLifestyle = useMemo<LifestyleDisplayTag[]>(() => {
    const raw = user?.lifestyleList ?? [];
    return raw.filter((t): t is LifestyleDisplayTag =>
      LIFESTYLE_DISPLAY_TAGS.includes(t as LifestyleDisplayTag)
    );
  }, [user]);

  const initialNickname = user?.username ?? '000';
  const initialEmail = user?.email ?? 'example@devicelife.com';
  const initialLifestyles = serverLifestyle; 
  const authProvider = user?.authProvider ?? 'GENERAL';
  const [nickname, setNickname] = useState(initialNickname);
  const [lifestyles, setLifestyles] = useState<LifestyleDisplayTag[]>(initialLifestyles);
  const normalizeLifestyleList = (arr: LifestyleDisplayTag[]) => [...arr].sort().join(',');

  const payload = useMemo(() => {
    const isLifestyleChanged =
      normalizeLifestyleList(lifestyles) !== normalizeLifestyleList(initialLifestyles);

    return {
      username: nickname !== initialNickname ? nickname : null,
      email: null,
      lifestyleList: isLifestyleChanged ? lifestyles : null,
    };
  }, [nickname, lifestyles, initialNickname, initialLifestyles]);


  useEffect(() => {
    if (!user) return;
    setNickname(user.username ?? '000');
    setLifestyles(serverLifestyle);
  }, [user, serverLifestyle]);

  const nicknameError = validateNickname(nickname);
  const isLifestyleValid = lifestyles.length === 1;
  const isDirty = useMemo(() => {
    if (nickname !== initialNickname) return true;
    const cur = normalizeLifestyleList(lifestyles);
    const init = normalizeLifestyleList(initialLifestyles);
    return cur !== init;
  }, [nickname, lifestyles, initialNickname, initialLifestyles]);


 const handleSave = () => {
   patchProfile(payload, {
     onSuccess: async () => {
       await refetchUserProfile();
       navigate('/my');
     },
   });
  };
  

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
          text={isPending ? '저장 중...' : '저장하기'}
          onClick={handleSave}
          disabled={!isDirty || !!nicknameError || !isLifestyleValid || isPending}
        />
      </div>
    </div>
  );
};

export default ProfileEditPage;
