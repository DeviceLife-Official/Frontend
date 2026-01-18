type RoundedLifestyleTagProps =
  | { label: string }
  | {
      label: string;
      selected: boolean;
      onToggle: (label: string, nextSelected: boolean) => void;
    };

const RoundedLifestyleTag = (props: RoundedLifestyleTagProps) => {
  const isInteractive = 'onToggle' in props;

  const handleClick = () => {
    if (!isInteractive) return;
    props.onToggle(props.label, !props.selected);
  };

  const opacityClass = isInteractive
    ? props.selected
      ? 'opacity-100'
      : 'opacity-50'
    : 'opacity-100';
  const cursorClass = isInteractive ? 'cursor-pointer' : 'cursor-default';

  return (
    <div
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center gap-8
        px-12 py-8 rounded-tag
        bg-gray-100
        font-body-3-sm text-blue-600
        transition-opacity
        ${opacityClass}
        ${cursorClass}
      `}
    >
      # {props.label}
    </div>
  );
};

export default RoundedLifestyleTag;
