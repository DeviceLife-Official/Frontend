import { useMemo } from 'react';
import { useGetTags } from '@/apis/tag/getTags';
import { splitTagsForOnboarding, type OnboardingTagGroups } from '@/utils/tag/splitTags';

/**
 * 태그 목록 조회 및 온보딩 그룹별 분류 훅
 * - API 호출: 전체 태그 목록 조회
 * - 자동 분류: interest, lifestyle, brand, unknown 그룹으로 분류
 * - 로딩/에러 상태 제공
 */
export const useGroupedTags = () => {
  const { data: tags, isLoading, error } = useGetTags();

  const groupedTags: OnboardingTagGroups = useMemo(() => {
    if (!tags || tags.length === 0) {
      return {
        interest: [],
        lifestyle: [],
        brand: [],
        unknown: [],
      };
    }
    return splitTagsForOnboarding(tags);
  }, [tags]);

  return {
    tags: groupedTags,
    isLoading,
    error,
  };
};
