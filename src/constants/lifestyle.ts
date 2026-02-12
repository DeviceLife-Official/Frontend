import Office from '@/assets/images/lifestyle/office.jpg';
import Developer from '@/assets/images/lifestyle/developer.jpg';
import Game from '@/assets/images/lifestyle/game.jpg';
import Study from '@/assets/images/lifestyle/study.jpg';
import VideoEditing from '@/assets/images/lifestyle/video-editing.jpg';
import Tour from '@/assets/images/lifestyle/tour.jpg';
import type { LifestyleTagKey } from '@/types/lifestyle/lifestyle';

export const LIFESTYLE_CONFIG = {
  Office: {
    image: Office,
    tagKey: 'Office',
  },
  Developer: {
    image: Developer,
    tagKey: 'Developer',
  },
  Game: {
    image: Game,
    tagKey: 'Game',
  },
  Study: {
    image: Study,
    tagKey: 'Study',
  },
  'Video-editing': {
    image: VideoEditing,
    tagKey: 'Video-editing',
  },
  'Tour/portability': {
    image: Tour,
    tagKey: 'Tour',
  },
} as const satisfies Record<
  string,
  {
    image: string;
    tagKey: LifestyleTagKey;
  }
>;

export type LifestyleLabel = keyof typeof LIFESTYLE_CONFIG;

export const LIFESTYLE_TAGS = Object.keys(LIFESTYLE_CONFIG) as LifestyleLabel[];

// label -> image
export const LIFESTYLE_TAG_IMAGE_MAP = Object.fromEntries(
  Object.entries(LIFESTYLE_CONFIG).map(([label, { image }]) => [label, image])
) as Record<LifestyleLabel, string>;

// label -> tagkey
export const LIFESTYLE_LABEL_TO_TAGKEY = Object.fromEntries(
  Object.entries(LIFESTYLE_CONFIG).map(([label, { tagKey }]) => [label, tagKey])
) as Record<LifestyleLabel, LifestyleTagKey>;

// label -> tag
export type LifestyleDisplayTag = `# ${LifestyleLabel}`;
export const LIFESTYLE_DISPLAY_TAGS = LIFESTYLE_TAGS.map(
  (t) => `# ${t}` as const
) as LifestyleDisplayTag[];