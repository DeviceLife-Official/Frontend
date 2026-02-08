import { axiosInstance } from '@/apis/axios/axios';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';
import type { RecentlyViewedDevicesResponse, RecentlyViewedDevice } from '@/types/recentlyViewed/recentlyViewed';

// 최근 본 기기 목록 조회 API
export const getRecentlyViewed = async (): Promise<RecentlyViewedDevice[]> => {
  const { data } = await axiosInstance.get<RecentlyViewedDevicesResponse>('/api/recently-viewed');
  return data.result ?? [];
};

// 최근 본 기기 목록 조회 Query
export const useGetRecentlyViewed = () => {
  return useQuery<RecentlyViewedDevice[]>({
    queryKey: [queryKey.RECENTLY_VIEWED_DEVICES],
    queryFn: getRecentlyViewed,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
};
