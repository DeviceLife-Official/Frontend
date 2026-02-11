import { axiosInstance } from '@/apis/axios/axios';
import type {
  PostComboDeviceRequest,
  PostComboDeviceResponse,
} from '@/types/combo/combo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';
import { usePollComboEvaluation } from '@/hooks/usePollComboEvaluation';

// 조합에 기기 추가
export const postComboDevice = async (
  comboId: number,
  payload: PostComboDeviceRequest
): Promise<PostComboDeviceResponse> => {
  const { data } = await axiosInstance.post<PostComboDeviceResponse>(
    `/api/combos/${comboId}/devices`,
    payload
  );
  return data;
};

export const usePostComboDevice = () => {
  const queryClient = useQueryClient();
  const { poll } = usePollComboEvaluation();

  return useMutation({
    mutationFn: ({ comboId, deviceId }: { comboId: number; deviceId: number }) =>
      postComboDevice(comboId, { deviceId }),
    onSuccess: (_data, variables) => {
      // 조합 목록/상세 캐시 무효화
      queryClient.invalidateQueries({ queryKey: [queryKey.COMBOS] });
      // 조합 평가 폴링 시작
      poll(variables.comboId);
    },
  });
};
