import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

/*
온보딩 완료 가드 컴포넌트
 - 로그인 + 온보딩 완료만 접근 허용
 - 온보딩 미완료 시 온보딩 페이지로 리다이렉트
*/
export const OnboardingCompletedGuard = () => {

  // 온보딩 완료 여부 판단 (임시)
  // TODO: api 연동 후 수정
  
  const isOnboardingCompleted = false;

  if (!isOnboardingCompleted) {
    return <Navigate to={ROUTES.auth.onboarding.lifestyle} replace />;
  }

  return <Outlet />;
};
