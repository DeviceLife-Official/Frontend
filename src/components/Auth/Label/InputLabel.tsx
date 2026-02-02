import clsx from 'clsx';

type InputLabelProps = {
  text: string;
  required?: boolean;
  className?: string;
};

const InputLabel = ({ text, required = true, className }: InputLabelProps) => {
  return (
    <label
      className={clsx(
        'relative flex items-center justify-end',
        'h-72 w-144 px-8 py-20',
        'font-body-1-sm text-black whitespace-nowrap',
        className
      )}
    >
      {text}
      {required && (
        <span className="absolute right-[-1px] top-2 font-body-1-sm text-warning">*</span>
      )}
    </label>
  );
};

export default InputLabel;
