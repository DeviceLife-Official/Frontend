import EllipseBlack from '@/assets/icons/ellipse_black.svg?react';
import EllipseGray from '@/assets/icons/ellipse_gray.svg?react';

type StepIndicatorProps = {
  currentStep: number;
  totalSteps?: number;
  className?: string;
};

const StepIndicator = ({ currentStep, totalSteps = 4, className = '' }: StepIndicatorProps) => {
  return (
    <div className={`flex items-center justify-center p-8 gap-24 ${className}`}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        return isActive ? (
          <EllipseBlack key={step} className="size-10" />
        ) : (
          <EllipseGray key={step} className="size-10" />
        );
      })}
    </div>
  );
};

export default StepIndicator;
