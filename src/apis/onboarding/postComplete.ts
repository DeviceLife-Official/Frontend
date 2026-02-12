import { axiosInstance } from '@/apis/axios/axios';
import type { PostOnboardingCompleteResponse } from '@/types/onboarding/complete';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';

// 온보딩 완료 API
export const postOnboardingComplete = async (): Promise<PostOnboardingCompleteResponse> => {
  const { data } = await axiosInstance.post<PostOnboardingCompleteResponse>('/api/onboarding/complete', {});
  return data;
};

// 온보딩 완료 Mutation
export const usePostOnboardingComplete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postOnboardingComplete,
    onSuccess: async () => {
      // 온보딩 완료 시 유저 프로필 refetch 완료까지 대기 (가드에서 최신 데이터 사용)
      await queryClient.refetchQueries({ queryKey: [queryKey.USER_PROFILE] });
    },
  });
};
