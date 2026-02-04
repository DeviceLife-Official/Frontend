import { axiosInstance } from '@/apis/axios/axios';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';

import type { LifestyleDeviceResponse, LifestyleTagKey } from '@/types/lifestyle/lifestyle';

export const getLifestyleDevice = async (
  tagKey: LifestyleTagKey
): Promise<LifestyleDeviceResponse> => {
  const { data } = await axiosInstance.get<LifestyleDeviceResponse>('/api/lifestyle/featured', {
    params: { tagKey },
  });

  return data;
};

export const useGetLifestyleDevice = (tagKey: LifestyleTagKey) => {
  return useQuery<LifestyleDeviceResponse>({
    queryKey: [queryKey.LIFESTYLE_DEVICE, tagKey],
    queryFn: () => getLifestyleDevice(tagKey),
    enabled: !!tagKey,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};
