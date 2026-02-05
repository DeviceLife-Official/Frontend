import { axiosInstance } from '@/apis/axios/axios';
import type { PostOnboardingCompleteResponse } from '@/types/onboarding/complete';
import { useMutation } from '@tanstack/react-query';

// 온보딩 완료 API
export const postOnboardingComplete = async (): Promise<PostOnboardingCompleteResponse> => {
  const { data } = await axiosInstance.post<PostOnboardingCompleteResponse>('/api/onboarding/complete', {});
  return data;
};

// 온보딩 완료 Mutation
export const usePostOnboardingComplete = () => {
  return useMutation({
    mutationFn: postOnboardingComplete,
  });
};
