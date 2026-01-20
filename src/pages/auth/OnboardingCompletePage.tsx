import OnboardingLines from '@/assets/icons/onboarding_lines.svg?react';

const OnboardingCompletePage = () => {
  // TODO: 사용자 이름은 전역 상태 또는 API에서 받아오기
  const userName = '000';

  return (
    <div className="relative flex items-center justify-center h-[calc(100vh-80px)] bg-white overflow-hidden">
      {/* 회로 선들 (뒤에 배치, 중앙 정렬) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-lines-appear">
        <OnboardingLines />
      </div>

      {/* 원형 컨테이너 (앞에 배치) */}
      <div className="relative z-10 flex items-center justify-center size-312 rounded-full bg-white border-shadow-blue-welcome">
        {/* 환영 메시지 */}
        <div className="flex items-center gap-6 font-heading-3 text-blue-600">
          <span>{userName}</span>
          <span>님, 어서오세요!</span>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCompletePage;
