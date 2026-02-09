import { useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/apis/axios/axios';
import { queryKey } from '@/constants/queryKey';
import type { GetComboEvaluationResponse, ComboEvaluationResult } from '@/types/combo/evaluation';
import axios from 'axios';

// ──────────────────────────────────────────────
// 조합 평가 폴링 훅
// 조합이 변경된 직후 평가 계산이 끝날 때까지
// 1초 간격으로 polling → 완료 시 React Query 캐시 갱신
// ──────────────────────────────────────────────

const POLL_INTERVAL = 1000; // 1초
const MAX_RETRIES = 5;

// 404 + EVAL_4041 코드인지 판별
const isPendingError = (error: unknown): boolean => {
  if (!axios.isAxiosError(error)) return false;
  if (error.response?.status !== 404) return false;
  return error.response.data?.code === 'EVAL_4041';
};

export type PollResult =
  | { status: 'success'; data: ComboEvaluationResult }
  | { status: 'timeout' }
  | { status: 'error'; error: unknown };

export const usePollComboEvaluation = () => {
  const queryClient = useQueryClient();
  const abortRef = useRef<AbortController | null>(null);

  const poll = useCallback(
    (comboId: number): Promise<PollResult> => {
      // 이전 폴링이 진행 중이면 취소
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      return new Promise((resolve) => {
        let retryCount = 0;

        const attempt = async () => {
          // 취소된 경우 즉시 종료
          if (controller.signal.aborted) {
            resolve({ status: 'error', error: new Error('Polling aborted') });
            return;
          }

          try {
            const { data } = await axiosInstance.get<GetComboEvaluationResponse>(
              `/api/combos/${comboId}/evaluation`,
              { signal: controller.signal }
            );

            // 성공(200): 캐시 갱신 후 완료
            const result = data.result!;
            queryClient.setQueryData(
              [queryKey.COMBO_EVALUATION, comboId],
              result
            );
            resolve({ status: 'success', data: result });
          } catch (error) {
            // 취소된 경우
            if (controller.signal.aborted) {
              resolve({ status: 'error', error: new Error('Polling aborted') });
              return;
            }

            // 404 + EVAL_4041: 아직 계산 중 → 다음 턴 대기
            if (isPendingError(error)) {
              retryCount += 1;

              if (retryCount >= MAX_RETRIES) {
                resolve({ status: 'timeout' });
                return;
              }

              setTimeout(attempt, POLL_INTERVAL);
              return;
            }

            // 그 외 에러: 즉시 종료
            resolve({ status: 'error', error });
          }
        };

        attempt();
      });
    },
    [queryClient]
  );

  // 진행 중인 폴링 취소
  const cancel = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  return { poll, cancel };
};
