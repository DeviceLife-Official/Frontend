import type { CommonResponse } from '@/types/common';

// 토큰 재발급 응답 result 타입
export type RefreshTokenResult = {
  userId: number;
  accessToken: string;
};

// 토큰 재발급 응답 타입
export type RefreshTokenResponse = CommonResponse<RefreshTokenResult>;
