import { GRADE } from './grade';
import type { Grade } from './grade';
import type { EvaluationCardData } from './connectivity';

// 편의성 매핑 테이블
export const CONVENIENCE: Record<Grade, EvaluationCardData> = {
  [GRADE.BEST]: {
    tags: ['USB-C', '배터리 효율 우수'],
    text: '모든 기기가 USB-C로 통일되었으며 배터리 효율 또한 우수입니다. 단일 충전기로 노트북까지 완벽하게 커버 가능한 이상적인 환경입니다.',
  },
  [GRADE.GOOD]: {
    tags: ['안정적 충전', '멀티태스킹', '배터리 준수'],
    text: '전반적인 배터리 효율과 충전 속도가 안정적입니다. 무선 충전이나 고출력 PD 충전 등 핵심 편의 기능 중 일부가 포함되어 관리가 수월합니다.',
  },
  [GRADE.NORMAL]: {
    tags: ['단자 혼재', '충전 속도 확인', '포트 배분'],
    text: '사용에 큰 지장은 없으나, 기기에 따라 충전 단자가 다르거나 충전기 출력이 다소 낮을 수 있습니다. 동시 충전 시 포트 배분을 고려해야 합니다.',
  },
  [GRADE.POOR]: {
    tags: ['어댑터 필요', '단자 불일치', '충전 병목'],
    text: '노트북 충전을 위해 전용 어댑터가 필요하거나 충전 포트가 기기 수에 비해 부족합니다. 단자 혼재로 인해 케이블 관리가 번거로운 조합입니다.',
  },
  [GRADE.UNKNOWN]: {
    tags: ['-'],
    text: '-',
  },
};
