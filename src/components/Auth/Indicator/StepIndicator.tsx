import EllipseBlack from '@/assets/icons/ellipse_black.svg?react';
import EllipseGray from '@/assets/icons/ellipse_gray.svg?react';

type StepIndicatorProps = {
  currentStep: number;
  totalSteps?: number;
  onStepClick?: (step: number) => void;
  className?: string;
};

const StepIndicator = ({
  currentStep,
  totalSteps = 4,
  onStepClick,
  className = '',
}: StepIndicatorProps) => {
  const handleStepClick = (step: number) => {
    // 이전 step만 클릭 가능
    if (step < currentStep && onStepClick) {
      onStepClick(step);
    }
  };

  return (
    <div className={`flex items-center justify-center p-8 gap-24 ${className}`}>
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
            className={`
              ${isPrevious ? 'cursor-pointer hover:opacity-70' : ''}
              ${isFuture ? 'opacity-50' : ''}
              ${isActive ? 'cursor-default' : ''}
            `}
          >
            <Icon className="size-10" />
          </button>
        );
      })}
    </div>
  );
};

export default StepIndicator;
