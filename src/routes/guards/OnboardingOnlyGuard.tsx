import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ROUTES } from '@/constants/routes';

/*
온보딩 전용 가드 컴포넌트
 - 로그인 + 온보딩 미완료만 접근 허용
 - 온보딩 완료 시 홈으로 리다이렉트
*/
export const OnboardingOnlyGuard = () => {
  const { isAuthLoading, hasCompletedOnboarding } = useAuth();

  if (isAuthLoading) {
    return <LoadingSpinner />;
  }

  if (hasCompletedOnboarding) {
    alert('온보딩이 이미 완료되었습니다.');
    return <Navigate to={ROUTES.home} replace />;
  }

  return <Outlet />;
};
