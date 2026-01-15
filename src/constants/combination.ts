export const COMBINATION_NAMES = ['연동성', '편의성', '라이프스타일', '컬러 매칭'] as const;
export const COMBINATION_STATUSES = ['최적', '보통', '미흡', '-'] as const;

export type CombinationName = (typeof COMBINATION_NAMES)[number];
export type CombinationStatus = (typeof COMBINATION_STATUSES)[number];
