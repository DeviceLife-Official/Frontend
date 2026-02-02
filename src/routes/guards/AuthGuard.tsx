import { Navigate, Outlet } from 'react-router-dom';
import { hasAuthTokens } from '@/utils/auth/authStorage';
import { ROUTES } from '@/constants/routes';

/**
 * 인증 가드 컴포넌트
 * - 토큰이 없으면 로그인 페이지로 리다이렉트
 * - 토큰이 있으면 자식 라우트 렌더링
 */
export const AuthGuard = () => {
  const hasTokens = hasAuthTokens();

  if (!hasTokens) {
    alert('로그인 후 이용해주세요.');
    return <Navigate to={ROUTES.auth.login} replace />;
  }

  return <Outlet />;
};
