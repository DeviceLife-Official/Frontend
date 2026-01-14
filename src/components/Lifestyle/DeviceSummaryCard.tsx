const DeviceSummaryCard = () => {
  return (
    <div className="device-card flex items-center p-8 gap-8 rounded-button bg-white border-shadow-gray w-180 shrink-0">
      <div className="w-48 h-48 bg-gray-200 shrink-0" />
      <div className="flex flex-col gap-3 min-w-0">
        {/* TODO: API 연동 */}
        <div className="w-108 overflow-hidden">
          <p className="device-name font-caption-sm text-black whitespace-nowrap">
            SteelSeries Arctis Nova Pro
          </p>
        </div>
        <p className="font-caption-r text-gray-300 w-108 whitespace-nowrap">2024-05-15</p>
        <p className="font-caption-r text-gray-300 w-108 whitespace-nowrap">1499000</p>
      </div>
    </div>
  );
};

export default DeviceSummaryCard;
