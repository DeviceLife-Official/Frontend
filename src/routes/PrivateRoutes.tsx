import { Navigate } from 'react-router-dom';
import { AuthGuard } from './guards/AuthGuard';
import { OnboardingOnlyGuard } from './guards/OnboardingOnlyGuard';
import { OnboardingCompletedGuard } from './guards/OnboardingCompletedGuard';

// onboarding
import OnboardingLifestylePage from '@/pages/onboarding/OnboardingLifestylePage';
import OnboardingCombinationPage from '@/pages/onboarding/OnboardingCombinationPage';
import OnboardingCompletePage from '@/pages/onboarding/OnboardingCompletePage';
import OnboardingRecommendationPage from '@/pages/onboarding/OnboardingRecommendationPage';


// my
import MyPage from '@/pages/my/MyPage';
import MyTrashPage from '@/pages/my/MyTrashPage';
import MyCombinationDetailPage from '@/pages/my/MyCombinationDetailPage';
import MySettingsProfilePage from '@/pages/my/settings/ProfileEditPage';
import MySettingsPasswordPage from '@/pages/my/settings/PasswordEditPage';

import NotFoundPage from '@/pages/NotFoundPage';

/**
 * - <AuthGuard /> : 비로그인 접근 차단 (없으면 /auth/login 등으로 리다이렉트)
 * - <OnboardingOnlyGuard /> : 로그인 + 온보딩 "미완료"만 접근 허용 (완료면 메인으로 리다이렉트)
 * - <OnboardingCompletedGuard /> : 로그인 + 온보딩 "완료"만 접근 허용 (미완료면 /onboarding 로 리다이렉트)
 */
export const PrivateRoutes = {
  element: <AuthGuard />,
  children: [
    
    // 1) 온보딩 전용 영역: (로그인 O) + (온보딩 미완료만)
    {
      path: 'onboarding',
      element: <OnboardingOnlyGuard />,
      children: [
        { path: 'lifestyle', element: <OnboardingLifestylePage /> },
        { path: 'combination', element: <OnboardingCombinationPage /> },
        { path: 'complete', element: <OnboardingCompletePage /> },
        { path: 'recommendation', element: <OnboardingRecommendationPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },

    // 2) 메인 앱 영역: (로그인 O) + (온보딩 완료만)
    {
      element: <OnboardingCompletedGuard />,
      children: [
        // 마이페이지
        { path: 'my', element: <MyPage /> },
        { path: 'my/trash', element: <MyTrashPage /> },
        { path: 'my/combinations/:id', element: <MyCombinationDetailPage /> },

        // 설정
        {
          path: 'my/settings',
          children: [
            { index: true, element: <Navigate to="profile" replace /> },
            { path: 'profile', element: <MySettingsProfilePage /> },
            { path: 'password', element: <MySettingsPasswordPage /> },
          ],
        },
      ],
    },
  ],
};
