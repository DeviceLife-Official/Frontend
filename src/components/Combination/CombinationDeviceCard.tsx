import { useState } from 'react';
import CombinationTag from '@/components/Combination/CombinationTag';
import StarIcon from '@/assets/icons/star.svg?react';
import { type UserCombination } from '@/types/devices';
import { type DeviceSummary } from '@/constants/mockData';

type CombinationDeviceCardProps = {
  combination: UserCombination;
  devices: DeviceSummary[];
  columns?: 3 | 4;
  defaultRows?: number;
  showExpandButton?: boolean;
  showGradient?: boolean;
  className?: string;
  expanded?: boolean;
  onExpand?: (expanded: boolean) => void;
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
}: CombinationDeviceCardProps) => {
  const [internalExpanded, setInternalExpanded] = useState(false);

  const isControlled = expanded !== undefined;
  const showAllDevices = isControlled ? expanded : internalExpanded;

  const defaultDeviceCount = columns * defaultRows;
  const hasMoreDevices = devices.length > defaultDeviceCount;
  const displayedDevices = showAllDevices ? devices : devices.slice(0, defaultDeviceCount);

  const handleExpand = () => {
    if (!isControlled) {
      setInternalExpanded(true);
    }
    onExpand?.(true);
  };

  const gridColsClass = columns === 4 ? 'grid-cols-4' : 'grid-cols-3';
  const deviceCardWidth = columns === 4 ? 'w-255' : 'w-244';
  const deviceImageSize = columns === 4 ? 'w-100 h-100' : 'w-64 h-64';

  return (
    <div className={className}>
      {/* 조합 정보 */}
      <div className="flex flex-col gap-24 pl-20 py-24">
        {/* 조합 번호 + 조합명 */}
        <div className="flex flex-col gap-8">
          <p className="font-body-3-r text-gray-400">{combination.label}</p>
          <div className="flex items-center gap-8">
            <p className="font-body-1-sm text-black">{combination.name}</p>
            {combination.isMain && <StarIcon className="w-27 h-27" />}
          </div>
        </div>
        {/* Tags */}
        <div className="flex gap-12">
          {combination.tags.map((tag) => (
            <CombinationTag key={tag.name} name={tag.name} status={tag.status} />
          ))}
        </div>
      </div>

      {/* 기기 그리드 */}
      <div className="pl-8 mt-24 relative">
        <div className={`grid ${gridColsClass} gap-x-28 gap-y-12`}>
          {displayedDevices.map((device) => (
            <div
              key={device.id}
              className={`bg-white rounded-card shadow-[0_0_4px_rgba(0,0,0,0.1)] p-12 ${deviceCardWidth} flex items-center gap-12`}
            >
              <div className={`${deviceImageSize} bg-gray-200 flex-shrink-0`} />
              <div className="flex flex-col gap-4">
                <p className="font-body-3-sm text-black">{device.name}</p>
                <p className="font-body-4-r text-gray-300">{device.chargingType}</p>
                <p className="font-body-3-r text-gray-300">{device.color}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 그라데이션 */}
        {showGradient && hasMoreDevices && !showAllDevices && (
          <div
            className={`absolute right-0 bottom-0 ${deviceCardWidth} h-80 rounded-card pointer-events-none`}
            style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%)',
            }}
          />
        )}
      </div>

      {/* 기기 전체보기 버튼 */}
      {showExpandButton && hasMoreDevices && !showAllDevices && (
        <button
          onClick={handleExpand}
          className="mt-16 pl-12 font-body-2-r text-gray-500 underline cursor-pointer hover:opacity-80"
        >
          기기 전체보기
        </button>
      )}
    </div>
  );
};

export default CombinationDeviceCard;
