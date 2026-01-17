import { type ReactNode } from 'react';

type SignupButtonProps = {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const SignupButton = ({
  text,
  icon,
  onClick,
  disabled = false,
  className = '',
}: SignupButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center
        w-full h-72 px-16 py-24
        bg-white border border-black rounded-button
        outline-none
        ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {/* 아이콘/로고 */}
      <div className="flex-shrink-0 size-40 flex items-center justify-center">{icon}</div>

      {/* 텍스트 */}
      <span className="flex-1 font-body-2-r text-black text-center">{text}</span>
    </button>
  );
};

export default SignupButton;
