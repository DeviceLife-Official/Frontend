import clsx from 'clsx';

type PrimaryButtonProps = React.ComponentProps<'button'> & {
  text: string;
};

const PrimaryButton = ({ text, disabled = false, className, ...props }: PrimaryButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'flex items-center justify-center',
        'h-52 rounded-button',
        'font-body-2-sm text-white',
        disabled ? 'bg-gray-300 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      {...props}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
