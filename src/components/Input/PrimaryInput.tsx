import { forwardRef, type InputHTMLAttributes } from 'react';

type PrimaryInputProps = InputHTMLAttributes<HTMLInputElement>;

const PrimaryInput = forwardRef<HTMLInputElement, PrimaryInputProps>(
  // 기본값 설정
  ({ type = 'text', disabled = false, className = '', ...rest }, ref) => {
    // 입력창 요소 생성
    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        className={`
          w-400 h-52 px-16 bg-white border border-black rounded-button
          font-body-2-r text-gray-500 placeholder:text-gray-300
          outline-none focus:border-blue-500
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          ${className}
        `}
        {...rest}
      />
    );
  }
);

PrimaryInput.displayName = 'PrimaryInput';

export default PrimaryInput;
