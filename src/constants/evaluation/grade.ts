// 등급 상수 및 타입 정의

export const GRADE = {
  BEST: '최적',
  GOOD: '양호',
  NORMAL: '보통',
  POOR: '미흡',
  UNKNOWN: '-',
} as const;

export type Grade = (typeof GRADE)[keyof typeof GRADE];

// API 응답 등급 문자열 → Grade 타입 변환
export const toGrade = (raw: string): Grade => {
  const valid: string[] = [GRADE.BEST, GRADE.GOOD, GRADE.NORMAL, GRADE.POOR];
  return valid.includes(raw) ? (raw as Grade) : GRADE.UNKNOWN;
};
