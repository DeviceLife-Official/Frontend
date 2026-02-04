import Office from '@/assets/images/lifestyle/office.jpg';
import Developer from '@/assets/images/lifestyle/developer.jpg';
import Game from '@/assets/images/lifestyle/game.jpg';
import Study from '@/assets/images/lifestyle/study.jpg';
import VideoEditing from '@/assets/images/lifestyle/video-editing.jpg';
import Tour from '@/assets/images/lifestyle/tour.jpg';
import type { LifestyleTagKey } from '@/types/lifestyle/lifestyle';

export const LIFESTYLE_TAGS = [
  'Office',
  'Developer',
  'Game',
  'Study',
  'Video-editing',
  'Tour/portability',
] as const;

export type LifestyleLabel = (typeof LIFESTYLE_TAGS)[number];

export const LIFESTYLE_TAG_IMAGE_MAP: Record<LifestyleLabel, string> = {
  Office,
  Developer,
  Game,
  Study,
  'Video-editing': VideoEditing,
  'Tour/portability': Tour,
};

export const LIFESTYLE_LABEL_TO_TAGKEY: Record<LifestyleLabel, LifestyleTagKey> = {
  Office: 'Office',
  Developer: 'Developer',
  Game: 'Game',
  Study: 'Study',
  'Video-editing': 'Video-editing',
  'Tour/portability': 'Tour',
};
