// 요청 및 응답 인터셉터
import type { InternalAxiosRequestConfig, AxiosInstance } from 'axios';
import { getAccessToken, getRefreshToken, setAuthTokens, clearAuthTokens } from '@/utils/authStorage';
import { refreshAxiosInstance } from '@/apis/axios/refreshAxios';
import type { RefreshTokenResponse } from '@/types/auth/refresh';

// 응답 인터셉터에서 사용할 상태
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// 요청 인터셉터: 매 요청 전에 토큰을 헤더에 추가
export const setupRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    // 토큰 읽기
    const accessToken = getAccessToken();

    // 토큰이 있으면 Authorization 헤더에 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
        if (isRefreshing) {
          // 이미 refresh 중이면 대기
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return instance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // refreshToken 가져오기
          const refreshToken = getRefreshToken();
          if (!refreshToken) {
            throw new Error('Refresh token이 없습니다.');
          }

          // refreshAxiosInstance로 토큰 재발급 요청
          const { data } = await refreshAxiosInstance.post<RefreshTokenResponse>(
            '/api/auth/refresh',
            {},
            {
              headers: {
                refreshToken,
              },
            }
          );

          // refresh 응답이 이상하면 바로 실패 처리
          if (!data?.result?.accessToken) {
            throw new Error('토큰 재발급 응답이 올바르지 않습니다.');
          }

          // 새 accessToken 저장
          // 기존 refreshToken 유지
          const currentRefreshToken = getRefreshToken();
          if (!currentRefreshToken) {
            clearAuthTokens();
            throw new Error('Refresh token이 저장소에서 사라졌습니다.');
          }

          setAuthTokens({
            accessToken: data.result.accessToken,
            refreshToken: currentRefreshToken,
          });

          // 대기 중인 요청들 처리
          processQueue(null, data.result.accessToken);

          // 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${data.result.accessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          // refresh 실패 시 토큰 정리
          clearAuthTokens();
          // 대기 중인 요청들 모두 실패 처리
          processQueue(refreshError, null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
