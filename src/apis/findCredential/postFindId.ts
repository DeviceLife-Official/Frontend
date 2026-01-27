import { axiosInstance } from '@/apis/axios/axios';
import type { FindIdRequest, FindIdResponse } from '@/types/findCredential/findId';
import { useMutation } from '@tanstack/react-query';

export const postFindId = async (payload: FindIdRequest): Promise<FindIdResponse> => {
  const { data } = await axiosInstance.post<FindIdResponse>(
    '/api/find-credential/find-id',
    payload
  );
  return data;
};

export const usePostFindId = () => {
  return useMutation({
    mutationFn: postFindId,
  });
};
