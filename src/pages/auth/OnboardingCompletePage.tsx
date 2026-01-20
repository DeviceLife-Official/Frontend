const OnboardingCompletePage = () => {
  // TODO: 사용자 이름은 전역 상태 또는 API에서 받아오기
  const userName = '000';

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      {/* 원형 컨테이너 */}
      <div className="flex items-center justify-center size-312 rounded-full bg-white border-shadow-blue-welcome">
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
