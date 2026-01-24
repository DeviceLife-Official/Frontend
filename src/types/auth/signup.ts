import type { CommonResponse } from '../common';

export type EmailDuplicateRequest = {
  email: string;
};

export type EmailDuplicateResult = {
  success: boolean;
};

export type EmailDuplicateResponse = CommonResponse<EmailDuplicateResult>;