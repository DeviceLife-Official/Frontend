type PrimaryInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'email';
  disabled?: boolean;
  className?: string;
};

const PrimaryInput = ({
  placeholder = '',
  value,
  onChange,
  type = 'text',
  disabled = false,
  className = '',
}: PrimaryInputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`
        w-full
        px-16 py-24
        bg-white
        border border-black
        rounded-button
        font-body-2-r
        text-gray-500
        placeholder:text-gray-300
        outline-none
        focus:border-blue-500
        ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        ${className}
      `}
    />
  );
};

export default PrimaryInput;
