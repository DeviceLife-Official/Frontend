import { type UserCombination } from '@/types/devices';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string | null;
  colors: string[];
}

export interface DeviceSummary {
  id: number;
  name: string;
  chargingType: string;
  color: string;
  image: string | null;
}

// 디자인 토큰 색상 사용 (중앙 관리)
export const PRODUCT_COLOR_CHIPS = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  BLUE: '#0069F0',
} as const;

// 임시 데이터 (나중에 API로 대체)
export const MOCK_PRODUCTS: Product[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: 'iPhone 15 pro',
  category: '스마트폰',
  price: 1550000,
  image: null,
  colors: [
    PRODUCT_COLOR_CHIPS.BLACK,
    PRODUCT_COLOR_CHIPS.WHITE,
    PRODUCT_COLOR_CHIPS.BLUE,
  ],
}));

// 사용자 조합 목록 (추후 API 연동)
export const MOCK_COMBINATIONS: UserCombination[] = [
  {
    id: 1,
    label: '조합 1',
    name: 'iPhone 15 Pro 중심 조합',
    isMain: true,
    tags: [
      { name: '연동성', status: '최적' },
      { name: '편의성', status: '최적' },
      { name: '라이프스타일', status: '최적' },
      { name: '컬러 매칭', status: '최적' },
    ],
  },
  {
    id: 2,
    label: '조합 2',
    name: '사무실 세팅',
    isMain: false,
    tags: [
      { name: '연동성', status: '최적' },
      { name: '편의성', status: '최적' },
      { name: '라이프스타일', status: '최적' },
      { name: '컬러 매칭', status: '최적' },
    ],
  },
];

// 조합별 기기 목록 (추후 API 연동)
export const MOCK_COMBINATION_DEVICES: Record<number, DeviceSummary[]> = {
  1: [
    { id: 1, name: 'iPhone 15 pro', chargingType: 'USB-C', color: '내추럴 티타늄', image: null },
    { id: 2, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 3, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 4, name: 'iPhone 15 pro', chargingType: 'USB-C', color: '내추럴 티타늄', image: null },
    { id: 5, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 6, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 7, name: 'iPhone 15 pro', chargingType: 'USB-C', color: '내추럴 티타늄', image: null },
    { id: 8, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 9, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 10, name: 'iPhone 15 pro', chargingType: 'USB-C', color: '내추럴 티타늄', image: null },
  ],
  2: [
    { id: 1, name: 'iPhone 15 pro', chargingType: 'USB-C', color: '내추럴 티타늄', image: null },
    { id: 2, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 3, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 4, name: 'iPhone 15 pro', chargingType: 'USB-C', color: '내추럴 티타늄', image: null },
    { id: 5, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 6, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
  ],
};
