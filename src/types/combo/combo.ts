import type { CommonResponse } from '../common';

// 조합 생성 요청 타입
export type PostComboRequest = {
  comboName: string; // 최대 80자
};

// 조합 생성 응답 result 타입
export type PostComboResult = {
  comboId: number;
  comboName: string;
};

// 조합 생성 응답 타입
export type PostComboResponse = CommonResponse<PostComboResult>;
