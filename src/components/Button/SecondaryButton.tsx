type SecondaryButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const SecondaryButton = ({ text, onClick, className = '', disabled = false }: SecondaryButtonProps) => {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center
        h-52
        bg-blue-100 border border-blue-600
        rounded-button
        font-body-2-sm text-blue-600
        cursor-pointer
        hover:bg-blue-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-100
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
