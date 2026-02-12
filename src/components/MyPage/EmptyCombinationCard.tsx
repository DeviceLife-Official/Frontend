import { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@/assets/icons/star.svg?react';
import StarXIcon from '@/assets/icons/starx.svg?react';
import StarHoverIcon from '@/assets/icons/starhover.svg?react';
import PlusIcon from '@/assets/icons/plus.svg?react';
import { formatDate } from '@/utils/format';

interface EmptyCombinationCardProps {
  comboId: number;
  comboName: string;
  createdAt: string;
  isPinned: boolean;
  index: number;
  isEditing: boolean;
  editingName: string;
  nameError: string | null;
  onTogglePin: (e: React.MouseEvent, comboId: number) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameBlur: (name: string) => void;
}

const EmptyCombinationCard = ({
  comboId,
  comboName,
  createdAt,
  isPinned,
  index,
  isEditing,
  editingName,
  nameError,
  onTogglePin,
  onNameChange,
  onNameBlur,
}: EmptyCombinationCardProps) => {
  const navigate = useNavigate();
  const [hoveredStarComboId, setHoveredStarComboId] = useState<number | null>(null);

  return (
    <div className="px-36 pt-24 pb-36">
      {/* 조합 정보 (생성일 포함) */}
      <div className="flex flex-col gap-24 pl-20 py-24">
        {isEditing ? (
          /* 수정 모드: 인풋박스 + 별 아이콘 + 에러 메시지 */
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-8 min-h-48">
              <input
                type="text"
                value={editingName}
                onChange={onNameChange}
                onClick={(e) => e.stopPropagation()}
                onBlur={() => onNameBlur(editingName)}
                maxLength={20}
                className={`h-52 px-12 rounded-button font-body-1-sm text-gray-300 focus:outline-none ${
                  nameError ? 'border-2 border-warning' : 'border border-blue-600'
                }`}
                autoFocus
              />
              {isPinned ? (
                <StarIcon
                  onClick={(e) => onTogglePin(e, comboId)}
                  className={`!w-22 !h-22 -mt-2 cursor-pointer transition-opacity ${
                    hoveredStarComboId === comboId ? 'opacity-80' : ''
                  }`}
                  onMouseEnter={() => setHoveredStarComboId(comboId)}
                  onMouseLeave={() => setHoveredStarComboId(null)}
                />
              ) : (
                <>
                  {hoveredStarComboId === comboId ? (
                    <StarHoverIcon
                      onClick={(e) => onTogglePin(e, comboId)}
                      className="!w-22 !h-22 -mt-2 cursor-pointer"
                      onMouseEnter={() => setHoveredStarComboId(comboId)}
                      onMouseLeave={() => setHoveredStarComboId(null)}
                    />
                  ) : (
                    <StarXIcon
                      onClick={(e) => onTogglePin(e, comboId)}
                      className="!w-22 !h-22 -mt-2 cursor-pointer"
                      onMouseEnter={() => setHoveredStarComboId(comboId)}
                      onMouseLeave={() => setHoveredStarComboId(null)}
                    />
                  )}
                </>
              )}
            </div>
            {nameError && <p className="pl-12 font-body-4-r text-warning">{nameError}</p>}
          </div>
        ) : (
          /* 일반 모드: 조합 번호 + 생성일 + 조합명 */
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-16">
              <p className="font-body-4-r text-gray-400">조합{index + 1}</p>
              <p className="font-body-4-r text-gray-400">생성일: {formatDate(createdAt)}</p>
            </div>
            <div className="flex items-center gap-8">
              <p className="font-body-1-sm text-black">{comboName}</p>
              {isPinned ? (
                <StarIcon
                  onClick={(e) => onTogglePin(e, comboId)}
                  className={`!w-22 !h-22 -mt-3 cursor-pointer transition-opacity ${
                    hoveredStarComboId === comboId ? 'opacity-80' : ''
                  }`}
                  onMouseEnter={() => setHoveredStarComboId(comboId)}
                  onMouseLeave={() => setHoveredStarComboId(null)}
                />
              ) : (
                <>
                  {hoveredStarComboId === comboId ? (
                    <StarHoverIcon
                      onClick={(e) => onTogglePin(e, comboId)}
                      className="!w-22 !h-22 -mt-3 cursor-pointer"
                      onMouseEnter={() => setHoveredStarComboId(comboId)}
                      onMouseLeave={() => setHoveredStarComboId(null)}
                    />
                  ) : (
                    <StarXIcon
                      onClick={(e) => onTogglePin(e, comboId)}
                      className="!w-22 !h-22 -mt-3 cursor-pointer"
                      onMouseEnter={() => setHoveredStarComboId(comboId)}
                      onMouseLeave={() => setHoveredStarComboId(null)}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 빈 조합: 기기 추가 버튼 */}
      <div className="pl-8 mt-24">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/devices');
          }}
          className="cursor-pointer hover:opacity-80"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default memo(EmptyCombinationCard);
