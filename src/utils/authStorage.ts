import { ACCESS_TOKEN } from '@/constants/tokenKey';
import type { UserProfileResult } from '@/types/mypage/user';

// localStorage를 조작하는 유틸리티 함수
// 나머지 파일에서는 localStorage를 직접 사용하지 않고 이 파일의 함수를 사용하도록 함

// 액세스 토큰 저장 (refreshToken은 httpOnly 쿠키로 관리)
export const setAccessToken = (accessToken: string): void => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
};

// 액세스 토큰 가져오기
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN);
};

// 액세스 토큰 삭제 (refreshToken은 서버에서 쿠키 삭제)
export const clearAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN);
};

// 액세스 토큰 존재 여부 체크 (refreshToken은 httpOnly 쿠키)
export const hasAccessToken = (): boolean => {
  const accessToken = getAccessToken();
  return !!accessToken;
};

// 온보딩 완료 여부 확인
// lifestyleList가 비어있지 않으면 온보딩 완료로 판단
export const hasCompletedOnboarding = (
  userProfile: UserProfileResult | undefined
): boolean => {
  return !!(userProfile?.lifestyleList && userProfile.lifestyleList.length > 0);
};
