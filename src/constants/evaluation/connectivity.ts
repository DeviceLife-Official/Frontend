import { GRADE } from './grade';
import type { Grade } from './grade';

// 연동성 카드 데이터 타입
export type EvaluationCardData = {
  tags: string[];
  text: string;
};

// 연동성 매핑 테이블
export const CONNECTIVITY: Record<Grade, EvaluationCardData> = {
  [GRADE.BEST]: {
    tags: ['OS통합', '완벽 호환성'],
    text: '모든 기기가 하나의 OS 생태계로 완벽하게 통합되어 있습니다. 호환성 기준이 다수 충족된 최상의 상태입니다.',
  },
  [GRADE.GOOD]: {
    tags: ['안정적 연결', '품질 우수'],
    text: '주요 기기 간의 연결이 안정적입니다. 다만 조합에 따라 마우스 제스처나 오디오 코덱 등 세부적인 부가 기능 중 일부가 제한적으로 작동할 수 있습니다.',
  },
  [GRADE.NORMAL]: {
    tags: ['OS 혼합'],
    text: '기본적인 연결은 가능하나 서로 다른 OS가 섞여 있습니다. 키보드 레이아웃 불일치나 단축키 활용에 제약이 예상되어, 기기 간의 시너지를 확인해 볼 필요가 있습니다.',
  },
  [GRADE.POOR]: {
    tags: ['OS 고립', '연동성 부족'],
    text: '스마트워치와 스마트폰의 OS가 달라 핵심 기능을 쓸 수 없거나, 연결 대상이 없어 활용도가 떨어지는 기기가 포함되어 있습니다. 연동성이 매우 낮은 조합입니다.',
  },
  [GRADE.UNKNOWN]: {
    tags: ['-'],
    text: '-',
  },
};
