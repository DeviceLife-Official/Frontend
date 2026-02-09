import type { CommonResponse } from '../common';

// 비밀번호 수정 request
export type EditPasswordRequest = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

// 비밀번호 수정 response
export type EditPasswordResponse = CommonResponse<null>;