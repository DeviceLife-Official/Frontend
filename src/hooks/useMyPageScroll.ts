import { useState, useEffect, type RefObject } from 'react';

interface UseMyPageScrollReturn {
  isAtBottom: boolean;
  showTopButton: boolean;
}

/**
 * MyPage 전용 스크롤 상태 관리 훅
 * @param combinationListRef - 조합 목록 ref
 * @returns isAtBottom - 하단 도달 여부, showTopButton - Top 버튼 표시 여부
 */
export const useMyPageScroll = (
  combinationListRef: RefObject<HTMLDivElement>
): UseMyPageScrollReturn => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 하단 도달 여부 (그라데이션용)
      setIsAtBottom(scrollTop + windowHeight >= documentHeight - 50);

      // 조합 3개 정도 스크롤 시 Top 버튼 표시 (약 800px)
      if (combinationListRef.current) {
        const listTop = combinationListRef.current.offsetTop;
        const thirdCombinationVisible = scrollTop + windowHeight >= listTop + 800;
        setShowTopButton(thirdCombinationVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [combinationListRef]);

  return { isAtBottom, showTopButton };
};
