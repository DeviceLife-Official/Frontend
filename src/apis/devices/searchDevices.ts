import { axiosInstance } from '@/apis/axios/axios';
import type {
  SearchDevicesParams,
  GetDevicesSearchResponse,
  DeviceSearchResult,
} from '@/types/devices';
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';

export const searchDevices = async (
  params: SearchDevicesParams
): Promise<DeviceSearchResult> => {
  const { data } = await axiosInstance.get<GetDevicesSearchResponse>(
    '/api/devices/search',
    { params }
  );
  return data.result ?? { devices: [], nextCursor: null, hasNext: false };
};

export const useSearchDevices = (params: Omit<SearchDevicesParams, 'cursor'>) => {
  return useInfiniteQuery<DeviceSearchResult, Error>({
    queryKey: [queryKey.DEVICE_SEARCH, params],
    queryFn: ({ pageParam }) =>
      searchDevices({
        ...params,
        cursor: pageParam as string | undefined,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.hasNext ? lastPage.nextCursor : undefined,
    enabled: true,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};
