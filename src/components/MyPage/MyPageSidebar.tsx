import { type RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import RoundedLifestyleTag from '@/components/Lifestyle/RoundedLifestyleTag';
import RecentlyViewedFloating from '@/components/RecentlyViewed/RecentlyViewedFloating';
import SettingIcon from '@/assets/icons/setting.svg?react';
import SupportIcon from '@/assets/icons/support.svg?react';
import Logo from '@/assets/logos/logo.svg?react';
import { formatDate } from '@/utils/format';
import type { UserProfile } from '@/types/mypage/user';

interface MyPageSidebarProps {
  userProfile: UserProfile | null;
  isAuthLoading: boolean;
  sidebarContentRef: RefObject<HTMLDivElement>;
}

const MyPageSidebar = ({ userProfile, isAuthLoading, sidebarContentRef }: MyPageSidebarProps) => {
  const navigate = useNavigate();

  return (
    <aside
      className="flex-shrink-0 pt-64 w-280"
      style={{ marginLeft: 'clamp(80px, calc(80px + (100vw - 1440px) * 0.166667), 160px)' }}
    >
      {/* 사이드바 콘텐츠 wrapper */}
      <div ref={sidebarContentRef}>
        {/* MY Page 헤더 */}
        <div className="flex items-center justify-between h-72">
          <h1 className="font-heading-2 text-black">MY Page</h1>
          <div className="flex items-center gap-8">
            <a
              href="https://lovely-potassium-7f2.notion.site/2f0c82f125c980fa8fa0d2ef430bbe79?pvs=74"
              target="_blank"
              rel="noopener noreferrer"
              className="w-42 h-42 flex items-center justify-center cursor-pointer hover:opacity-80"
            >
              <SupportIcon className="w-42 h-42 text-black" />
            </a>
            <button
              onClick={() => navigate('/my/settings/profile')}
              className="w-44 h-44 flex items-center justify-center cursor-pointer hover:opacity-80"
            >
              <SettingIcon className="w-44 h-44 text-black" />
            </button>
          </div>
        </div>

        {/* 프로필 카드 */}
        <div className="mt-60 h-100 rounded-card border border-blue-300 flex items-center justify-center gap-30">
          <Logo className="w-48 h-48 flex-shrink-0" />
          <p className="font-heading-2 text-black">
            {isAuthLoading ? '불러오는 중...' : `${userProfile?.username ?? '000'} 님`}
          </p>
        </div>

        {/* 사용자 정보 */}
        <div className="mt-44 flex flex-col gap-16">
          <div className="flex items-center gap-24">
            <p className="font-body-2-sm text-black whitespace-nowrap">가입일</p>
            <p className="font-body-2-r text-black">
              {userProfile?.createdAt ? formatDate(userProfile.createdAt) : '-'}
            </p>
          </div>
          <div className="flex items-center gap-24">
            <p className="font-body-2-sm text-black whitespace-nowrap">이메일</p>
            <p className="font-body-2-r text-black truncate">{userProfile?.email ?? '-'}</p>
          </div>
          <div className="flex items-center gap-24">
            <p className="font-body-2-sm text-black whitespace-nowrap">라이프스타일</p>
            <div className="flex flex-wrap gap-12 content-start">
              {userProfile?.lifestyleList?.[0] && (
                <RoundedLifestyleTag label={userProfile.lifestyleList[0]} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 최근에 본 기기 플로팅 섹션 */}
      <RecentlyViewedFloating
        userName={userProfile?.username ?? '000'}
        sidebarContentRef={sidebarContentRef}
      />
    </aside>
  );
};

export default MyPageSidebar;
