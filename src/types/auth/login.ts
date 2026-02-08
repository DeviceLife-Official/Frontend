import type { CommonResponse } from '@/types/common';

// 로그인 요청 타입
export type LoginRequest = {
  email: string;
  password: string;
};

// 로그인 응답 result 타입
export type LoginResult = {
  userId: number;
  accessToken: string;
};

// 로그인 응답 타입
export type LoginResponse = CommonResponse<LoginResult>;
