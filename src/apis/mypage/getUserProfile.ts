import { axiosInstance } from '@/apis/axios/axios';
import type { UserProfileResponse } from '@/types/user';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';

export const getUserProfile = async (): Promise<UserProfileResponse> => {
  const { data } = await axiosInstance.get<UserProfileResponse>('/api/mypage/user-profile');
  return data;
};

export const useGetUserProfile = (
  options?: Omit<UseQueryOptions<UserProfileResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<UserProfileResponse>({
    queryKey: queryKeys.userProfile,
    queryFn: getUserProfile,
    ...options,
  });
};
