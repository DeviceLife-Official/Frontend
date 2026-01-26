import { axiosInstance } from '@/apis/axios/axios';
import type { PostUserTagsRequest, PostUserTagsResponse } from '@/types/tag/tag';
import { useMutation } from '@tanstack/react-query';

// 유저 태그 저장 API (replace 동작)
export const postUserTags = async (payload: PostUserTagsRequest): Promise<PostUserTagsResponse> => {
  const { data } = await axiosInstance.post<PostUserTagsResponse>('/api/tags/user', payload);
  return data;
};

// 유저 태그 저장 Mutation
export const usePostUserTags = () => {
  return useMutation({
    mutationFn: postUserTags,
  });
};
