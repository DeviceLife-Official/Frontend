import { useCallback, useMemo, useState ,useRef } from 'react';
import { ROTATION_MS, TRANSITION_MS, USER_INTERACTION_PAUSE_MS } from '@/constants/time';
import LifestyleTag from '@/components/Lifestyle/LifestyleTag';
import Office from '@/assets/images/lifestyle/office.jpg';
import Developer from '@/assets/images/lifestyle/developer.jpg';
import Game from '@/assets/images/lifestyle/game.jpg';
import Study from '@/assets/images/lifestyle/study.jpg';
import VideoEditing from '@/assets/images/lifestyle/video-editing.jpg';
import Tour from '@/assets/images/lifestyle/tour.jpg';
import DeviceSummaryCard from '@/components/Lifestyle/DeviceSummaryCard';
import { useAutoRotate } from '@/hooks/useAutoRotate';
import { useCrossfadeImage } from '@/hooks/useCrossfadeImage';
import { nextInArray } from '@/utils/nextInArray';

const TAGS = [
  'Office',
  'Developer',
  'Game',
  'Study',
  'Video-editing',
  'Tour/portability',
] as const;

type Tag = (typeof TAGS)[number];

const TAG_IMAGE_MAP: Record<Tag, string> = {
  Office,
  Developer,
  Game,
  Study,
  'Video-editing': VideoEditing,
  'Tour/portability': Tour,
};

const LifestylePage = () => {
  const [selectedLabel, setSelectedLabel] = useState<Tag>(TAGS[0]);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const targetSrc = useMemo(() => TAG_IMAGE_MAP[selectedLabel], [selectedLabel]);
  const { currentSrc, nextSrc, isNextVisible } = useCrossfadeImage(targetSrc, {
    transitionMs: TRANSITION_MS,
  });
  const getNextTag = useCallback((prev: Tag) => nextInArray(TAGS, prev), []);
  const resumeTimerRef = useRef<number | null>(null);
  const resumeAtRef = useRef<number | null>(null);

  useAutoRotate<Tag>({
    enabled: isAutoRotate && !isPaused,
    intervalMs: ROTATION_MS,
    setValue: setSelectedLabel,
    getNext: getNextTag,
  });

const handleClickTag = (label: Tag) => {
  const now = Date.now();
  setSelectedLabel(label);
  setIsAutoRotate(false);
  resumeAtRef.current = now + USER_INTERACTION_PAUSE_MS;
  if (resumeTimerRef.current) {
    clearTimeout(resumeTimerRef.current);
  }
  const delay = USER_INTERACTION_PAUSE_MS;
  resumeTimerRef.current = window.setTimeout(() => {
    if (Date.now() >= (resumeAtRef.current ?? 0)) {
      setIsAutoRotate(true);
    }
  }, delay);
};


  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="w-full flex justify-center">
        <div className="w-1100 flex items-stretch">
          <div className="flex flex-col gap-16 min-[1441px]:gap-20">
            {TAGS.map((label) => (
              <LifestyleTag
                key={label}
                label={label}
                selected={selectedLabel === label}
                onClick={() => handleClickTag(label)}
              />
            ))}
          </div>
          <div
            className="ml-auto w-660 relative h-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex absolute bottom-24 left-1/2 -translate-x-1/2 gap-20 z-10">
              <DeviceSummaryCard />
              <DeviceSummaryCard />
              <DeviceSummaryCard />
            </div>
            <img
              src={currentSrc}
              alt={selectedLabel}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            {nextSrc && (
              <img
                src={nextSrc}
                alt={selectedLabel}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: isNextVisible ? 1 : 0,
                  transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
                }}
                draggable={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifestylePage;
