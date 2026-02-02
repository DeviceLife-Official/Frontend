import { clearAuthTokens } from '@/utils/auth/authStorage';
import type { QueryClient } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';

/**
 * 로그아웃 처리 함수
 * 1. 토큰 제거
 * 2. 유저 정보 쿼리 캐시 삭제
 *
 * @param queryClient - React Query 클라이언트 인스턴스
 */
export const handleLogout = (queryClient: QueryClient): void => {
  // 1. 토큰 제거
  clearAuthTokens();

  // 2. 유저 정보 쿼리 캐시 삭제
  queryClient.removeQueries({ queryKey: [queryKey.USER_PROFILE] });
};
