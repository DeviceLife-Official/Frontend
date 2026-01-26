import { axiosInstance } from '@/apis/axios/axios';
import type { GetTagsResponse, GetTagsResult } from '@/types/tag/tag';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';

// 태그 목록 조회 API
// 전체 태그를 가져오려면 항상 type: 'LIFESTYLE'을 보내야 함
export const getTags = async (): Promise<GetTagsResult> => {
  const { data } = await axiosInstance.get<GetTagsResponse>('/api/tags', {
    params: { type: 'LIFESTYLE' },
  });
  return data.result ?? [];
};

// 태그 목록 조회 Query
export const useGetTags = () => {
  return useQuery<GetTagsResult>({
    queryKey: queryKeys.tags.all,
    queryFn: getTags,
    staleTime: 1000 * 60 * 60, // 1시간
    gcTime: 1000 * 60 * 60 * 24, // 24시간
  });
};
