// constants/tagGroup.ts
export const TAG_GROUP_BY_KEY = {
  interest: new Set(['Developer', 'Game', 'Study', 'Video-editing']),
  lifestyle: new Set([
    'Office',
    'Tour',
    'Performance',
    'Value',
    'Portability',
    'BatteryLife',
    'DesignColor',
  ]),
  brand: new Set(['Apple', 'Samsung', 'Sony', 'Logitech', 'Any']),
} as const;
