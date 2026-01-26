import { axiosInstance } from '@/apis/axios/axios';
import type { GetTagsResponse, GetTagsResult, TagType } from '@/types/tag/tag';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';

// 태그 목록 조회 API
export const getTags = async (type?: TagType): Promise<GetTagsResult | undefined> => {
  const params = type ? { type } : {};
  const { data } = await axiosInstance.get<GetTagsResponse>('/api/tags', { params });
  return data.result;
};

// 태그 목록 조회 Query
export const useGetTags = (type?: TagType) => {
  return useQuery<GetTagsResult | undefined>({
    queryKey: type ? queryKeys.tags.byType(type) : queryKeys.tags.all,
    queryFn: () => getTags(type),
  });
};
