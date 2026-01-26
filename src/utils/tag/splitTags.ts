// 온보딩 태그 그룹 분류 함수
// - 입력: 전체 태그 목록
// - 출력: OnboardingTagGroups (4개 그룹으로 분류된 객체)

import type { Tag } from '@/types/tag/tag';
import { TAG_GROUP_BY_KEY } from '@/constants/tagGroup';

// 온보딩 태그 그룹 타입
export type OnboardingTagGroups = {
  interest: Tag[];
  lifestyle: Tag[];
  brand: Tag[];
  unknown: Tag[]; // 혹시 새 태그 들어왔는데 분류 못하면 여기로
};

// 온보딩 태그 그룹 분류 함수
export const splitTagsForOnboarding = (tags: Tag[]): OnboardingTagGroups => {
  const grouped: OnboardingTagGroups = {
    interest: [],
    lifestyle: [],
    brand: [],
    unknown: [],
  };

  for (const tag of tags) {
    const key = tag.tagKey;

    if (TAG_GROUP_BY_KEY.interest.has(key)) grouped.interest.push(tag);
    else if (TAG_GROUP_BY_KEY.lifestyle.has(key)) grouped.lifestyle.push(tag);
    else if (TAG_GROUP_BY_KEY.brand.has(key)) grouped.brand.push(tag);
    else grouped.unknown.push(tag);
  }

  return grouped;
};
