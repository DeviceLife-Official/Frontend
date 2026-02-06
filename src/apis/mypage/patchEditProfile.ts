import { axiosInstance } from '@/apis/axios/axios';
import { useMutation } from '@tanstack/react-query';
import type { EditProfileRequest, EditProfileResponse } from '@/types/mypage/editprofile';

export const patchEditProfile = async (
  payload: EditProfileRequest
): Promise<EditProfileResponse> => {
  const { data } = await axiosInstance.patch<EditProfileResponse>(
    '/api/mypage/user-profile',
    payload
  );
  return data;
};

export const usePatchEditProfile = () => {
  return useMutation({
    mutationFn: patchEditProfile,
  });
};
