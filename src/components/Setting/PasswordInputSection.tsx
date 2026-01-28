import { useState } from 'react';
import Eye from '@/assets/icons/eye.svg?react';
import ClosedEye from '@/assets/icons/closedeye.svg?react';

type PasswordInputSectionProps = {
  label: string;
  value: string;
  onChange: (next: string) => void;
  errorMessage?: string;
};

const PasswordInputSection = ({
  label,
  value,
  onChange,
  errorMessage,
}: PasswordInputSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (next: string) => {
    onChange(next.slice(0, 20));
  };

  return (
    <div
      className="
        flex flex-col items-start
        gap-10
        pt-20 px-30 pb-30
        self-stretch
        rounded-card
        bg-white
        border-shadow-black
      "
    >
      <div className="flex flex-col gap-10 w-full">
        <p className="font-body-3-sm text-black">{label}</p>
        <div
          className={`
            group relative
            flex items-center
            w-500 h-52
            px-16
            rounded-button
            border-2
            transition-colors
            cursor-text
            ${errorMessage ? 'border-warning bg-white' : 'border-transparent bg-gray-100'}
            ${!errorMessage ? 'focus-within:border-blue-600 focus-within:bg-white' : ''}
            focus-within:[&_button]:opacity-100
          `}
        >
          <input
            type="text"
            value={value}
            maxLength={20}
            onChange={(e) => handleChange(e.target.value)}
            className={`
              w-full h-full
              bg-transparent
              outline-none
              pr-40
              font-body-1-r
              ${
                isVisible
                  ? 'text-black caret-black'
                  : `
                    text-transparent caret-transparent select-none
                    selection:bg-transparent selection:text-transparent
                  `
              }
            `}
          />
          {!isVisible && value.length > 0 && (
            <span
              className="
                pointer-events-none select-none
                absolute left-16
                w-[calc(100%-40px)]
                overflow-hidden whitespace-nowrap text-ellipsis
                font-body-1-r text-black
              "
            >
              {'*'.repeat(value.length)}
            </span>
          )}
          <button
            type="button"
            onClick={() => setIsVisible((prev) => !prev)}
            className="
              absolute right-16
              flex items-center justify-center
              size-24
              opacity-0
              transition-opacity
              cursor-pointer
            "
            aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {isVisible ? <Eye /> : <ClosedEye />}
          </button>
        </div>
        {errorMessage && <p className="font-body-3-sm text-warning">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default PasswordInputSection;
