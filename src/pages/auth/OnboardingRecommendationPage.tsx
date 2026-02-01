import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '@/components/Button/PrimaryButton';
import RecentlyViewedCard from '@/components/RecentlyViewed/RecentlyViewedCard';
import { MOCK_PRODUCTS } from '@/constants/mockData';
import type { RecentlyViewedDevice } from '@/types/recentlyViewed';
import { queryKey } from '@/constants/queryKey';
import { useSignupStore } from '@/stores/signupStore';
import type { UserProfileResult } from '@/types/mypage/user';
import { ROUTES } from '@/constants/routes';

const OnboardingRecommendationPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // 캐시에서 직접 가져오기 (OnboardingCompletePage에서 이미 호출했으므로 캐시에 있음)
  const userProfile = queryClient.getQueryData<UserProfileResult | undefined>([queryKey.USER_PROFILE]);
  const { profile } = useSignupStore();

  // 라이프스타일 태그명 (주된 용도에서 선택한 태그)
  const lifestyleTagLabel = userProfile?.lifestyleList?.[0] || '';
  // 유저명
  const userName = profile.username || userProfile?.username || '';

  // 타이틀 표시 여부
  const hasTitleData = lifestyleTagLabel && userName;

  // MOCK_PRODUCTS에서 3개만 가져와서 사용
  const dummyDevices: RecentlyViewedDevice[] = MOCK_PRODUCTS.slice(0, 3).map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image,
    viewedAt: Date.now(),
  }));

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 메인 컨테이너 */}
      <div className="flex flex-col items-center gap-24 w-1400">
        {/* 콘텐츠 영역 */}
        <div className="flex flex-col items-center gap-56 w-full">
          {/* 타이틀 영역 */}
          <div className="flex flex-col items-center gap-20 w-540">
            {/* 메인 타이틀 */}
            {hasTitleData ? (
              <div className="flex items-center justify-center w-full font-body-1-sm text-blue-600">
                <span>{lifestyleTagLabel}</span>
                <span className="w-4" />
                <span>를 선택한</span>
                <span className="w-8" />
                <span>{userName}님</span>
                <span className="w-4" />
                <span>을 위한 추천 기기</span>
              </div>
            ) : (
                <p className="font-body-1-sm text-blue-600 text-center w-full">
                  회원님을 위한 추천 기기
                </p>
            )}
            {/* 서브 타이틀 */}
            <p className="font-body-2-r text-blue-600 text-center w-full">
              버튼을 눌러 방금 생성한 내 조합에 바로 담을 수 있어요!
            </p>
          </div>

          {/* 기기 카드 영역 - 가로 3개 */}
          <div className="flex gap-28 justify-center">
            {dummyDevices.map((device) => (
              <RecentlyViewedCard key={device.id} device={device} />
            ))}
          </div>

          <div className="flex flex-col items-center gap-12 ">
            {/* 내 조합에 담기 버튼 */}
            <PrimaryButton text="내 조합에 담기" className="w-280 bg-blue-500 hover:bg-blue-400" />
            {/* 다음에 하기 버튼 */}
            <PrimaryButton
              text="다음에 하기"
              className="w-280 bg-gray-100 hover:bg-gray-200 !text-black"
              onClick={() => navigate(ROUTES.home, { replace: true })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingRecommendationPage;


