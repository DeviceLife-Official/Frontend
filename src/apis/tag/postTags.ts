import { axiosInstance } from '@/apis/axios/axios';
import type { PostUserTagsRequest, PostUserTagsResponse } from '@/types/tag/tag';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';

// 유저 태그 저장 API (replace 동작)
export const postUserTags = async (payload: PostUserTagsRequest): Promise<PostUserTagsResponse> => {
  const { data } = await axiosInstance.post<PostUserTagsResponse>('/api/tags/user', payload);
  return data;
};

// 유저 태그 저장 Mutation
export const usePostUserTags = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUserTags,
    onSuccess: async () => {
      // 태그 저장 성공 시 유저 프로필 refetch 완료까지 대기 (다음 페이지에서 최신 데이터 사용)
      await queryClient.refetchQueries({ queryKey: [queryKey.USER_PROFILE] });
    },
  });
};
