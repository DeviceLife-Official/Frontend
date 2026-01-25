import { axiosInstance } from '@/apis/axios/axios';
import type { UserProfileResponse } from '@/types/mypage/user';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { hasAuthTokens } from '@/utils/authStorage';

// 유저 정보 조회 API
export const getUserProfile = async (): Promise<UserProfileResponse> => {
  const { data } = await axiosInstance.get<UserProfileResponse>('/api/mypage/user-profile');
  return data;
};

// 유저 정보 조회 Query
export const useGetUserProfile = () => {
  return useQuery<UserProfileResponse>({
    queryKey: queryKeys.userProfile,
    queryFn: getUserProfile,
    enabled: hasAuthTokens(), // 토큰이 있을 때만 조회
  });
};
