import XGray from '@/assets/icons/x_gray.svg?react';

type NicknameInputSectionProps = {
  value: string;
  onChange: (next: string) => void;
  defaultValue?: string; // 선택: placeholder용
};

const NicknameInputSection = ({ value, onChange }: NicknameInputSectionProps) => {
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
      <div className="flex flex-col gap-10">
        <p className="font-body-3-sm text-black">닉네임</p>

        <div
          className="
            group
            relative
            flex items-center
            w-500 h-64
            px-16
            rounded-button
            bg-gray-100
            border-2 border-transparent
            focus-within:border-blue-600
            focus-within:bg-white
            transition-colors cursor-text
          "
        >
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="
              w-full h-full
              bg-transparent
              outline-none
              pr-40
              text-black
              font-body-1-r
            "
          />

          <button
            type="button"
            onClick={() => onChange('')}
            className="
              absolute
              right-16
              flex items-center justify-center
              size-24
              opacity-0
              group-focus-within:opacity-100
              transition-opacity cursor-pointer
            "
            aria-label="닉네임 지우기"
          >
            <XGray />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NicknameInputSection;