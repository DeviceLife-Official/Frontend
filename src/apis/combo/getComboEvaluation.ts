import { axiosInstance } from '@/apis/axios/axios';
import type { GetComboEvaluationResponse, ComboEvaluationResult } from '@/types/combo/evaluation';

// 조합 평가 점수 조회 API
export const getComboEvaluation = async (comboId: number): Promise<ComboEvaluationResult> => {
  const { data } = await axiosInstance.get<GetComboEvaluationResponse>(
    `/api/combos/${comboId}/evaluation`
  );
  return data.result!;
};


