import type { ComboListItem, ComboDevice } from '@/types/combo/combo';
import CombinationDeviceCard from '@/components/Combination/CombinationDeviceCard';
import PrimaryButton from '@/components/Button/PrimaryButton';
import BackIcon from '@/assets/icons/back.svg?react';
import XIcon from '@/assets/icons/X.svg?react';

interface CombinationDetailModalProps {
  combination: ComboListItem;
  devices: ComboDevice[];
  comboIndex: number;
  showAllDevices: boolean;
  onExpandChange: (expanded: boolean) => void;
  isAlreadyInCombination: boolean | 0 | null;
  isAddingDevice: boolean;
  onAddDevice: () => void;
  onBack: () => void;
  onClose: () => void;
}

const CombinationDetailModal = ({
  combination,
  devices,
  comboIndex,
  showAllDevices,
  onExpandChange,
  isAlreadyInCombination,
  isAddingDevice,
  onAddDevice,
  onBack,
  onClose,
}: CombinationDetailModalProps) => {
  return (
    <div
      className="flex flex-col items-start gap-20 pointer-events-auto"
      style={{ paddingTop: '50px' }}
    >
      {/* Header: Back + X 버튼 */}
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
        className="bg-white rounded-card shadow-[0_0_10px_rgba(0,0,0,0.25)] mb-50 flex flex-col overflow-y-auto scrollbar-minimal"
        style={{
          width: '907px',
          height:'670px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 조합 정보 + 기기 그리드 */}
        <CombinationDeviceCard
          combination={combination}
          devices={devices}
          columns={3}
          defaultRows={3}
          expanded={showAllDevices}
          onExpand={(value) => onExpandChange(value)}
          showExpandButton={false}
          showGradient={true}
          className="px-56 pt-40 pb-0 flex-shrink-0"
          index={comboIndex}
        />

        {/* 토글 버튼 - CombinationDeviceCard 외부에 배치 */}
        {devices.length > 9 && !showAllDevices && (
          <button
            onClick={() => onExpandChange(true)}
            className="mt-16 px-56 pl-68 font-body-2-r text-gray-500 underline cursor-pointer hover:opacity-80 w-fit"
          >
            기기 전체보기
          </button>
        )}
        {devices.length > 9 && showAllDevices && (
          <button
            onClick={() => onExpandChange(false)}
            className="mt-16 px-56 pl-68 font-body-2-r text-gray-500 underline cursor-pointer hover:opacity-80 w-fit"
          >
            간략히 보기
          </button>
        )}

        {/* 버튼 컨테이너 - 토글 버튼으로부터 간격 유지하며 하단 고정 */}
        <div className="px-40 pb-40 pt-30 mt-auto">
          <div className="flex justify-end">
            <PrimaryButton
              text={isAlreadyInCombination ? '이미 담은 상품입니다.' : `${combination.comboName}에 담기`}
              onClick={onAddDevice}
              disabled={!!isAlreadyInCombination || isAddingDevice}
              className={`w-280 ${isAlreadyInCombination ? '' : 'bg-blue-600 hover:bg-blue-500'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinationDetailModal;
