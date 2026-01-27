type PrimaryButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const PrimaryButton = ({ text, onClick, disabled = false, className = '' }: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center
        h-52
        rounded-button
        font-body-2-sm
        text-white
        ${className} 
        ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
