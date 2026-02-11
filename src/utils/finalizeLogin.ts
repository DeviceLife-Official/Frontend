import { setAccessToken } from '@/utils/authStorage';
import { getUserProfile } from '@/apis/mypage/getUserProfile';
import { queryKey } from '@/constants/queryKey';
import type { QueryClient } from '@tanstack/react-query';

/**
 * 로그인 완료 후 공통 처리 함수
 * - 토큰 저장 (keepLogin에 따라 localStorage 또는 sessionStorage)
 * - 유저 정보 조회 및 캐시 저장
 *
 * @param accessToken - 액세스 토큰
 * @param queryClient - React Query 클라이언트
 * @param keepLogin - true: localStorage(영속), false: sessionStorage(세션)
 * @throws 유저 정보 조회 실패 시 에러 발생
 */
export const finalizeLogin = async (
  accessToken: string,
  queryClient: QueryClient,
  keepLogin: boolean
): Promise<void> => {
  // 1. 토큰 저장 (refreshToken은 httpOnly 쿠키로 관리)
  setAccessToken(accessToken, keepLogin);

  // 2. 유저 정보 조회 및 캐시 저장
  const userProfile = await getUserProfile();
  queryClient.setQueryData([queryKey.USER_PROFILE], userProfile);
};
