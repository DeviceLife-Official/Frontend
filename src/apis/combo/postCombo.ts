import { axiosInstance } from '@/apis/axios/axios';
import type { PostComboRequest, PostComboResponse } from '@/types/combo/combo';
import { useMutation } from '@tanstack/react-query';

// 조합 생성 API
export const postCombo = async (payload: PostComboRequest): Promise<PostComboResponse> => {
  const { data } = await axiosInstance.post<PostComboResponse>('/api/combos', payload);
  return data;
};

// 조합 생성 Mutation
export const usePostCombo = () => {
  return useMutation({
    mutationFn: postCombo,
  });
};
