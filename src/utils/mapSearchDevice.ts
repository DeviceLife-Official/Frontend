import type { SearchDevice } from '@/types/devices';
import type { Product } from '@/types/product';

// SearchDevice를 Product 형식으로 변환
export const mapSearchDeviceToProduct = (device: SearchDevice): Product => {
  const brandName = device.brandName ?? '';
  const deviceName = device.name ?? '';

  // device.name이 이미 brandName으로 시작하면 중복 방지
  const fullName = deviceName.startsWith(brandName)
    ? deviceName
    : `${brandName} ${deviceName}`.trim();

  return {
    id: device.deviceId,
    name: fullName,
    category: device.deviceType ?? '',
    price: device.price ?? 0,
    image: device.imageUrl ?? null,
    colors: [] as string[],
  };
};
