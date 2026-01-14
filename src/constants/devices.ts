import PhoneIcon from '@/assets/icons/phone.svg?react';
import LaptopIcon from '@/assets/icons/laptop.svg?react';
import TabletIcon from '@/assets/icons/tablet.svg?react';
import WatchIcon from '@/assets/icons/watch.svg?react';
import HeadsetIcon from '@/assets/icons/headset.svg?react';
import KeyboardIcon from '@/assets/icons/keyboard.svg?react';
import MouseIcon from '@/assets/icons/mouse.svg?react';
import AccessoriesIcon from '@/assets/icons/accessories.svg?react';
import type { ComponentType, SVGProps } from 'react';

export interface DeviceCategory {
  id: number;
  name: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface FilterOption {
  value: string;
  label: string;
}

export const DEVICE_CATEGORIES: DeviceCategory[] = [
  { id: 1, name: '스마트폰', Icon: PhoneIcon },
  { id: 2, name: '노트북', Icon: LaptopIcon },
  { id: 3, name: '태블릿', Icon: TabletIcon },
  { id: 4, name: '스마트워치', Icon: WatchIcon },
  { id: 5, name: '이어폰/헤드폰', Icon: HeadsetIcon },
  { id: 6, name: '키보드', Icon: KeyboardIcon },
  { id: 7, name: '마우스', Icon: MouseIcon },
  { id: 8, name: '액세서리', Icon: AccessoriesIcon },
];

export const SORT_OPTIONS: FilterOption[] = [
  { value: 'latest', label: '최신순' },
  { value: 'alphabetical', label: '가나다순' },
  { value: 'price-low', label: '낮은가격순' },
  { value: 'price-high', label: '높은가격순' },
];

export const PRICE_OPTIONS: FilterOption[] = [
  { value: 'under-100', label: '100만원 이하' },
  { value: '100-150', label: '100~150만원' },
  { value: '150-200', label: '150~200만원' },
  { value: 'over-200', label: '200만원 이상' },
];

export const BRAND_OPTIONS: FilterOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'samsung', label: 'Samsung' },
  { value: 'sony', label: 'Sony' },
  { value: 'logitech', label: 'Logitech' },
];

export const SCROLL_CONSTANTS = {
  BOTTOM_BUFFER: 50,
  TOP_BUTTON_THRESHOLD: 1800,
} as const;
