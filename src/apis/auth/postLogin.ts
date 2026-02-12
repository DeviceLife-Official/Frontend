import { cookieAxiosInstance } from '@/apis/axios/cookieAxios';
import type { LoginRequest, LoginResponse } from '@/types/auth/login';
import { useMutation } from '@tanstack/react-query';

export const postLogin = async (payload: LoginRequest): Promise<LoginResponse> => {
  // refreshToken은 httpOnly 쿠키로 자동 수신됨
  const { data } = await cookieAxiosInstance.post<LoginResponse>('/api/auth/login', payload);
  return data;
};

export const usePostLogin = () => {
  return useMutation({
    mutationFn: postLogin,
  });
};
