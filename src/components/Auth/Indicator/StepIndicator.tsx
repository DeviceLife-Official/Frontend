import EllipseBlack from '@/assets/icons/ellipse_black.svg?react';
import EllipseGray from '@/assets/icons/ellipse_gray.svg?react';
import { useOnboardingNavigation } from '@/hooks/useOnboardingNavigation';
import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';

type StepIndicatorProps = {
  currentStep: number;
  totalSteps?: number;
  className?: string;
};

const StepIndicator = ({ currentStep, totalSteps = 4, className = '' }: StepIndicatorProps) => {
  const { handleStepClick: navigateToStep } = useOnboardingNavigation();
  const { isLoggedIn } = useAuth();

  const handleStepClick = (step: number) => {
    // 이전 step만 클릭 가능
    if (step < currentStep) {
      navigateToStep(step);
    }
  };

  return (
    <div className={clsx('flex items-center justify-center p-8 gap-24', className)}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isPrevious = step < currentStep;
        // 로그인된 상태에서는 회원가입 페이지(step 1, 2) 클릭 불가
        const isSignupStep = step === 1 || step === 2;
        const isClickable = isPrevious && (!isLoggedIn || !isSignupStep);
        const Icon = isActive ? EllipseBlack : EllipseGray;
        return (
          <button
            key={step}
            type="button"
            onClick={() => handleStepClick(step)}
            disabled={!isClickable}
            className={clsx(
              isActive && 'cursor-default',
              !isActive && isClickable && 'cursor-pointer',
              !isActive && !isClickable && 'cursor-not-allowed'
            )}
          >
            <Icon className="size-10" />
          </button>
        );
      })}
    </div>
  );
};

export default StepIndicator;
