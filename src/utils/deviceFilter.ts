import { DEVICE_CATEGORIES, CATEGORY_TO_DEVICE_TYPE } from '@/constants/devices';
import type { Device, SearchDevicesParams } from '@/types/device/device';
import type { Product } from '@/constants/mockData';

// UI sortOption → API sortType 변환
const SORT_TYPE_MAP: Record<string, SearchDevicesParams['sortType']> = {
  'latest': 'LATEST',
  'alphabetical': 'NAME_ASC',
  'price-low': 'PRICE_ASC',
  'price-high': 'PRICE_DESC',
};

export const convertSortOption = (uiValue: string): SearchDevicesParams['sortType'] => {
  return SORT_TYPE_MAP[uiValue] || 'LATEST';
};

// 가격 옵션 → 최소/최대 가격 변환
const PRICE_RANGE_MAP: Record<string, { min: number; max?: number }> = {
  'under-100': { min: 0, max: 1000000 },
  '100-150': { min: 1000000, max: 1500000 },
  '150-200': { min: 1500000, max: 2000000 },
  'over-200': { min: 2000000 },
};

export const convertPriceOptions = (selectedPrices: string[]): { minPrice?: number; maxPrice?: number } => {
  if (selectedPrices.length === 0) return {};

  const ranges = selectedPrices.map(p => PRICE_RANGE_MAP[p]).filter(Boolean);
  const minPrice = Math.min(...ranges.map(r => r.min));
  const maxPrices = ranges.map(r => r.max).filter((m): m is number => m !== undefined);
  const maxPrice = maxPrices.length > 0 ? Math.max(...maxPrices) : undefined;

  return { minPrice, maxPrice };
};

// Device 타입을 카테고리 이름으로 변환
const getDeviceCategoryName = (deviceType: string): string => {
  const category = DEVICE_CATEGORIES.find(
    c => CATEGORY_TO_DEVICE_TYPE[c.id] === deviceType
  );
  return category?.name || deviceType;
};

export const convertDeviceToProduct = (device: Device): Product => ({
  id: device.deviceId,
  name: device.name,
  category: getDeviceCategoryName(device.deviceType),
  price: device.price,
  image: device.imageUrl,
  colors: [], // API에서 제공하지 않으므로 빈 배열
});
