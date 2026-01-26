// 태그 type별 상수

export const TAG_GROUP_BY_KEY = {
  // 중요하게 생각하는 것은?
  interest: new Set([
    'Performance',
    'Value',
    'Portability',
    'BatteryLife',
    'DesignColor',
  ]),

  // 나의 주된 용도는?
  lifestyle: new Set([
    'Office',
    'Tour',
    'Developer',
    'Game',
    'Study',
    'Video-editing'
  ]),

  // 선호하는 브랜드는?
  brand: new Set([
    'Apple',
    'Samsung',
    'Sony',
    'Logitech',
    'Any']),
} as const;
