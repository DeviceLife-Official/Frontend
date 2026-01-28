import { axiosInstance } from '@/apis/axios/axios';
import type { PostCreateCombinationRequest, PostCreateCombinationResponse } from '@/types/combo/combo';
import { useMutation } from '@tanstack/react-query';

// 조합 생성 API
export const postCreateCombination = async (payload: PostCreateCombinationRequest): Promise<PostCreateCombinationResponse> => {
  const { data } = await axiosInstance.post<PostCreateCombinationResponse>('/api/combos', payload);
  return data;
};

// 조합 생성 Mutation
export const usePostCreateCombination = () => {
  return useMutation({
    mutationFn: postCreateCombination,
  });
};
