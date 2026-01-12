import { useState } from 'react';
import LifestyleTag from '@/components/Lifestyle/LifestyleTag';

const TAGS = [
  'Office/portability',
  'Developer',
  'Game',
  'Study',
  'Video-editing',
  'Tour/portability',
] as const;

const LifestylePage = () => {
  const [selectedLabel, setSelectedLabel] = useState<string>(TAGS[0]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col gap-20 w-fit">
        {TAGS.map((label) => (
          <LifestyleTag
            key={label}
            label={label}
            selected={selectedLabel === label}
            onClick={() => setSelectedLabel(label)}
          />
        ))}
      </div>
    </div>
  );
};

export default LifestylePage;
