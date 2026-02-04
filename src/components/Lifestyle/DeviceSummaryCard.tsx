import type { LifestyleDevice } from '@/types/lifestyle/lifestyle';

type Props = {
  device?: LifestyleDevice;
};

const DeviceSummaryCard = ({ device }: Props) => {
  return (
    <div className="device-card flex items-center p-8 gap-8 rounded-button bg-white border-shadow-gray w-180 shrink-0">
      <div className="w-48 h-48 bg-gray-200 shrink-0 overflow-hidden">
        {device?.imageUrl ? (
          <img
            src={device.imageUrl}
            alt={device.displayName}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-4 min-w-0">
        <div className="w-108 overflow-hidden">
          <p className="device-name font-caption-sm text-black whitespace-nowrap">
            {device?.displayName ?? '-'}
          </p>
        </div>
        <p className="font-caption-r text-gray-300 w-108 whitespace-nowrap">
          {device?.releaseDate ?? '-'}
        </p>
        <p className="font-caption-r text-gray-300 w-108 whitespace-nowrap">
          {device?.price != null
            ? new Intl.NumberFormat('ko-KR', {
                style: 'currency',
                currency: 'KRW',
                maximumFractionDigits: 0,
              }).format(device.price)
            : '-'}
        </p>
      </div>
    </div>
  );
};

export default DeviceSummaryCard;
