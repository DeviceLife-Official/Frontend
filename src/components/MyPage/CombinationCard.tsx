import { useState, memo } from 'react';
import StarIcon from '@/assets/icons/star.svg?react';
import StarXIcon from '@/assets/icons/starx.svg?react';
import StarHoverIcon from '@/assets/icons/starhover.svg?react';
import CombinationTag from '@/components/Combination/CombinationTag';
import { useComboEvaluation } from '@/apis/combo/getComboEvaluation';
import { formatDate } from '@/utils/format';
import type { ComboListItem } from '@/types/combo/combo';
import type { CombinationStatus } from '@/constants/combination';

interface CombinationCardProps {
  combination: ComboListItem;
  index: number;
  columns: 3 | 4;
  isEditing: boolean;
  editingName: string;
  nameError: string | null;
  onTogglePin: (e: React.MouseEvent, comboId: number) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameBlur: (name: string) => void;
}

const CombinationCard = ({
  combination,
  index,
  columns,
  isEditing,
  editingName,
  nameError,
  onTogglePin,
  onNameChange,
  onNameBlur,
}: CombinationCardProps) => {
  const [hoveredStarComboId, setHoveredStarComboId] = useState<number | null>(null);

  // 조합 평가 캐시 구독 (staleTime: Infinity이므로 캐시에 있으면 API 호출 없이 바로 사용)
  const { data: evaluation } = useComboEvaluation(combination.comboId);

  // 그라데이션 로직
  const gradientThreshold = columns === 4 ? 9 : 7;
  const shouldShowGradient = combination.devices.length >= gradientThreshold;
  const maxDisplay = columns === 4 ? 8 : 6;
  const displayedDevices = shouldShowGradient
    ? combination.devices.slice(0, maxDisplay)
    : combination.devices;

  return (
    <div className="px-36 pt-24 pb-36">
      {/* 조합 정보 (생성일 포함) */}
      <div className="flex flex-col gap-13 pl-20 py-24">
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
              {combination.isPinned ? (
                <StarIcon
                  onClick={(e) => onTogglePin(e, combination.comboId)}
                  className={`!w-22 !h-22 -mt-2 cursor-pointer transition-opacity ${
                    hoveredStarComboId === combination.comboId ? 'opacity-80' : ''
                  }`}
                  onMouseEnter={() => setHoveredStarComboId(combination.comboId)}
                  onMouseLeave={() => setHoveredStarComboId(null)}
                />
              ) : (
                <>
                  {hoveredStarComboId === combination.comboId ? (
                    <StarHoverIcon
                      onClick={(e) => onTogglePin(e, combination.comboId)}
                      className="!w-22 !h-22 -mt-2 cursor-pointer"
                      onMouseEnter={() => setHoveredStarComboId(combination.comboId)}
                      onMouseLeave={() => setHoveredStarComboId(null)}
                    />
                  ) : (
                    <StarXIcon
                      onClick={(e) => onTogglePin(e, combination.comboId)}
                      className="!w-22 !h-22 -mt-2 cursor-pointer"
                      onMouseEnter={() => setHoveredStarComboId(combination.comboId)}
                      onMouseLeave={() => setHoveredStarComboId(null)}
                    />
                  )}
                </>
              )}
            </div>
            {nameError && <p className="pl-12 font-body-4-r text-warning">{nameError}</p>}
          </div>
        ) : (
          /* 일반 모드: 조합 번호 + 생성일 + 조합명 + 태그 */
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-16">
                <p className="font-body-3-r text-gray-400">조합{index + 1}</p>
                <p className="font-body-3-r text-gray-400">
                  생성일: {formatDate(combination.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-8">
                <p className="font-body-1-sm text-black">{combination.comboName}</p>
                {combination.isPinned ? (
                  <StarIcon
                    onClick={(e) => onTogglePin(e, combination.comboId)}
                    className={`!w-22 !h-22 -mt-3 cursor-pointer transition-opacity ${
                      hoveredStarComboId === combination.comboId ? 'opacity-80' : ''
                    }`}
                    onMouseEnter={() => setHoveredStarComboId(combination.comboId)}
                    onMouseLeave={() => setHoveredStarComboId(null)}
                  />
                ) : (
                  <>
                    {hoveredStarComboId === combination.comboId ? (
                      <StarHoverIcon
                        onClick={(e) => onTogglePin(e, combination.comboId)}
                        className="!w-22 !h-22 -mt-3 cursor-pointer"
                        onMouseEnter={() => setHoveredStarComboId(combination.comboId)}
                        onMouseLeave={() => setHoveredStarComboId(null)}
                      />
                    ) : (
                      <StarXIcon
                        onClick={(e) => onTogglePin(e, combination.comboId)}
                        className="!w-22 !h-22 -mt-3 cursor-pointer"
                        onMouseEnter={() => setHoveredStarComboId(combination.comboId)}
                        onMouseLeave={() => setHoveredStarComboId(null)}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
            {/* 조합 평가 태그 - COMBO_EVALUATION 캐시에서 등급 읽기 */}
            <div className="flex gap-12">
              <CombinationTag
                name="연동성"
                status={(evaluation?.connectivityGrade as CombinationStatus) || '-'}
              />
              <CombinationTag
                name="편의성"
                status={(evaluation?.convenienceGrade as CombinationStatus) || '-'}
              />
              <CombinationTag
                name="라이프스타일"
                status={(evaluation?.lifestyleGrade as CombinationStatus) || '-'}
              />
            </div>
          </div>
        )}
      </div>

      {/* 기기 그리드 - 일반 모드에서도 기기 카드 표시 (그라데이션 포함) */}
      <div className="pl-8 mt-24 relative">
        <div
          className={`grid ${columns === 4 ? 'grid-cols-4' : 'grid-cols-3'} gap-x-28 gap-y-12`}
        >
          {displayedDevices.map((device) => (
            <div
              key={device.deviceId}
              className="bg-white rounded-card shadow-[0_0_4px_rgba(0,0,0,0.1)] p-12 w-244 flex items-center gap-12"
            >
              <div className="w-64 h-64 bg-gray-200 flex-shrink-0 relative overflow-hidden">
                {device.imageUrl && (
                  <img
                    src={device.imageUrl}
                    alt={device.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <p className="font-body-3-sm text-black truncate w-120">{device.name}</p>
                <p className="font-body-4-r text-gray-300">{device.brandName}</p>
                <p className="font-body-3-r text-gray-300">{device.deviceType}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 그라데이션 오버레이 */}
        {shouldShowGradient && (
          <div
            className="absolute right-0 bottom-0 w-244 h-80 rounded-card pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%)',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default memo(CombinationCard);
