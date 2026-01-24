import { axiosInstance } from '@/apis/axios';
import type { SignupRequest, SignupResponse } from '@/types/auth/signup';
import { useMutation } from '@tanstack/react-query';

export const postJoin = async (payload: SignupRequest): Promise<SignupResponse> => {
  const { data } = await axiosInstance.post<SignupResponse>('/api/auth/join', payload);
  return data;
};

export const usePostJoin = () => {
  return useMutation({
    mutationFn: postJoin,
  });
};
