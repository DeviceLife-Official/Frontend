import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '@/components/Button/PrimaryButton';
import OnboardingLifestyleTag from '@/components/Lifestyle/OnboardingLifestyleTag';
import StepIndicator from '@/components/Auth/Indicator/StepIndicator';
import { ROUTES } from '@/constants/routes';
import { useGroupedTags } from '@/hooks/useGroupedTags';
import { usePostUserTags } from '@/apis/tag/postTags';

const OnboardingLifestylePage = () => {
  const navigate = useNavigate();
  const { tags } = useGroupedTags();
  const { mutateAsync: saveTags, isPending } = usePostUserTags();
  const [selectedInterest, setSelectedInterest] = useState<number[]>([]);
  const [selectedLifestyle, setSelectedLifestyle] = useState<number[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<number[]>([]);

  const toggleSelection = (
    tagId: number,
    selectedItems: number[],
    setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    if (selectedItems.includes(tagId)) {
      setSelectedItems([]); // 같은 항목 다시 클릭 시 선택 해제
    } else {
      setSelectedItems([tagId]); // 새로운 항목으로 대체 (단일 선택)
    }
  };

  // 각 섹션별 최소 1개씩 선택 여부 확인
  const isAllSelected =
    selectedInterest.length > 0 &&
    selectedLifestyle.length > 0 &&
    selectedBrand.length > 0;

  const handleNext = async () => {
    const allSelectedTagIds = [...selectedInterest, ...selectedLifestyle, ...selectedBrand];

    try {
      await saveTags({ tagIds: allSelectedTagIds });
      navigate(ROUTES.onboarding.combination, { replace: true });
    } catch (error) {
      alert('태그 저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 메인 컨테이너 */}
      <div className="flex flex-col items-center gap-24 w-1400">
        {/* 페이지네이션 인디케이터 */}
        <StepIndicator currentStep={3} totalSteps={4} />

        {/* 콘텐츠 영역 */}
        <div className="flex flex-col items-center gap-56 w-full">
          {/* 타이틀 영역 */}
          <div className="flex flex-col items-center gap-20 w-540">
            {/* 메인 타이틀 */}
            <p className="font-body-1-sm text-blue-600 text-center w-full">
              회원님의 라이프 스타일을 골라주세요
            </p>
            {/* 서브 타이틀 */}
            <p className="font-body-2-r text-blue-600 text-center w-full">
              AI가 회원님의 조합을 평가할 때 이 기준을 참고합니다. (문항별 택1)
            </p>
          </div>

          {/* 3개 컬럼 영역 */}
          <div className="flex gap-100 items-start">
            {/* 왼쪽 컬럼: 중요하게 생각하는 것 */}
            <div className="flex flex-col gap-28 items-center w-280">
              <p className="font-body-1-sm text-blue-800 text-center w-full">
                중요하게 생각하는 것은?
              </p>
              <div className="flex flex-col gap-8 w-full">
                {tags.interest.map((tag) => (
                  <OnboardingLifestyleTag
                    key={tag.tagId}
                    label={tag.tagLabel}
                    selected={selectedInterest.includes(tag.tagId)}
                    onClick={() =>
                      toggleSelection(tag.tagId, selectedInterest, setSelectedInterest)
                    }
                    className="w-full h-50"
                  />
                ))}
              </div>
            </div>

            {/* 중간 컬럼: 주된 용도 */}
            <div className="flex flex-col gap-28 items-center w-544 h-339">
              <p className="font-body-1-sm text-blue-800 text-center">나의 주된 용도는?</p>
              <div className="grid grid-cols-2 gap-x-16 place-content-between flex-1 w-full">
                {tags.lifestyle.map((tag) => (
                  <OnboardingLifestyleTag
                    key={tag.tagId}
                    label={tag.tagLabel}
                    selected={selectedLifestyle.includes(tag.tagId)}
                    onClick={() => toggleSelection(tag.tagId, selectedLifestyle, setSelectedLifestyle)}
                    className="w-264 h-88"
                  />
                ))}
              </div>
            </div>

            {/* 오른쪽 컬럼: 선호 브랜드 */}
            <div className="flex flex-col gap-28 items-center w-280">
              <p className="font-body-1-sm text-blue-800 text-center w-full">
                선호하는 브랜드는?
              </p>
              <div className="flex flex-col gap-8 w-full">
                {tags.brand.map((tag) => (
                  <OnboardingLifestyleTag
                    key={tag.tagId}
                    label={tag.tagLabel}
                    selected={selectedBrand.includes(tag.tagId)}
                    onClick={() => toggleSelection(tag.tagId, selectedBrand, setSelectedBrand)}
                    className="w-full h-50"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 다음 버튼 */}
          <PrimaryButton
            text="다음"
            disabled={!isAllSelected || isPending}
            className={`w-280 ${isAllSelected && !isPending ? 'bg-blue-600 hover:bg-blue-500' : ''}`}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingLifestylePage;
