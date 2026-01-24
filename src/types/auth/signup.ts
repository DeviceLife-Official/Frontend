import type { CommonResponse } from '@/types/common';

// 이메일 중복확인 요청 타입
export type EmailDuplicateRequest = {
  email: string;
};

// 이메일 중복확인 응답 result 타입
export type EmailDuplicateResult = {
  success: boolean;
};

// 이메일 중복확인 응답 타입
export type EmailDuplicateResponse = CommonResponse<EmailDuplicateResult>;


// 회원가입 요청 타입
export type SignupRequest = {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
};

// 회원가입 응답 result 타입
export type SignupResult = {
  userId: number;
};

// 회원가입 응답 타입
export type SignupResponse = CommonResponse<SignupResult>;

