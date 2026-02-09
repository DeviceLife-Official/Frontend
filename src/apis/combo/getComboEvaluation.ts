import { axiosInstance } from '@/apis/axios/axios';
import type { GetComboEvaluationResponse, ComboEvaluationResult } from '@/types/combo/evaluation';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKey';

// 조합 평가 점수 조회 API
export const getComboEvaluation = async (comboId: number): Promise<ComboEvaluationResult> => {
  const { data } = await axiosInstance.get<GetComboEvaluationResponse>(
    `/api/combos/${comboId}/evaluation`
  );
  return data.result!;
};

// 조합 평가 조회 훅 (캐시 구독 + 초기 fetch)
export const useComboEvaluation = (comboId: number | undefined) => {
  return useQuery({
    queryKey: [queryKey.COMBO_EVALUATION, comboId],
    queryFn: () => getComboEvaluation(comboId!),
    enabled: !!comboId,
    staleTime: Infinity, // 폴링이 setQueryData로 갱신하므로 자동 refetch 불필요
    retry: false, // 404(EVAL_4041)일 때 무한 재시도 방지
  });
};

