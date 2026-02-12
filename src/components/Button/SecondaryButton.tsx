import { cn } from '@/utils/cn';

type SecondaryButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const SecondaryButton = ({
  text,
  onClick,
  className = '',
  disabled = false,
}: SecondaryButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center h-52 rounded-button font-body-2-sm',
        disabled
          ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
          : 'bg-blue-100 border border-blue-600 text-blue-600 cursor-pointer hover:bg-blue-200',
        className
      )}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
