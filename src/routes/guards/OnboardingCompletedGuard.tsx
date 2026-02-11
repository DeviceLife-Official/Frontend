import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ROUTES } from '@/constants/routes';

/*
온보딩 완료 가드 컴포넌트
 - 로그인 + 온보딩 완료만 접근 허용
 - 온보딩 미완료 시 온보딩 페이지로 리다이렉트
*/
export const OnboardingCompletedGuard = () => {
  const { isAuthLoading, hasCompletedOnboarding } = useAuth();

  if (isAuthLoading) {
    return <LoadingSpinner />;
  }

  if (!hasCompletedOnboarding) {
    alert('온보딩을 완료한 후 이용해주세요.');
    return <Navigate to={ROUTES.onboarding.lifestyle} replace />;
  }

  return <Outlet />;
};
