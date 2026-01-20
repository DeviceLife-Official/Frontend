import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

/**
 * 온보딩 플로우의 Step 네비게이션을 위한 커스텀 훅
 * StepIndicator에서 이전 step 클릭 시 해당 페이지로 이동
 */
export const useOnboardingNavigation = () => {
  const navigate = useNavigate();

  const handleStepClick = (step: number) => {
    switch (step) {
      case 1:
        navigate(ROUTES.auth.signup.account);
        break;
      case 2:
        navigate(ROUTES.auth.signup.profile);
        break;
      case 3:
        navigate(ROUTES.auth.onboarding.lifestyle);
        break;
      case 4:
        navigate(ROUTES.auth.onboarding.combination);
        break;
      default:
        break;
    }
  };

  return { handleStepClick };
};
