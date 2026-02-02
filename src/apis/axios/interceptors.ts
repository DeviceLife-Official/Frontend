// 요청 및 응답 인터셉터
import type { InternalAxiosRequestConfig, AxiosInstance } from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
  clearAuthTokens,
} from '@/utils/auth/authStorage';
import { refreshAxiosInstance } from '@/apis/axios/refreshAxios';
import type { RefreshTokenResponse } from '@/types/auth/refresh';
import { setAuthorizationHeader } from '@/utils/auth/setAuthorizationHeader';
import { ROUTES } from '@/constants/routes';

// 응답 인터셉터에서 사용할 상태
let refreshPromise: Promise<string> | null = null; // refresh 진행 중인 Promise
let isRedirectingToLogin = false; // 중복 리다이렉트 방지

const redirectToLoginOnce = () => {
  if (isRedirectingToLogin) return;
  isRedirectingToLogin = true;

  clearAuthTokens();
  window.location.href = ROUTES.auth.login;
};

// 요청 인터셉터: 매 요청 전에 토큰을 헤더에 추가
export const setupRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    const accessToken = getAccessToken();
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
      // config가 없으면 (네트워크 오류 등) 에러 그대로 반환
      if (!error.config) {
        return Promise.reject(error);
      }

      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // 401이 아니면 그대로 에러 전달
      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }

      // 이미 재시도한 요청이면 무한루프 방지
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      // ✅ 401 처리에 들어오자마자 재시도 플래그부터 박기 (중요)
      originalRequest._retry = true;

      // refreshToken 가져오기
      const refreshToken = getRefreshToken();

      // refreshToken이 없으면 (비로그인 상황) 토큰 정리 + 로그인 페이지로 이동 (딱 1번만)
      if (!refreshToken) {
        redirectToLoginOnce();
        return Promise.reject(error);
      }

      // 이미 refresh 중이면 refreshPromise를 기다렸다가 재시도
      if (refreshPromise) {
        try {
          const newToken = await refreshPromise;
          setAuthorizationHeader(originalRequest, newToken);
          return instance(originalRequest);
        } catch (refreshError) {
          redirectToLoginOnce();
          return Promise.reject(refreshError);
        }
      }

      // refresh Promise 생성
      refreshPromise = (async () => {
        try {
          const { data } = await refreshAxiosInstance.post<RefreshTokenResponse>(
            '/api/auth/refresh',
            {},
            {
              headers: {
                refreshToken,
              },
            }
          );

          if (!data?.result?.accessToken) {
            throw new Error('토큰 재발급 응답이 올바르지 않습니다.');
          }

          const currentRefreshToken = getRefreshToken();
          if (!currentRefreshToken) {
            throw new Error('Refresh token이 저장소에서 사라졌습니다.');
          }

          setAuthTokens({
            accessToken: data.result.accessToken,
            refreshToken: currentRefreshToken,
          });

          return data.result.accessToken;
        } catch (refreshError) {
          // ✅ refresh 실패 시에도 딱 1번만 로그인 이동
          redirectToLoginOnce();
          throw refreshError;
        } finally {
          refreshPromise = null;
        }
      })();

      // refresh 후 원 요청 재시도
      try {
        const newToken = await refreshPromise;
        setAuthorizationHeader(originalRequest, newToken);
        return instance(originalRequest);
      } catch (refreshError) {
        // 이미 위에서 redirectToLoginOnce가 처리했을 수 있으니 여기서는 에러만 전달
        return Promise.reject(refreshError);
      }
    }
  );
};

