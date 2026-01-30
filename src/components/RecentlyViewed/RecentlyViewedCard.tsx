import type { RecentlyViewedDevice } from '@/types/recentlyViewed';

interface RecentlyViewedCardProps {
  device: RecentlyViewedDevice;
  onClick?: () => void;
}

const RecentlyViewedCard = ({ device, onClick }: RecentlyViewedCardProps) => {
  return (
    <div
      onClick={onClick}
      className="w-189 px-20 py-16 cursor-pointer hover:shadow-[0_0_7px_#57a0ff] transition-shadow"
    >
      {/* 이미지 - 149x149 */}
      <div className="w-149 h-149 bg-gray-200 overflow-hidden">
        {device.image && (
          <img
            src={device.image}
            alt={device.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="flex flex-col gap-2 mt-12">
        {/* 제품명 - 16px, Regular, line-height 22px */}
        <p className="font-body-2-r text-black leading-22 truncate">{device.name}</p>

        {/* 카테고리 - 12px, SemiBold, Gray300 */}
        <p className="font-caption-sm text-gray-300">{device.category}</p>

        {/* 가격 - 16px, SemiBold */}
        <p className="font-body-2-sm text-black mt-8">
          {device.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default RecentlyViewedCard;
