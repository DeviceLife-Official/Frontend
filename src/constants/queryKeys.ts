// React Query queryKey 상수 관리
import type { TagType } from '@/types/tag/tag';

export const queryKeys = {
  userProfile: ['userProfile'] as const,
  tags: {
    all: ['tags'] as const,
    byType: (type: TagType) => ['tags', type] as const,
  },
};
