import { axiosInstance } from '@/apis/axios/axios';
import type { LoginRequest, LoginResponse } from '@/types/auth/login';
import { useMutation } from '@tanstack/react-query';

export const postLogin = async (payload: LoginRequest): Promise<LoginResponse> => {
  console.log('[2-1] 로그인 API 요청 전송', { url: '/api/auth/login', email: payload.email });
  const { data } = await axiosInstance.post<LoginResponse>('/api/auth/login', payload);
  console.log('[2-2] 로그인 API 응답 수신', { data });
  return data;
};

export const usePostLogin = () => {
  return useMutation({
    mutationFn: postLogin,
  });
};
