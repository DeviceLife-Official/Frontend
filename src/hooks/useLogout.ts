import { useQueryClient } from '@tanstack/react-query';
import { usePostLogout } from '@/apis/auth/postLogout';
import { handleLogout } from '@/utils/auth/logout';
import { hasAuthTokens } from '@/utils/auth/authStorage';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

/**
 * 로그아웃 훅
 * - API 호출과 로그아웃 후처리를 모두 포함
 * - 비회원(토큰 없음) 케이스도 처리: API 호출 없이 후처리만 수행
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: postLogout, isPending } = usePostLogout();
  const navigate = useNavigate();

  const logout = async () => {
    const hasTokens = hasAuthTokens();

    try {
      // 토큰이 있으면 API 호출
      if (hasTokens) {
        await postLogout();
      }
    } catch (error) {
      // API 호출 실패해도 로그아웃은 진행 (네트워크 오류 등)
      // 에러는 무시하고 후처리 진행
    } finally {
      // API 호출 성공/실패와 관계없이 항상 후처리 수행
      handleLogout(queryClient);
      navigate(ROUTES.auth.login);
    }
  };

  return {
    logout,
    isPending,
  };
};
