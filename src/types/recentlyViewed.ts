// 최근 본 기기 데이터 타입
export interface RecentlyViewedDevice {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string | null;
  viewedAt: number;
}
