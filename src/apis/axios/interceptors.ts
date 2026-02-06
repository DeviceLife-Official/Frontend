/*
요청 및 응답 인터셉터
 *
 * [401 에러 처리 흐름]
 * 1. 401 에러 발생
 * 2. refreshToken 존재 확인
 *    - 없으면: 로그인 페이지로 리다이렉트
 *    - 있으면: 토큰 갱신 시도
 * 3. 토큰 갱신 (refreshPromise)
 *    - 성공: 새 토큰으로 원래 요청 재시도
 *    - 실패: 로그인 페이지로 리다이렉트
 * 4. 동시 요청 처리: 여러 요청이 동시에 401을 받으면 refreshPromise를 공유하여 토큰 갱신은 1번만 수행
*/
import type { InternalAxiosRequestConfig, AxiosInstance } from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
  clearAuthTokens,
} from '@/utils/authStorage';
import { refreshAxiosInstance } from '@/apis/axios/refreshAxios';
import type { RefreshTokenResponse } from '@/types/auth/refresh';
import { setAuthorizationHeader } from '@/utils/setAuthorizationHeader';
import { ROUTES } from '@/constants/routes';


// 모듈 레벨 상태

// 토큰 갱신 중인 Promise (동시 요청 시 공유) 
let refreshPromise: Promise<string> | null = null;
// 중복 리다이렉트 방지 플래그 
let isRedirectingToLogin = false;


// 유틸리티 함수

/* 로그인 페이지로 리다이렉트 함수 (중복 방지)
 - 여러 요청이 동시에 실패해도 리다이렉트는 1번만 실행
 - 비로그인 상태에서 401 발생 시에도 리다이렉트 수행
*/
const redirectToLoginOnce = () => {
  if (isRedirectingToLogin) return;

  isRedirectingToLogin = true;
  clearAuthTokens();
  window.location.href = ROUTES.auth.login;
};


// 요청 인터셉터
/*
 * 요청 인터셉터 설정
 * - 매 요청 전에 accessToken을 Authorization 헤더에 추가
 * - 재로그인 후 플래그 리셋
*/
export const setupRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    // 재로그인 후 토큰이 다시 생기면 리다이렉트 플래그 리셋
    if (accessToken && isRedirectingToLogin) {
      isRedirectingToLogin = false;
    }

    if (accessToken) {
      setAuthorizationHeader(config, accessToken);
    }

    return config;
  });
};


// 응답 인터셉터
/*
 * 응답 인터셉터 설정
 * - 401 에러 시 토큰 갱신 후 원래 요청 재시도
 * - 동시 요청 처리: refreshPromise를 공유하여 토큰 갱신은 1번만 수행
 */
export const setupResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {

      // [1] 사전 검증: 401 에러가 아니거나 재시도 불가능한 경우 early return
      if (!error.config) {
        return Promise.reject(error);
      }

      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      // 재시도 플래그 설정 (무한루프 방지)
      originalRequest._retry = true;



      // [2] refreshToken 확인
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        redirectToLoginOnce();
        return Promise.reject(error);
      }


      // [3] 이미 다른 요청이 토큰 갱신 중이면 그 결과를 기다림
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


      // [4] 토큰 갱신 Promise 생성 및 실행
      //     - try: 토큰 갱신 API 호출 → 성공 시 새 토큰 반환
      //     - catch: 실패 시 로그인 리다이렉트 → 에러 re-throw (외부 catch로 전파)
      //     - finally: 성공/실패 관계없이 refreshPromise 초기화
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
          redirectToLoginOnce();
          throw refreshError; // 외부 catch로 전파
        } finally {
          refreshPromise = null; // 항상 초기화 (성공/실패 무관)
        }
      })();

      // [5] 토큰 갱신 결과에 따라 원래 요청 재시도 또는 에러 반환
      //     - 성공: 새 토큰으로 원래 요청 재시도
      //     - 실패: [4]의 catch에서 이미 리다이렉트 처리됨, 여기서는 에러만 전달
      try {
        const newToken = await refreshPromise;
        setAuthorizationHeader(originalRequest, newToken);
        return instance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
  );
};

