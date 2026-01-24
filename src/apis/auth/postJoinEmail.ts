import { axiosInstance } from '@/apis/axios';
import type {
  EmailDuplicateRequest,
  EmailDuplicateResponse,
} from '@/types/auth/signup';
import { useMutation } from '@tanstack/react-query';

export const postJoinEmail = async (
  payload: EmailDuplicateRequest
): Promise<EmailDuplicateResponse> => {
  const { data } = await axiosInstance.post<EmailDuplicateResponse>(
    '/api/auth/join/email',
    payload
  );
  return data;
};

export const usePostJoinEmail = () => {
  return useMutation({
    mutationFn: postJoinEmail,
  });
};
