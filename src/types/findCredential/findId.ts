import type { CommonResponse } from '@/types/common';

// 아이디 찾기 요청 타입
export type FindIdRequest = {
  username: string;
  phoneNumber: string;
};

// 아이디 찾기 응답 result 타입
export type FindIdResult = {
  emailInfo: string;
};

// 아이디 찾기 응답 타입
export type FindIdResponse = CommonResponse<FindIdResult>;
