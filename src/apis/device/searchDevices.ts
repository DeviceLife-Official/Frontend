import { axiosInstance } from '@/apis/axios/axios';
import type { SearchDevicesParams, SearchDevicesResponse, SearchDevicesResult } from '@/types/device/device';
import { useQuery } from '@tanstack/react-query';
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
