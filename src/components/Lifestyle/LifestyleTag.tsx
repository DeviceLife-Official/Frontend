type LifestyleTagProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

const LifestyleTag = ({ label, selected = false, onClick }: LifestyleTagProps) => {
  const hasSlash = label.includes('/');
  let content: React.ReactNode = label;

  if (hasSlash) {
    const [left, right] = label.split('/');
    content = (
      <span className="inline-flex items-center">
        <span>{left}</span>
        <span className="mx-2" style={{ letterSpacing: '0.1em' }}>
          /
        </span>
        <span>{right}</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
      inline-flex items-center self-start justify-center
      px-20 py-12 rounded-card bg-white cursor-pointer
      transition-all duration-150 origin-left
      ${
        selected
          ? 'border-shadow-blue font-heading-2 text-blue-700'
          : 'border-shadow-black font-heading-3 text-black hover:text-blue-500'
      }
    `}
    >
      {'#\u00A0'}
      {content}
    </button>
  );
};

export default LifestyleTag;
