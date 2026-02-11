import type { CommonResponse } from '@/types/common';

// 로그인 요청 타입
export type LoginRequest = {
  email: string;
  password: string;
  keepLogin?: boolean;
};

// 로그인 응답 result 타입
export type LoginResult = {
  userId: number;
  accessToken: string;
  refreshToken: null; // httpOnly 쿠키로만 전송되므로 응답에서는 항상 null
};

// 로그인 응답 타입
export type LoginResponse = CommonResponse<LoginResult>;
