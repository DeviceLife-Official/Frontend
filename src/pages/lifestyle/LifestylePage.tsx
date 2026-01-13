import { useState } from 'react';
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
  return (
    <div className="w-full flex justify-center mt-50">
      <div className="flex flex-col gap-88">
        <p className="font-body-1-sm text-blue-600 text-center">
          라이프스타일에 따른 최적의 기기 조합을 살펴보세요!
        </p>
        <div className="w-1140 flex items-stretch">
          <div className="flex flex-col gap-12">
            {TAGS.map((label) => (
              <LifestyleTag
                key={label}
                label={label}
                selected={selectedLabel === label}
                onClick={() => setSelectedLabel(label)}
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
    </div>
  );
};
export default LifestylePage;
