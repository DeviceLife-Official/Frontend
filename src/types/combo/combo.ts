import type { CommonResponse } from '@/types/common';

// 기기 타입 (기본 구조 - 추후 수정 가능)
export type ComboDevice = {
  deviceId: number;
  deviceName: string;
  chargingType?: string;
  color?: string;
  price?: number;
  imageUrl?: string;
};

// 조합 목록 아이템
export type ComboListItem = {
  comboId: number;
  comboName: string;
  isPinned: boolean;
  pinnedAt: string | null;
  totalPrice: number;
  currentTotalScore: number;
  deviceCount: number;
  createdAt: string;
  updatedAt: string;
};

// 조합 상세 정보
export type ComboDetail = {
  comboId: number;
  comboName: string;
  isPinned: boolean;
  pinnedAt: string | null;
  totalPrice: number;
  currentTotalScore: number;
  evaluatedAt: string | null;
  createdAt: string;
  updatedAt: string;
  devices: ComboDevice[];
};

// 응답 타입
export type GetCombosResult = ComboListItem[];
export type GetCombosResponse = CommonResponse<GetCombosResult>;

export type GetComboResult = ComboDetail;
export type GetComboResponse = CommonResponse<GetComboResult>;

// 조합 수정 요청/응답 타입
export type PutComboRequest = {
  comboName: string;
};

export type PutComboResult = null;
export type PutComboResponse = CommonResponse<PutComboResult>;
