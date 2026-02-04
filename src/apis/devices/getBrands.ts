import { axiosInstance } from '@/apis/axios/axios';
import type { GetBrandsResponse } from '@/types/devices';
import { useQuery } from '@tanstack/react-query';

export const getBrands = async (deviceType?: string): Promise<GetBrandsResponse> => {
  const params = deviceType ? { deviceType } : {};
  const { data } = await axiosInstance.get<GetBrandsResponse>('/api/brands', { params });
  return data;
};

export const useGetBrands = (deviceType?: string) => {
  return useQuery<GetBrandsResponse>({
    queryKey: ['brands', deviceType],
    queryFn: () => getBrands(deviceType),
    enabled: true,
  });
};
