import { axiosInstance } from '@/apis/axios/axios';
import type {
  SendMailRequest,
  SendMailResponse,
  VerifyCodeRequest,
  VerifyCodeResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '@/types/findCredential/findPassword';
import { useMutation } from '@tanstack/react-query';

// step1 - 메일 전송 요청 API 함수
export const postSendMail = async (
  payload: SendMailRequest
): Promise<SendMailResponse> => {
  const { data } = await axiosInstance.post<SendMailResponse>(
    '/api/find-credential/find-password/send-mail',
    payload
  );
  return data;
};

// step1 - 메일 전송 요청 훅
export const usePostSendMail = () => {
  return useMutation({
    mutationFn: postSendMail,
  });
};

// step2 - 인증코드 확인 API 함수
export const postVerifyCode = async (
  payload: VerifyCodeRequest
): Promise<VerifyCodeResponse> => {
  const { data } = await axiosInstance.post<VerifyCodeResponse>(
    '/api/find-credential/find-password/verify-code',
    payload
  );
  return data;
};

// step2 - 인증코드 확인 훅
export const usePostVerifyCode = () => {
  return useMutation({
    mutationFn: postVerifyCode,
  });
};

// step3 - 비밀번호 리셋 API 함수
export const postResetPassword = async (
  payload: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  const { data } = await axiosInstance.post<ResetPasswordResponse>(
    '/api/find-credential/find-password/reset',
    payload
  );
  return data;
};

// step3 - 비밀번호 리셋 훅
export const usePostResetPassword = () => {
  return useMutation({
    mutationFn: postResetPassword,
  });
};
