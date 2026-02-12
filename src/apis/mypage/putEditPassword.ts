import { axiosInstance } from '@/apis/axios/axios';
import { useMutation } from '@tanstack/react-query';
import type { EditPasswordRequest, EditPasswordResponse } from '@/types/mypage/editPassword';

export const putEditPassword = async (
  payload: EditPasswordRequest
): Promise<EditPasswordResponse> => {
  const { data } = await axiosInstance.put<EditPasswordResponse>(
    '/api/mypage/user-profile/password',
    payload
  );
  return data;
};

export const usePutEditPassword = () => {
  return useMutation({
    mutationFn: putEditPassword,
  });
};
