import type { CommonResponse } from '@/types/common';

// 브랜드 아이템
export type Brand = {
  brandId: number;
  brandName: string;
};

// 브랜드 목록 조회 응답
export type GetBrandsResult = Brand[];
export type GetBrandsResponse = CommonResponse<GetBrandsResult>;

// DeviceType enum
export type DeviceType =
  | 'SMARTPHONE'
  | 'LAPTOP'
  | 'TABLET'
  | 'SMARTWATCH'
  | 'AUDIO'
  | 'KEYBOARD'
  | 'MOUSE'
  | 'CHARGER';
