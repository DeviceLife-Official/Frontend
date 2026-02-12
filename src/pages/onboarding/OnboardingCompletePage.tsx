import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import OnboardingLines from '@/assets/icons/onboarding_lines.svg?react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { usePostOnboardingComplete } from '@/apis/onboarding/postComplete';
import { ROUTES } from '@/constants/routes';

const OnboardingCompletePage = () => {
  const navigate = useNavigate();
  const { user, isAuthLoading } = useAuth();
  const { mutateAsync: completeOnboarding } = usePostOnboardingComplete();
  const [isCompleted, setIsCompleted] = useState(false);
  const userName = user?.username ?? '';

  // 검증 조건(온보딩 과정 스킵하고 바로 들어오는 유저 대비)
  const isAlreadyCompleted = user?.isOnboardingCompleted;
  const hasNoLifestyleTags = !user?.lifestyleList?.length;
  const shouldSkipApiCall = isAuthLoading || isAlreadyCompleted || hasNoLifestyleTags;

  // 페이지 진입 시 온보딩 완료 API 호출 (검증 통과 시에만)
  useEffect(() => {
    if (shouldSkipApiCall) return;

    const complete = async () => {
      try {
        await completeOnboarding();
        setIsCompleted(true);
      } catch (error) {
        alert('온보딩 완료에 실패했습니다. 잠시 후 다시 시도해주세요.');
        navigate(ROUTES.onboarding.lifestyle, { replace: true });
      }
    };
    complete();
  }, [shouldSkipApiCall, navigate]);

  // 온보딩 완료 후 5초 뒤 추천 페이지로 이동
  useEffect(() => {
    if (!isCompleted) return;

    const timer = setTimeout(() => {
      navigate(ROUTES.recommendation, { replace: true });
    }, 4000);

    return () => clearTimeout(timer);
  }, [isCompleted, navigate]);

  // 프로필 로딩 중이면 로딩 스피너 표시
  if (isAuthLoading) {
    return <LoadingSpinner />;
  }

  // 이미 온보딩 완료된 경우 → 추천 페이지로 리다이렉트 (중복 온보딩 완료 API 호출 방지)
  // 단, 정상적으로 현재 페이지에서 완료한 경우(isCompleted)는 4초 타이머를 기다려야 함
  if (isAlreadyCompleted && !isCompleted) {
    return <Navigate to={ROUTES.recommendation} replace />;
  }

  // 라이프스타일 태그가 없는 경우 → 라이프스타일 페이지로 리다이렉트
  if (hasNoLifestyleTags) {
    return <Navigate to={ROUTES.onboarding.lifestyle} replace />;
  }

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
