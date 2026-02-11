import type { ComboListItem } from '@/types/combo/combo';
import BackIcon from '@/assets/icons/back.svg?react';
import XIcon from '@/assets/icons/X.svg?react';
import StarIcon from '@/assets/icons/star.svg?react';
import MoreIcon from '@/assets/icons/more.svg?react';

interface CombinationSelectModalProps {
  combos: ComboListItem[];
  onSelectCombination: (comboId: number) => void;
  onBack: () => void;
  onClose: () => void;
}

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
            <button
              key={comboItem.comboId}
              onClick={() => onSelectCombination(comboItem.comboId)}
              className="flex items-center justify-between pl-20 pr-36 py-24 hover:bg-gray-50 transition-colors border-b border-gray-200 cursor-pointer last:border-none"
            >
              {/* 좌측: 조합 정보 */}
              <div className="flex flex-col gap-24 items-start">
                {/* 조합 번호 + 조합명 */}
                <div className="flex flex-col gap-8 items-start">
                  <p className="font-body-3-r text-gray-400">조합 {index + 1}</p>
                  {/* 조합명 + 대표조합 star */}
                  <div className="flex items-center gap-8">
                    <p className="font-body-1-sm text-black">{comboItem.comboName}</p>
                    {comboItem.isPinned && <StarIcon className="w-22 h-22 -mt-3" />}
                  </div>
                </div>
                {/* 기기 수 + 총 가격 */}
                <div className="flex gap-12">
                  <span className="bg-blue-200 text-blue-700 font-body-2-sm px-12 py-8 rounded-full">
                    기기 {comboItem.deviceCount}개
                  </span>
                  <span className="bg-gray-200 text-gray-700 font-body-2-sm px-12 py-8 rounded-full">
                    ₩{comboItem.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* 우측: More 아이콘 */}
              <MoreIcon className="w-20 h-36 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CombinationSelectModal;
