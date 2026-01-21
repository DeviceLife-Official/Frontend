type OnboardingLifestyleTagProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

const OnboardingLifestyleTag = ({
  label,
  selected = false,
  onClick,
  className = '',
}: OnboardingLifestyleTagProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center justify-center
        px-20 py-10 rounded-button bg-white cursor-pointer
        transition-all duration-150
        ${selected
        ? 'border-shadow-blue font-body-1-sm text-blue-700'
        : 'border-shadow-black font-body-1-r text-black hover:text-blue-500'
        }
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default OnboardingLifestyleTag;
