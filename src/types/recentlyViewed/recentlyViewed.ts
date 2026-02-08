import type { CommonResponse } from '@/types/common';

// 최근 본 기기 데이터 타입 (API 응답 형식)
export interface RecentlyViewedDevice {
  deviceId: number;
  name: string;
  modelCode: string;
  brandName: string;
  deviceType: string;
  price: number;
  priceCurrency: string;
  priceKrw: number;
  imageUrl: string;
  viewedAt: string; // ISO date string
}

// 최근 본 기기 목록 조회 응답 타입 (API 응답)
export type RecentlyViewedDevicesResponse = CommonResponse<RecentlyViewedDevice[]>;
