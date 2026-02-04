import { axiosInstance } from '@/apis/axios/axios';
import type { SearchDevicesParams, SearchDevicesResponse, SearchDevicesResult } from '@/types/device/device';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';

// 기기 검색
export const searchDevices = async (params: SearchDevicesParams): Promise<SearchDevicesResult> => {
  const { data } = await axiosInstance.get<SearchDevicesResponse>('/api/devices/search', {
    params,
    paramsSerializer: {
      indexes: null, // array를 deviceTypes=A&deviceTypes=B 형식으로 직렬화
    },
  });
  return data.result ?? { devices: [], nextCursor: null, hasNext: false };
};

export const useSearchDevices = (params: SearchDevicesParams) => {
  return useQuery<SearchDevicesResult>({
    queryKey: [queryKey.DEVICES, 'search', params],
    queryFn: () => searchDevices(params),
    staleTime: 1 * 60 * 1000, // 1분
    gcTime: 5 * 60 * 1000, // 5분
  });
};

// 무한 스크롤을 위한 hook
export const useInfiniteSearchDevices = (params: Omit<SearchDevicesParams, 'cursor'>) => {
  return useInfiniteQuery<SearchDevicesResult>({
    queryKey: [queryKey.DEVICES, 'search', params],
    queryFn: ({ pageParam }) => searchDevices({ ...params, cursor: pageParam as string | undefined }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    staleTime: 1 * 60 * 1000, // 1분
    gcTime: 5 * 60 * 1000, // 5분
    placeholderData: (previousData) => previousData, // 이전 데이터 유지하여 Layout Shift 방지
  });
};
