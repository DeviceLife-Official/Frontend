import { type CombinationName, type CombinationStatus } from '@/constants/combination';

type CombinationTagProps = {
  name: CombinationName;
  status: CombinationStatus;
  className?: string;
};

const NAME_STYLE_MAP: Record<CombinationName, string> = {
  연동성: 'bg-blue-200 text-blue-700',
  편의성: 'bg-light-green text-dark-green',
  라이프스타일: 'bg-light-yellow text-dark-yellow',
};

const STATUS_STYLE_MAP: Record<CombinationStatus, string> = {
  최적: 'font-caption-sm text-optimal',
  양호: 'font-caption-sm text-good',
  보통: 'font-caption-sm text-normal',
  미흡: 'font-caption-sm text-poor',
  '-': 'font-caption-sm text-optimal',
};

const CombinationTag = ({ name, status, className = '' }: CombinationTagProps) => {
  // status가 유효하지 않을 경우를 대비한 안전한 스타일 추출
  const statusStyle = STATUS_STYLE_MAP[status] || STATUS_STYLE_MAP['-'];
  const displayStatus = status || '-';

  return (
    <span
      className={`
        inline-flex items-center gap-8
        px-12 py-8 h-30
        rounded-tag
        font-caption-r
        ${NAME_STYLE_MAP[name]}
        ${className}
      `}
    >
      <span>{name}:</span>
      <span className={statusStyle}>{displayStatus}</span>
    </span>
  );
};

export default CombinationTag;
