type DuplicateCheckButtonProps = {
  onClick?: () => void;
  className?: string;
};

const DuplicateCheckButton = ({ onClick, className = '' }: DuplicateCheckButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center
        h-72 w-148
        bg-blue-100 border border-blue-600
        rounded-button
        font-body-2-sm text-blue-600
        cursor-pointer
        ${className}
      `}
    >
      중복확인
    </button>
  );
};

export default DuplicateCheckButton;
