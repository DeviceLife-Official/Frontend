// HomePage
import HomePage from '@/pages/HomePage';

// lifestyle
import LifestylePage from '@/pages/lifestyle/LifestylePage';

// devices
import DeviceSearchPage from '@/pages/devices/DeviceSearchPage';
import DeviceDetailPage from '@/pages/devices/DeviceDetailPage';

// combination
import CombinationCreatePage from '@/pages/combination/CombinationCreatePage';

// auth
import LoginPage from '@/pages/auth/LoginPage';
import FindIdPage from '@/pages/auth/FindIdPage';
import FindIdResultPage from '@/pages/auth/FindIdResultPage';
import FindPasswordPage from '@/pages/auth/FindPasswordPage';
import SignupPage from '@/pages/auth/SignupPage';
import SignupAccountPage from '@/pages/auth/SignupAccountPage';
import SignupProfilePage from '@/pages/auth/SignupProfilePage';
import GoogleCallbackPage from '@/pages/auth/GoogleCallbackPage';

import NotFoundPage from '@/pages/NotFoundPage';

export const PublicRoutes = {
  children: [
    // 홈
    { index: true, element: <HomePage /> },

    // 라이프스타일 (단일 페이지)
    { path: 'lifestyle', element: <LifestylePage /> },

    // 기기 탐색/상세
    {
      path: 'devices',
      children: [
        { index: true, element: <DeviceSearchPage /> },
        { path: ':deviceId', element: <DeviceDetailPage /> },
      ],
    },

    // 조합 생성
    { path: 'combination/create', element: <CombinationCreatePage /> },

    // OAuth 콜백 (단독, 가드 없음)
    { path: 'auth/callback/google', element: <GoogleCallbackPage /> },

    // auth (로그인/회원가입/찾기)
    {
      path: 'auth',
      children: [
        { path: 'login', element: <LoginPage /> },

        {
          path: 'find',
          children: [
            { path: 'id', element: <FindIdPage /> },
            { path: 'id/result', element: <FindIdResultPage /> },
            { path: 'password', element: <FindPasswordPage /> },
          ],
        },

        {
          path: 'signup',
          children: [
            { index: true, element: <SignupPage /> },
            { path: 'account', element: <SignupAccountPage /> },
            { path: 'profile', element: <SignupProfilePage /> },
          ],
        },

        // /auth 하위 미매칭 fallback
        { path: '*', element: <NotFoundPage /> },
      ],
    },

    // 전체 미매칭 fallback
    { path: '*', element: <NotFoundPage /> },
  ],
};
