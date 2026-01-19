const OnboardingCombinationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 전체 컨테이너 */}
      <div className="flex flex-col items-center gap-68 w-900">
        {/* 상단 영역 (페이지네이션 + 텍스트) */}
        <div className="flex flex-col items-center gap-24 w-540">
          {/* 페이지네이션 인디케이터 */}
          <div className="flex items-center justify-center p-10 w-440">
            {/* TODO: 4개의 점 (EllipseBlack, EllipseGray) */}
          </div>

          {/* 텍스트 영역 */}
          <div className="flex flex-col items-center gap-26 w-full">
            {/* TODO: 메인 타이틀 (파란색) */}
            <div>{/* "나의 첫 기기 조합을 생성해 주세요." */}</div>
            
            {/* TODO: 조합명 예시 텍스트 (회색) */}
            <div>{/* "조합명 예시: iPhone 15Pro 중심 조합 / 사무실 세팅" */}</div>
          </div>
        </div>

        {/* 입력창 + 버튼 영역 */}
        <div className="flex items-center gap-20 w-full">
          {/* TODO: 입력창 */}
          <div className="w-600">{/* PrimaryInput: placeholder="생성하고 싶은 조합명을 입력하세요" */}</div>
          
          {/* TODO: 조합 생성하기 버튼 */}
          <div className="w-280">{/* PrimaryButton: "조합 생성하기" */}</div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCombinationPage;
