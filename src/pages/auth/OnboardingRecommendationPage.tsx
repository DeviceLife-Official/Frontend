import PrimaryButton from '@/components/Button/PrimaryButton';

const OnboardingRecommendationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 메인 컨테이너 */}
      <div className="flex flex-col items-center gap-24 w-1400">
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

          {/* 다음 버튼 */}
          <PrimaryButton text="다음" className="w-280 bg-blue-600 hover:bg-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default OnboardingRecommendationPage;