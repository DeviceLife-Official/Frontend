import { type ReactNode } from 'react';

type SignupButtonProps = {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;

  /** Figma spacing: 124 / 146 */
  textStart?: number;
};

const SignupButton = ({
  text,
  icon,
  onClick,
  disabled = false,
  className = '',
  textStart = 146,
}: SignupButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-400 h-52
        bg-white border border-black rounded-button
        outline-none transition-all duration-200
        ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100 hover:border-gray-700'}
        ${className}
      `}
    >
      {/* 아이콘: 항상 고정 */}
      <div className="absolute left-24 top-1/2 -translate-y-1/2 size-36 flex items-center justify-center">
        {icon}
      </div>

      {/* 텍스트: left spacing만 다르게 */}
      <span
        className="absolute top-1/2 -translate-y-1/2 font-body-2-r text-black"
        style={{ left: `${textStart}px` }}
      >
        {text}
      </span>
    </button>
  );
};

export default SignupButton;
