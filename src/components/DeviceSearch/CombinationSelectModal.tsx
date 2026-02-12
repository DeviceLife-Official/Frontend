import type { ComboListItem } from '@/types/combo/combo';
import type { CombinationStatus } from '@/constants/combination';
import CombinationTag from '@/components/Combination/CombinationTag';
import BackIcon from '@/assets/icons/back.svg?react';
import XIcon from '@/assets/icons/X.svg?react';
import StarIcon from '@/assets/icons/star.svg?react';
import MoreIcon from '@/assets/icons/more.svg?react';
import { useComboEvaluation } from '@/apis/combo/getComboEvaluation';

interface CombinationSelectModalProps {
  combos: ComboListItem[];
  onSelectCombination: (comboId: number) => void;
  onBack: () => void;
  onClose: () => void;
}

/**
 * 개별 조합 아이템 컴포넌트
 * 마이페이지 상세 정보와 동일한 평가 데이터를 가져와서 표시합니다.
 */
const CombinationSelectItem = ({
  comboItem,
  index,
  onSelect,
}: {
  comboItem: ComboListItem;
  index: number;
  onSelect: (id: number) => void;
}) => {
  // 각 조합의 평가 정보를 상세 API에서 가져옴 (마이페이지와 동일한 데이터 소스)
  const { data: evaluation } = useComboEvaluation(comboItem.comboId);

  return (
    <button
      onClick={() => onSelect(comboItem.comboId)}
      className="flex items-center justify-between pl-20 pr-36 py-24 hover:bg-gray-50 transition-colors border-b border-gray-200 cursor-pointer last:border-none"
    >
      {/* 좌측: 조합 정보 */}
      <div className="flex flex-col gap-16 items-start">
        {/* 조합 번호 + 조합명 */}
        <div className="flex flex-col gap-8 items-start">
          <p className="font-body-3-r text-gray-400">조합 {index + 1}</p>
          <div className="flex items-center gap-8">
            <p className="font-body-1-sm text-black">{comboItem.comboName}</p>
            {comboItem.isPinned && <StarIcon className="w-22 h-22 -mt-3" />}
          </div>
        </div>

        {/* 평가 태그: evaluation 데이터가 있으면 등급을, 없으면 '-' 표시 */}
        <div className="flex gap-8">
          <CombinationTag
            name="연동성"
            status={(evaluation?.connectivityGrade || '-') as CombinationStatus}
          />
          <CombinationTag
            name="편의성"
            status={(evaluation?.convenienceGrade || '-') as CombinationStatus}
          />
          <CombinationTag
            name="라이프스타일"
            status={(evaluation?.lifestyleGrade || '-') as CombinationStatus}
          />
        </div>
      </div>

      {/* 우측: More 아이콘 */}
      <MoreIcon className="w-20 h-36 text-gray-400" />
    </button>
  );
};

const CombinationSelectModal = ({
  combos,
  onSelectCombination,
  onBack,
  onClose,
}: CombinationSelectModalProps) => {
  return (
    <div className="flex flex-col items-end gap-20 pointer-events-auto">
      <div className="flex items-center justify-between w-full">
        <button
          onClick={onBack}
          className="w-48 h-48 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="뒤로가기"
        >
          <BackIcon className="w-48 h-48" />
        </button>
        <button
          onClick={onClose}
          className="w-48 h-48 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="닫기"
        >
          <XIcon className="w-48 h-48 text-white" />
        </button>
      </div>

      {/* Card */}
      <div
        className="bg-white rounded-card shadow-[0_0_10px_rgba(0,0,0,0.25)]"
        style={{
          width: '907px',
          height: '670px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Combination List */}
        <div className="flex flex-col ml-20 overflow-y-auto h-full scrollbar-minimal">
          {combos.map((comboItem, index) => (
            <CombinationSelectItem
              key={comboItem.comboId}
              comboItem={comboItem}
              index={index}
              onSelect={onSelectCombination}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CombinationSelectModal;


