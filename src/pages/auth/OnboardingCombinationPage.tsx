import EllipseBlack from '@/assets/icons/ellipse_black.svg?react';
import EllipseGray from '@/assets/icons/ellipse_gray.svg?react';
import PrimaryInput from '@/components/Input/PrimaryInput';
import PrimaryButton from '@/components/Button/PrimaryButton';

const OnboardingCombinationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 전체 컨테이너 */}
      <div className="flex flex-col items-center gap-68 w-900">
        {/* 상단 영역 (페이지네이션 + 텍스트) */}
        <div className="flex flex-col items-center gap-24 w-540">
          {/* 페이지네이션 인디케이터 */}
          <div className="flex items-center justify-center p-8 gap-24">
            <EllipseBlack className="size-10" />
            <EllipseGray className="size-10" />
            <EllipseGray className="size-10" />
            <EllipseGray className="size-10" />
          </div>
          {/* 메인 타이틀 */}
          <p className="font-body-1-sm text-blue-600 text-center">
            나의 첫 기기 조합을 생성해 주세요.
          </p>
          {/* 조합명 예시 텍스트 */}
          <p className="font-body-2-r text-blue-600">
            조합명 예시: iPhone 15Pro 중심 조합 / 사무실 세팅
          </p>
        </div>

        {/* 입력창 + 버튼 영역 */}
        <div className="flex items-center gap-20">
          {/* 입력창 */}
          <PrimaryInput
            type="text"
            placeholder="생성하고 싶은 조합명을 입력하세요"
            className="!w-600 !bg-blue-100 !border-0 !p-20 !font-body-1-r"
          />

          {/* 조합 생성하기 버튼 */}
          <PrimaryButton text="조합 생성하기" className="w-280 bg-blue-600" />
        </div>
      </div>
    </div>
  );
};

export default OnboardingCombinationPage;
