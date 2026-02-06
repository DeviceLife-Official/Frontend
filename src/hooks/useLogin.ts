import { usePostLogin } from '@/apis/auth/postLogin';
import { useQueryClient } from '@tanstack/react-query';
import { finalizeLogin } from '@/utils/finalizeLogin';
import type { LoginRequest } from '@/types/auth/login';

/**
 * 로그인 플로우 훅
 * - 로그인 API 호출
 * - finalizeLogin 실행 (토큰 저장 + 유저 정보 캐시)
 * - pending 상태 제공
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: postLogin, isPending } = usePostLogin();

  const loginAndFinalize = async (credentials: LoginRequest): Promise<void> => {
    const res = await postLogin(credentials);

    if (!res.result) {
      throw new Error('로그인 응답에 토큰이 없습니다.');
    }

    await finalizeLogin(
      res.result.accessToken,
      res.result.refreshToken,
      queryClient
    );
  };

  return {
    loginAndFinalize,
    isPending,
  };
};
