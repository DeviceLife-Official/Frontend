import type { CommonResponse } from '@/types/common';

// 최근 본 기기 데이터 타입 (UI 표시용)
export interface RecentlyViewedDevice {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string | null;
  viewedAt: number;
}

// 최근 본 기기 목록 조회 응답 타입 (API 응답)
// API 문서상 string[]이지만, 실제로는 기기 정보 객체 배열일 수 있음
export type RecentlyViewedDevicesResponse = CommonResponse<RecentlyViewedDevice[]>;
