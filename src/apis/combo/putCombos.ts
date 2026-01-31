import { axiosInstance } from '@/apis/axios/axios';
import type { PutComboRequest, PutComboResponse } from '@/types/combo/combo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';

// 조합 수정
export const putCombo = async (
  comboId: number,
  payload: PutComboRequest
): Promise<PutComboResponse> => {
  const { data } = await axiosInstance.put<PutComboResponse>(
    `/api/combos/${comboId}`,
    payload
  );
  return data;
};

export const usePutCombo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ comboId, comboName }: { comboId: number; comboName: string }) =>
      putCombo(comboId, { comboName }),
    onSuccess: () => {
      // 조합 목록 캐시 무효화 (리프레시)
      queryClient.invalidateQueries({ queryKey: [queryKey.COMBOS] });
    },
  });
};
