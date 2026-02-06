import { useCallback } from 'react';
import RoundedLifestyleTag from '@/components/Lifestyle/RoundedLifestyleTag';
import { LIFESTYLE_DISPLAY_TAGS, type LifestyleDisplayTag } from '@/constants/lifestyle';
type LifestyleSelectSectionProps = {
  value: LifestyleDisplayTag[];
  onChange: (next: LifestyleDisplayTag[]) => void;
};

const LifestyleSelectSection = ({ value, onChange }: LifestyleSelectSectionProps) => {
  const handleToggle = useCallback(
    (label: string, nextSelected: boolean) => {
      const tag = label as LifestyleDisplayTag;
      if (nextSelected) {
        onChange([tag]);
        return;
      }
      onChange([]);
    },
    [onChange]
  );

  return (
    <div className="flex flex-col items-start gap-10 pt-16 px-30 pb-20 self-stretch rounded-card bg-white border-shadow-black">
      <div className="flex flex-col gap-16 self-stretch">
        <p className="font-body-3-sm text-black">라이프스타일</p>
        <div className="flex flex-wrap items-center content-center gap-12 self-stretch">
          {LIFESTYLE_DISPLAY_TAGS.map((label) => (
            <RoundedLifestyleTag
              key={label}
              label={label}
              selected={value.includes(label)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LifestyleSelectSection;
