interface CombinationEvaluationCardProps {
  category: string;
  grade: string;
  description: string;
  tags: string[];
}

// 카테고리별 태그 색상 고정값
const CATEGORY_TAG_COLORS: Record<
  string,
  { bgColor: string; textColor: string }
> = {
  연동성: {
    bgColor: 'bg-blue-200',
    textColor: 'text-blue-700',
  },
  편의성: {
    bgColor: 'bg-[#bdf8e1]',
    textColor: 'text-[#00719f]',
  },
  라이프스타일: {
    bgColor: 'bg-[#fee8c3]',
    textColor: 'text-[#fb7104]',
  },
};

// 등급 텍스트 색상 매핑
const getGradeTextColorClass = (grade: string): string => {
  switch (grade) {
    case '최적':
      return 'text-optimal';
    case '양호':
      return 'text-good';
    case '보통':
      return 'text-normal';
    case '미흡':
      return 'text-poor';
    case '-':
    default:
      return 'text-optimal';
  }
};

const CombinationEvaluationCard = ({
  category,
  grade,
  description,
  tags,
}: CombinationEvaluationCardProps) => {
  const gradeTextColorClass = getGradeTextColorClass(grade);
  const tagColors = CATEGORY_TAG_COLORS[category] ?? {
    bgColor: 'bg-gray-200',
    textColor: 'text-gray-700',
  };

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
            className={`${tagColors.bgColor} ${tagColors.textColor} font-body-2-sm px-12 py-8 rounded-full`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CombinationEvaluationCard;
