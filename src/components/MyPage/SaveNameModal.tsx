import { memo } from 'react';
import SaveIcon from '@/assets/icons/save.svg?react';

interface SaveNameModalProps {
  isSaving: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const SaveNameModal = ({ isSaving, onConfirm, onCancel }: SaveNameModalProps) => {
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
          <SaveIcon className="w-58 h-58 text-blue-600" />

          {/* 텍스트 */}
          <p className="font-body-2-r text-black mt-36">조합명을 저장하시겠습니까?</p>

          {/* 버튼 그룹 */}
          <div className="flex gap-20 mt-60">
            <button
              onClick={onConfirm}
              disabled={isSaving}
              className="w-168 h-52 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-button flex items-center justify-center cursor-pointer transition-colors"
            >
              <span className="font-body-2-sm text-white">
                {isSaving ? '저장 중...' : '확인'}
              </span>
            </button>
            <button
              onClick={onCancel}
              disabled={isSaving}
              className="w-168 h-52 bg-gray-100 hover:bg-gray-200 disabled:cursor-not-allowed rounded-button flex items-center justify-center cursor-pointer transition-colors"
            >
              <span className="font-body-2-sm text-black">취소</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(SaveNameModal);
