import { useState } from 'react';
import StarIcon from '@/assets/icons/star.svg?react';
import type { ComboListItem, ComboDevice } from '@/types/combo/combo';

type CombinationDeviceCardProps = {
  combination: ComboListItem;
  devices: ComboDevice[];
  columns?: 3 | 4;
  defaultRows?: number;
  showExpandButton?: boolean;
  showGradient?: boolean;
  className?: string;
  expanded?: boolean;
  onExpand?: (expanded: boolean) => void;
  index?: number;
};

const CombinationDeviceCard = ({
  combination,
  devices,
  columns = 3,
  defaultRows = 3,
  showExpandButton = true,
  showGradient = true,
  className = '',
  expanded,
  onExpand,
  index,
}: CombinationDeviceCardProps) => {
  const [internalExpanded, setInternalExpanded] = useState(false);

  const isControlled = expanded !== undefined;
  const showAllDevices = isControlled ? expanded : internalExpanded;

  const defaultDeviceCount = columns * defaultRows;
  const hasMoreDevices = devices.length > defaultDeviceCount;
  const displayedDevices = showAllDevices ? devices : devices.slice(0, defaultDeviceCount);

  const gradientThreshold = columns === 4 ? 9 : 7;
  const shouldShowGradient = devices.length >= gradientThreshold;

  const handleExpand = () => {
    if (!isControlled) {
      setInternalExpanded(true);
    }
    onExpand?.(true);
  };

  const handleCollapse = () => {
    if (!isControlled) {
      setInternalExpanded(false);
    }
    onExpand?.(false);
  };

  const gridColsClass = columns === 4 ? 'grid-cols-4' : 'grid-cols-3';
  const deviceCardWidth = 'w-244 h-87';
  const deviceImageSize = 'w-63 h-63';

  return (
    <div className={className}>
      {/* 조합 정보 */}
      <div className="flex flex-col gap-24 pl-20 py-24 flex-shrink-0">
        {/* 조합명 */}
        <div className="flex flex-col gap-8">
          {/* 조합 번호 */}
          {index !== undefined && (
            <p className="font-body-3-r text-gray-400">조합 {index + 1}</p>
          )}
          {/* 조합명 + 별 */}
          <div className="flex items-center gap-8">
            <p className="font-body-1-sm text-black">{combination.comboName}</p>
            {combination.isPinned && <StarIcon className="w-22 h-22" />}
          </div>
        </div>
        {/* Tags */}
        <div className="flex gap-12 -ml-4">
          <span className="bg-blue-200 text-blue-700 font-body-2-sm px-12 py-8 rounded-full">
            기기 {combination.deviceCount}개
          </span>
          <span className="bg-gray-200 text-gray-700 font-body-2-sm px-12 py-8 rounded-full">
            ₩{combination.totalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 기기 그리드 */}
      <div className="pl-8 mt-24 relative">
        <div className={`grid ${gridColsClass} gap-x-28 gap-y-12`}>
          {displayedDevices.map((device) => (
            <div
              key={device.deviceId}
              className={`bg-white rounded-card shadow-[0_0_4px_rgba(0,0,0,0.1)] p-12 ${deviceCardWidth} flex items-center gap-12`}
            >
              <div className={`${deviceImageSize} bg-gray-200 flex-shrink-0`} />
              <div className="flex flex-col gap-4 min-w-0">
                <p className="font-body-3-sm text-black truncate">{device.name}</p>
                <p className="font-body-4-r text-gray-300">{device.brandName}</p>
                <p className="font-body-3-r text-gray-300">{device.deviceType}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 그라데이션 */}
        {showGradient && shouldShowGradient && !showAllDevices && (
          <div
            className={`absolute right-0 bottom-0 ${deviceCardWidth} h-82 rounded-card pointer-events-none`}
            style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%)',
            }}
          />
        )}
      </div>

      {/* 기기 전체보기 / 간략히 보기 버튼 */}
      {showExpandButton && hasMoreDevices && !showAllDevices && (
        <button
          onClick={handleExpand}
          className="mt-16 pl-12 font-body-2-r text-gray-500 underline cursor-pointer hover:opacity-80"
        >
          기기 전체보기
        </button>
      )}
      {showExpandButton && hasMoreDevices && showAllDevices && (
        <button
          onClick={handleCollapse}
          className="mt-16 pl-12 font-body-2-r text-gray-500 underline cursor-pointer hover:opacity-80"
        >
          간략히 보기
        </button>
      )}
    </div>
  );
};

export default CombinationDeviceCard;
