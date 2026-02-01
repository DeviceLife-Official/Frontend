import { axiosInstance } from '@/apis/axios/axios';
import type { PostCreateCombinationRequest, PostCreateCombinationResponse } from '@/types/combo/createCombo'
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { CommonResponse } from '@/types/common';

// 조합 생성 API
export const postCreateCombination = async (payload: PostCreateCombinationRequest): Promise<PostCreateCombinationResponse> => {
  const { data } = await axiosInstance.post<PostCreateCombinationResponse>('/api/combos', payload);
  return data;
};

// 조합 생성 Mutation
export const usePostCreateCombination = () => {
  return useMutation<
    PostCreateCombinationResponse,
    AxiosError<CommonResponse<null>>,
    PostCreateCombinationRequest
  >({
    mutationFn: postCreateCombination,
  });
};
