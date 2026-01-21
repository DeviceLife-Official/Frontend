import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '@/components/Button/PrimaryButton';
import OnboardingLifestyleTag from '@/components/Lifestyle/OnboardingLifestyleTag';
import StepIndicator from '@/components/Auth/Indicator/StepIndicator';
import { ROUTES } from '@/constants/routes';

const OnboardingLifestylePage = () => {
  const navigate = useNavigate();
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedUsages, setSelectedUsages] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const priorities = ['고성능', '가성비', '휴대성', '배터리 수명', '디자인/컬러'];
  const usages = ['# Office', '# Study', '# Developer', '# Video-editing', '# Game', '# Tour/portability'];
  const brands = ['Apple', 'Samsung', 'Sony', 'Logitech', '상관없음'];

  const toggleSelection = (
    item: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedItems.includes(item)) {
      setSelectedItems([]); // 같은 항목 다시 클릭 시 선택 해제
    } else {
      setSelectedItems([item]); // 새로운 항목으로 대체 (단일 선택)
    }
  };

  // 각 섹션별 최소 1개씩 선택 여부 확인
  const isAllSelected =
    selectedPriorities.length > 0 &&
    selectedUsages.length > 0 &&
    selectedBrands.length > 0;

  const handleNext = () => {
    // TODO: 선택한 라이프스타일 저장 (Context/API)
    console.log({
      priorities: selectedPriorities,
      usages: selectedUsages,
      brands: selectedBrands,
    });
    navigate(ROUTES.auth.onboarding.combination, { replace: true });
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
            <p className="font-body-2-r text-blue-600 w-full">
              AI가 회원님의 조합을 평가할 때 이 기준을 참고합니다.
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
                {priorities.map((priority) => (
                  <OnboardingLifestyleTag
                    key={priority}
                    label={priority}
                    selected={selectedPriorities.includes(priority)}
                    onClick={() =>
                      toggleSelection(priority, selectedPriorities, setSelectedPriorities)
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
                {usages.map((usage) => (
                  <OnboardingLifestyleTag
                    key={usage}
                    label={usage}
                    selected={selectedUsages.includes(usage)}
                    onClick={() => toggleSelection(usage, selectedUsages, setSelectedUsages)}
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
                {brands.map((brand) => (
                  <OnboardingLifestyleTag
                    key={brand}
                    label={brand}
                    selected={selectedBrands.includes(brand)}
                    onClick={() => toggleSelection(brand, selectedBrands, setSelectedBrands)}
                    className="w-full h-50"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 다음 버튼 */}
          <PrimaryButton
            text="다음"
            disabled={!isAllSelected}
            className={`w-280 ${isAllSelected ? 'bg-blue-600 hover:bg-blue-500' : ''}`}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingLifestylePage;
