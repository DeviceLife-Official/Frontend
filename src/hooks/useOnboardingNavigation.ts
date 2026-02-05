import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';

/**
 * 온보딩 플로우의 Step 네비게이션을 위한 커스텀 훅
 * StepIndicator에서 이전 step 클릭 시 해당 페이지로 이동
 * 이전 단계로 이동 시 replace: true를 사용하여 히스토리 스택 관리
 * 
 * 로그인된 상태에서는 회원가입 페이지(step 1, 2)로 이동하지 않음
 */
export const useOnboardingNavigation = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleStepClick = (step: number) => {
    // 로그인된 상태에서 회원가입 페이지(step 1, 2)로 이동하려고 하면 무시
    if (isLoggedIn && (step === 1 || step === 2)) {
      return;
    }

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
