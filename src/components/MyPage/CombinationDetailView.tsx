import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackIcon from '@/assets/icons/back.svg?react';
import StarIcon from '@/assets/icons/star.svg?react';
import StarXIcon from '@/assets/icons/starx.svg?react';
import StarHoverIcon from '@/assets/icons/starhover.svg?react';
import CheckboxIcon from '@/assets/icons/checkbox.svg?react';
import CheckboxOnIcon from '@/assets/icons/checkbox_on.svg?react';
import TrashIcon from '@/assets/icons/trash.svg?react';
import PlusIcon from '@/assets/icons/plus.svg?react';
import CombinationEvaluationCard from '@/components/Combination/CombinationEvaluationCard';
import { formatDate } from '@/utils/format';
import type { ComboListItem } from '@/types/combo/combo';
import type { CombinationName } from '@/constants/combination';

interface Device {
  deviceId: number;
  name: string;
  brandName?: string;
  deviceType?: string;
}

interface EvaluationCard {
  category: string;
  grade: string;
  text: string;
  tags: string[];
}

interface CombinationDetailViewProps {
  combination: ComboListItem;
  index: number;
  devices: Device[];
  deviceIds: number[];
  columns: 3 | 4;
  selectedDevices: number[];
  totalPrice: number;
  evaluationCards: EvaluationCard[] | null;
  isEvaluationLoading: boolean;
  onBack: () => void;
  onTogglePin: (e: React.MouseEvent, comboId: number) => void;
  onSelectAll: (deviceIds: number[]) => void;
  onSelectDevice: (deviceId: number) => void;
  onTrashClick: () => void;
}

const CombinationDetailView = ({
  combination,
  index,
  devices,
  deviceIds,
  columns,
  selectedDevices,
  totalPrice,
  evaluationCards,
  isEvaluationLoading,
  onBack,
  onTogglePin,
  onSelectAll,
  onSelectDevice,
  onTrashClick,
}: CombinationDetailViewProps) => {
  const navigate = useNavigate();
  const [hoveredStarComboId, setHoveredStarComboId] = useState<number | null>(null);

  return (
    <div className="pt-16 cursor-auto" onClick={(e) => e.stopPropagation()}>
      {/* 뒤로가기 버튼 */}
      <div className="px-36 pt-20">
        <button onClick={onBack} className="p-10 cursor-pointer hover:opacity-80">
          <BackIcon className="w-48 h-48 text-gray-400 [&>rect]:hidden" />
        </button>
      </div>

      {/* 조합 정보 */}
      <div className="flex flex-col gap-24 pl-56 py-24">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-16">
            <p className="font-body-2-r text-gray-400">조합{index + 1}</p>
            <p className="font-body-2-r text-gray-400">
              생성일: {formatDate(combination.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-8">
            <p className="font-heading-3 text-black">{combination.comboName}</p>
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
        </div>
      </div>

      {/* 전체 선택 + 휴지통 */}
      <div className="px-56">
        <div className="flex items-center justify-between pb-16 border-b border-gray-300">
          <div className="flex items-center gap-8">
            <button onClick={() => onSelectAll(deviceIds)} className="cursor-pointer">
              {selectedDevices.length === devices.length && devices.length > 0 ? (
                <CheckboxOnIcon className="w-28 h-28" />
              ) : (
                <CheckboxIcon className="w-28 h-28" />
              )}
            </button>
            <p className="font-body-1-r text-black">전체 선택하기</p>
          </div>
          <button onClick={onTrashClick} className="cursor-pointer hover:opacity-80">
            <TrashIcon className="w-28 h-28 text-red-500" />
          </button>
        </div>
      </div>

      {/* 안내 텍스트 */}
      <p className="px-56 pt-36 font-caption-r text-blue-800">
        *마우스를 기기 위에 올려서 기기 상세정보를 확인하실 수도 있습니다.
      </p>

      {/* 기기 그리드 (체크박스 포함) */}
      <div className="px-56 pt-36 pb-36">
        <div
          className={`grid ${columns === 4 ? 'grid-cols-4' : 'grid-cols-3'} gap-x-28 gap-y-12`}
        >
          {devices.map((device) => (
            <div
              key={device.deviceId}
              onClick={() => window.open(`/devices?productId=${device.deviceId}`, '_blank')}
              className={`bg-white rounded-card shadow-[0_0_4px_rgba(0,0,0,0.1)] p-12 w-244 flex items-center gap-12 border cursor-pointer hover:shadow-[0_0_7px_#57a0ff] transition-shadow ${selectedDevices.includes(device.deviceId) ? 'border-blue-600' : 'border-transparent'}`}
            >
              <div className="w-64 h-64 bg-gray-200 flex-shrink-0 relative group/image">
                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white px-8 py-4 rounded-tag font-caption-r text-black">
                    보기
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-body-3-sm text-black truncate w-120">{device.name}</p>
                  {/* 체크박스 - 기기명과 같은 높이 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDevice(device.deviceId);
                    }}
                    className="cursor-pointer flex-shrink-0"
                  >
                    {selectedDevices.includes(device.deviceId) ? (
                      <CheckboxOnIcon className="w-24 h-24" />
                    ) : (
                      <CheckboxIcon className="w-24 h-24" />
                    )}
                  </button>
                </div>
                <p className="font-body-4-r text-gray-300">{device.brandName || '-'}</p>
                <p className="font-body-3-r text-gray-300">{device.deviceType || '-'}</p>
              </div>
            </div>
          ))}
          {/* 기기 추가 버튼 */}
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

      {/* 총 가격 */}
      <div className="px-56 pb-36">
        <div className="flex items-center gap-24 p-20">
          <p className="font-body-1-sm text-black">총 가격</p>
          <div className="flex items-center gap-4">
            <p className="font-body-1-sm text-blue-600">₩</p>
            <p className="font-body-1-sm text-blue-600">{totalPrice.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* 구분선 + 조합 평가 정보 (로딩 중에는 숨김) */}
      {!isEvaluationLoading && (
        <>
          <div className="mx-44 border-t border-gray-300" />

          <div className="px-56 py-56">
            <div className="flex items-center justify-end gap-16 mb-32">
              <p className="font-body-2-r text-gray-400 underline">조합평가 전문보기</p>
            </div>

            <div className="flex flex-col gap-20">
              {evaluationCards ? (
                evaluationCards.map((card) => (
                  <CombinationEvaluationCard
                    key={card.category}
                    category={card.category as CombinationName}
                    grade={card.grade}
                    description={card.text}
                    tags={card.tags}
                  />
                ))
              ) : (
                <div className="bg-white rounded-card px-42 py-30 flex items-center justify-center">
                  <p className="font-body-3-r text-gray-400">
                    조합 평가 정보가 아직 준비되지 않았습니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CombinationDetailView;
