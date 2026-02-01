import { axiosInstance } from '@/apis/axios/axios';
import type { GetComboResponse, GetComboResult } from '@/types/combo/combo';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';

// 조합 상세 조회
export const getCombo = async (comboId: number): Promise<GetComboResult> => {
  const { data } = await axiosInstance.get<GetComboResponse>(`/api/combos/${comboId}`);
  return data.result!;
};

export const useGetCombo = (comboId: number | null) => {
  return useQuery<GetComboResult>({
    queryKey: [queryKey.COMBO_DETAIL, comboId],
    queryFn: () => getCombo(comboId!),
    enabled: comboId !== null,
  });
};
