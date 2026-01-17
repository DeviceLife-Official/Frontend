import RootLayout from '@/layouts/RootLayout';
import FindIdPage from '@/pages/auth/FindIdPage';
import FindPasswordPage from '@/pages/auth/FindPasswordPage';
import LoginPage from '@/pages/auth/LoginPage';
import OnboardingCombinationPage from '@/pages/auth/OnboardingCombinationPage';
import OnboardingCompletePage from '@/pages/auth/OnboardingCompletePage';
import OnboardingLifestylePage from '@/pages/auth/OnboardingLifestylePage';
import SignupFormPage from '@/pages/auth/SignupFormPage';
import SignupPage from '@/pages/auth/SignupPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const AuthFlowRoutes = [
  {
    path: '/auth',
    element: <RootLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'find/id', element: <FindIdPage /> },
      { path: 'find/password', element: <FindPasswordPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'signup/form', element: <SignupFormPage /> },

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
