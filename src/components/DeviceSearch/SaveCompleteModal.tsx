import SaveIcon from '@/assets/icons/save.svg?react';

interface SaveCompleteModalProps {
  isFadingOut: boolean;
}

const SaveCompleteModal = ({ isFadingOut }: SaveCompleteModalProps) => {
  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-60 transition-opacity duration-200 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`} />
      <div className={`fixed inset-0 flex items-center justify-center z-80 transition-opacity duration-200 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-300 h-300 bg-white rounded-card shadow-[0_0_10px_rgba(0,0,0,0.25)] relative animate-fade-in">
          <SaveIcon className="w-100 h-100 text-blue-600 absolute left-1/2 -translate-x-1/2 top-64" />
          <p className="font-heading-3 text-blue-600 absolute left-1/2 -translate-x-1/2 top-206">저장 완료!</p>
        </div>
      </div>
    </>
  );
};

export default SaveCompleteModal;
