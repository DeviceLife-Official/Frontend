import type { CommonResponse } from '@/types/common';

// 프로필 수정 Request
export type EditProfileRequest = {
  username: string;
  email: string;
  lifestyleList: string[];
};

export type EditProfileResult = {
  username: string;
  email: string;
  lifestyleList: string[];
};

// 프로필 수정 Response
export type EditProfileResponse = CommonResponse<EditProfileResult>;
