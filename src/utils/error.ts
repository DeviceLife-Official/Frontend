import axios from 'axios';

type ApiErrorBody = { message?: string };

export function parseApiError(error: unknown): {
  hasResponse: boolean;
  message?: string;
} {
  // axios 에러가 아니면 response가 있다고 단정할 수 없음
  if (!axios.isAxiosError<ApiErrorBody>(error)) {
    return { hasResponse: false };
  }

  return {
    hasResponse: !!error.response,
    message: error.response?.data?.message,
  };
}
