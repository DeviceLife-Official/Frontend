import { cookieAxiosInstance } from '@/apis/axios/cookieAxios';
import type { LogoutResponse } from '@/types/auth/logout';
import { useMutation } from '@tanstack/react-query';

export const postLogout = async (): Promise<LogoutResponse> => {
  // refreshToken은 httpOnly 쿠키로 자동 전송됨
  const { data } = await cookieAxiosInstance.post<LogoutResponse>(
    '/api/auth/logout',
    {}
  );
  return data;
};

export const usePostLogout = () => {
  return useMutation({
    mutationFn: postLogout,
  });
};
