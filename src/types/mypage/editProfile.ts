import type { CommonResponse } from '@/types/common';

// 프로필 수정 Request
export type EditProfileRequest = {
  username: string | null;
  email: string | null;
  lifestyleList: string[] | null;
};

export type EditProfileResult = {
  username: string;
  email: string;
  lifestyleList: string[];
};

// 프로필 수정 Response
export type EditProfileResponse = CommonResponse<EditProfileResult>;
