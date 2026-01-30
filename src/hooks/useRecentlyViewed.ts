import { useState, useEffect, useCallback } from 'react';
import type { RecentlyViewedDevice } from '@/types/recentlyViewed';
import {
  getRecentlyViewedDevices,
  addRecentlyViewedDevice,
  removeRecentlyViewedDevice,
} from '@/utils/recentlyViewedStorage';
import { MOCK_RECENTLY_VIEWED_DEVICES } from '@/constants/mockData';

export const useRecentlyViewed = () => {
  const [devices, setDevices] = useState<RecentlyViewedDevice[]>([]);

  // 초기 로드 (localStorage가 비어있으면 mockdata 사용)
  useEffect(() => {
    const storedDevices = getRecentlyViewedDevices();
    if (storedDevices.length > 0) {
      setDevices(storedDevices);
    } else {
      setDevices(MOCK_RECENTLY_VIEWED_DEVICES);
    }
  }, []);

  // 기기 추가
  const addDevice = useCallback((device: Omit<RecentlyViewedDevice, 'viewedAt'>) => {
    addRecentlyViewedDevice(device);
    setDevices(getRecentlyViewedDevices());
  }, []);

  // 기기 제거
  const removeDevice = useCallback((deviceId: number) => {
    removeRecentlyViewedDevice(deviceId);
    setDevices(getRecentlyViewedDevices());
  }, []);

  return {
    devices,
    addDevice,
    removeDevice,
    hasDevices: devices.length > 0,
  };
};
