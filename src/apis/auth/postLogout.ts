import { axiosInstance } from '@/apis/axios/axios';
import type { LogoutResponse } from '@/types/auth/logout';
import { useMutation } from '@tanstack/react-query';
import { getRefreshToken } from '@/utils/auth/authStorage';

export const postLogout = async (): Promise<LogoutResponse> => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    throw new Error('리프레시 토큰이 없습니다.');
  }

  const { data } = await axiosInstance.post<LogoutResponse>(
    '/api/auth/logout',
    {},
    {
      headers: {
        refreshToken,
      },
    }
  );
  return data;
};

export const usePostLogout = () => {
  return useMutation({
    mutationFn: postLogout,
  });
};
