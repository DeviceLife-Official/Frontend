import { useState, memo } from 'react';

interface CombinationMenuProps {
  hasDevices: boolean;
  onDelete: () => void;
  onRename: () => void;
  onDetail?: () => void;
}

const CombinationMenu = ({ hasDevices, onDelete, onRename, onDetail }: CombinationMenuProps) => {
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);

  return (
    <div className="absolute right-0 top-full mt-8 bg-white rounded-button shadow-[0_2px_10px_rgba(0,0,0,0.25)] px-8 z-12 flex flex-col">
      {/* 삭제하기 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        onMouseEnter={() => setHoveredMenuItem('delete')}
        onMouseLeave={() => setHoveredMenuItem(null)}
        className="relative font-body-1-sm text-red-500 text-left py-12 whitespace-nowrap cursor-pointer border-b border-black/50"
      >
        {hoveredMenuItem === 'delete' && (
          <div className="absolute -inset-x-4 inset-y-4 bg-gray-100 rounded-button -z-10" />
        )}
        삭제하기
      </button>

      {/* 조합명 수정하기 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRename();
        }}
        onMouseEnter={() => setHoveredMenuItem('rename')}
        onMouseLeave={() => setHoveredMenuItem(null)}
        className={`relative font-body-1-sm text-black text-left py-12 whitespace-nowrap cursor-pointer ${hasDevices ? 'border-b border-black/50' : ''}`}
      >
        {hoveredMenuItem === 'rename' && (
          <div className="absolute -inset-x-4 inset-y-4 bg-gray-100 rounded-button -z-10" />
        )}
        조합명 수정하기
      </button>

      {/* 자세히보기 - 기기가 있을 때만 표시 */}
      {hasDevices && onDetail && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDetail();
          }}
          onMouseEnter={() => setHoveredMenuItem('detail')}
          onMouseLeave={() => setHoveredMenuItem(null)}
          className="relative font-body-1-sm text-black text-left py-12 whitespace-nowrap cursor-pointer"
        >
          {hoveredMenuItem === 'detail' && (
            <div className="absolute -inset-x-4 inset-y-4 bg-gray-100 rounded-button -z-10" />
          )}
          자세히보기
        </button>
      )}
    </div>
  );
};

export default memo(CombinationMenu);
