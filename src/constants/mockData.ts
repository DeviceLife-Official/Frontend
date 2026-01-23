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
    createdAt: '2025.11.01',
    tags: [
      { name: '연동성', status: '최적' },
      { name: '편의성', status: '최적' },
      { name: '라이프스타일', status: '최적' },
    ],
  },
  {
    id: 2,
    label: '조합 2',
    name: 'M3 MacBook Air 중심 조합',
    isMain: false,
    createdAt: '2025.10.25',
    tags: [
      { name: '연동성', status: '최적' },
      { name: '편의성', status: '최적' },
      { name: '라이프스타일', status: '최적' },
    ],
  },
  {
    id: 3,
    label: '조합 3',
    name: '사무실 세팅',
    isMain: false,
    createdAt: '2025.10.15',
    tags: [
      { name: '연동성', status: '최적' },
      { name: '편의성', status: '최적' },
      { name: '라이프스타일', status: '최적' },
    ],
  },
];

// 조합별 기기 목록 (추후 API 연동)
export const MOCK_COMBINATION_DEVICES: Record<number, DeviceSummary[]> = {
  // 조합1: 상품 id와 겹치지 않는 id 사용 → 담기 버튼 테스트용
  1: [
    { id: 101, name: 'iPhone 15 pro', chargingType: 'USB-C', color: '내추럴 티타늄', image: null },
    { id: 102, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 103, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 104, name: 'iPhone 15 pro', chargingType: 'USB-C', color: '내추럴 티타늄', image: null },
    { id: 105, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 106, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 107, name: 'iPhone 15 pro', chargingType: 'USB-C', color: '내추럴 티타늄', image: null },
    { id: 108, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 109, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 110, name: 'iPhone 15 pro', chargingType: 'USB-C', color: '내추럴 티타늄', image: null },
  ],
  // 조합2: 상품 id 1~6과 동일 → "이미 담은 상품입니다." 테스트용
  2: [
    { id: 1, name: 'iPhone 15 pro', chargingType: 'USB-C', color: '내추럴 티타늄', image: null },
    { id: 2, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 3, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 4, name: 'iPhone 15 pro', chargingType: 'USB-C', color: '내추럴 티타늄', image: null },
    { id: 5, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 6, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 7, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 8, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
  ],
  3: [
    { id: 201, name: 'iPhone 15 pro', chargingType: 'USB-C', color: '내추럴 티타늄', image: null },
    { id: 202, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 203, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 204, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 205, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 206, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 207, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
    { id: 208, name: 'AirPods Pro 2세대', chargingType: 'USB-C', color: '화이트', image: null },
  ],
};
