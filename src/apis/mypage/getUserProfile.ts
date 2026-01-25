import { axiosInstance } from '@/apis/axios/axios';
import type { UserProfileResponse, UserProfileResult } from '@/types/mypage/user';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { hasAuthTokens } from '@/utils/authStorage';

// 유저 정보 조회 API
export const getUserProfile = async (): Promise<UserProfileResult> => {
  console.log('[4-1] 유저 정보 API 요청 전송', { url: '/api/mypage/user-profile' });
  const { data } = await axiosInstance.get<UserProfileResponse>('/api/mypage/user-profile');
  console.log('[4-2] 유저 정보 API 응답 수신', { data });
  if (!data?.result) {
    throw new Error('유저 정보가 없습니다.');
  }
  return data.result;
};

// 유저 정보 조회 Query
export const useGetUserProfile = () => {
  const hasTokens = hasAuthTokens();

  return useQuery<UserProfileResult>({
    queryKey: queryKeys.userProfile,
    queryFn: getUserProfile,
    enabled: hasTokens, // 토큰이 있을 때만 조회
  });
};
