import type { CommonResponse } from '@/types/common';

// 조합 내 기기 타입 (API 응답 구조)
export type ComboDevice = {
  deviceId: number;
  name: string;
  modelCode: string;
  brandName: string;
  deviceType: string;
  price: number;
  priceCurrency: string;
  imageUrl: string;
  addedAt: string;
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
  devices: ComboDevice[];
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

// 조합에 기기 추가 요청/응답 타입
export type PostComboDeviceRequest = {
  deviceId: number;
};

export type PostComboDeviceResult = ComboDetail;
export type PostComboDeviceResponse = CommonResponse<PostComboDeviceResult>;

// 조합 삭제 응답 타입
export type DeleteComboResult = null;
export type DeleteComboResponse = CommonResponse<DeleteComboResult>;

// 조합 Pin 응답 타입
export type PostComboPinResult = null;
export type PostComboPinResponse = CommonResponse<PostComboPinResult>;

// 조합에서 기기 삭제 응답 타입
export type DeleteComboDeviceResult = null;
export type DeleteComboDeviceResponse = CommonResponse<DeleteComboDeviceResult>;
