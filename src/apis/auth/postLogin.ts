import { axiosInstance } from '@/apis/axios';
import type { LoginRequest, LoginResponse } from '@/types/auth/login';
import { useMutation } from '@tanstack/react-query';

export const postLogin = async (payload: LoginRequest): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>('/api/auth/login', payload);
  return data;
};

export const usePostLogin = () => {
  return useMutation({
    mutationFn: postLogin,
  });
};
