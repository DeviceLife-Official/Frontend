import EllipseBlack from '@/assets/icons/ellipse_black.svg?react';
import EllipseGray from '@/assets/icons/ellipse_gray.svg?react';
import PrimaryButton from '@/components/Button/PrimaryButton';

const OnboardingLifestylePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 메인 컨테이너 */}
      <div className="flex flex-col items-center gap-24 w-1400">
        {/* 페이지네이션 인디케이터 */}
        <div className="flex items-center justify-center p-8 gap-24">
          <EllipseGray className="size-10" />
          <EllipseGray className="size-10" />
          <EllipseBlack className="size-10" />
          <EllipseGray className="size-10" />
        </div>

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
              AI가 회원님의 조합을 평가할 때 이 기준을 참고합니다. (복수선택 가능)
            </p>
          </div>

          {/* 3개 컬럼 영역 */}
          <div className="flex gap-100 items-start">
            {/* 왼쪽 컬럼: 중요하게 생각하는 것 */}
            <div className="flex flex-col gap-28 items-center w-280">
              <p className="font-body-1-sm text-blue-800 text-center w-full">
                중요하게 생각하는 것은?
              </p>
              {/* TODO: 선택 옵션들 */}
            </div>

            {/* 중간 컬럼: 주된 용도 */}
            <div className="flex flex-col gap-28 items-center">
              <p className="font-body-1-sm text-blue-800 text-center">나의 주된 용도는?</p>
              {/* TODO: 선택 옵션들 (2x3 그리드) */}
            </div>

            {/* 오른쪽 컬럼: 선호 브랜드 */}
            <div className="flex flex-col gap-28 items-center w-280">
              <p className="font-body-1-sm text-blue-800 text-center w-full">
                선호하는 브랜드는?
              </p>
              {/* TODO: 선택 옵션들 */}
            </div>
          </div>

          {/* 다음 버튼 */}
          <PrimaryButton text="다음" className="w-280 bg-blue-600 hover:bg-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default OnboardingLifestylePage;
