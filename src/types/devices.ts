import { type CombinationName, type CombinationStatus } from '@/constants/combination';
import type { CommonResponse } from '@/types/common';

export type AuthStatus = 'logout' | 'login';
export type ModalView = 'device' | 'combination' | 'combinationDetail';

export interface Brand {
  brandId: number;
  brandName: string;
}

export interface GetBrandsResponse {
  code: string;
  message: string;
  result: Brand[];
}

export type CombinationTagType = {
  name: CombinationName;
  status: CombinationStatus;
};

export type UserCombination = {
  id: number;
  label: string;
  name: string;
  isMain: boolean;
  createdAt?: string;
  tags: CombinationTagType[];
};

// 기기 검색 API 파라미터
export interface SearchDevicesParams {
  keyword?: string;
  cursor?: string;
  size?: number;
  sortType?: 'LATEST' | 'NAME_ASC' | 'PRICE_ASC' | 'PRICE_DESC';
  deviceTypes?: string[];
  minPrice?: number;
  maxPrice?: number;
  brandIds?: number[];
}

// 검색 결과 기기
export interface SearchDevice {
  deviceId: number;
  deviceType: string;
  brandName: string;
  name: string;
  price: number;
  priceCurrency: string;
  imageUrl: string;
  releaseDate: string;
  specifications: Record<string, unknown>;
}

// 검색 결과
export interface DeviceSearchResult {
  devices: SearchDevice[];
  nextCursor: string | null;
  hasNext: boolean;
}

// API 응답
export type GetDevicesSearchResponse = CommonResponse<DeviceSearchResult>;
