import type { InternalAxiosRequestConfig } from 'axios';

// 토큰을 헤더에 추가하는 함수
export const setAuthorizationHeader = (
  config: InternalAxiosRequestConfig,
  token: string
) => {
  const value = `Bearer ${token}`;

  // AxiosHeaders 인스턴스면 set 사용
  if (config.headers && typeof (config.headers as any).set === 'function') {
    (config.headers as any).set('Authorization', value);
    return;
  }

  // plain object면 기존 방식
  config.headers = config.headers ?? {};
  (config.headers as any).Authorization = value;
};

