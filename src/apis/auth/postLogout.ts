import { axiosInstance } from '@/apis/axios/axios';
import type { LogoutResponse } from '@/types/auth/logout';
import { useMutation } from '@tanstack/react-query';
import { getRefreshToken } from '@/utils/authStorage';

export const postLogout = async (): Promise<LogoutResponse> => {
  const refreshToken = getRefreshToken();

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
