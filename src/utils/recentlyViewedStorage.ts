// import { RECENTLY_VIEWED_DEVICES, RECENTLY_VIEWED_MAX_COUNT } from '@/constants/storageKeys';
// import type { RecentlyViewedDevice } from '@/types/recentlyViewed/recentlyViewed';

// // localStorage를 조작하는 유틸리티 함수
// // 나머지 파일에서는 localStorage를 직접 사용하지 않고 이 파일의 함수를 사용하도록 함

// // 최근 본 기기 목록 가져오기
// export const getRecentlyViewedDevices = (): RecentlyViewedDevice[] => {
//   try {
//     const data = localStorage.getItem(RECENTLY_VIEWED_DEVICES);
//     if (!data) return [];
//     return JSON.parse(data) as RecentlyViewedDevice[];
//   } catch {
//     return [];
//   }
// };

// // 기기 추가 (가장 최근 것이 맨 앞, 중복 제거, 최대 개수 제한)
// export const addRecentlyViewedDevice = (
//   device: Omit<RecentlyViewedDevice, 'viewedAt'>
// ): void => {
//   const devices = getRecentlyViewedDevices();

//   // 이미 있는 기기는 제거 (중복 방지)
//   const filteredDevices = devices.filter((d) => d.id !== device.id);

//   // 새 기기를 맨 앞에 추가
//   const newDevice: RecentlyViewedDevice = {
//     ...device,
//     viewedAt: Date.now(),
//   };

//   const updatedDevices = [newDevice, ...filteredDevices].slice(0, RECENTLY_VIEWED_MAX_COUNT);

//   localStorage.setItem(RECENTLY_VIEWED_DEVICES, JSON.stringify(updatedDevices));
// };

// // 특정 기기 삭제
// export const removeRecentlyViewedDevice = (deviceId: number): void => {
//   const devices = getRecentlyViewedDevices();
//   const filteredDevices = devices.filter((d) => d.id !== deviceId);
//   localStorage.setItem(RECENTLY_VIEWED_DEVICES, JSON.stringify(filteredDevices));
// };

// // 전체 삭제
// export const clearRecentlyViewedDevices = (): void => {
//   localStorage.removeItem(RECENTLY_VIEWED_DEVICES);
// };

// // 최근 본 기기 존재 여부
// export const hasRecentlyViewedDevices = (): boolean => {
//   return getRecentlyViewedDevices().length > 0;
// };
