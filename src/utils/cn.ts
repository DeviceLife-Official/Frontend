// Tailwind CSS 클래스 병합 유틸리티
// - 기능 : Tailwind CSS 클래스를 병합하여 하나의 문자열로 만들어줌

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
