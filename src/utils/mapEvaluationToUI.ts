import type { ComboEvaluationResult } from '@/types/combo/evaluation';
import type { Grade } from '@/constants/evaluation/grade';
import type { EvaluationCardData } from '@/constants/evaluation/connectivity';
import type { LifestyleKey } from '@/constants/evaluation/lifestyle';
import { toGrade } from '@/constants/evaluation/grade';
import { CONNECTIVITY } from '@/constants/evaluation/connectivity';
import { CONVENIENCE } from '@/constants/evaluation/convenience';
import { LIFESTYLE } from '@/constants/evaluation/lifestyle';

// UI 카드에 전달할 props 타입
export type EvaluationCardUI = {
  category: string; // '연동성' | '편의성' | '라이프스타일'
  grade: Grade;
  tags: string[];
  text: string;
};

// API 응답 → UI 카드 props 변환
export const mapEvaluationToUI = (
  evaluation: ComboEvaluationResult,
  lifestyleTagKey?: LifestyleKey
): EvaluationCardUI[] => {
  const connectivityGrade = toGrade(evaluation.connectivityGrade);
  const convenienceGrade = toGrade(evaluation.convenienceGrade);
  const lifestyleGrade = toGrade(evaluation.lifestyleGrade);

  const connectivityData: EvaluationCardData = CONNECTIVITY[connectivityGrade];
  const convenienceData: EvaluationCardData = CONVENIENCE[convenienceGrade];

  const lifestyleData = lifestyleTagKey
    ? LIFESTYLE[lifestyleTagKey]?.[lifestyleGrade]
    : undefined;

  return [
    {
      category: '연동성',
      grade: connectivityGrade,
      ...connectivityData,
    },
    {
      category: '편의성',
      grade: convenienceGrade,
      ...convenienceData,
    },
    {
      category: '라이프스타일',
      grade: lifestyleGrade,
      tags: lifestyleData?.tags ?? ['-'],
      text: lifestyleData?.text ?? '-',
    },
  ];
};
