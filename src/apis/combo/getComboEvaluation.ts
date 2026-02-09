import { axiosInstance } from '@/apis/axios/axios';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';
import type { GetComboEvaluationResponse, ComboEvaluationResult } from '@/types/combo/evaluation';

// 조합 평가 점수 조회 API
export const getComboEvaluation = async (comboId: number): Promise<ComboEvaluationResult> => {
  const { data } = await axiosInstance.get<GetComboEvaluationResponse>(
    `/api/combos/${comboId}/evaluation`
  );
  return data.result!;
};

// 조합 평가 점수 조회 Query
export const useGetComboEvaluation = (comboId: number | null, enabled: boolean = true) => {
  return useQuery<ComboEvaluationResult>({
    queryKey: [queryKey.COMBO_EVALUATION, comboId],
    queryFn: () => getComboEvaluation(comboId!),
    enabled: comboId !== null && enabled,
  });
};
