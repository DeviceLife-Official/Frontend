import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PrimaryButton from '@/components/Button/PrimaryButton';
import RecentlyViewedCard from '@/components/RecentlyViewed/RecentlyViewedCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { RecentlyViewedDevice } from '@/types/recentlyViewed';
import type { LifestyleTagKey } from '@/types/lifestyle/lifestyle';
import { useAuth } from '@/hooks/useAuth';
import { useGroupedTags } from '@/hooks/useGroupedTags';
import { useGetLifestyleDevice } from '@/apis/lifestyle/getLifestyleDevice';
import { useGetCombos } from '@/apis/combo/getCombos';
import { usePostComboDevice } from '@/apis/combo/postComboDevices';
import { ROUTES } from '@/constants/routes';

const OnboardingRecommendationPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tags } = useGroupedTags();

  // 라이프스타일 태그 라벨 (유저 프로필에서 가져온 값)
  const lifestyleTagLabel = user?.lifestyleList?.[0] || '';

  // 태그 목록에서 tagLabel로 매칭하여 tagKey 추출 (API 파라미터용)
  const lifestyleTagKey = useMemo(() => {
    const matched = tags.lifestyle.find((t) => t.tagLabel === lifestyleTagLabel);
    return matched?.tagKey || '';
  }, [tags.lifestyle, lifestyleTagLabel]);

  // 추천 기기 조회
  const { data: lifestyleData, isLoading: isDevicesLoading } = useGetLifestyleDevice(lifestyleTagKey as LifestyleTagKey);

  // 조합 목록 조회 (온보딩에서 생성한 조합의 comboId를 가져오기 위함)
  const { data: combos } = useGetCombos();
  const comboId = combos?.[0]?.comboId ?? null;

  // 조합에 기기 추가 mutation
  const { mutateAsync: addDevice } = usePostComboDevice();
  const [isAdding, setIsAdding] = useState(false);

  // 선택된 기기 ID (단일 선택)
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

  const selectDevice = (deviceId: number) => {
    setSelectedDeviceId(deviceId);
  };

  // 유저명
  const userName = user?.username || '';

  // 타이틀 표시 여부
  const hasTitleData = lifestyleTagLabel && userName;

  // API 응답을 RecentlyViewedDevice 형태로 변환 (3개만)
  const recommendedDevices: RecentlyViewedDevice[] = (lifestyleData?.result?.devices ?? [])
    .slice(0, 3)
    .map((device) => ({
      id: device.deviceId,
      name: device.displayName,
      category: '',
      price: device.price,
      image: device.imageUrl,
      viewedAt: Date.now(),
    }));

  // 내 조합에 담기 핸들러
  const handleAddToCombo = async () => {
    if (!comboId || !selectedDeviceId || isAdding) return;

    setIsAdding(true);
    try {
      await addDevice({ comboId, deviceId: selectedDeviceId });
      alert('선택한 기기가 내 조합에 담겼습니다!');
      navigate(ROUTES.home, { replace: true });
    } catch (error) {
      alert('조합에 기기를 담는데 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsAdding(false);
    }
  };

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
            {isDevicesLoading ? (
              <LoadingSpinner />
            ) : recommendedDevices.length > 0 ? (
              recommendedDevices.map((device) => {
                const isSelected = selectedDeviceId === device.id;
                return (
                  <RecentlyViewedCard
                    key={device.id}
                    device={device}
                    className={clsx(
                      'rounded-8 transition-all',
                      isSelected && 'border-shadow-blue'
                    )}
                    onClick={() => selectDevice(device.id)}
                  />
                );
              })
            ) : (
              <p className="font-body-2-r text-gray-400">추천 기기가 없습니다.</p>
            )}
          </div>

          <div className="flex flex-col items-center gap-12 ">
            {/* 내 조합에 담기 버튼 */}
            <PrimaryButton
              text={isAdding ? '담는 중...' : '내 조합에 담기'}
              disabled={!comboId || !selectedDeviceId || isAdding}
              className="w-280 bg-blue-500 hover:bg-blue-400"
              onClick={handleAddToCombo}
            />
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

