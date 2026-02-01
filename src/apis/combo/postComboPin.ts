import { axiosInstance } from '@/apis/axios/axios';
import type { PostComboPinResponse } from '@/types/combo/combo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';

// 조합 Pin 토글
export const postComboPin = async (comboId: number): Promise<PostComboPinResponse> => {
  const { data } = await axiosInstance.post<PostComboPinResponse>(
    `/api/combos/${comboId}/pin`
  );
  return data;
};

export const usePostComboPin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comboId: number) => postComboPin(comboId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.COMBOS] });
    },
  });
};
