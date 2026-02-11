import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '@/components/LoadingSpinner';
import { postRefresh } from '@/apis/auth/postRefresh';
import { finalizeLogin } from '@/utils/finalizeLogin';
import { ROUTES } from '@/constants/routes';
import { queryKey } from '@/constants/queryKey';
import type { UserProfileResult } from '@/types/mypage/user';

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const hasHandled = useRef(false);

  useEffect(() => {
    // 이미 처리된 경우 종료(StrictMode 때문에 여러번 호출될 수 있음)
    const run = async () => {
      if (hasHandled.current) return;
      hasHandled.current = true;

      try {
        // 1) refreshToken 쿠키로 accessToken 발급
        const refreshResponse = await postRefresh();
        const accessToken = refreshResponse?.result?.accessToken;
        if (!accessToken) throw new Error('액세스 토큰을 받지 못했습니다.');

        // 2) accessToken 저장 + 유저 캐시 세팅 (OAuth는 체크박스 없음 → keepLogin: false)
        await finalizeLogin(accessToken, queryClient, false);

        // 3) 캐시에서 유저 꺼내서 분기
        const user = queryClient.getQueryData<UserProfileResult>([
          queryKey.USER_PROFILE,
        ]);

        // 온보딩 완료 여부 확인 후 리다이렉트
        if (user?.isOnboardingCompleted) {
          navigate(ROUTES.home, { replace: true });
        } else {
          navigate(ROUTES.onboarding.lifestyle, { replace: true });
        }
        // 실패 시 로그인 페이지로 리다이렉트
      } catch {
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        navigate(ROUTES.auth.login, { replace: true, });
      }
    };

    run();
  }, [navigate, queryClient]);

  return <LoadingSpinner />;
};

export default GoogleCallbackPage;
