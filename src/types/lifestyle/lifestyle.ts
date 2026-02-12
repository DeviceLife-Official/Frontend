import { type CommonResponse } from '@/types/common';

export type LifestyleTagKey = 'Office' | 'Developer' | 'Game' | 'Study' | 'Video-editing' | 'Tour';
export type LifestyleTagType = 'LIFESTYLE';

export type LifestyleDevice = {
  slot: number;
  deviceId: number;
  imageUrl: string; 
  displayName: string;
  releaseDate: string;
  price: number;
  currency: 'KRW';
};

export type LifestyleDeviceResult = {
  tagKey: LifestyleTagKey;
  tagLabel: string;
  tagType: LifestyleTagType;
  devices: LifestyleDevice[];
};

export type LifestyleDeviceResponse = CommonResponse<LifestyleDeviceResult>;
export type LifestyleDeviceErrorResponse = CommonResponse<null>;

