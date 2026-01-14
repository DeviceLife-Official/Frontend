export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string | null;
  colors: string[];
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
