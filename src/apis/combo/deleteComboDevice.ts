import { axiosInstance } from '@/apis/axios/axios';
import type { DeleteComboDeviceResponse } from '@/types/combo/combo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';
import { usePollComboEvaluation } from '@/hooks/usePollComboEvaluation';

// 조합에서 기기 삭제
export const deleteComboDevice = async (
  comboId: number,
  deviceId: number
): Promise<DeleteComboDeviceResponse> => {
  const { data } = await axiosInstance.delete<DeleteComboDeviceResponse>(
    `/api/combos/${comboId}/devices/${deviceId}`
  );
  return data;
};

export const useDeleteComboDevice = () => {
  const queryClient = useQueryClient();
  const { poll } = usePollComboEvaluation();

  return useMutation({
    mutationFn: ({ comboId, deviceId }: { comboId: number; deviceId: number }) =>
      deleteComboDevice(comboId, deviceId),
    onSuccess: (_data, variables) => {
      // 조합 목록과 상세 정보 캐시 무효화
      queryClient.invalidateQueries({ queryKey: [queryKey.COMBOS] });
      queryClient.invalidateQueries({ queryKey: [queryKey.COMBO_DETAIL] });
      // 조합 평가 폴링 시작
      poll(variables.comboId);
    },
  });
};
