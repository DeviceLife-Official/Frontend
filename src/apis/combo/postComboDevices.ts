import { axiosInstance } from '@/apis/axios/axios';
import type {
  PostComboDeviceRequest,
  PostComboDeviceResponse,
} from '@/types/combo/combo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';

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

  return useMutation({
    mutationFn: ({ comboId, deviceId }: { comboId: number; deviceId: number }) =>
      postComboDevice(comboId, { deviceId }),
    onSuccess: () => {
      // 조합 목록/상세 캐시 무효화
      queryClient.invalidateQueries({ queryKey: [queryKey.COMBOS] });
    },
  });
};
