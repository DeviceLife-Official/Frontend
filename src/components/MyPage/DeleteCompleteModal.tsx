import { memo } from 'react';
import RemoveIcon from '@/assets/icons/remove.svg?react';

interface DeleteCompleteModalProps {
  isFadingOut: boolean;
}

const DeleteCompleteModal = ({ isFadingOut }: DeleteCompleteModalProps) => {
  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={`fixed inset-0 bg-black/10 z-60 transition-opacity duration-200 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* 팝업 */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-70 pointer-events-none transition-opacity duration-200 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="bg-white rounded-card shadow-[0_0_10px_rgba(0,0,0,0.25)] w-300 h-300 flex flex-col items-center justify-center pointer-events-auto animate-fade-in">
          {/* 아이콘 */}
          <RemoveIcon className="w-100 h-100 text-warning" />

          {/* 텍스트 */}
          <p className="font-heading-3 text-black mt-42">삭제 완료</p>
        </div>
      </div>
    </>
  );
};

export default memo(DeleteCompleteModal);
