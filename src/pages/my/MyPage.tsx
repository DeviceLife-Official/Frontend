import { useState, useEffect } from 'react';
import GNB from '@/components/Home/GNB';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import SortDropdown from '@/components/Filter/SortDropdown';
import CombinationDeviceCard from '@/components/Combination/CombinationDeviceCard';
import RoundedLifestyleTag from '@/components/Lifestyle/RoundedLifestyleTag';
import SettingIcon from '@/assets/icons/setting.svg?react';
import SupportIcon from '@/assets/icons/support.svg?react';
import SettingMoreIcon from '@/assets/icons/settingmore.svg?react';
import AlarmIcon from '@/assets/icons/alarm.svg?react';
import Logo from '@/assets/logos/logo.svg?react';
import { MOCK_COMBINATIONS, MOCK_COMBINATION_DEVICES } from '@/constants/mockData';

const MYPAGE_SORT_OPTIONS = [
  { value: 'latest', label: '최근생성순' },
  { value: 'oldest', label: '오래된순' },
  { value: 'alphabetical', label: '가나다순' },
];

const MyPage = () => {
  const [sortOption, setSortOption] = useState('latest');
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [columns, setColumns] = useState<3 | 4>(4);

  // 스크롤 감지 (하단 그라데이션용)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setIsAtBottom(scrollTop + windowHeight >= documentHeight - 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 브레이크포인트 감지 (칼럼 수 반응형)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1536px)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setColumns(e.matches ? 4 : 3);
    };
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={`min-h-screen bg-white relative ${isAtBottom ? 'bg-effect-fade-bottom' : ''}`}>
      <GNB />

      <div className="flex pt-52">
        {/* 좌측 사이드바 */}
        <aside
          className="flex-shrink-0 pt-64 w-280"
          style={{ marginLeft: 'clamp(80px, calc(80px + (100vw - 1440px) * 0.166667), 160px)' }}
        >
          {/* MY Page 헤더 */}
          <div className="flex items-center justify-between h-72">
            <h1 className="font-heading-2 text-black">MY Page</h1>
            <div className="flex items-center gap-8">
              <button className="w-42 h-42 flex items-center justify-center cursor-pointer hover:opacity-80">
                <SupportIcon className="w-42 h-42 text-black" />
              </button>
              <button className="w-44 h-44 flex items-center justify-center cursor-pointer hover:opacity-80">
                <SettingIcon className="w-44 h-44 text-black" />
              </button>
            </div>
          </div>

          {/* 프로필 카드 */}
          <div className="mt-76 h-100 rounded-card shadow-[0_0_4px_rgba(0,0,0,0.25)] flex items-center justify-center gap-30">
            <Logo className="w-48 h-48 flex-shrink-0" />
            <p className="font-heading-2 text-black">000 님</p>
          </div>

          {/* 사용자 정보 */}
          <div className="mt-59 flex flex-col gap-36">
            <div className="flex items-center gap-36">
              <p className="font-body-2-sm text-black whitespace-nowrap">가입일</p>
              <p className="font-body-2-r text-black">2023.12.22</p>
            </div>
            <div className="flex items-center gap-36">
              <p className="font-body-2-sm text-black whitespace-nowrap">이메일</p>
              <p className="font-body-2-r text-black truncate">example@devicelife.com</p>
            </div>
            <div className="flex flex-col gap-30">
              <p className="font-body-2-sm text-black">라이프스타일</p>
              <div className="flex flex-wrap gap-12 content-start">
                <RoundedLifestyleTag label="Office" />
              </div>
            </div>
          </div>

          {/* 휴지통 버튼 */}
          {/* <SecondaryButton text="휴지통" className="mt-76 w-full hover:!bg-blue-50 transition-colors" /> */}
        </aside>

        {/* 우측 메인 콘텐츠 */}
        <main
          className="flex-1 pt-64"
          style={{
            paddingLeft: 'clamp(80px, calc(80px + (100vw - 1440px) * 0.166667), 160px)',
            paddingRight: 'clamp(80px, calc(80px + (100vw - 1440px) * 0.166667), 160px)',
          }}
        >
          {/* 헤더: 내 조합 + 새 조합 추가하기 */}
          <div className="flex items-center justify-between h-72">
            <h2 className="font-heading-2 text-black">내 조합</h2>
            <PrimaryButton
              text="새 조합 추가하기"
              className="w-280 bg-blue-600 hover:bg-blue-500"
            />
          </div>

          {/* 정렬 필터 */}
          <div className="flex justify-end mt-76">
            <SortDropdown
              options={MYPAGE_SORT_OPTIONS}
              selectedValue={sortOption}
              onSelect={setSortOption}
            />
          </div>

          {/* 조합 카드 목록 */}
          <div className="mt-28 flex flex-col gap-68">
            {MOCK_COMBINATIONS.map((combination) => {
              const devices = MOCK_COMBINATION_DEVICES[combination.id] || [];
              return (
                <div key={combination.id}>
                  {/* 추천 메시지 */}
                  <div className="flex items-center gap-16 mb-24">
                    <AlarmIcon className="w-36 h-36 text-blue-600 flex-shrink-0" />
                    <p className="font-body-2-r text-blue-600">
                      추천하는 조합입니다. 기기 간 호환성이 우수하며 만족도가 높을 것입니다.
                    </p>
                  </div>

                  {/* 조합 카드 */}
                  <div className="bg-white rounded-card shadow-[0_0_10px_rgba(0,0,0,0.1)] relative">
                    {/* Setting More 버튼 */}
                    <button className="absolute right-56 top-36 cursor-pointer hover:opacity-80">
                      <SettingMoreIcon className="w-36 h-36 text-gray-400" />
                    </button>

                    <CombinationDeviceCard
                      combination={combination}
                      devices={devices}
                      columns={columns}
                      defaultRows={2}
                      showExpandButton={false}
                      showGradient={false}
                      className="px-36 pt-24 pb-36"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 하단 여백 */}
          <div className="h-268" />
        </main>
      </div>
    </div>
  );
};

export default MyPage;
