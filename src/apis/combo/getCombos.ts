import { axiosInstance } from '@/apis/axios/axios';
import type { GetCombosResponse, GetCombosResult } from '@/types/combo/combo';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';
import { hasAuthTokens } from '@/utils/auth/authStorage';

// 조합 목록 조회
export const getCombos = async (): Promise<GetCombosResult> => {
  const { data } = await axiosInstance.get<GetCombosResponse>('/api/combos');
  return data.result ?? [];
};

export const useGetCombos = () => {
  const hasTokens = hasAuthTokens();

  return useQuery<GetCombosResult>({
    queryKey: [queryKey.COMBOS],
    queryFn: getCombos,
    enabled: hasTokens, // 토큰이 있을 때만 호출
  });
};
