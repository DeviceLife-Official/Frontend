// HomePage
import HomePage from '@/pages/HomePage';

// lifestyle
import LifestylePage from '@/pages/lifestyle/LifestylePage';

// devices
import DeviceSearchPage from '@/pages/devices/DeviceSearchPage';
import DeviceDetailPage from '@/pages/devices/DeviceDetailPage';

// auth
import LoginPage from '@/pages/auth/LoginPage';
import FindIdPage from '@/pages/auth/FindIdPage';
import FindIdResultPage from '@/pages/auth/FindIdResultPage';
import FindPasswordPage from '@/pages/auth/FindPasswordPage';
import SignupPage from '@/pages/auth/SignupPage';
import SignupAccountPage from '@/pages/auth/SignupAccountPage';
import SignupProfilePage from '@/pages/auth/SignupProfilePage';

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

    // 푸터 페이지들
    // {
    //   path: 'support',
    //   children: [
    //     { path: 'customer-center', element: <CustomerCenterPage /> },
    //     { path: 'faq', element: <FaqPage /> },
    //     { path: 'notices', element: <NoticesPage /> },
    //     { path: 'terms', element: <TermsPage /> },
    //     { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
    //   ],
    // },

    // 전체 미매칭 fallback
    { path: '*', element: <NotFoundPage /> },
  ],
};
