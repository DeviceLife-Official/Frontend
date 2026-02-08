import { cookieAxiosInstance } from '@/apis/axios/cookieAxios';
import type { RefreshTokenResponse } from '@/types/auth/refresh';
import { useMutation } from '@tanstack/react-query';

export const postRefresh = async (): Promise<RefreshTokenResponse> => {
  // refreshToken은 httpOnly 쿠키로 자동 전송됨
  const { data } = await cookieAxiosInstance.post<RefreshTokenResponse>(
    '/api/auth/refresh',
    {}
  );
  return data;
};

export const usePostRefresh = () => {
  return useMutation({
    mutationFn: postRefresh,
  });
};
