import type { CommonResponse } from '@/types/common';

// 유저 정보 응답 result 타입
export type UserProfileResult = {
  username: string;
  createdAt: string;
  email: string;
  lifestyleList: string[];
  authProvider: string;
};

// 유저 정보 응답 타입
export type UserProfileResponse = CommonResponse<UserProfileResult>;
