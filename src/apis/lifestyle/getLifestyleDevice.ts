import { axiosInstance } from '@/apis/axios/axios';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';

import type {
  LifestyleDeviceResponse,
  LifestyleDeviceResult,
  LifestyleTagKey,
} from '@/types/lifestyle/lifestyle';

export const getLifestyleDevice = async (
  tagKey: LifestyleTagKey
): Promise<LifestyleDeviceResult | null> => {
  const { data } = await axiosInstance.get<LifestyleDeviceResponse>('/api/lifestyle/featured', {
    params: { tagKey },
  });

  return data.result ?? null;
};

export const useGetLifestyleDevice = (tagKey: LifestyleTagKey) => {
  return useQuery<LifestyleDeviceResult | null>({
    queryKey: [queryKey.LIFESTYLE_DEVICE, tagKey],
    queryFn: () => getLifestyleDevice(tagKey),
    enabled: !!tagKey,
    staleTime: 1000 * 60 * 5,
  });
};
