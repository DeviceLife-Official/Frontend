import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/auth/LoginPage';
import OnboardingCombinationPage from '@/pages/auth/OnboardingCombinationPage';
import OnboardingCompletePage from '@/pages/auth/OnboardingCompletePage';
import OnboardingLifestylePage from '@/pages/auth/OnboardingLifestylePage';
import SignupFormPage from '@/pages/auth/SignupFormPage';
import SignupPage from '@/pages/auth/SignupPage';

export const AuthFlowRoutes = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'signup/form', element: <SignupFormPage /> },

      // onboarding routes
      { path: 'onboarding/lifestyle', element: <OnboardingLifestylePage /> },
      { path: 'onboarding/combination', element: <OnboardingCombinationPage /> },
      { path: 'onboarding/complete', element: <OnboardingCompletePage /> },
    ],
  },
];
