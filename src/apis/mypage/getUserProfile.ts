import { axiosInstance } from '@/apis/axios/axios';
import type { UserProfileResponse, UserProfileResult } from '@/types/mypage/user';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/constants/queryKeys';
import { hasAuthTokens } from '@/utils/auth/authStorage';

// 유저 정보 조회 API
export const getUserProfile = async (): Promise<UserProfileResult | undefined> => {
  const { data } = await axiosInstance.get<UserProfileResponse>('/api/mypage/user-profile');
  return data.result;
};

// 유저 정보 조회 Query
export const useGetUserProfile = () => {
  const hasTokens = hasAuthTokens();
  return useQuery<UserProfileResult | undefined>({
    queryKey: [queryKey.USER_PROFILE],
    queryFn: getUserProfile,
    enabled: hasTokens, // 토큰이 있을 때만 조회
  });
};
