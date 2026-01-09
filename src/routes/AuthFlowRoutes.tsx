import RootLayout from '@/layouts/RootLayout';
import LoginPage from '@/pages/auth/LoginPage';
import OnboardingCombinationPage from '@/pages/auth/OnboardingCombinationPage';
import OnboardingCompletePage from '@/pages/auth/OnboardingCompletePage';
import OnboardingLifestylePage from '@/pages/auth/OnboardingLifestylePage';
import SignupFormPage from '@/pages/auth/SignupFormPage';
import SignupPage from '@/pages/auth/SignupPage';

export const AuthFlowRoutes = [
  {
    path: '/auth',
    element: <RootLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
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
    ],
  },
];
