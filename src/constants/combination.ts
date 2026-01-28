export const COMBINATION_NAMES = ['연동성', '편의성', '라이프스타일'] as const;
export const COMBINATION_STATUSES = ['최적', '보통', '미흡', '-'] as const;

export type CombinationName = (typeof COMBINATION_NAMES)[number];
export type CombinationStatus = (typeof COMBINATION_STATUSES)[number];

export const COMBINATION_NAME_STYLE_MAP: Record<CombinationName, string> = {
  연동성: 'bg-blue-200 text-blue-800',
  편의성: 'bg-light-green text-dark-green',
  라이프스타일: 'bg-light-yellow text-dark-yellow',
};

export const COMBINATION_STATUS_STYLE_MAP: Record<CombinationStatus, string> = {
  최적: 'font-caption-sm text-optimal',
  보통: 'font-caption-sm text-normal',
  미흡: 'font-caption-sm text-poor',
  '-': 'font-caption-sm text-optimal',
};

export const COMBO_MOTION = {
  HEADER_H: 80,

  INNER_W: 600,
  INNER_H: 72,

  SHRINK_W: 558,
  SHRINK_H: 66,

  OUTER_W: 638,
  OUTER_H: 111,

  T_SHRINK: 420,
  T_STACK: 520,

  DROP_DURATION: 1500,
  DROP_EASING: 'cubic-bezier(0.12, 0.95, 0.18, 1)',

  LIFT_DISTANCE: 90,
  LIFT_DURATION: 1500,
  LIFT_DELAY: 180,
  LIFT_EASING: 'cubic-bezier(0.12, 0.9, 0.18, 1)',

  DOUBLE_DELAY: 160,
  EXTRAS_AT_LIFT_PROGRESS: 0.01,
} as const;
