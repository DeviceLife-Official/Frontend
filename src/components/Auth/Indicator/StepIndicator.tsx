import EllipseBlack from '@/assets/icons/ellipse_black.svg?react';
import EllipseGray from '@/assets/icons/ellipse_gray.svg?react';
import { useOnboardingNavigation } from '@/hooks/useOnboardingNavigation';
import clsx from 'clsx';

type StepIndicatorProps = {
  currentStep: number;
  totalSteps?: number;
  className?: string;
};

const StepIndicator = ({ currentStep, totalSteps = 4, className = '' }: StepIndicatorProps) => {
  const { handleStepClick: navigateToStep } = useOnboardingNavigation();

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
        const isFuture = step > currentStep;
        const Icon = isActive ? EllipseBlack : EllipseGray;
        return (
          <button
            key={step}
            type="button"
            onClick={() => handleStepClick(step)}
            disabled={!isPrevious}
            className={clsx(
              isPrevious && 'cursor-pointer hover:opacity-70',
              isFuture && 'opacity-50',
              isActive && 'cursor-default'
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
