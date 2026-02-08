import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '@/components/LoadingSpinner';
import { postRefresh } from '@/apis/auth/postRefresh';
import { finalizeLogin } from '@/utils/finalizeLogin';
import { hasCompletedOnboarding } from '@/utils/authStorage';
import { ROUTES } from '@/constants/routes';
import { queryKey } from '@/constants/queryKey';
import type { UserProfileResult } from '@/types/mypage/user';

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // 1. refreshToken을 통해 accessToken 발급받기
        const refreshResponse = await postRefresh();

        if (!refreshResponse?.result?.accessToken) {
          throw new Error('액세스 토큰을 받지 못했습니다.');
        }

        const accessToken = refreshResponse.result.accessToken;

        // 2. 받은 accessToken으로 프론트에서 로그인 상태 만들기
        await finalizeLogin(accessToken, queryClient);

        // 3. 온보딩 완료 여부 확인 후 리다이렉트
        const userProfile = queryClient.getQueryData<UserProfileResult>([
          queryKey.USER_PROFILE,
        ]);

        if (hasCompletedOnboarding(userProfile)) {
          // 온보딩 완료: 홈으로 리다이렉트
          navigate(ROUTES.home, { replace: true });
        } else {
          // 온보딩 미완료: 온보딩 시작으로 리다이렉트
          navigate(ROUTES.onboarding.lifestyle, { replace: true });
        }
      } catch (error) {
        console.error('Google OAuth 콜백 처리 실패:', error);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        navigate(ROUTES.auth.login, { replace: true });
      }
    };

    handleCallback();
  }, [navigate, queryClient]);

  return <LoadingSpinner />;
};

export default GoogleCallbackPage;
