import { axiosInstance } from '@/apis/axios';
import type { UserProfileResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

export const getUserProfile = async (): Promise<UserProfileResponse> => {
  const { data } = await axiosInstance.get<UserProfileResponse>('/api/mypage/user-profile');
  return data;
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });
};
