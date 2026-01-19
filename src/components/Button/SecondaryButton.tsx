type SecondaryButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

const SecondaryButton = ({ text, onClick, className = '' }: SecondaryButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center justify-center
        h-72
        bg-blue-100 border border-blue-600
        rounded-button
        font-body-2-sm text-blue-600
        cursor-pointer
        hover:bg-blue-200
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
