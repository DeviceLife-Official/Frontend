import { COMBINATION_NAME_STYLE_MAP, type CombinationName } from '@/constants/combination';

type CombinationDetailTagProps = {
  name: CombinationName;
  info: string;
  className?: string;
};

const CombinationDetailTag = ({ name, info, className = '' }: CombinationDetailTagProps) => {
  const infoText = name === '라이프스타일' ? `#${info}` : info;
  return (
    <div
      className={`
        inline-flex
        px-12 py-8
        justify-center items-center
        gap-8
        rounded-tag
        font-body-2-r
        cursor-default
        ${COMBINATION_NAME_STYLE_MAP[name]}
        ${className}
      `}
    >
      <span>{infoText}</span>
    </div>
  );
};

export default CombinationDetailTag;
