import type { CombinationName, CombinationStatus } from '@/constants/combination';
import {
  COMBINATION_NAME_STYLE_MAP,
  COMBINATION_STATUS_STYLE_MAP,
} from '@/constants/combination';
import type { Grade } from '@/constants/evaluation/grade';

interface CombinationEvaluationCardProps {
  category: CombinationName;
  grade: Grade;
  description: string;
  tags: string[];
}

// 등급 텍스트 색상 클래스 추출 (COMBINATION_STATUS_STYLE_MAP에서 색상만 추출)
const getGradeTextColorClass = (grade: Grade): string => {
  const statusStyle = COMBINATION_STATUS_STYLE_MAP[grade as CombinationStatus];
  // 'font-caption-sm text-optimal' 형태에서 색상 부분만 추출
  return statusStyle.split(' ').find((cls) => cls.startsWith('text-')) ?? 'text-optimal';
};

const CombinationEvaluationCard = ({
  category,
  grade,
  description,
  tags,
}: CombinationEvaluationCardProps) => {
  const gradeTextColorClass = getGradeTextColorClass(grade);
  const tagStyleClass = COMBINATION_NAME_STYLE_MAP[category];

  return (
    <div className="bg-white rounded-card px-42 py-30 flex flex-col gap-30">
      <div className="flex items-center gap-16">
        <p className="font-heading-4 text-black">{category}:</p>
        <p className={`font-heading-4 ${gradeTextColorClass}`}>{grade}</p>
      </div>
      <p className="font-body-3-r text-black leading-28">{description}</p>
      <div className="flex gap-8 -ml-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`${tagStyleClass} font-body-2-sm px-12 py-8 rounded-full`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CombinationEvaluationCard;
