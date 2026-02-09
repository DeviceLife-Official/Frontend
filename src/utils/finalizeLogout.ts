import { clearAccessToken } from '@/utils/authStorage';
import type { QueryClient } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';

/*
로그아웃 처리 함수

1. 토큰 제거
2. 유저별 데이터 캐시 삭제 (조합 목록, 조합 상세, 유저 정보)
*/

export const finalizeLogout = (queryClient: QueryClient): void => {
  // 1. 토큰 제거
  clearAccessToken();

  // 2. 유저별 데이터 캐시 삭제
  queryClient.removeQueries({ queryKey: [queryKey.COMBOS] });
  queryClient.removeQueries({ queryKey: [queryKey.COMBO_DETAIL] });
  queryClient.removeQueries({ queryKey: [queryKey.USER_PROFILE] });
};
