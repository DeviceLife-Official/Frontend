import {
  COMBINATION_NAME_STYLE_MAP,
  COMBINATION_STATUS_STYLE_MAP,
  type CombinationName,
  type CombinationStatus,
} from '@/constants/combination';

type CombinationTagProps = {
  name: CombinationName;
  status: CombinationStatus;
  className?: string;
};

const CombinationTag = ({ name, status, className = '' }: CombinationTagProps) => {
  // status가 유효하지 않을 경우를 대비한 안전한 스타일 추출
  const statusStyle = COMBINATION_STATUS_STYLE_MAP[status] || COMBINATION_STATUS_STYLE_MAP['-'];
  const displayStatus = status || '-';

  return (
    <span
      className={`
        inline-flex items-center gap-8
        px-12 py-8 h-30
        rounded-tag
        font-caption-sm
        ${COMBINATION_NAME_STYLE_MAP[name]}
        ${className}
      `}
    >
      <span>{name}:</span>
      <span className={statusStyle}>{displayStatus}</span>
    </span>
  );
};

export default CombinationTag;
