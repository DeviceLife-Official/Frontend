// 요청 및 응답 인터셉터
import type { InternalAxiosRequestConfig, AxiosInstance } from 'axios';
import { getAccessToken, getRefreshToken, setAuthTokens, clearAuthTokens } from '@/utils/auth/authStorage';
import { refreshAxiosInstance } from '@/apis/axios/refreshAxios';
import type { RefreshTokenResponse } from '@/types/auth/refresh';
import { setAuthorizationHeader } from '@/utils/auth/setAuthorizationHeader';

// 응답 인터셉터에서 사용할 상태
let refreshPromise: Promise<string> | null = null; // refresh 진행 중인 Promise

// 요청 인터셉터: 매 요청 전에 토큰을 헤더에 추가
export const setupRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    // 토큰 읽기
    const accessToken = getAccessToken();

    // 토큰이 있으면 Authorization 헤더에 추가
    if (accessToken) {
      setAuthorizationHeader(config, accessToken);
    }

    return config;
  });
};

// 응답 인터셉터: 응답으로 401 에러 시 토큰 재발급 및 요청 재시도
export const setupResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // 401 에러이고, 재시도한 요청이 아닌 경우
      if (error.response?.status === 401 && !originalRequest._retry) {
        // refreshToken 가져오기
        const refreshToken = getRefreshToken();
        // refreshToken이 없으면 (비로그인 상황) 바로 에러 반환
        if (!refreshToken) {
          return Promise.reject(error);
        }

        // 이미 refresh 중이면 refreshPromise를 기다림
        if (refreshPromise) {
          try {
            const newToken = await refreshPromise;
            setAuthorizationHeader(originalRequest, newToken);
            return instance(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        // 재시도 플래그 설정
        originalRequest._retry = true;

        // refresh Promise(토큰 재발급 작업을 나타내는 Promise) 생성
        refreshPromise = (async () => {
          try {
            // 1. refreshAxiosInstance로 토큰 재발급 요청
            const { data } = await refreshAxiosInstance.post<RefreshTokenResponse>(
              '/api/auth/refresh',
              {},
              {
                headers: {
                  refreshToken,
                },
              }
            );

            // 2. refresh 응답이 이상하면 바로 실패 처리
            if (!data?.result?.accessToken) {
              throw new Error('토큰 재발급 응답이 올바르지 않습니다.');
            }

            // 3. 기존 refreshToken 가져오기
            const currentRefreshToken = getRefreshToken();

            // 4. 기존 refreshToken이 없으면 토큰 정리 후 에러 반환
            if (!currentRefreshToken) {
              clearAuthTokens();
              throw new Error('Refresh token이 저장소에서 사라졌습니다.');
            }

            // 5. 새 accessToken 저장 및 기존 refreshToken 유지
            setAuthTokens({
              accessToken: data.result.accessToken,
              refreshToken: currentRefreshToken,
            });

            // 6. 새 accessToken 반환
            return data.result.accessToken;
          } catch (refreshError) {
            // 7. refresh 실패 시 토큰 정리
            clearAuthTokens();
            throw refreshError;
          } finally {
            // 8. refresh 완료 후 Promise 초기화
            refreshPromise = null;
          }
        })();

        // refresh Promise 실행
        try {
          // 1. refresh Promise 실행
          const newToken = await refreshPromise;
          // 2. 새 accessToken 헤더에 추가
          setAuthorizationHeader(originalRequest, newToken);
          // 3. 요청 재시도
          return instance(originalRequest);
        } catch (refreshError) {
          // 4. refresh 실패 시 에러 반환
          return Promise.reject(refreshError);
        }
      }

      // 401 에러가 아닌 경우 에러 반환
      return Promise.reject(error);
    }
  );
};
