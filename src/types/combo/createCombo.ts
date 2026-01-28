import type { CommonResponse } from '../common';

// 조합 생성 요청 타입
export type PostCreateCombinationRequest = {
  comboName: string; // 최대 80자
};

// 조합 생성 응답 result 타입
export type PostCreateCombinationResult = {
  comboId: number;
  comboName: string;
};

// 조합 생성 응답 타입
export type PostCreateCombinationResponse = CommonResponse<PostCreateCombinationResult>;
