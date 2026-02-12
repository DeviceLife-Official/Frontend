import { axiosInstance } from '@/apis/axios/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';
import type { CommonResponse } from '@/types/common';

// 최근 본 기기 기록 API
export const postRecentlyViewed = async (deviceId: number): Promise<CommonResponse> => {
  const { data } = await axiosInstance.post<CommonResponse>(
    `/api/recently-viewed/${deviceId}`
  );
  return data;
};

// 최근 본 기기 기록 Mutation
export const usePostRecentlyViewed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deviceId: number) => postRecentlyViewed(deviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.RECENTLY_VIEWED] });
    },
  });
};
