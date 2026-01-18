import ChevronRight from '@/assets/icons/chevron_right.svg?react';

interface SettingRowProps {
  title: string;
  onClick?: () => void;
}

const SettingRow = ({ title, onClick }: SettingRowProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        w-full
        h-90
        items-center
        justify-between
        px-60
        pl-28
        rounded-card
        bg-white
        hover:bg-gray-100
        border-shadow-deep-black
        cursor-pointer
      "
    >
      <span className="font-body-1-sm text-black">{title}</span>
      <ChevronRight className="w-20 h-36" />
    </button>
  );
};

export default SettingRow;
