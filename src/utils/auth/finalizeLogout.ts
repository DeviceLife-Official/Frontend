import { clearAuthTokens } from '@/utils/auth/authStorage';
import type { QueryClient } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';
import { clearRecentlyViewedDevices } from '@/utils/recentlyViewedStorage';

/*
로그아웃 처리 함수

1. 토큰 제거
2. 유저별 데이터 캐시 삭제 (조합 목록, 조합 상세, 유저 정보)
3. 최근 본 기기 목록 삭제 (유저별 데이터)
*/

export const finalizeLogout = (queryClient: QueryClient): void => {
  // 1. 토큰 제거
  clearAuthTokens();

  // 2. 유저별 데이터 캐시 삭제
  queryClient.removeQueries({ queryKey: [queryKey.COMBOS] });
  queryClient.removeQueries({ queryKey: [queryKey.COMBO_DETAIL] });
  queryClient.removeQueries({ queryKey: [queryKey.USER_PROFILE] });

  // 3. 최근 본 기기 목록 삭제 (유저별 데이터)
  clearRecentlyViewedDevices();
};
