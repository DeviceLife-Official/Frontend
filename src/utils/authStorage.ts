import { ACCESS_TOKEN, AUTH_STORAGE } from '@/constants/tokenKey';

// 저장소 타입: local(영속) | session(세션)
export type AuthStorageType = 'local' | 'session';



// Storage 객체를 조작하는 유틸리티 함수
// keepLogin 체크 여부에 따라 localStorage(영속) 또는 sessionStorage(세션) 사용

// 현재 사용 중인 저장소 반환 함수 (auth_storage 플래그 기준, 없으면 local로 간주)
export const getAuthStorageType = (): AuthStorageType => {
  const stored = localStorage.getItem(AUTH_STORAGE);
  if (stored === 'session') return 'session';
  return 'local'; // 'local' 또는 legacy(플래그 없음)
};

// 토큰이 저장된 Storage 객체 반환 함수
const getTokenStorage = (): Storage => {
  return getAuthStorageType() === 'session' ? sessionStorage : localStorage;
};

/*
액세스 토큰 저장 함수
 * Cross-Contamination 방지: 토큰은 한 군데에만 존재. 반대편 저장소 토큰은 반드시 삭제.
 * @param accessToken - 액세스 토큰
 * @param keepLogin
 * - true: localStorage(영속), false: sessionStorage(세션), undefined: 기존 저장소 유지(토큰 갱신 시)
 */
export const setAccessToken = (accessToken: string, keepLogin?: boolean): void => {
  if (keepLogin === true) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(AUTH_STORAGE, 'local');
    sessionStorage.removeItem(ACCESS_TOKEN);
  } else if (keepLogin === false) {
    sessionStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(AUTH_STORAGE, 'session');
    localStorage.removeItem(ACCESS_TOKEN);
  } else {
    // 토큰 갱신 시: 기존 저장소에 덮어쓰기 + 반대편 삭제
    const storage = getTokenStorage();
    storage.setItem(ACCESS_TOKEN, accessToken);
    const oppositeStorage = storage === localStorage ? sessionStorage : localStorage;
    oppositeStorage.removeItem(ACCESS_TOKEN);
  }
};

// 액세스 토큰 가져오기 함수
export const getAccessToken = (): string | null => {
  return getTokenStorage().getItem(ACCESS_TOKEN);
};

// 액세스 토큰 삭제 함수 (refreshToken은 서버에서 쿠키 삭제)
export const clearAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(AUTH_STORAGE);
  sessionStorage.removeItem(ACCESS_TOKEN);
};

// 액세스 토큰 존재 여부 체크 함수 (refreshToken은 httpOnly 쿠키)
export const hasAccessToken = (): boolean => {
  const accessToken = getAccessToken();
  return !!accessToken;
};
