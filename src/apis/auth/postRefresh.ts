import { refreshAxiosInstance } from '@/apis/axios/refreshAxios';
import type { RefreshTokenResponse } from '@/types/auth/refresh';
import { useMutation } from '@tanstack/react-query';

export const postRefresh = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  const { data } = await refreshAxiosInstance.post<RefreshTokenResponse>(
    '/api/auth/refresh',
    {},
    {
      headers: {
        refreshToken,
      },
    }
  );
  return data;
};

export const usePostRefresh = () => {
  return useMutation({
    mutationFn: postRefresh,
  });
};
