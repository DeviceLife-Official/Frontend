export type CommonResponse<T = null> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: T;
  error?: Record<string, any> | null;
};
