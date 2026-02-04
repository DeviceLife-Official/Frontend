import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import LoadingSpinner from '@/components/LoadingSpinner';

/**
 * 인증 가드 컴포넌트
 * - 로그인 상태가 아니면 로그인 페이지로 리다이렉트
 * - 로그인 상태면 자식 라우트 렌더링
 * - 로딩 중일 때는 로딩 스피너 표시 (플리커 방지)
 */
export const AuthGuard = () => {
  const { isLoggedIn, isAuthLoading } = useAuth();

  // 로딩 중일 때는 로딩 스피너 표시
  if (isAuthLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoggedIn) {
    alert('로그인 후 이용해주세요.');
    return <Navigate to={ROUTES.auth.login} replace />;
  }

  return <Outlet />;
};
