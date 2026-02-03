import type { CommonResponse } from '@/types/common';

// 기기 아이템
export type Device = {
  deviceId: number;
  deviceType: string;
  brandName: string;
  name: string;
  price: number;
  priceCurrency: string;
  imageUrl: string;
  releaseDate: string;
  specifications: Record<string, string>;
};

// 검색 파라미터
export type SearchDevicesParams = {
  keyword?: string;
  cursor?: string;
  size?: number;
  sortType?: 'LATEST' | 'NAME_ASC' | 'PRICE_ASC' | 'PRICE_DESC';
  deviceTypes?: string[];
  minPrice?: number;
  maxPrice?: number;
  brandIds?: number[];
};

// 검색 결과
export type SearchDevicesResult = {
  devices: Device[];
  nextCursor: string | null;
  hasNext: boolean;
};

export type SearchDevicesResponse = CommonResponse<SearchDevicesResult>;
