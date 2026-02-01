import RootLayout from '@/layouts/RootLayout';
import FindIdPage from '@/pages/auth/FindIdPage';
import FindIdResultPage from '@/pages/auth/FindIdResultPage';
import FindPasswordPage from '@/pages/auth/FindPasswordPage';
import LoginPage from '@/pages/auth/LoginPage';
import OnboardingCombinationPage from '@/pages/auth/OnboardingCombinationPage';
import OnboardingCompletePage from '@/pages/auth/OnboardingCompletePage';
import OnboardingLifestylePage from '@/pages/auth/OnboardingLifestylePage';
import SignupAccountPage from '@/pages/auth/SignupAccountPage';
import SignupProfilePage from '@/pages/auth/SignupProfilePage';
import SignupPage from '@/pages/auth/SignupPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const AuthFlowRoutes = [
  {
    path: '/auth',
    element: <RootLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'find/id', element: <FindIdPage /> },
      { path: 'find/id/result', element: <FindIdResultPage /> },
      { path: 'find/password', element: <FindPasswordPage /> },

      // signup
      {
        path: 'signup',
        children: [
          { index: true, element: <SignupPage /> },
          { path: 'account', element: <SignupAccountPage /> },
          { path: 'profile', element: <SignupProfilePage /> },
        ],
      },

      // onboarding
      {
        path: 'onboarding',
        children: [
          { path: 'lifestyle', element: <OnboardingLifestylePage /> },
          { path: 'combination', element: <OnboardingCombinationPage /> },
          { path: 'complete', element: <OnboardingCompletePage /> },
        ],
      },

      // not found
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
