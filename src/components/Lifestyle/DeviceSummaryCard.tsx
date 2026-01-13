const DeviceSummaryCard = () => {
  return (
    <div className="flex items-center p-8 gap-9 rounded-button bg-white border-shadow-gray w-180 shrink-0">
      <div className="w-48 h-48 bg-gray-200 shrink-0" />
      <div className="flex flex-col gap-3 min-w-0">
        {/* TODO: API 연동 */}
        <p
          className="font-caption-sm text-black w-108 whitespace-nowrap overflow-x-auto overflow-y-hidden scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          MacBook Pro 16 (M3 Max)
        </p>
        <p
          className="font-caption-r text-gray-300 w-108 whitespace-nowrap overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          USB-C
        </p>
        <p
          className="font-caption-r text-gray-300 w-108 whitespace-nowrap overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          내추럴 티타늄
        </p>
      </div>
    </div>
  );
};

export default DeviceSummaryCard;
