import { useState, useEffect, useCallback, type RefObject } from 'react';
import { SCROLL_CONSTANTS } from '@/constants/devices';

export const useScrollState = (productGridRef: RefObject<HTMLDivElement | null>) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  // 페이지 마운트 시 상단으로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    /* 맨 마지막 스크롤 도달 여부 체크 */
    const reachedBottom =
      scrollTop + windowHeight >= documentHeight - SCROLL_CONSTANTS.BOTTOM_BUFFER;
    setIsAtBottom(reachedBottom);

    /* 3행이 완전히 보일 때 Top 버튼 표시 */
    if (productGridRef.current) {
      const gridTop = productGridRef.current.offsetTop;
      const thirdRowVisible =
        scrollTop + windowHeight >= gridTop + SCROLL_CONSTANTS.TOP_BUTTON_THRESHOLD;
      setShowTopButton(thirdRowVisible);
    }
  }, [productGridRef]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    isAtBottom,
    showTopButton,
    handleScrollToTop,
  };
};
