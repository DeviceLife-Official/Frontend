import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

/**
 * 온보딩 플로우의 Step 네비게이션을 위한 커스텀 훅
 * StepIndicator에서 이전 step 클릭 시 해당 페이지로 이동
 * 이전 단계로 이동 시 replace: true를 사용하여 히스토리 스택 관리
 */
export const useOnboardingNavigation = () => {
  const navigate = useNavigate();

  const handleStepClick = (step: number) => {
    // 이전 단계로 이동 시 히스토리를 교체하여 뒤로가기 문제 방지
    const options = { replace: true };

    switch (step) {
      case 1:
        navigate(ROUTES.auth.signup.account, options);
        break;
      case 2:
        navigate(ROUTES.auth.signup.profile, options);
        break;
      case 3:
        navigate(ROUTES.onboarding.lifestyle, options);
        break;
      case 4:
        navigate(ROUTES.onboarding.combination, options);
        break;
      default:
        break;
    }
  };

  return { handleStepClick };
};
