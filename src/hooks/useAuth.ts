import { useGetUserProfile } from '@/apis/mypage/getUserProfile';
import { hasAuthTokens } from '@/utils/auth/authStorage';
import type { UserProfileResult } from '@/types/mypage/user';

// UserProfile 타입 별칭 (UserProfileResult와 동일)
export type UserProfile = UserProfileResult;

/*
인증 상태를 관리하는 훅

로그인 여부 판단 로직:
 - 토큰이 있고 userProfile이 있을 때만 → 로그인 상태
 - 그 외의 경우 → 비로그인 상태

반환값:
 - isLoggedIn: 로그인 여부 (토큰 + user가 모두 있을 때만 true)
 - user: 유저 객체 (없으면 null)
 - isAuthLoading: 인증 로딩 상태 (토큰은 있는데 me를 아직 못 받아온 상태)
 */

export const useAuth = () => {
  const hasToken = hasAuthTokens();
  const { data: user, isLoading, isFetching } = useGetUserProfile();

  // 모든 인증 관련 로딩 상태 (토큰 확인 + userProfile 조회)
  // - 토큰이 있을 때: userProfile 조회 중
  // - 토큰이 없을 때: enabled=false이므로 로딩 없음
  // - 초기 마운트 시: isLoading이 true일 수 있음
  const isAuthLoading = isLoading || isFetching;

  // 토큰이 있고 userProfile이 있을 때만 로그인 상태
  const isLoggedIn = hasToken && !!user;

  return {
    isLoggedIn,
    user: user ?? null,
    isAuthLoading,
    hasToken,
  };
};
