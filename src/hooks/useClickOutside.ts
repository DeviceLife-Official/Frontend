import { useEffect, type RefObject } from 'react';

/**
 * 요소 외부 클릭을 감지하는 훅
 * @param ref - 감지할 요소의 ref
 * @param handler - 외부 클릭 시 실행할 콜백
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, handler]);
};
