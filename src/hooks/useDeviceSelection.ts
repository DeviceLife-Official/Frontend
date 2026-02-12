import { useState } from 'react';

interface UseDeviceSelectionReturn {
  selectedDevices: number[];
  handleSelectAll: (deviceIds: number[]) => void;
  handleSelectDevice: (deviceId: number) => void;
  clearSelection: () => void;
}

export const useDeviceSelection = (): UseDeviceSelectionReturn => {
  const [selectedDevices, setSelectedDevices] = useState<number[]>([]);

  // 전체 선택/해제 핸들러
  const handleSelectAll = (deviceIds: number[]) => {
    if (selectedDevices.length === deviceIds.length) {
      setSelectedDevices([]);
    } else {
      setSelectedDevices(deviceIds);
    }
  };

  // 개별 선택/해제 핸들러
  const handleSelectDevice = (deviceId: number) => {
    setSelectedDevices((prev) =>
      prev.includes(deviceId) ? prev.filter((id) => id !== deviceId) : [...prev, deviceId]
    );
  };

  // 선택 초기화
  const clearSelection = () => {
    setSelectedDevices([]);
  };

  return {
    selectedDevices,
    handleSelectAll,
    handleSelectDevice,
    clearSelection,
  };
};
