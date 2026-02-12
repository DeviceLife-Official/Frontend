export type CommonResponse<T = null> = {
  success: boolean;
  code: string;
  message: string;
  result?: T;
  error?: Record<string, any> | null;
};