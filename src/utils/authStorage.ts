import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from '@/constants/tokenKey';

// localStorage를 조작하는 유틸리티 함수
// 나머지 파일에서는 localStorage를 직접 사용하지 않고 이 파일의 함수를 사용하도록 함

// 토큰 저장 타입
type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

/**
 * 액세스 토큰과 리프레시 토큰을 한번에 저장
 */
export const setAuthTokens = ({ accessToken, refreshToken }: AuthTokens): void => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

/**
 * 액세스 토큰 가져오기
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN);
};

/**
 * 리프레시 토큰 가져오기
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN);
};

/**
 * 모든 인증 토큰 삭제
 */
export const clearAuthTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

/**
 * 사용자 ID 저장
 */
export const setUserId = (userId: number): void => {
  localStorage.setItem(USER_ID, String(userId));
};

/**
 * 사용자 ID 가져오기
 */
export const getUserId = (): number | null => {
  const userId = localStorage.getItem(USER_ID);
  return userId ? Number(userId) : null;
};

/**
 * 토큰 존재 여부 체크
 */
export const hasAuthTokens = (): boolean => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  return !!(accessToken && refreshToken);
};
