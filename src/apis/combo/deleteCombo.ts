import { axiosInstance } from '@/apis/axios/axios';
import type { DeleteComboResponse } from '@/types/combo/combo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';

// 조합 삭제
export const deleteCombo = async (comboId: number): Promise<DeleteComboResponse> => {
  const { data } = await axiosInstance.delete<DeleteComboResponse>(
    `/api/combos/${comboId}`
  );
  return data;
};

export const useDeleteCombo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comboId: number) => deleteCombo(comboId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.COMBOS] });
    },
  });
};
