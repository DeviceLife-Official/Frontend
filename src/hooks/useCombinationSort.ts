import { useState, useMemo, useCallback } from 'react';
import type { ComboListItem } from '@/types/combo/combo';

type SortOption = 'latest' | 'oldest' | 'alphabetical';

interface UseCombinationSortReturn {
  sortOption: string;
  setSortOption: (option: string) => void;
  sortedCombos: ComboListItem[];
}

export const useCombinationSort = (combos: ComboListItem[]): UseCombinationSortReturn => {
  const [sortOption, setSortOptionInternal] = useState<SortOption>('latest');

  const setSortOption = useCallback((option: string) => {
    setSortOptionInternal(option as SortOption);
  }, []);

  // 정렬된 조합 목록
  const sortedCombos = useMemo(() => {
    const pinnedCombos = combos.filter(c => c.isPinned);
    const unpinnedCombos = combos.filter(c => !c.isPinned);

    // 즐겨찾기는 pinnedAt 내림차순 (최근 즐겨찾기한 것이 위로)
    pinnedCombos.sort((a, b) => {
      const aTime = new Date(a.pinnedAt || 0).getTime();
      const bTime = new Date(b.pinnedAt || 0).getTime();
      return bTime - aTime;
    });

    // 일반 조합은 sortOption에 따라 정렬
    const sortUnpinned = (arr: ComboListItem[]) => {
      switch (sortOption) {
        case 'latest':
          return arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        case 'oldest':
          return arr.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        case 'alphabetical':
          return arr.sort((a, b) => a.comboName.localeCompare(b.comboName, 'ko'));
        default:
          return arr;
      }
    };

    return [...pinnedCombos, ...sortUnpinned(unpinnedCombos)];
  }, [combos, sortOption]);

  return {
    sortOption,
    setSortOption,
    sortedCombos,
  };
};
