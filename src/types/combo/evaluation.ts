import type { CommonResponse } from '../common';

// 조합 평가 점수 결과 타입
export interface ComboEvaluationResult {
  comboId: number;
  totalScore: number;
  connectivity: number;
  connectivityGrade: string;
  convenience: number;
  convenienceGrade: string;
  lifestyle: number;
  lifestyleGrade: string;
  evaluatedAt: string; // ISO date string
}

// 조합 평가 점수 조회 응답 타입
export type GetComboEvaluationResponse = CommonResponse<ComboEvaluationResult>;
