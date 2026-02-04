import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ROTATION_MS, TRANSITION_MS, USER_INTERACTION_PAUSE_MS } from '@/constants/time';
import LifestyleTag from '@/components/Lifestyle/LifestyleTag';
import DeviceSummaryCard from '@/components/Lifestyle/DeviceSummaryCard';
import { useAutoRotate } from '@/hooks/useAutoRotate';
import { useCrossfadeImage } from '@/hooks/useCrossfadeImage';
import { nextInArray } from '@/utils/nextInArray';
import { useGetLifestyleDevice } from '@/apis/lifestyle/getLifestyleDevice';
import type { LifestyleTagKey } from '@/types/lifestyle/lifestyle';
import {
  LIFESTYLE_TAGS,
  type LifestyleLabel,
  LIFESTYLE_TAG_IMAGE_MAP,
  LIFESTYLE_LABEL_TO_TAGKEY,
} from '@/constants/lifestyle';

const LifestylePage = () => {
  const [selectedLabel, setSelectedLabel] = useState<LifestyleLabel>(LIFESTYLE_TAGS[0]);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const selectedTagKey = useMemo<LifestyleTagKey>(
    () => LIFESTYLE_LABEL_TO_TAGKEY[selectedLabel],
    [selectedLabel]
  );
  const { data } = useGetLifestyleDevice(selectedTagKey);
  const isSuccess = data?.success === true;
  const lifestyleResult = isSuccess ? data?.result : null;

  const devices = useMemo(() => {
    const list = lifestyleResult?.devices ?? [];
    return [...list].sort((a, b) => a.slot - b.slot);
  }, [lifestyleResult]);

  const targetSrc = useMemo(() => LIFESTYLE_TAG_IMAGE_MAP[selectedLabel], [selectedLabel]);
  const { currentSrc, nextSrc, isNextVisible } = useCrossfadeImage(targetSrc, {
    transitionMs: TRANSITION_MS,
  });

  const getNextTag = useCallback((prev: LifestyleLabel) => nextInArray(LIFESTYLE_TAGS, prev), []);

  const resumeTimerRef = useRef<number | null>(null);
  const resumeAtRef = useRef<number | null>(null);

  useAutoRotate<LifestyleLabel>({
    enabled: isAutoRotate && !isPaused,
    intervalMs: ROTATION_MS,
    setValue: setSelectedLabel,
    getNext: getNextTag,
  });

  const handleClickTag = (label: LifestyleLabel) => {
    const now = Date.now();
    setSelectedLabel(label);
    setIsAutoRotate(false);
    resumeAtRef.current = now + USER_INTERACTION_PAUSE_MS;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      if (Date.now() >= (resumeAtRef.current ?? 0)) setIsAutoRotate(true);
    }, USER_INTERACTION_PAUSE_MS);
  };

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="w-full flex justify-center">
        <div className="w-1100 flex items-stretch">
          <div className="flex flex-col gap-16 min-[1441px]:gap-20">
            {LIFESTYLE_TAGS.map((label) => (
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
              <DeviceSummaryCard device={devices[0]} />
              <DeviceSummaryCard device={devices[1]} />
              <DeviceSummaryCard device={devices[2]} />
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
