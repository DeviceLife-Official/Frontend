import { useEffect, useState } from 'react';
import { ROTATION_MS } from '@/constants/time';
import LifestyleTag from '@/components/Lifestyle/LifestyleTag';
import Office from '@/assets/images/lifestyle/office.jpg';
import Developer from '@/assets/images/lifestyle/developer.jpg';
import Game from '@/assets/images/lifestyle/game.jpg';
import Study from '@/assets/images/lifestyle/study.jpg';
import VideoEditing from '@/assets/images/lifestyle/video-editing.jpg';
import Tour from '@/assets/images/lifestyle/tour.jpg';
import DeviceSummaryCard from '@/components/Lifestyle/DeviceSummaryCard';

const TAGS = [
  'Office/portability',
  'Developer',
  'Game',
  'Study',
  'Video-editing',
  'Tour/portability',
] as const;

type Tag = (typeof TAGS)[number];

const TAG_IMAGE_MAP: Record<Tag, string> = {
  'Office/portability': Office,
  Developer,
  Game,
  Study,
  'Video-editing': VideoEditing,
  'Tour/portability': Tour,
};

const LifestylePage = () => {
  const [selectedLabel, setSelectedLabel] = useState<Tag>(TAGS[0]);
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  useEffect(() => {
    if (!isAutoRotate) return;

    const id = window.setInterval(() => {
      setSelectedLabel((prev) => {
        const idx = TAGS.indexOf(prev);
        return TAGS[(idx + 1) % TAGS.length];
      });
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [isAutoRotate]);

  const handleClickTag = (label: Tag) => {
    setIsAutoRotate(false);
    setSelectedLabel(label);
  };

  return (
    <div className="w-full flex justify-center mt-100">
      <div className="w-1140 flex items-stretch">
        <div className="flex flex-col gap-12">
          {TAGS.map((label) => (
            <LifestyleTag
              key={label}
              label={label}
              selected={selectedLabel === label}
              onClick={() => handleClickTag(label)}
            />
          ))}
        </div>
        <div className="ml-auto w-660 h-408 relative">
          <div className="flex absolute bottom-24 left-1/2 -translate-x-1/2 gap-20">
            <DeviceSummaryCard />
            <DeviceSummaryCard />
            <DeviceSummaryCard />
          </div>
          <img
            src={TAG_IMAGE_MAP[selectedLabel]}
            alt={selectedLabel}
            className="block w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LifestylePage;
