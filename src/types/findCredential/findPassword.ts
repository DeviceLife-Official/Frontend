import type { CommonResponse } from '@/types/common';

// step1 - 메일 전송 요청 타입
export type SendMailRequest = {
  email: string;
};

// step1 - 메일 전송 응답 타입
export type SendMailResponse = CommonResponse;


// step2 - 인증코드 확인 요청 타입
export type VerifyCodeRequest = {
  code: string;
};

// step2 - 인증코드 확인 응답 result 타입
export type VerifyCodeResult = {
  verifyToken: string;
};

// step2 - 인증코드 확인 응답 타입
export type VerifyCodeResponse = CommonResponse<VerifyCodeResult>;


// step3 - 비밀번호 리셋 요청 타입
export type ResetPasswordRequest = {
  verifiedToken: string;
  newPassword: string;
};

// step3 - 비밀번호 리셋 응답 타입
export type ResetPasswordResponse = CommonResponse;
