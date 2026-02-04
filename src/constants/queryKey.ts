// React Query queryKey 상수 관리
// 한 객체에서 "키 문자열"만 관리하고
// 실제 queryKey 배열은 각 사용처에서 [queryKey.X] 형태로 조립합니다.

export const queryKey = {
  USER_PROFILE: 'user_profile',
  TAGS: 'tags',
  COMBOS: 'combos',
  COMBO_DETAIL: 'combo',
  LIFESTYLE_DEVICE: 'lifestyle_device'
} as const;
