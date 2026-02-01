import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLines from '@/assets/icons/onboarding_lines.svg?react';
import { useGetUserProfile } from '@/apis/mypage/getUserProfile';
import { ROUTES } from '@/constants/routes';

const OnboardingCompletePage = () => {
  const navigate = useNavigate();
  const { data: userProfile } = useGetUserProfile();
  const userName = userProfile?.username ?? '';

  // 애니메이션(2초) 종료 후 3초 뒤 홈으로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(ROUTES.auth.onboarding.recommendation, { replace: true });
    }, 5000); // 2초(애니메이션) + 3초(대기)

    return () => clearTimeout(timer);
  }, [navigate]);

  // 한글과 영문 길이 체크 함수
  const checkNameLength = (name: string) => {
    let koreanCount = 0;
    let englishCount = 0;

    for (const char of name) {
      // 한글 유니코드 범위: AC00-D7A3
      if (char >= '\uAC00' && char <= '\uD7A3') {
        koreanCount++;
      } else if (/[a-zA-Z]/.test(char)) {
        englishCount++;
      }
    }

    return koreanCount >= 5 || englishCount >= 7;
  };

  const shouldUseTwoLines = checkNameLength(userName);

  return (
    <div className="relative flex items-center justify-center h-[calc(100vh-80px)] bg-white overflow-hidden">
      {/* 회로 선들 (뒤에 배치, 중앙 정렬) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-lines-appear">
        <OnboardingLines />
      </div>

      {/* 원형 컨테이너 (앞에 배치) */}
      <div className="relative z-10 flex items-center justify-center size-312 rounded-full bg-white border-shadow-blue-welcome">
        {/* 환영 메시지 */}
        {shouldUseTwoLines ? (
          <div className="flex flex-col items-center gap-6 font-heading-3 text-blue-600">
            <span>{userName} 님,</span>
            <span>어서오세요!</span>
          </div>
        ) : (
            <div className="flex items-center gap-6 font-heading-3 text-blue-600">
              <span>{userName} 님,</span>
              <span>어서오세요!</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingCompletePage;
