import { axiosInstance } from '@/apis/axios/axios';
import type { GetBrandsResponse, GetBrandsResult, DeviceType } from '@/types/brand/brand';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';

// 브랜드 목록 조회
export const getBrands = async (deviceType: DeviceType): Promise<GetBrandsResult> => {
  const { data } = await axiosInstance.get<GetBrandsResponse>(
    `/api/brands?deviceType=${deviceType}`
  );
  return data.result ?? [];
};

export const useGetBrands = (deviceType: DeviceType | null) => {
  return useQuery<GetBrandsResult>({
    queryKey: [queryKey.BRANDS, deviceType],
    queryFn: () => getBrands(deviceType!),
    enabled: deviceType !== null,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
