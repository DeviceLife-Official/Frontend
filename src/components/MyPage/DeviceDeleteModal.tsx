import { memo } from 'react';
import RemoveIcon from '@/assets/icons/remove.svg?react';

interface DeviceDeleteModalProps {
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeviceDeleteModal = ({ isDeleting, onConfirm, onCancel }: DeviceDeleteModalProps) => {
  return (
    <>
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black/50 z-60" onClick={onCancel} />

      {/* 모달 */}
      <div className="fixed inset-0 flex items-center justify-center z-70 pointer-events-none">
        <div
          className="bg-white rounded-card w-460 px-36 py-44 flex flex-col items-center pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 아이콘 */}
          <RemoveIcon className="w-58 h-58" />

          {/* 텍스트 */}
          <p className="font-body-2-r text-black mt-36">선택한 기기들을 삭제하시겠습니까?</p>

          {/* 버튼 그룹 */}
          <div className="flex gap-20 mt-60">
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className={`w-168 h-52 bg-red-500 hover:bg-red-400 rounded-button flex items-center justify-center transition-colors ${
                isDeleting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <span className="font-body-2-sm text-white">
                {isDeleting ? '삭제 중...' : '삭제'}
              </span>
            </button>
            <button
              onClick={onCancel}
              className="w-168 h-52 bg-gray-100 hover:bg-gray-200 rounded-button flex items-center justify-center cursor-pointer transition-colors"
            >
              <span className="font-body-2-sm text-black">취소</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(DeviceDeleteModal);
